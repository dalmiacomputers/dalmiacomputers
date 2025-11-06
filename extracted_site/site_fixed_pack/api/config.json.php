<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__ . '/../admin/modules/db.php';
header('Content-Type: application/json');
$cfg = $pdo->query("SELECT `key`,`value` FROM settings")-&gt;fetchAll(PDO::FETCH_KEY_PAIR);
echo json_encode($cfg ?: new stdClass());
