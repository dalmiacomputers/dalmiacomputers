<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require __DIR__.'/../../admin/config.php';
header('Content-Type: application/json');
$ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$name=$_POST['name']??''; $phone=$_POST['phone']??''; $email=$_POST['email']??''; $interest=$_POST['interest']??''; $message=$_POST['message']??'';
$st=$pdo->prepare("INSERT INTO dc_leads(name,phone,email,interest,message,source,meta) VALUES (?,?,?,?,?,'website','{}')");
$st-&gt;execute([$name,$phone,$email,$interest,$message]);
echo json_encode(['ok'=&gt;true]);
