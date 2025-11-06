<?php ?><!DOCTYPE html>

<html lang="en"><head>
<meta charset="utf-8"/><meta content="width=device-width, initial-scale=1" name="viewport"/>
<title>Dalmia Computers — Your Trusted Tech Partner</title>
<meta content="Premium computers, printers, CCTV, networking &amp; Tally/Quick Heal with expert service." name="description"/>
<link href="/theme/dc.css" rel="stylesheet"/>
</head>
<body>
<nav class="top">
<div class="container">
<div class="logo">
<img alt="DC" height="18" src="/admin/assets/img/bolt.svg"/>
<b>Dalmia Computers</b><span class="badge">Your Trusted Tech Partner.</span>
</div>
<div class="small" style="margin-left:auto"><a href="/admin/login.php">Admin</a></div>
</div>
</nav>
<div class="container">
<section class="hero card">
<h1>Expert Tech. Local Care.</h1>
<p class="small">Laptops, Desktops, Printers, CCTV, Projectors, Tablets · Tally Prime &amp; Quick Heal Specialists</p>
<div class="grid cols-3" id="hero-slides"></div>
</section>
<section class="card">
<h2>Partner Brands</h2>
<div class="marquee"><div class="track" id="brand-track"></div></div>
</section>
<section class="card">
<h2>Popular Accessories</h2>
<div class="grid cols-3" id="acc"></div>
</section>
<section class="card">
<h2>Customer Reviews</h2>
<iframe src="/api/reviews.html.php" style="width:100%;min-height:340px;border:0;border-radius:14px"></iframe>
</section>
<section class="card">
<h2>Offers</h2>
<div class="grid cols-3" id="offers"></div>
</section>
</div>
<footer><div class="container small">© 2025 Dalmia Computers · dalmiacomputers@gmail.com · GST 19AEHPD9752K1Z0</div></footer>
<script>
async function j(u){ const r=await fetch(u); return r.ok? r.json():[] }
(async()=>{
  // Hero
  const slides = await j('/api/hero.json.php');
  const hero = document.getElementById('hero-slides');
  hero.innerHTML = slides.map(s => \`
    <article class="card"><h3>\${s.title||''}</h3><p class="small">\${s.subtitle||''}</p>
      \${s.image?'<img src="/uploads/hero/'+s.image+'" alt="" style="width:100%;border-radius:12px;margin-top:8px;border:1px solid #e6eef7">':''}
      \${s.button_text?'<p style="margin-top:8px"><a class="btn" href="'+(s.button_link||'#')+'">'+s.button_text+'</a></p>':''}
    </article>\`).join('');

  // Brands
  const brands = await j('/api/brands.json.php');
  const track = document.getElementById('brand-track');
  track.innerHTML = brands.map(b=>'<img src="'+b.logo+'" alt="'+b.name+'">').join('') + track.innerHTML;

  // Accessories
  const acc = await j('/api/accessories.json.php');
  document.getElementById('acc').innerHTML = acc.map(a=>\`
    <article class="card">
      \${a.image?'<img src="'+a.image+'" alt="" style="width:100%;border-radius:10px;border:1px solid #e6eef7">':''}
      <h3>\${a.title}</h3><p class="small">\${a.description||''}</p>
    </article>\`).join('');

  // Offers
  const offers = await j('/api/offers.json.php');
  document.getElementById('offers').innerHTML = offers.map(o=>\`
    <article class="card">
      \${o.image?'<img src="'+o.image+'" alt="" style="width:100%;border-radius:10px;border:1px solid #e6eef7">':''}
      <h3>\${o.title}</h3><p class="small">\${o.copy||''}</p>
    </article>\`).join('');
})();
</script>
</body></html>
