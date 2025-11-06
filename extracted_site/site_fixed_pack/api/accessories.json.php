<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__ . '/../admin/modules/db.php';
header('Content-Type: application/json');
$stmt = $pdo->query("SELECT id,title,description,image FROM accessories WHERE enabled=1 ORDER BY id DESC LIMIT 50");
$rows = $stmt-&gt;fetchAll(PDO::FETCH_ASSOC);
foreach($rows as &amp;$r){ $r['image']='/uploads/accessories/'.$r['image']; }
echo json_encode($rows ?: []);
