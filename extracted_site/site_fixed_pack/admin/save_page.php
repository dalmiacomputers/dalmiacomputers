<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require __DIR__.'/config.php'; session_start(); if(empty($_SESSION['ok'])) die('auth');
$slug=$_POST['slug']??''; $title=$_POST['title']??''; $description=$_POST['description']??''; $content=$_POST['content']??''; $schema=$_POST['schema_json']??'';
$st=$pdo->prepare("INSERT INTO dc_pages(slug,title,description,content,schema_json) VALUES (?,?,?,?,?) ON DUPLICATE KEY UPDATE title=VALUES(title), description=VALUES(description), content=VALUES(content), schema_json=VALUES(schema_json)");
$st-&gt;execute([$slug,$title,$description,$content,$schema]);
header('Location: index.php');
