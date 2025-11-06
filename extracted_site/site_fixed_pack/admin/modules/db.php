<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__ . '/config.php';
$pdo = new PDO("mysql:host=".$DB_HOST.";dbname=".$DB_NAME.";charset=utf8mb4", $DB_USER, $DB_PASS, [
  PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
]);
