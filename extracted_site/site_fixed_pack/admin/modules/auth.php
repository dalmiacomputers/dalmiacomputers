<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head>&lt;?php
session_start();
function require_login(){
  if(empty($_SESSION['uid'])){ header('Location: /admin/login.php'); exit; }
}
