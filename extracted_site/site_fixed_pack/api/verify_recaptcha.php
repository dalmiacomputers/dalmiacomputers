<?php
require_once __DIR__ . '/premium_config.php';
require_once __DIR__ . '/premium_db.php';

cors();

function verifyRecaptcha($token) {
    $secret = RECAPTCHA_SECRET_KEY;
    $url = 'https://www.google.com/recaptcha/api/siteverify';
    
    $data = [
        'secret' => $secret,
        'response' => $token,
        'remoteip' => $_SERVER['REMOTE_ADDR']
    ];
    
    $options = [
        'http' => [
            'header' => "Content-type: application/x-www-form-urlencoded\r\n",
            'method' => 'POST',
            'content' => http_build_query($data)
        ]
    ];
    
    $context = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    
    if ($result === FALSE) {
        return ['success' => false, 'error' => 'Verification failed'];
    }
    
    $response = json_decode($result, true);
    
    if ($response['success'] && $response['score'] >= 0.5) {
        return ['success' => true, 'score' => $response['score']];
    }
    
    return ['success' => false, 'score' => $response['score'] ?? 0];
}

// Handle verification request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $token = $input['recaptcha_token'] ?? '';
    
    if (empty($token)) {
        jsonResponse(['ok' => false, 'error' => 'Token required'], 400);
    }
    
    $result = verifyRecaptcha($token);
    
    if ($result['success']) {
        jsonResponse(['ok' => true, 'score' => $result['score']]);
    } else {
        jsonResponse(['ok' => false, 'error' => 'Verification failed'], 400);
    }
}
?>