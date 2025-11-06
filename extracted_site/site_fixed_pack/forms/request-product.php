<!DOCTYPE html>
<html><head>
<meta charset="utf-8"/><meta content="width=device-width, initial-scale=1" name="viewport"/>
<link href="/assets/css/base.css" rel="stylesheet"/><title>Request a Product — Dalmia Computers</title><meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/></head><body>
<main class="container">
<h1 class="h1">Request a Product</h1>
<p class="sub">Tell us what you need. When it's added to our portfolio, we'll notify you instantly.</p>
<section class="card">
<form class="form" onsubmit="event.preventDefault(); submitReq(this)">
<div class="grid grid-3">
<div><label class="small">Full Name</label><input name="name" required=""/></div>
<div><label class="small">Mobile</label><input name="mobile" required=""/></div>
<div><label class="small">Email</label><input name="email" type="email"/></div>
</div>
<div class="grid grid-2">
<div><label class="small">Product Title</label><input name="title" placeholder="e.g., MacBook Air M3 16GB/512GB"/></div>
<div><label class="small">Category</label><select name="category"><option>Laptop</option><option>Desktop</option><option>Printer</option><option>CCTV</option><option>Projector</option><option>Tablet</option><option>Software</option><option>Accessory</option></select></div>
</div>
<label class="small">Notes</label><textarea name="notes" placeholder="Anything specific you want?" rows="3"></textarea>
<label class="small"><input required="" type="checkbox"/> I accept terms; updates will be sent by WhatsApp/SMS/Email.</label>
<div style="display:flex;gap:10px;flex-wrap:wrap">
<button class="btn" type="submit">Submit Request</button>
<button class="btn-gold" onclick="openReview()" type="button">Quick Google Review ⭐</button>
</div>
</form>
</section>
</main>
<script src="/assets/js/universal-client.js"></script>
<script>
async function submitReq(f){
  const d = Object.fromEntries(new FormData(f).entries());
  if(!d.mobile){ alert('Mobile required'); return; }
  await apiPost('/save_request.php', d);
  await apiPost('/universal-leads.php', d); // also enrich profile
  alert('Request received! We will notify you on availability.');
}
</script>
</body></html>
