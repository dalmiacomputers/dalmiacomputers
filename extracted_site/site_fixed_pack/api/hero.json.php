<?php
require_once __DIR__ . '/../admin/modules/db.php';
header('Content-Type: application/json');
$stmt = $pdo->query("SELECT id,title,subtitle,button_text,button_link,image FROM hero_slides WHERE enabled=1 ORDER BY sort_order ASC, id DESC LIMIT 10");
echo json_encode($stmt->fetchAll(PDO::FETCH_ASSOC) ?: []);
