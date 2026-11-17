<?php
// Mobil uygulama yönetim uçları için ortak kod: JSON yanıt, CORS, Bearer jeton doğrulama.
// Jetonlar düz saklanmaz; veritabanında yalnızca SHA-256 özeti durur.

declare(strict_types=1);

if (basename($_SERVER['SCRIPT_FILENAME'] ?? '') === 'auth.php') {
    http_response_code(404);
    exit;
}

require dirname(__DIR__) . '/lib.php';

const TOKEN_DAYS = 180;

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');
// Uygulama çerez kullanmaz, jeton başlıkla gelir; web önizlemesi için her kaynağa açık.
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization, Content-Type');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
if (($_SERVER['REQUEST_METHOD'] ?? '') === 'OPTIONS') {
    http_response_code(204);
    exit;
}

function out(int $code, array $body): void
{
    http_response_code($code);
    echo json_encode($body, JSON_UNESCAPED_UNICODE);
    exit;
}

function body(): array
{
    $j = json_decode((string)file_get_contents('php://input'), true);
    return is_array($j) ? $j : [];
}

function app_db(): PDO
{
    $db = tekne_db();
    $db->exec("CREATE TABLE IF NOT EXISTS app_tokens (
        id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        token_hash CHAR(64) NOT NULL UNIQUE,
        device VARCHAR(20) NULL,
        created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        last_used_at DATETIME NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    $db->exec("CREATE TABLE IF NOT EXISTS app_login_attempts (
        ip VARCHAR(45) NOT NULL,
        at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
        INDEX (ip, at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4");
    return $db;
}

/** Geçerli jeton yoksa 401 döner; varsa jetonun id'sini verir. */
function require_admin(PDO $db): int
{
    $h = $_SERVER['HTTP_AUTHORIZATION'] ?? $_SERVER['REDIRECT_HTTP_AUTHORIZATION'] ?? '';
    if (!preg_match('/^Bearer\s+([a-f0-9]{64})$/i', $h, $m)) out(401, ['ok' => false, 'error' => 'Giriş gerekli']);
    $q = $db->prepare('SELECT id FROM app_tokens WHERE token_hash = ? AND created_at > NOW() - INTERVAL ' . TOKEN_DAYS . ' DAY');
    $q->execute([hash('sha256', strtolower($m[1]))]);
    $id = $q->fetchColumn();
    if (!$id) out(401, ['ok' => false, 'error' => 'Oturum süresi doldu, tekrar giriş yapın']);
    $db->prepare('UPDATE app_tokens SET last_used_at = NOW() WHERE id = ?')->execute([$id]);
    return (int)$id;
}
