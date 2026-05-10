<?php
header('Content-Type: application/json; charset=utf-8');
$db = new SQLite3(__DIR__ . '/aps.sqlite');

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

$stmt = $db->prepare('SELECT COUNT(*) AS c FROM USUARIOS WHERE NOME = :user AND SENHA1 = :pass');
$stmt->bindValue(':user', $username, SQLITE3_TEXT);
$stmt->bindValue(':pass', $password, SQLITE3_TEXT);
$result = $stmt->execute()->fetchArray(SQLITE3_ASSOC);

if ($result['c'] > 0) {
    echo json_encode(['ok' => true]);
} else {
    echo json_encode(['ok' => false]);
}