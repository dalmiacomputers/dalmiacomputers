<?php
require_once __DIR__.'/db.php'; cors();
$token = isset($_GET['token'])?$_GET['token']:''; if($token!==ADMIN_TOKEN) out(['ok'=>false,'error'=>'UNAUTH'],401);
$rows = db()->query("SELECT * FROM dc_customers ORDER BY updated_at DESC")->fetchAll();
header('Content-Disposition: attachment; filename="dc_universal_export.json"');
out(['ok'=>true,'rows'=>$rows]);
