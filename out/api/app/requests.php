<?php
// GET ?durum=acik|<durum>|''&tur=<tür>|'' -> {ok, items, counts}
// POST {id, status, payment_status, amount, admin_note} -> {ok}

declare(strict_types=1);
require __DIR__ . '/auth.php';

const STATUSES = ['yeni', 'arandi', 'onaylandi', 'tamamlandi', 'iptal'];
const PAYMENTS = ['yok', 'bekliyor', 'odendi', 'iade'];
const KINDS = ['rezervasyon', 'geri-arama', 'servis'];

try {
    $db = app_db();
    require_admin($db);

    if (($_SERVER['REQUEST_METHOD'] ?? '') === 'POST') {
        $b = body();
        $id = (int)($b['id'] ?? 0);
        $st = (string)($b['status'] ?? '');
        $pay = (string)($b['payment_status'] ?? '');
        if (!$id || !in_array($st, STATUSES, true) || !in_array($pay, PAYMENTS, true)) out(422, ['ok' => false, 'error' => 'Geçersiz değer']);
        $amount = trim((string)($b['amount'] ?? ''));
        $note = trim((string)($b['admin_note'] ?? ''));
        $db->prepare('UPDATE requests SET status = ?, payment_status = ?, amount = ?, admin_note = ? WHERE id = ?')->execute([
            $st, $pay, $amount === '' ? null : (float)str_replace(',', '.', $amount), $note === '' ? null : mb_substr($note, 0, 3000), $id,
        ]);
        out(200, ['ok' => true]);
    }

    $where = [];
    $args = [];
    $durum = (string)($_GET['durum'] ?? 'acik');
    $tur = (string)($_GET['tur'] ?? '');
    if ($durum === 'acik') $where[] = "status IN ('yeni','arandi','onaylandi')";
    elseif (in_array($durum, STATUSES, true)) { $where[] = 'status = ?'; $args[] = $durum; }
    if (in_array($tur, KINDS, true)) { $where[] = 'kind = ?'; $args[] = $tur; }

    $q = $db->prepare('SELECT id, created_at, kind, service, service_title, res_date, res_time, guests, name, phone, note, job_type, boat, location,
        status, payment_status, amount, admin_note, lang FROM requests'
        . ($where ? ' WHERE ' . implode(' AND ', $where) : '')
        . " ORDER BY (status = 'yeni') DESC, created_at DESC LIMIT 300");
    $q->execute($args);
    $items = $q->fetchAll();
    foreach ($items as &$r) {
        $r['id'] = (int)$r['id'];
        $r['guests'] = $r['guests'] === null ? null : (int)$r['guests'];
    }
    $counts = $db->query('SELECT status, COUNT(*) c FROM requests GROUP BY status')->fetchAll(PDO::FETCH_KEY_PAIR);
    $counts = array_map('intval', $counts);
    out(200, ['ok' => true, 'items' => $items, 'counts' => (object)$counts]);
} catch (Throwable $e) {
    error_log('tekne app requests: ' . $e->getMessage());
    out(500, ['ok' => false, 'error' => 'Sunucu hatası']);
}
