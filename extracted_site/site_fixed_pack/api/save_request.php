<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__.'/db.php'; cors();
$in = $_POST ?: json_decode(file_get_contents('php://input'), true);
if(!isset($in['mobile'])||!isset($in['title'])) out(['ok'=>false,'error'=&gt;'REQUIRED'],400);
$pdo = db();
$stmt = $pdo-&gt;prepare("INSERT INTO dc_requests (mobile,title,category,notes,status) VALUES (?,?,?,?, 'pending')");
$stmt-&gt;execute([$in['mobile'],$in['title'],$in['category']??'General',$in['notes']??'']);
out(['ok'=&gt;true]);
