<head><title>Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><?php
require_once __DIR__ . '/modules/auth.php'; require_login();
require_once __DIR__ . '/modules/db.php';
$cfg = $pdo->query("SELECT `key`,`value` FROM settings")-&gt;fetchAll(PDO::FETCH_KEY_PAIR);
include __DIR__ . '/templates/header.php';
?&gt;
<h1>Dashboard</h1>
<div class="grid cols-3">
<div class="card"><h3>Quick Links</h3>
<p><a class="btn" href="/admin/home.php">Home Manager</a></p>
<p><a class="btn" href="/admin/brands.php">Brands</a></p>
<p><a class="btn" href="/admin/accessories.php">Accessories</a></p>
</div>
<div class="card"><h3>Content</h3>
<p><a class="btn" href="/admin/offers.php">Offers</a></p>
<p><a class="btn" href="/admin/reviews.php">Reviews Embeds</a></p>
<p><a class="btn" href="/admin/settings.php">Settings &amp; NAP</a></p>
</div>
<div class="card"><h3>Status</h3>
<p class="small">GA4: <?php echo !empty($cfg['ga4'])?'Connected':'—'; ?></p>
<p class="small">Hero Slides: <a href="/api/hero.json.php" target="_blank">view JSON</a></p>
<p class="small">Brands: <a href="/api/brands.json.php" target="_blank">view JSON</a></p>
<p class="small">Accessories: <a href="/api/accessories.json.php" target="_blank">view JSON</a></p>
<p class="small">Offers: <a href="/api/offers.json.php" target="_blank">view JSON</a></p>
</div>
</div>
<?php include __DIR__ . '/templates/footer.php'; ?>
