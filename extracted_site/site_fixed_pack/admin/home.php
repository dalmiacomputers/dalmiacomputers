<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__ . '/modules/auth.php'; require_login();
require_once __DIR__ . '/modules/db.php'; require_once __DIR__ . '/modules/uploader.php';
$msg='';
if($_SERVER['REQUEST_METHOD']==='POST'){
  if(isset($_POST['create'])){
    $img = save_image($_FILES['image'] ?? [], 'hero', 1600);
    $stm=$pdo->prepare("INSERT INTO hero_slides(title,subtitle,button_text,button_link,image,enabled,sort_order) VALUES(?,?,?,?,?,1,?)");
    $stm-&gt;execute([trim($_POST['title']),trim($_POST['subtitle']),trim($_POST['button_text']),trim($_POST['button_link']),$img, intval($_POST['sort_order']??0)]);
    $msg='Slide added';
  }
  if(isset($_POST['update'])){
    $id=intval($_POST['id']);
    $img = !empty($_FILES['image']['tmp_name']) ? save_image($_FILES['image'],'hero',1600) : null;
    if($img){
      $stm=$pdo-&gt;prepare("UPDATE hero_slides SET title=?,subtitle=?,button_text=?,button_link=?,image=?,enabled=?,sort_order=? WHERE id=?");
      $stm-&gt;execute([$_POST['title'],$_POST['subtitle'],$_POST['button_text'],$_POST['button_link'],$img,intval($_POST['enabled']),intval($_POST['sort_order']),$id]);
    } else {
      $stm=$pdo-&gt;prepare("UPDATE hero_slides SET title=?,subtitle=?,button_text=?,button_link=?,enabled=?,sort_order=? WHERE id=?");
      $stm-&gt;execute([$_POST['title'],$_POST['subtitle'],$_POST['button_text'],$_POST['button_link'],intval($_POST['enabled']),intval($_POST['sort_order']),$id]);
    }
    $msg='Slide updated';
  }
}
$rows=$pdo-&gt;query("SELECT * FROM hero_slides ORDER BY sort_order ASC, id DESC")-&gt;fetchAll(PDO::FETCH_ASSOC);
include __DIR__ . '/templates/header.php';
?&gt;
<h1>Home Manager — Hero Slides</h1>
<?php if($msg) echo '<div class="badge">'.$msg.''; ?&gt;
<div class="grid cols-2">
<form class="card" enctype="multipart/form-data" method="post">
<h3>Add Slide</h3>
<label>Title<input class="input" name="title" placeholder="Laptops for creators"/></label><br/>
<label>Subtitle<input class="input" name="subtitle" placeholder="SSD, RAM, thermals tuned for speed"/></label><br/>
<div class="grid cols-2">
<label>Button Text<input class="input" name="button_text" value="Enquire Now"/></label>
<label>Button Link<input class="input" name="button_link" value="#contact"/></label>
</div><br/>
<label>Sort Order<input class="input" name="sort_order" type="number" value="0"/></label><br/>
<label>Image (auto-resize)<input accept="image/*" class="input" name="image" type="file"/></label><br/>
<button class="btn" name="create" value="1">Add Slide</button>
</form>
<div class="card">
<h3>Existing Slides</h3>
<table class="table">
<tr><th>ID</th><th>Title</th><th>Enabled</th><th>Action</th></tr>
<?php foreach($rows as $r): ?>
<tr>
<td><?php echo $r['id']; ?></td>
<td><?php echo htmlspecialchars($r['title']); ?></td>
<td><?php echo $r['enabled']?'Yes':'No'; ?></td>
<td>
<form class="small" enctype="multipart/form-data" method="post">
<input name="id" type="hidden" value="&lt;?php echo $r['id']; ?&gt;"/>
<input class="input" name="title" value="&lt;?php echo htmlspecialchars($r['title']); ?&gt;"/>
<input class="input" name="subtitle" value="&lt;?php echo htmlspecialchars($r['subtitle']); ?&gt;"/>
<input class="input" name="button_text" value="&lt;?php echo htmlspecialchars($r['button_text']); ?&gt;"/>
<input class="input" name="button_link" value="&lt;?php echo htmlspecialchars($r['button_link']); ?&gt;"/>
<input class="input" name="sort_order" type="number" value="&lt;?php echo intval($r['sort_order']); ?&gt;"/>
<label>Replace image<input accept="image/*" class="input" name="image" type="file"/></label>
<select class="input" name="enabled"><option 'selected';="" <?php="" ?="" echo="" if($r['enabled'])="" value="1">&gt;Enabled</option><option 'selected';="" <?php="" ?="" echo="" if(!$r['enabled'])="" value="0">&gt;Disabled</option></select>
<button class="btn" name="update" value="1">Save</button>
</form>
</td>
</tr>
<?php endforeach; ?>
</table>
</div>
</div>
<?php include __DIR__ . '/templates/footer.php'; ?>
