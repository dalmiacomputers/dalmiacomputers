<?php
require_once __DIR__.'/db.php'; cors();
if(!isset($_POST['mobile'])) out(['ok'=>false,'error'=>'MOBILE_REQUIRED'],400);
if(!isset($_FILES['invoice'])) out(['ok'=>false,'error'=>'FILE_REQUIRED'],400);

// Validate file type and size
$allowedTypes = ['pdf', 'jpg', 'jpeg', 'png'];
$maxSize = 5 * 1024 * 1024; // 5MB
$ext = strtolower(pathinfo($_FILES['invoice']['name'], PATHINFO_EXTENSION));

if(!in_array($ext, $allowedTypes)) out(['ok'=>false,'error'=>'INVALID_FILE_TYPE'],400);
if($_FILES['invoice']['size'] > $maxSize) out(['ok'=>false,'error'=>'FILE_TOO_LARGE'],400);
if($_FILES['invoice']['error'] !== UPLOAD_ERR_OK) out(['ok'=>false,'error'=>'UPLOAD_ERROR'],400);

$mobile = preg_replace('/\D+/', '', $_POST['mobile']);
$ym = date('Y/m'); $dir = __DIR__ . '/../uploads/' . $ym;
if(!is_dir($dir)) mkdir($dir, 0775, true);
$fname = 'inv_'.$mobile.'_'.bin2hex(random_bytes(6)).'.'.strtolower($ext);
$path = $dir.'/'.$fname;
if(!move_uploaded_file($_FILES['invoice']['tmp_name'],$path)) out(['ok'=>false,'error'=>'UPLOAD_FAIL'],500);
$public = '/uploads/'.$ym.'/'.$fname;
$pdo=db(); $s=$pdo->prepare("UPDATE dc_customers SET invoice_path=? WHERE mobile=?"); $s->execute([$public,$mobile]);
out(['ok'=>true,'path'=>$public]);
