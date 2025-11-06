<?php
require_once __DIR__.'/db.php'; 
cors();

$input = $_POST ?: json_decode(file_get_contents('php://input'), true);
if(!$input || !isset($input['mobile'])) out(['ok'=>false,'error'=>'MOBILE_REQUIRED'],400);

// Validate mobile number
$mobile = preg_replace('/\D+/', '', $input['mobile']);
if(strlen($mobile) < 10) out(['ok'=>false,'error'=>'INVALID_MOBILE'],400);
$fields=['name','email','address','ptype','brand','serial','pdate','wend','pref','notes'];
$params=[':mobile'=>$mobile];
$set=[];
foreach($fields as $f){ if(isset($input[$f])){ $set[]="$f=:$f"; $params[":$f"]=$input[$f]; } }
$params[':source']=isset($input['_source'])?$input['_source']:'api';
$set[]='source=:source';
$cols = 'mobile,'.implode(',',[] ?? []);
# Simpler upsert:
try{
  $pdo = db();
  $exists = $pdo->prepare("SELECT id FROM dc_customers WHERE mobile=?"); $exists->execute([$mobile]);
  if($exists->fetch()){
    $sql="UPDATE dc_customers SET ".implode(',', $set)." WHERE mobile=:mobile";
  } else {
    $sql="INSERT INTO dc_customers SET mobile=:mobile, ".implode(',', $set);
  }
  $stmt=$pdo->prepare($sql); $stmt->execute($params);
  out(['ok'=>true,'mobile'=>$mobile]);
}catch(Exception $e){ out(['ok'=>false,'error'=>$e->getMessage()],500); }
