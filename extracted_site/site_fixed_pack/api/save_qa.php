<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__.'/db.php'; cors();
$in = $_POST ?: json_decode(file_get_contents('php://input'), true);
if(!isset($in['question'])||!isset($in['answer'])) out(['ok'=>false,'error'=&gt;'REQUIRED'],400);
$lang = $in['lang'] ?? 'en';
$s=db()-&gt;prepare("INSERT INTO dc_qa (question,answer,lang) VALUES (?,?,?)");
$s-&gt;execute([$in['question'],$in['answer'],$lang]);
out(['ok'=&gt;true]);
