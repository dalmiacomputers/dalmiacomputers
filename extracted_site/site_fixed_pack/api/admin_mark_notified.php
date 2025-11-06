<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__.'/db.php'; cors();
if(($_GET['token']??'')!==ADMIN_TOKEN) out(['ok'=>false,'error'=&gt;'UNAUTH'],401);
$id = intval($_GET['id']??0);
$s = db()-&gt;prepare("UPDATE dc_requests SET status='notified' WHERE id=?"); $s-&gt;execute([$id]);
out(['ok'=&gt;true]);
