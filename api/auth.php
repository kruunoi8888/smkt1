<?php
require_once 'db.php';

// Simple session-based auth
session_start();

$input = get_json_input();
$action = $_GET['action'] ?? '';

if ($action === 'login') {
    $user = $input['username'] ?? '';
    $pass = $input['password'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM admin_users WHERE username = ?");
    $stmt->execute([$user]);
    $admin = $stmt->fetch();

    if ($admin && $pass === $admin['password']) { // In production, use password_verify
        unset($admin['password']);
        $_SESSION['user'] = $admin;
        send_response(["success" => true, "user" => $admin]);
    } else {
        send_response(["success" => false, "message" => "Invalid credentials"], 401);
    }
} elseif ($action === 'logout') {
    session_destroy();
    send_response(["success" => true]);
} elseif ($action === 'check') {
    if (isset($_SESSION['user'])) {
        send_response(["isLoggedIn" => true, "user" => $_SESSION['user']]);
    } else {
        send_response(["isLoggedIn" => false]);
    }
}
?>
