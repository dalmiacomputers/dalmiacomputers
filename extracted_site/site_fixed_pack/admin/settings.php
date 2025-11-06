<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__ . '/modules/auth.php'; require_login();
require_once __DIR__ . '/modules/db.php';
$msg='';
if($_SERVER['REQUEST_METHOD']==='POST'){
  foreach($_POST as $k=>$v){
    $stm = $pdo-&gt;prepare("REPLACE INTO settings(`key`,`value`) VALUES(?,?)");
    $stm-&gt;execute([$k, trim($v)]);
  }
  $msg='Saved';
}
$cfg = $pdo-&gt;query("SELECT `key`,`value` FROM settings")-&gt;fetchAll(PDO::FETCH_KEY_PAIR);
include __DIR__ . '/templates/header.php';
?&gt;
<h1>Settings &amp; NAP</h1>
<?php if($msg) echo '<div class="badge">'.$msg.''; ?&gt;
<form class="grid cols-2" method="post">
<div class="card">
<h3>Business</h3>
<label>Tagline<input class="input" name="tagline" value="&lt;?php echo htmlspecialchars($cfg['tagline']??'Your Trusted Tech Partner.'); ?&gt;"/></label><br/>
<label>Sales Phone<input class="input" name="phone_sales" value="&lt;?php echo htmlspecialchars($cfg['phone_sales']??'9734290001'); ?&gt;"/></label><br/>
<label>Service Phone<input class="input" name="phone_service" value="&lt;?php echo htmlspecialchars($cfg['phone_service']??'8145290001'); ?&gt;"/></label><br/>
<label>Email<input class="input" name="email" value="&lt;?php echo htmlspecialchars($cfg['email']??'dalmiacomputers@gmail.com'); ?&gt;"/></label><br/>
<label>GST<input class="input" name="gst" value="&lt;?php echo htmlspecialchars($cfg['gst']??'19AEHPD9752K1Z0'); ?&gt;"/></label><br/>
</div>
<div class="card">
<h3>Links</h3>
<label>WhatsApp Community<input class="input" name="wa_channel" value="&lt;?php echo htmlspecialchars($cfg['wa_channel']??''); ?&gt;"/></label><br/>
<label>Facebook<input class="input" name="facebook" value="&lt;?php echo htmlspecialchars($cfg['facebook']??''); ?&gt;"/></label><br/>
<label>Instagram<input class="input" name="instagram" value="&lt;?php echo htmlspecialchars($cfg['instagram']??''); ?&gt;"/></label><br/>
<label>YouTube<input class="input" name="youtube" value="&lt;?php echo htmlspecialchars($cfg['youtube']??''); ?&gt;"/></label><br/>
<label>LinkedIn<input class="input" name="linkedin" value="&lt;?php echo htmlspecialchars($cfg['linkedin']??''); ?&gt;"/></label><br/>
<label>Twitter/X<input class="input" name="twitter" value="&lt;?php echo htmlspecialchars($cfg['twitter']??''); ?&gt;"/></label><br/>
<label>GA4 Measurement ID<input class="input" name="ga4" value="&lt;?php echo htmlspecialchars($cfg['ga4']??''); ?&gt;"/></label><br/>
</div>
<div class="card" style="grid-column:1/-1">
<h3>Review Embeds (paste full code)</h3>
<label>Trustindex<textarea class="input" name="embed_trustindex"><?php echo htmlspecialchars($cfg['embed_trustindex']??''); ?></textarea></label><br/>
<label>Google Business / Maps<textarea class="input" name="embed_gbp"><?php echo htmlspecialchars($cfg['embed_gbp']??''); ?></textarea></label><br/>
<label>JustDial<textarea class="input" name="embed_justdial"><?php echo htmlspecialchars($cfg['embed_justdial']??''); ?></textarea></label><br/>
<label>Elfsight<textarea class="input" name="embed_elfsight"><?php echo htmlspecialchars($cfg['embed_elfsight']??''); ?></textarea></label><br/>
</div>
<div><button class="btn">Save</button></div>
</form>
<?php include __DIR__ . '/templates/footer.php'; ?>
