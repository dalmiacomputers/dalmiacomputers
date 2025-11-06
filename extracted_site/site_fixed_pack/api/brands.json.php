<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__ . '/../admin/modules/db.php';
header('Content-Type: application/json');
$stmt = $pdo->query("SELECT id,name,logo FROM brands WHERE enabled=1 ORDER BY sort_order ASC, name ASC");
$rows = $stmt-&gt;fetchAll(PDO::FETCH_ASSOC);
foreach($rows as &amp;$r){ $r['logo'] = '/uploads/brands/' . $r['logo']; }
echo json_encode($rows ?: []);
