<?php
// POST {expoToken, platform} -> bu yönetici cihazını yeni talep bildirimlerine kaydeder.

declare(strict_types=1);
require __DIR__ . '/auth.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') out(405, ['ok' => false]);

try {
    $db = app_db();
    $tid = require_admin($db);
    $b = body();
    $t = (string)($b['expoToken'] ?? '');
    if (!preg_match('/^(Exponent|Expo)PushToken\[[A-Za-z0-9_\-]+\]$/', $t)) out(422, ['ok' => false, 'error' => 'Geçersiz bildirim jetonu']);
    $platform = in_array($b['platform'] ?? '', ['ios', 'android'], true) ? $b['platform'] : null;
    tekne_push_table($db);
    $db->prepare('INSERT INTO push_devices (expo_token, platform, token_id) VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE platform = VALUES(platform), token_id = VALUES(token_id), last_seen = NOW()')->execute([$t, $platform, $tid]);
    out(200, ['ok' => true]);
} catch (Throwable $e) {
    error_log('tekne app push: ' . $e->getMessage());
    out(500, ['ok' => false, 'error' => 'Sunucu hatası']);
}
