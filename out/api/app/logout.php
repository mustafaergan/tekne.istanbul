<?php
// POST -> jetonu ve bu jetonla kaydedilen bildirim cihazını siler.

declare(strict_types=1);
require __DIR__ . '/auth.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') out(405, ['ok' => false]);

try {
    $db = app_db();
    $id = require_admin($db);
    tekne_push_table($db);
    $db->prepare('DELETE FROM push_devices WHERE token_id = ?')->execute([$id]);
    $db->prepare('DELETE FROM app_tokens WHERE id = ?')->execute([$id]);
    out(200, ['ok' => true]);
} catch (Throwable $e) {
    error_log('tekne app logout: ' . $e->getMessage());
    out(500, ['ok' => false, 'error' => 'Sunucu hatası']);
}
