<?php
// POST {user, pass, device} -> {ok, token}. Kullanıcı bilgisi web yönetimiyle aynı: ~/.tekne/admin.php

declare(strict_types=1);
require __DIR__ . '/auth.php';

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') out(405, ['ok' => false]);

try {
    $db = app_db();
    $ip = (string)($_SERVER['REMOTE_ADDR'] ?? '');
    $q = $db->prepare('SELECT COUNT(*) FROM app_login_attempts WHERE ip = ? AND at > NOW() - INTERVAL 15 MINUTE');
    $q->execute([$ip]);
    if ((int)$q->fetchColumn() >= 10) out(429, ['ok' => false, 'error' => 'Çok fazla deneme. 15 dakika sonra tekrar deneyin.']);

    $b = body();
    $a = tekne_config('admin');
    $ok = $a
        && hash_equals((string)$a['user'], (string)($b['user'] ?? ''))
        && password_verify((string)($b['pass'] ?? ''), (string)$a['hash']);
    if (!$ok) {
        $db->prepare('INSERT INTO app_login_attempts (ip) VALUES (?)')->execute([$ip]);
        out(401, ['ok' => false, 'error' => 'Kullanıcı adı veya şifre hatalı.']);
    }

    $token = bin2hex(random_bytes(32));
    $device = in_array($b['device'] ?? '', ['ios', 'android', 'web'], true) ? $b['device'] : null;
    $db->prepare('INSERT INTO app_tokens (token_hash, device) VALUES (?, ?)')->execute([hash('sha256', $token), $device]);
    $db->prepare('DELETE FROM app_login_attempts WHERE ip = ? OR at < NOW() - INTERVAL 1 DAY')->execute([$ip]);
    out(200, ['ok' => true, 'token' => $token]);
} catch (Throwable $e) {
    error_log('tekne app login: ' . $e->getMessage());
    out(500, ['ok' => false, 'error' => 'Sunucu hatası']);
}
