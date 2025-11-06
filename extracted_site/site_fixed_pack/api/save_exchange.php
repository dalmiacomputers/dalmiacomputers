<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__.'/db.php'; cors();
$in = $_POST ?: json_decode(file_get_contents('php://input'), true);
if(!isset($in['mobile'])||!isset($in['category'])) out(['ok'=>false,'error'=&gt;'REQUIRED'],400);
$answers = isset($in['answers']) ? json_encode($in['answers']) : json_encode([]);
$estimate = intval($in['estimate']??0);
$pdo=db(); $s=$pdo-&gt;prepare("INSERT INTO dc_exchange (mobile,category,answers,estimate) VALUES (?,?,?,?)");
$s-&gt;execute([$in['mobile'],$in['category'],$answers,$estimate]);
out(['ok'=&gt;true]);
