<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__ . '/modules/auth.php'; require_login();
require_once __DIR__ . '/modules/db.php'; require_once __DIR__ . '/modules/uploader.php';
$msg='';
if($_SERVER['REQUEST_METHOD']==='POST'){
  if(isset($_POST['create'])){
    $img = save_image($_FILES['image'] ?? [], 'media', 1200);
    $stm=$pdo->prepare("INSERT INTO offers(title,copy,image,valid_from,valid_to,enabled) VALUES(?,?,?,?,?,1)");
    $stm-&gt;execute([trim($_POST['title']),trim($_POST['copy']),$img,$_POST['valid_from']?:null,$_POST['valid_to']?:null]);
    $msg='Offer added';
  }
  if(isset($_POST['update'])){
    $id=intval($_POST['id']);
    $img = !empty($_FILES['image']['tmp_name']) ? save_image($_FILES['image'],'media',1200) : null;
    if($img){
      $stm=$pdo-&gt;prepare("UPDATE offers SET title=?,copy=?,image=?,valid_from=?,valid_to=?,enabled=? WHERE id=?");
      $stm-&gt;execute([$_POST['title'],$_POST['copy'],$img,$_POST['valid_from']?:null,$_POST['valid_to']?:null,intval($_POST['enabled']),$id]);
    } else {
      $stm=$pdo-&gt;prepare("UPDATE offers SET title=?,copy=?,valid_from=?,valid_to=?,enabled=? WHERE id=?");
      $stm-&gt;execute([$_POST['title'],$_POST['copy'],$_POST['valid_from']?:null,$_POST['valid_to']?:null,intval($_POST['enabled']),$id]);
    }
    $msg='Offer updated';
  }
}
$rows=$pdo-&gt;query("SELECT * FROM offers ORDER BY id DESC")-&gt;fetchAll(PDO::FETCH_ASSOC);
include __DIR__ . '/templates/header.php';
?&gt;
<h1>Offers</h1>
<?php if($msg) echo '<div class="badge">'.$msg.''; ?&gt;
<div class="grid cols-2">
<form class="card" enctype="multipart/form-data" method="post">
<h3>Add Offer</h3>
<label>Title<input class="input" name="title" required=""/></label><br/>
<label>Copy<textarea class="input" name="copy"></textarea></label><br/>
<div class="grid cols-2">
<label>Valid From<input class="input" name="valid_from" type="date"/></label>
<label>Valid To<input class="input" name="valid_to" type="date"/></label>
</div><br/>
<label>Image (auto-resize)<input accept="image/*" class="input" name="image" type="file"/></label><br/>
<button class="btn" name="create" value="1">Add</button>
</form>
<div class="card">
<h3>Existing</h3>
<table class="table">
<tr><th>ID</th><th>Title</th><th>Valid</th><th>Action</th></tr>
<?php foreach($rows as $r): ?>
<tr>
<td><?php echo $r['id']; ?></td>
<td><?php echo htmlspecialchars($r['title']); ?></td>
<td class="small"><?php echo htmlspecialchars($r['valid_from'].' → '.$r['valid_to']); ?></td>
<td>
<form class="small" enctype="multipart/form-data" method="post">
<input name="id" type="hidden" value="&lt;?php echo $r['id']; ?&gt;"/>
<input class="input" name="title" value="&lt;?php echo htmlspecialchars($r['title']); ?&gt;"/>
<textarea class="input" name="copy"><?php echo htmlspecialchars($r['copy']); ?></textarea>
<div class="grid cols-2">
<input class="input" name="valid_from" type="date" value="&lt;?php echo htmlspecialchars($r['valid_from']); ?&gt;"/>
<input class="input" name="valid_to" type="date" value="&lt;?php echo htmlspecialchars($r['valid_to']); ?&gt;"/>
</div>
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
