<?php
require_once __DIR__ . '/config.php';
function db(){
  static $pdo=null; if($pdo) return $pdo;
  $dsn = 'mysql:host='.DB_HOST.';dbname='.DB_NAME.';charset='.DB_CHARSET;
  $opt = [PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC];
  $pdo = new PDO($dsn, DB_USER, DB_PASS, $opt); return $pdo;
}
function cors(){
  $origins = array_map('trim', explode(',', ALLOWED_ORIGINS));
  $origin = isset($_SERVER['HTTP_ORIGIN'])?$_SERVER['HTTP_ORIGIN']:'*';
  if($origin!=='*' && in_array($origin,$origins)) header('Access-Control-Allow-Origin: '.$origin);
  else if($origin==='*') header('Access-Control-Allow-Origin: *');
  header('Access-Control-Allow-Methods: GET,POST,OPTIONS');
  header('Access-Control-Allow-Headers: Content-Type, Authorization');
  if($_SERVER['REQUEST_METHOD']==='OPTIONS'){ http_response_code(204); exit; }
}
function out($d,$c=200){ http_response_code($c); header('Content-Type: application/json'); echo json_encode($d,JSON_UNESCAPED_UNICODE|JSON_UNESCAPED_SLASHES); exit; }
function req($k,$src=null){ $src=$src?:($_POST?:json_decode(file_get_contents('php://input'),true)); return isset($src[$k])?$src[$k]:null; }
function must($arr,$keys){ foreach($keys as $k){ if(!isset($arr[$k])||$arr[$k]==='') return false; } return true; }
