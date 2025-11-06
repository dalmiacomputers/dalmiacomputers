<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__.'/db.php'; cors();
$mobile = isset($_POST['mobile'])?$_POST['mobile']:'';
if($mobile==='') out(['ok'=>false,'error'=&gt;'MOBILE_REQUIRED'],400);
$role = $_POST['role']??''; $name=$_POST['name']??''; $email=$_POST['email']??''; $exp=$_POST['experience']??''; $why=$_POST['whyjoin']??'';
$path = null;
if(isset($_FILES['resume']) &amp;&amp; is_uploaded_file($_FILES['resume']['tmp_name'])){
  $ym = date('Y/m'); $dir = __DIR__.'/../uploads/'.$ym; if(!is_dir($dir)) mkdir($dir,0775,true);
  $ext = pathinfo($_FILES['resume']['name'], PATHINFO_EXTENSION);
  $fname='cv_'+$mobile+'_'.bin2hex(random_bytes(5)).'.'.strtolower($ext);
}
$pdo = db();
if(isset($_FILES['resume']['tmp_name']) &amp;&amp; is_uploaded_file($_FILES['resume']['tmp_name'])){
  $ext = pathinfo($_FILES['resume']['name'], PATHINFO_EXTENSION);
  $ym = date('Y/m'); $dir = __DIR__.'/../uploads/'.$ym; if(!is_dir($dir)) mkdir($dir,0775,true);
  $fname='cv_'.$mobile.'_'.bin2hex(random_bytes(5)).'.'.strtolower($ext);
  $dest=$dir.'/'.$fname; move_uploaded_file($_FILES['resume']['tmp_name'],$dest);
  $path='/uploads/'.$ym.'/'.$fname;
}
$stmt = $pdo-&gt;prepare("INSERT INTO dc_careers (mobile,name,email,role,experience,whyjoin,resume_path) VALUES (?,?,?,?,?,?,?)");
$stmt-&gt;execute([$mobile,$name,$email,$role,$exp,$why,$path]);
out(['ok'=&gt;true,'resume'=&gt;$path]);
