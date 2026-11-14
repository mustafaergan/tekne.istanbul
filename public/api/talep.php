<?php
// Sitedeki tüm formlar buraya gelir: rezervasyon, geri arama, bakım/usta talebi.
// İleride ödeme eklenince: rezervasyon kaydı oluşturulur (payment_status='bekliyor'),
// ödeme sağlayıcısına yönlendirilir, dönüşte payment_status='odendi' yapılır.

declare(strict_types=1);
require __DIR__ . '/lib.php';

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function reply(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    reply(405, ['ok' => false]);
}

// Bot tuzağı
if (trim((string)($_POST['website'] ?? '')) !== '') reply(200, ['ok' => true]);

$one = static fn(string $k, int $max): string =>
    mb_substr(trim(preg_replace('/\s+/u', ' ', (string)($_POST[$k] ?? '')) ?? ''), 0, $max);

$kind = (string)($_POST['kind'] ?? '');
if (!in_array($kind, ['rezervasyon', 'geri-arama', 'servis'], true)) reply(400, ['ok' => false, 'error' => 'Geçersiz istek.']);

$r = [
    'kind' => $kind,
    'service' => preg_replace('/[^a-z0-9-]/', '', $one('service', 80)) ?: 'genel',
    'service_title' => $one('serviceTitle', 160),
    'name' => $one('name', 120),
    'phone' => $one('phone', 40),
    'note' => mb_substr(trim((string)($_POST['note'] ?? '')), 0, 3000),
    'res_date' => null,
    'res_time' => null,
    'guests' => null,
    'job_type' => $one('jobType', 80) ?: null,
    'boat' => $one('boat', 120) ?: null,
    'location' => $one('location', 160) ?: null,
    'lang' => in_array($_POST['lang'] ?? '', ['tr', 'en', 'ar', 'fr', 'it'], true) ? $_POST['lang'] : 'tr',
];

$errors = [];
if (mb_strlen($r['name']) < 2) $errors['name'] = 'Adınızı yazın.';
$digits = preg_replace('/\D+/', '', $r['phone']) ?? '';
if (strlen($digits) < 10 || strlen($digits) > 15 || !preg_match('/^[+0-9 ()\-.]+$/', $r['phone'])) {
    $errors['phone'] = 'Geçerli bir telefon numarası yazın.';
}

if ($kind === 'rezervasyon') {
    $date = (string)($_POST['date'] ?? '');
    $time = (string)($_POST['time'] ?? '');
    $d = DateTime::createFromFormat('!Y-m-d', $date);
    $today = new DateTime('today');
    if (!$d || $d->format('Y-m-d') !== $date || $d < $today || $d > (clone $today)->modify('+1 year')) {
        $errors['date'] = 'Geçerli bir gün seçin.';
    }
    if (!preg_match('/^([01]\d|2[0-3]):[0-5]\d$/', $time)) $errors['time'] = 'Saat seçin.';
    $r['res_date'] = $date;
    $r['res_time'] = $time;
    $r['guests'] = max(1, min(99, (int)($_POST['guests'] ?? 1)));
}

if ($errors) reply(422, ['ok' => false, 'errors' => $errors, 'error' => 'Lütfen işaretli alanları kontrol edin.']);

$ip = (string)($_SERVER['REMOTE_ADDR'] ?? '');
$ua = mb_substr((string)($_SERVER['HTTP_USER_AGENT'] ?? ''), 0, 255);

try {
    $db = tekne_db();
    $q = $db->prepare('SELECT COUNT(*) FROM requests WHERE ip = ? AND created_at > NOW() - INTERVAL 1 HOUR');
    $q->execute([$ip]);
    if ((int)$q->fetchColumn() >= 8) reply(429, ['ok' => false, 'error' => 'Çok fazla deneme yapıldı. Lütfen bizi arayın.']);

    $ins = $db->prepare('INSERT INTO requests
        (kind, service, service_title, res_date, res_time, guests, name, phone, note, job_type, boat, location, lang, ip, user_agent)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    $ins->execute([
        $r['kind'], $r['service'], $r['service_title'] ?: null, $r['res_date'], $r['res_time'], $r['guests'],
        $r['name'], $r['phone'], $r['note'] !== '' ? $r['note'] : null, $r['job_type'], $r['boat'], $r['location'], $r['lang'], $ip, $ua,
    ]);
    $id = (int)$db->lastInsertId();

    try {
        tekne_notify($id, $r);
    } catch (Throwable $e) {
        error_log('tekne bildirim: ' . $e->getMessage());
    }
    reply(200, ['ok' => true, 'id' => $id]);
} catch (Throwable $e) {
    error_log('tekne talep: ' . $e->getMessage());
    reply(500, ['ok' => false, 'error' => 'Talebiniz kaydedilemedi. Lütfen bizi telefonla arayın.']);
}
