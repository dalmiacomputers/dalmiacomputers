<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__ . '/../admin/modules/db.php';
header('Content-Type: text/html; charset=utf-8');
$cfg = $pdo->query("SELECT `key`,`value` FROM settings")-&gt;fetchAll(PDO::FETCH_KEY_PAIR);
echo $cfg['embed_reviews'] ?? '<div style="padding:12px;color:#667">Add Trustindex/Elfsight/GBP/JustDial embed in Admin ▸ Reviews.</div>';
