<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__ . '/modules/auth.php'; require_login();
require_once __DIR__ . '/modules/db.php';
$msg='';
if($_SERVER['REQUEST_METHOD']==='POST'){
  $embed = trim($_POST['embed_reviews']??'');
  $stm = $pdo->prepare("REPLACE INTO settings(`key`,`value`) VALUES('embed_reviews',?)");
  $stm-&gt;execute([$embed]);
  $msg='Saved';
}
$cfg=$pdo-&gt;query("SELECT `key`,`value` FROM settings")-&gt;fetchAll(PDO::FETCH_KEY_PAIR);
include __DIR__ . '/templates/header.php';
?&gt;
<h1>Reviews Embed</h1>
<?php if($msg) echo '<div class="badge">'.$msg.''; ?&gt;
<form class="card" method="post">
<label>Paste your Trustindex / GBP / Elfsight / JustDial embed code</label>
<textarea class="input" name="embed_reviews" style="min-height:220px"><?php echo htmlspecialchars($cfg['embed_reviews']??''); ?></textarea><br/>
<button class="btn">Save</button>
</form>
<?php include __DIR__ . '/templates/footer.php'; ?>
