<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__.'/db.php'; cors();
$lang = isset($_GET['lang'])?$_GET['lang']:'en';
$rows = db()->prepare("SELECT * FROM dc_qa WHERE lang=? ORDER BY id DESC"); $rows-&gt;execute([$lang]);
out(['ok'=&gt;true,'items'=&gt;$rows-&gt;fetchAll()]);
