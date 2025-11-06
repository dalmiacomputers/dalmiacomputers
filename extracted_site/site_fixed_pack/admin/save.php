<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require __DIR__.'/config.php'; session_start(); if(empty($_SESSION['ok'])) die('auth');
foreach($_POST as $k=>$v){
  if ($k==='__section') continue;
  if (!preg_match('/^[a-z0-9_\-]+$/i',$k)) continue;
  $st=$pdo-&gt;prepare("INSERT INTO dc_settings (k,v) VALUES (?,?) ON DUPLICATE KEY UPDATE v=VALUES(v)");
  $st-&gt;execute([$k, $v]);
}
header('Location: index.php');
