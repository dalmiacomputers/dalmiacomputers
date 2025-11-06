<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
// NOTE: This is a placeholder. It saves files to /assets/media and updates /data/media.json.
// For social cross-posting, see social_queue.php (requires API keys/tokens).

$root = dirname(__DIR__);
$dir = $root . '/assets/media';
if(!is_dir($dir)) mkdir($dir, 0775, true);
$target = $_POST['target'] ?? 'image';

$uploaded = [];
if(!empty($_FILES['media']['name'][0])){
  for($i=0;$i<count($_FILES['media']['name']);$i++){
    $name = basename($_FILES['media']['name'][$i]);
    $tmp  = $_FILES['media']['tmp_name'][$i];
    $clean = preg_replace('/[^a-zA-Z0-9._-]/','_', $name);
    $dest = $dir . '/' . $clean;
    if(move_uploaded_file($tmp, $dest)){
      $uploaded[] = '/assets/media/' . $clean;
    }
  }
}

// Update JSON
$dataFile = $root . '/data/media.json';
$data = file_exists($dataFile) ? json_decode(file_get_contents($dataFile), true) : ["videos"=>[], "images"=&gt;[]];
foreach($uploaded as $u){
  if($target === 'video' &amp;&amp; preg_match('/\.(mp4|mov|webm)$/i',$u)) $data['videos'][] = $u;
  else $data['images'][] = $u;
}
file_put_contents($dataFile, json_encode($data, JSON_PRETTY_PRINT));

// Queue to social (requires tokens configured in social_queue.php)
require_once __DIR__.'/social_queue.php';
dc_social_queue($uploaded, $target);

header('Location: /pages/media/?ok=1');
