<?php

declare(strict_types=1);

$route = $_GET['route'] ?? 'home';
$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($route === 'login' && $method === 'POST') {
    header('Content-Type: application/json; charset=utf-8');

    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($username === '' || $password === '') {
        http_response_code(422);
        echo json_encode([
            'ok' => false,
            'message' => 'Informe usuario e senha.',
        ]);
        exit;
    }

    try {
        $pdo = new PDO('sqlite:' . __DIR__ . '/db/aps.sqlite');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $stmt = $pdo->prepare(
            'SELECT COUNT(*) FROM USUARIOS WHERE NOME = :user AND SENHA1 = :pass'
        );
        $stmt->execute([
            ':user' => $username,
            ':pass' => $password,
        ]);

        echo json_encode([
            'ok' => (int) $stmt->fetchColumn() > 0,
        ]);
    } catch (PDOException $exception) {
        http_response_code(500);
        echo json_encode([
            'ok' => false,
            'message' => 'Erro ao conectar com o banco de dados.',
        ]);
    }

    exit;
}

if ($route === 'home' && $method === 'GET') {
    header('Content-Type: text/html; charset=utf-8');
    readfile(__DIR__ . '/loginpage.html');
    exit;
}

http_response_code(404);
header('Content-Type: text/plain; charset=utf-8');
echo 'Rota nao encontrada.';
