<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__.'/db.php'; cors();
$in = $_POST ?: json_decode(file_get_contents('php://input'), true);
$pdo = db();
$stmt = $pdo->prepare("INSERT INTO dc_contact (mobile,name,email,subject,message) VALUES (?,?,?,?,?)");
$stmt-&gt;execute([$in['mobile']??'', $in['name']??'', $in['email']??'', $in['subject']??'', $in['message']??'']);
out(['ok'=&gt;true]);
