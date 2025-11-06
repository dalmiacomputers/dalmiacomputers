<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__.'/db.php'; cors();
$slug = isset($_GET['slug'])?$_GET['slug']:'';
if($slug===''){
  $rows = db()->query("SELECT slug,title,lang,created_at FROM dc_blog ORDER BY created_at DESC")-&gt;fetchAll();
  out(['ok'=&gt;true,'items'=&gt;$rows]);
} else {
  $s=db()-&gt;prepare("SELECT * FROM dc_blog WHERE slug=?"); $s-&gt;execute([$slug]);
  out(['ok'=&gt;true,'item'=&gt;$s-&gt;fetch()]);
}
