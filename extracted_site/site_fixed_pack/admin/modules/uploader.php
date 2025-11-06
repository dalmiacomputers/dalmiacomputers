<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
// usage: include in modules that need uploads
function save_image($file, $dir, $maxW=1440){
  if(empty($file['tmp_name'])) return null;
  $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
  if(!in_array($ext,['jpg','jpeg','png','webp'])) $ext = 'jpg';
  $name = uniqid().'.'.$ext;
  $dest = __DIR__.'/../../uploads/'.$dir.'/'.$name;

  // load image
  $src = $file['tmp_name'];
  $img = @imagecreatefromstring(file_get_contents($src));
  if(!$img){ return null; }
  $w = imagesx($img); $h=imagesy($img);
  if($w > $maxW){
    $nw = $maxW; $nh = intval($h * ($maxW / $w));
    $dst = imagecreatetruecolor($nw,$nh);
    imagecopyresampled($dst,$img,0,0,0,0,$nw,$nh,$w,$h);
    $img = $dst; $w=$nw; $h=$nh;
  }
  imagejpeg($img, $dest, 82);
  return $name;
}
