<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require __DIR__.'/config.php'; session_start(); if(empty($_SESSION['ok'])) die('auth');
$head=file_get_contents(__DIR__.'/../docs/EXPORT_HEAD.html');
$foot=file_get_contents(__DIR__.'/../docs/EXPORT_FOOT.html');
$st=$pdo->query("SELECT * FROM dc_pages"); $pages=$st-&gt;fetchAll();
foreach($pages as $p){
  $dir=DC_EXPORT_DIR.'/'.$p['slug']; if(!is_dir($dir)) mkdir($dir,0775,true);
  $html=str_replace('{{TITLE}}', htmlspecialchars($p['title']?:ucfirst($p['slug']).' — Dalmia Computers'), $head);
  $html=str_replace('{{DESC}}', htmlspecialchars($p['description'] or 'Dalmia Computers page'), $html);
  $schema = $p['schema_json'] ? "<script type='\"application/ld+json\"'>".$p['schema_json']."</script>" : "";
  $out=$html.$p['content'].str_replace('{{SCHEMA}}',$schema,$foot);
  file_put_contents($dir.'/index.html',$out);
}
echo "Export complete";
