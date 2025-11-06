<?php
require_once __DIR__.'/db.php'; cors();
$m = isset($_GET['m']) ? preg_replace('/\D+/', '', $_GET['m']) : '';
if(!$m) out(['ok'=>false,'error':'MISSING'],400);
$stmt = db()->prepare("SELECT * FROM dc_customers WHERE mobile=?"); $stmt->execute([$m]);
out(['ok'=>true,'row'=>$stmt->fetch()]);
