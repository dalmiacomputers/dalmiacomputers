<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__.'/db.php'; cors();
if(($_GET['token']??'')!==ADMIN_TOKEN) out(['ok'=>false,'error'=&gt;'UNAUTH'],401);
$rows = db()-&gt;query("SELECT * FROM dc_requests WHERE status='pending' ORDER BY id DESC")-&gt;fetchAll();
out(['ok'=&gt;true,'items'=&gt;$rows]);
