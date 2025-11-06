<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__ . '/modules/auth.php'; require_login();
require_once __DIR__ . '/modules/db.php'; require_once __DIR__ . '/modules/uploader.php';
$msg='';
if($_SERVER['REQUEST_METHOD']==='POST'){
  if(isset($_POST['create'])){
    $logo = save_image($_FILES['logo'] ?? [], 'brands', 600);
    $stm=$pdo->prepare("INSERT INTO brands(name,logo,enabled,sort_order) VALUES(?,?,1,?)");
    $stm-&gt;execute([trim($_POST['name']), $logo, intval($_POST['sort_order']??0)]);
    $msg='Brand added';
  }
  if(isset($_POST['update'])){
    $id=intval($_POST['id']);
    $logo = !empty($_FILES['logo']['tmp_name']) ? save_image($_FILES['logo'],'brands',600) : null;
    if($logo){
      $stm=$pdo-&gt;prepare("UPDATE brands SET name=?,logo=?,enabled=?,sort_order=? WHERE id=?");
      $stm-&gt;execute([$_POST['name'],$logo,intval($_POST['enabled']),intval($_POST['sort_order']),$id]);
    } else {
      $stm=$pdo-&gt;prepare("UPDATE brands SET name=?,enabled=?,sort_order=? WHERE id=?");
      $stm-&gt;execute([$_POST['name'],intval($_POST['enabled']),intval($_POST['sort_order']),$id]);
    }
    $msg='Brand updated';
  }
}
$rows=$pdo-&gt;query("SELECT * FROM brands ORDER BY sort_order ASC, name ASC")-&gt;fetchAll(PDO::FETCH_ASSOC);
include __DIR__ . '/templates/header.php';
?&gt;
<h1>Brands</h1>
<?php if($msg) echo '<div class="badge">'.$msg.''; ?&gt;
<div class="grid cols-2">
<form class="card" enctype="multipart/form-data" method="post">
<h3>Add Brand</h3>
<label>Name<input class="input" name="name" required=""/></label><br/>
<label>Sort Order<input class="input" name="sort_order" type="number" value="0"/></label><br/>
<label>Logo (auto-resize)<input accept="image/*" class="input" name="logo" type="file"/></label><br/>
<button class="btn" name="create" value="1">Add</button>
</form>
<div class="card">
<h3>Existing</h3>
<table class="table">
<tr><th>ID</th><th>Name</th><th>Logo</th><th>Action</th></tr>
<?php foreach($rows as $r): ?>
<tr>
<td><?php echo $r['id']; ?></td>
<td><?php echo htmlspecialchars($r['name']); ?></td>
<td><?php echo htmlspecialchars($r['logo']); ?></td>
<td>
<form class="small" enctype="multipart/form-data" method="post">
<input name="id" type="hidden" value="&lt;?php echo $r['id']; ?&gt;"/>
<input class="input" name="name" value="&lt;?php echo htmlspecialchars($r['name']); ?&gt;"/>
<input class="input" name="sort_order" type="number" value="&lt;?php echo intval($r['sort_order']); ?&gt;"/>
<label>Replace logo<input accept="image/*" class="input" name="logo" type="file"/></label>
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
