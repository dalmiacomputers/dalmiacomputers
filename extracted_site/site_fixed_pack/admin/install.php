<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
// Simple installer: creates db tables & admin password
if ($_SERVER['REQUEST_METHOD']==='POST'){
  $host = trim($_POST['db_host'] ?? 'localhost');
  $name = trim($_POST['db_name'] ?? '');
  $user = trim($_POST['db_user'] ?? '');
  $pass = trim($_POST['db_pass'] ?? '');
  $admin_pass = password_hash(trim($_POST['admin_pass'] ?? 'admin123'), PASSWORD_BCRYPT);

  $cfg = "<?php\n$"."DB_HOST='".addslashes($host)."';\n$"."DB_NAME='".addslashes($name)."';\n$"."DB_USER='".addslashes($user)."';\n$"."DB_PASS='".addslashes($pass)."';\n";
  file_put_contents(__DIR__ . '/modules/config.php', $cfg);

  try{
    $pdo = new PDO("mysql:host=$host;dbname=$name;charset=utf8mb4",$user,$pass,[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]);
    $sql = file_get_contents(__DIR__.'/modules/schema.sql');
    $pdo-&gt;exec($sql);
    $stm = $pdo-&gt;prepare("INSERT INTO users(email,password,role) VALUES(?,?,?)");
    $stm-&gt;execute(['admin@dalmia.local', $admin_pass, 'admin']);
    header('Location: /admin/login.php?ok=1'); exit;
  }catch(Exception $e){
    $err = $e-&gt;getMessage();
  }
}
?&gt;<!DOCTYPE html>
<meta charset="utf-8"/><link href="/theme/dc.css" rel="stylesheet"/>
<div class="container">
<h1>DC Admin CMS — Installer</h1>
<?php if(!empty($err)) echo '<div class="card" style="color:#b00">'.$err.'</div>'; ?&gt;
  <form class="card" method="post">
<h3>Database (MySQL)</h3>
<label>Host<input class="input" name="db_host" value="localhost"/></label><br/>
<label>DB Name<input class="input" name="db_name" required=""/></label><br/>
<label>DB User<input class="input" name="db_user" required=""/></label><br/>
<label>DB Pass<input class="input" name="db_pass" required="" type="password"/></label><br/>
<h3>Admin User</h3>
<label>Set Admin Password<input class="input" name="admin_pass" placeholder="Strong password" required="" type="password"/></label><br/>
<button class="btn">Install</button>
</form>
<p class="small">After install: /admin/login.php</p>

