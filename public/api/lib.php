<?php
// Ortak yardımcılar: veritabanı bağlantısı, tablo şeması, e-posta bildirimi.
// Ayarlar web kökünün dışında, repoda yok:
//   ~/.tekne/db.php    -> ['dsn' => 'mysql:host=localhost;dbname=...;charset=utf8mb4', 'user' => '...', 'pass' => '...']
//   ~/.tekne/smtp.php  -> ['host' => ..., 'port' => 465, 'user' => ..., 'pass' => ..., 'to' => ...]  (isteğe bağlı)
//   ~/.tekne/admin.php -> ['user' => '...', 'hash' => password_hash(...)]

declare(strict_types=1);

if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === 'lib.php') {
    http_response_code(404);
    exit;
}

function tekne_config(string $name): array
{
    $file = dirname(__DIR__, 2) . "/.tekne/$name.php";
    $cfg = is_file($file) ? require $file : [];
    return is_array($cfg) ? $cfg : [];
}

function tekne_db(): PDO
{
    static $db = null;
    if ($db) return $db;
    $cfg = tekne_config('db');
    if (!$cfg) throw new RuntimeException('~/.tekne/db.php bulunamadi');
    $db = new PDO($cfg['dsn'], $cfg['user'], $cfg['pass'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_EMULATE_PREPARES => false,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
    $db->exec("CREATE TABLE IF NOT EXISTS requests (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        kind ENUM('rezervasyon','geri-arama','servis') NOT NULL,
        service VARCHAR(80) NOT NULL,
        service_title VARCHAR(160) NULL,
        res_date DATE NULL,
        res_time CHAR(5) NULL,
        guests TINYINT UNSIGNED NULL,
        name VARCHAR(120) NOT NULL,
        phone VARCHAR(40) NOT NULL,
        note TEXT NULL,
        job_type VARCHAR(80) NULL,
        boat VARCHAR(120) NULL,
        location VARCHAR(160) NULL,
        status ENUM('yeni','arandi','onaylandi','tamamlandi','iptal') NOT NULL DEFAULT 'yeni',
        payment_status ENUM('yok','bekliyor','odendi','iade') NOT NULL DEFAULT 'yok',
        amount DECIMAL(10,2) NULL,
        admin_note TEXT NULL,
        lang CHAR(2) NOT NULL DEFAULT 'tr',
        ip VARCHAR(45) NULL,
        user_agent VARCHAR(255) NULL,
        INDEX (created_at),
        INDEX (status),
        INDEX (res_date),
        INDEX (ip, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // Sonradan eklenen sütunlar
    $cols = $db->query('SHOW COLUMNS FROM requests')->fetchAll(PDO::FETCH_COLUMN);
    if (!in_array('lang', $cols, true)) {
        $db->exec("ALTER TABLE requests ADD COLUMN lang CHAR(2) NOT NULL DEFAULT 'tr' AFTER admin_note");
    }
    if (!in_array('hours', $cols, true)) {
        $db->exec('ALTER TABLE requests ADD COLUMN hours DECIMAL(3,1) NULL AFTER guests, ADD COLUMN pier VARCHAR(40) NULL AFTER hours, ADD COLUMN extras VARCHAR(255) NULL AFTER pier');
    }
    return $db;
}

// Mobil uygulamada giriş yapmış yönetici cihazları (Expo push jetonları)
function tekne_push_table(PDO $db): void
{
    $db->exec("CREATE TABLE IF NOT EXISTS push_devices (
        expo_token VARCHAR(255) NOT NULL PRIMARY KEY,
        platform VARCHAR(10) NULL,
        token_id INT UNSIGNED NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_seen DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
}

// Yeni talep: kayıtlı yönetici telefonlarına Expo Push ile anlık bildirim.
// Expo "DeviceNotRegistered" derse cihaz silinir (uygulama kaldırılmış).
function tekne_push(PDO $db, int $id, array $r): void
{
    tekne_push_table($db);
    $tokens = $db->query('SELECT expo_token FROM push_devices')->fetchAll(PDO::FETCH_COLUMN);
    if (!$tokens) return;
    $kinds = ['rezervasyon' => 'Rezervasyon', 'geri-arama' => 'Geri arama', 'servis' => 'Bakım / usta'];
    $title = ($kinds[$r['kind']] ?? 'Talep') . ': ' . ($r['service_title'] ?: $r['service']);
    $body = $r['name'] . ' · ' . $r['phone'] . ($r['res_date'] ? " · {$r['res_date']} {$r['res_time']}" : '')
        . (!empty($r['hours']) ? " · {$r['hours']} sa" : '') . (!empty($r['pier']) ? " · {$r['pier']}" : '');
    $messages = array_map(static fn($t) => [
        'to' => $t, 'title' => $title, 'body' => $body, 'sound' => 'default',
        'channelId' => 'talepler', 'priority' => 'high', 'data' => ['id' => $id],
    ], $tokens);

    $payload = json_encode($messages, JSON_UNESCAPED_UNICODE);
    $headers = ['Accept: application/json', 'Content-Type: application/json'];
    if (function_exists('curl_init')) {
        $ch = curl_init('https://exp.host/--/api/v2/push/send');
        curl_setopt_array($ch, [CURLOPT_POST => true, CURLOPT_POSTFIELDS => $payload, CURLOPT_HTTPHEADER => $headers, CURLOPT_RETURNTRANSFER => true, CURLOPT_TIMEOUT => 8]);
        $res = curl_exec($ch);
        curl_close($ch);
    } else {
        $res = @file_get_contents('https://exp.host/--/api/v2/push/send', false, stream_context_create(['http' => [
            'method' => 'POST', 'header' => implode("\r\n", $headers), 'content' => $payload, 'timeout' => 8,
        ]]));
    }
    $j = is_string($res) ? json_decode($res, true) : null;
    foreach (($j['data'] ?? []) as $i => $ticket) {
        if (($ticket['details']['error'] ?? '') === 'DeviceNotRegistered' && isset($tokens[$i])) {
            $db->prepare('DELETE FROM push_devices WHERE expo_token = ?')->execute([$tokens[$i]]);
        }
    }
    if (!$j) error_log("tekne push: Expo yaniti okunamadi (#$id)");
}

// Yeni talep bildirimi. SMTP ayarı yoksa sessizce atlanır (talep yine kayıtlıdır).
function tekne_notify(int $id, array $r): void
{
    $cfg = tekne_config('smtp');
    if (empty($cfg['pass'])) {
        error_log("tekne talep: ~/.tekne/smtp.php yok, bildirim gonderilmedi (#$id)");
        return;
    }
    $user = $cfg['user'];
    $to = $cfg['to'] ?? $user;
    $kinds = ['rezervasyon' => 'Rezervasyon talebi', 'geri-arama' => 'Geri arama', 'servis' => 'Bakım / usta talebi'];
    $lines = [
        ($kinds[$r['kind']] ?? $r['kind']) . " #$id",
        '',
        'Hizmet   : ' . ($r['service_title'] ?: $r['service']),
        "Ad       : {$r['name']}",
        "Telefon  : {$r['phone']}",
        'Dil      : ' . strtoupper($r['lang'] ?? 'tr'),
    ];
    if ($r['res_date']) $lines[] = "Tarih    : {$r['res_date']} {$r['res_time']}";
    if ($r['guests']) $lines[] = "Kişi     : {$r['guests']}";
    if (!empty($r['hours'])) $lines[] = "Süre     : {$r['hours']} saat";
    if (!empty($r['pier'])) $lines[] = "Kalkış   : {$r['pier']}";
    if (!empty($r['extras'])) $lines[] = "Ekler    : {$r['extras']}";
    if ($r['job_type']) $lines[] = "İş türü  : {$r['job_type']}";
    if ($r['boat']) $lines[] = "Tekne    : {$r['boat']}";
    if ($r['location']) $lines[] = "Konum    : {$r['location']}";
    if ($r['note']) array_push($lines, '', 'Not:', $r['note']);
    array_push($lines, '', '--', 'Yönetim: https://tekne.istanbul/yonetim/');

    $enc = static fn(string $t): string => '=?UTF-8?B?' . base64_encode($t) . '?=';
    $data = implode("\r\n", [
        'Date: ' . date('r'),
        'From: ' . $enc('tekne.istanbul') . " <$user>",
        "To: <$to>",
        'Subject: ' . $enc(($kinds[$r['kind']] ?? 'Talep') . " #$id: {$r['name']} - " . ($r['service_title'] ?: $r['service'])),
        'Message-ID: <' . bin2hex(random_bytes(12)) . '@tekne.istanbul>',
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: base64',
        '',
        rtrim(chunk_split(base64_encode(implode("\r\n", $lines)), 76, "\r\n")),
    ]);
    tekne_smtp($cfg['host'], (int)($cfg['port'] ?? 465), $user, (string)$cfg['pass'], $to, $data);
}

function tekne_smtp(string $host, int $port, string $user, string $pass, string $to, string $data): void
{
    $s = @stream_socket_client("ssl://$host:$port", $errno, $errstr, 10);
    if (!$s) throw new RuntimeException("SMTP baglanti hatasi: $errstr");
    stream_set_timeout($s, 15);
    $read = static function () use ($s): string {
        $out = '';
        while (($line = fgets($s, 1024)) !== false) {
            $out .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') break;
        }
        return $out;
    };
    $cmd = static function (?string $line, int $expect) use ($s, $read): void {
        if ($line !== null) fwrite($s, $line . "\r\n");
        $r = $read();
        if ((int)substr($r, 0, 3) !== $expect) throw new RuntimeException('SMTP: ' . trim($r));
    };
    try {
        $cmd(null, 220);
        $cmd('EHLO tekne.istanbul', 250);
        $cmd('AUTH LOGIN', 334);
        $cmd(base64_encode($user), 334);
        $cmd(base64_encode($pass), 235);
        $cmd("MAIL FROM:<$user>", 250);
        $cmd("RCPT TO:<$to>", 250);
        $cmd('DATA', 354);
        $cmd(preg_replace('/^\./m', '..', $data) . "\r\n.", 250);
        fwrite($s, "QUIT\r\n");
    } finally {
        fclose($s);
    }
}
