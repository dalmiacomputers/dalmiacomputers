<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__.'/db.php'; cors();
$in = $_POST ?: json_decode(file_get_contents('php://input'), true);
if(!isset($in['slug'])||!isset($in['title'])||!isset($in['html'])) out(['ok'=>false,'error'=&gt;'REQUIRED'],400);
$lang = $in['lang'] ?? 'en';
$pdo=db();
try{
  $pdo-&gt;prepare("INSERT INTO dc_blog (slug,title,lang,html) VALUES (?,?,?,?)")-&gt;execute([$in['slug'],$in['title'],$lang,$in['html']]);
} catch(Exception $e){
  $pdo-&gt;prepare("UPDATE dc_blog SET title=?, lang=?, html=?, updated_at=NOW() WHERE slug=?")-&gt;execute([$in['title'],$lang,$in['html'],$in['slug']]);
}
out(['ok'=&gt;true]);
