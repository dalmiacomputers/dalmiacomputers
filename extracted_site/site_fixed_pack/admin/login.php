<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require __DIR__.'/config.php'; session_start();
if ($_SERVER['REQUEST_METHOD']==='POST') {
  if (($_POST['pin'] ?? '') === DC_ADMIN_PIN) { $_SESSION['ok']=true; header('Location: index.php'); exit; }
  $err='Wrong PIN';
}
?><!DOCTYPE html>
<html><body>
<h1>Dalmia CMS Login</h1>
<?php if(!empty($err)) echo "<p style='color:red'>$err";?&gt;
<form method="post"><label>Admin PIN <input name="pin"/></label><button>Login</button></form>
</body></html>