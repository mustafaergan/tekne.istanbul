<?php
// Talep yönetimi. Giriş bilgisi: ~/.tekne/admin.php -> ['user' => '...', 'hash' => password_hash('şifre', PASSWORD_DEFAULT)]

declare(strict_types=1);
require dirname(__DIR__) . '/api/lib.php';

header('X-Frame-Options: DENY');
header('X-Robots-Tag: noindex, nofollow');
header('Cache-Control: no-store');
session_set_cookie_params(['httponly' => true, 'secure' => !empty($_SERVER['HTTPS']), 'samesite' => 'Strict', 'path' => '/yonetim/']);
session_name('tekne_admin');
session_start();

function h(?string $s): string { return htmlspecialchars((string)$s, ENT_QUOTES, 'UTF-8'); }
function csrf(): string { return $_SESSION['csrf'] ??= bin2hex(random_bytes(16)); }
function check_csrf(): void {
    if (!hash_equals($_SESSION['csrf'] ?? '', (string)($_POST['csrf'] ?? ''))) { http_response_code(400); exit('Oturum süresi doldu, sayfayı yenileyin.'); }
}

$STATUS = ['yeni' => 'Yeni', 'arandi' => 'Arandı', 'onaylandi' => 'Onaylandı', 'tamamlandi' => 'Tamamlandı', 'iptal' => 'İptal'];
$PAY = ['yok' => '—', 'bekliyor' => 'Ödeme bekliyor', 'odendi' => 'Ödendi', 'iade' => 'İade'];
$KIND = ['rezervasyon' => 'Rezervasyon', 'geri-arama' => 'Geri arama', 'servis' => 'Bakım / usta'];

// Çıkış
if (isset($_GET['cikis'])) { session_destroy(); header('Location: ./'); exit; }

// Giriş
if (empty($_SESSION['ok'])) {
    $err = '';
    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
        check_csrf();
        $a = tekne_config('admin');
        $_SESSION['tries'] = ($_SESSION['tries'] ?? 0) + 1;
        if ($_SESSION['tries'] > 10) { $err = 'Çok fazla deneme. Biraz sonra tekrar deneyin.'; }
        elseif ($a && hash_equals((string)$a['user'], (string)($_POST['user'] ?? '')) && password_verify((string)($_POST['pass'] ?? ''), (string)$a['hash'])) {
            session_regenerate_id(true);
            $_SESSION['ok'] = true;
            $_SESSION['tries'] = 0;
            header('Location: ./'); exit;
        } else { $err = 'Kullanıcı adı veya şifre hatalı.'; }
    }
    page('Giriş', '<form method="post" class="login"><h1>tekne.istanbul yönetim</h1>'
        . ($err ? '<p class="err">' . h($err) . '</p>' : '')
        . '<input type="hidden" name="csrf" value="' . csrf() . '">'
        . '<label>Kullanıcı adı<input name="user" autocomplete="username" required></label>'
        . '<label>Şifre<input name="pass" type="password" autocomplete="current-password" required></label>'
        . '<button>Giriş</button></form>');
    exit;
}

$db = tekne_db();

// Güncelleme
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
    check_csrf();
    $id = (int)($_POST['id'] ?? 0);
    $st = (string)($_POST['status'] ?? '');
    $pay = (string)($_POST['payment_status'] ?? '');
    $amount = trim((string)($_POST['amount'] ?? ''));
    if ($id && isset($STATUS[$st], $PAY[$pay])) {
        $db->prepare('UPDATE requests SET status = ?, payment_status = ?, amount = ?, admin_note = ? WHERE id = ?')
           ->execute([$st, $pay, $amount === '' ? null : (float)str_replace(',', '.', $amount), trim((string)($_POST['admin_note'] ?? '')) ?: null, $id]);
    }
    header('Location: ./?' . http_build_query(['durum' => $_GET['durum'] ?? '', 'tur' => $_GET['tur'] ?? '']) . "#t$id");
    exit;
}

// Liste
$where = [];
$args = [];
$durum = (string)($_GET['durum'] ?? 'acik');
$tur = (string)($_GET['tur'] ?? '');
if ($durum === 'acik') { $where[] = "status IN ('yeni','arandi','onaylandi')"; }
elseif (isset($STATUS[$durum])) { $where[] = 'status = ?'; $args[] = $durum; }
if (isset($KIND[$tur])) { $where[] = 'kind = ?'; $args[] = $tur; }
$sql = 'SELECT * FROM requests' . ($where ? ' WHERE ' . implode(' AND ', $where) : '') . ' ORDER BY (status = \'yeni\') DESC, created_at DESC LIMIT 300';
$q = $db->prepare($sql);
$q->execute($args);
$rows = $q->fetchAll();
$counts = $db->query("SELECT status, COUNT(*) c FROM requests GROUP BY status")->fetchAll(PDO::FETCH_KEY_PAIR);

$filters = ['acik' => 'Açık', '' => 'Tümü'] + $STATUS;
$nav = '';
foreach ($filters as $k => $label) {
    $n = $k === 'acik' ? ($counts['yeni'] ?? 0) + ($counts['arandi'] ?? 0) + ($counts['onaylandi'] ?? 0) : ($k === '' ? array_sum($counts) : ($counts[$k] ?? 0));
    $nav .= '<a class="' . ($durum === $k ? 'on' : '') . '" href="?' . h(http_build_query(['durum' => $k, 'tur' => $tur])) . '">' . h($label) . " <b>$n</b></a>";
}
$navKind = '<a class="' . ($tur === '' ? 'on' : '') . '" href="?' . h(http_build_query(['durum' => $durum])) . '">Hepsi</a>';
foreach ($KIND as $k => $label) {
    $navKind .= '<a class="' . ($tur === $k ? 'on' : '') . '" href="?' . h(http_build_query(['durum' => $durum, 'tur' => $k])) . '">' . h($label) . '</a>';
}

$opt = static function (array $list, string $sel): string {
    $o = '';
    foreach ($list as $k => $v) $o .= '<option value="' . h($k) . '"' . ($k === $sel ? ' selected' : '') . '>' . h($v) . '</option>';
    return $o;
};

$html = '<header><h1>Talepler</h1><a href="?cikis=1">Çıkış</a></header><nav>' . $nav . '</nav><nav class="sub">' . $navKind . '</nav>';
if (!$rows) $html .= '<p class="empty">Bu filtrede talep yok.</p>';
foreach ($rows as $r) {
    $tel = preg_replace('/[^0-9+]/', '', $r['phone']);
    $wa = preg_replace('/\D/', '', $r['phone']);
    if (strlen($wa) === 11 && $wa[0] === '0') $wa = '9' . $wa;
    if (strlen($wa) === 10) $wa = '90' . $wa;
    $when = $r['res_date'] ? date('d.m.Y', strtotime($r['res_date'])) . ' ' . h($r['res_time']) . ($r['guests'] ? " · {$r['guests']} kişi" : '') : '';
    $extra = array_filter([$r['job_type'], $r['boat'], $r['location']]);
    $html .= '<article id="t' . $r['id'] . '" class="st-' . h($r['status']) . '">'
        . '<div class="top"><span class="tag">' . h($KIND[$r['kind']] ?? $r['kind']) . '</span> <b>' . h($r['service_title'] ?: $r['service']) . '</b>'
        . '<span class="muted">#' . $r['id'] . ' · ' . date('d.m.Y H:i', strtotime($r['created_at'])) . '</span></div>'
        . '<div class="who"><b>' . h($r['name']) . '</b> <a href="tel:' . h($tel) . '">' . h($r['phone']) . '</a> <a href="https://wa.me/' . h($wa) . '" target="_blank" rel="noopener">WhatsApp</a></div>'
        . ($when ? '<div class="when">📅 ' . $when . '</div>' : '')
        . ($extra ? '<div class="muted">' . h(implode(' · ', $extra)) . '</div>' : '')
        . ($r['note'] ? '<p class="note">' . nl2br(h($r['note'])) . '</p>' : '')
        . '<form method="post" class="edit"><input type="hidden" name="csrf" value="' . csrf() . '"><input type="hidden" name="id" value="' . $r['id'] . '">'
        . '<select name="status">' . $opt($STATUS, $r['status']) . '</select>'
        . '<select name="payment_status">' . $opt($PAY, $r['payment_status']) . '</select>'
        . '<input name="amount" inputmode="decimal" placeholder="Tutar TL" value="' . h($r['amount'] !== null ? rtrim(rtrim($r['amount'], '0'), '.') : '') . '">'
        . '<input name="admin_note" class="wide" placeholder="Not (sadece siz görürsünüz)" value="' . h($r['admin_note']) . '">'
        . '<button>Kaydet</button></form></article>';
}
page('Talepler', $html);

function page(string $title, string $body): void
{
    echo '<!doctype html><html lang="tr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>' . h($title) . ' · tekne.istanbul</title><style>'
        . ':root{--sea:#0f5472;--line:#dde4e7;--dim:#55656e;--bg:#f7f4ee}*{box-sizing:border-box}body{margin:0;font:15px/1.45 system-ui,sans-serif;background:var(--bg);color:#0f1b22}'
        . 'main{max-width:960px;margin:0 auto;padding:16px}header{display:flex;justify-content:space-between;align-items:center}h1{font-size:22px}a{color:var(--sea)}'
        . 'nav{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}nav a{padding:6px 12px;border-radius:99px;background:#fff;border:1px solid var(--line);text-decoration:none;color:inherit;font-size:14px}nav a.on{background:var(--sea);color:#fff;border-color:var(--sea)}nav.sub a{font-size:13px;padding:4px 10px}'
        . 'article{background:#fff;border:1px solid var(--line);border-left:4px solid var(--line);border-radius:12px;padding:14px;margin:10px 0}article.st-yeni{border-left-color:#ff7a3d}article.st-onaylandi{border-left-color:#15803d}article.st-iptal{opacity:.6}'
        . '.top{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.muted{color:var(--dim);font-size:13px}.top .muted{margin-left:auto}.tag{background:#e4f3f8;color:var(--sea);border-radius:6px;padding:2px 8px;font-size:12px;font-weight:600}'
        . '.who{margin-top:6px;display:flex;gap:12px;flex-wrap:wrap}.when{margin-top:4px;font-weight:600}.note{background:var(--bg);border-radius:8px;padding:8px 10px;margin:8px 0 0}'
        . '.edit{display:flex;flex-wrap:wrap;gap:6px;margin-top:10px}.edit .wide{flex:1;min-width:180px}input,select,button{font:inherit;padding:7px 10px;border:1px solid var(--line);border-radius:8px;background:#fff}input[name=amount]{width:110px}button{background:var(--sea);color:#fff;border-color:var(--sea);cursor:pointer}'
        . '.login{max-width:340px;margin:12vh auto;background:#fff;padding:24px;border-radius:16px;border:1px solid var(--line);display:grid;gap:12px}.login label{display:grid;gap:4px;font-size:14px}.err{color:#b91c1c}.empty{color:var(--dim);padding:40px 0;text-align:center}'
        . '</style></head><body><main>' . $body . '</main></body></html>';
}
