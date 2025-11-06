<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require __DIR__.'/config.php'; session_start(); if(empty($_SESSION['ok'])) die('auth');
$st=$pdo->prepare("INSERT INTO dc_jobs(role,department,type,description) VALUES (?,?,?,?)");
$st-&gt;execute([$_POST['role']??'', $_POST['department']??'', $_POST['type']??'', $_POST['description']??'']);
header('Location: index.php');
