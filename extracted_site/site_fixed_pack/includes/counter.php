<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
// Tiny honest counter fallback (use GA4 primarily)
$fp = __DIR__ . '/counter.txt';
$n = 0;
if (file_exists($fp)) { $n = intval(trim(file_get_contents($fp))); }
$n++;
file_put_contents($fp, $n);
header('Content-Type: application/json');
echo json_encode(['visits'=>$n]);
