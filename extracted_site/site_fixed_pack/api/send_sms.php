<?php
require_once __DIR__ . '/premium_config.php';
require_once __DIR__ . '/premium_db.php';

cors();

function sendSMS($mobile, $message) {
    $apiKey = MSG91_API_KEY;
    $senderId = MSG91_SENDER_ID;
    
    $url = "https://api.msg91.com/api/v5/flow/";
    
    $data = [
        'sender' => $senderId,
        'mobiles' => $mobile,
        'message' => $message,
        'route' => '4',
        'authkey' => $apiKey
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    return [
        'success' => $httpCode === 200,
        'response' => json_decode($response, true)
    ];
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $mobile = $input['mobile'] ?? '';
    $message = $input['message'] ?? '';
    
    if (empty($mobile) || empty($message)) {
        jsonResponse(['ok' => false, 'error' => 'Mobile and message required'], 400);
    }
    
    $result = sendSMS($mobile, $message);
    
    if ($result['success']) {
        jsonResponse(['ok' => true, 'message' => 'SMS sent']);
    } else {
        jsonResponse(['ok' => false, 'error' => 'SMS failed'], 500);
    }
}
?>