<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/><meta content="width=device-width, initial-scale=1" name="viewport"/>
<title>Update Profile — Dalmia Computers</title>
<link href="/assets/css/base.css" rel="stylesheet"/>
<meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/>
<meta name="csrf-token" content="<?php echo bin2hex(random_bytes(32)); ?>"/></head><body>
<main class="container">
<h1 class="h1">Update Your Dalmia Profile</h1>
<p class="sub">Keep details up to date for faster support, reminders and best offers.</p>
<section class="card">
<form class="form" id="profileForm" onsubmit="event.preventDefault(); saveUniversalAPI(this,'profile').then(()=>alert('Updated!'))">
<div class="grid grid-3">
<div><label class="small">Full Name</label><input name="name" required=""/></div>
<div><label class="small">Mobile (primary)</label><input name="mobile" required=""/></div>
<div><label class="small">Email</label><input name="email" type="email"/></div>
</div>
<div><label class="small">Address</label><textarea name="address" placeholder="Street, area, landmark" rows="2"></textarea></div>
<div class="grid grid-3">
<div><label class="small">Product Type</label>
<select name="ptype">
<option>Laptop</option><option>Desktop</option><option>Printer</option><option>CCTV</option><option>Projector</option><option>Tablet</option><option>Software</option>
</select>
</div>
<div><label class="small">Brand</label><input name="brand" placeholder="HP / Dell / ASUS …"/></div>
<div><label class="small">Model / Serial</label><input name="serial"/></div>
</div>
<div class="grid grid-3">
<div><label class="small">Purchase Date</label><input name="pdate" type="date"/></div>
<div><label class="small">Warranty End</label><input name="wend" type="date"/></div>
<div><label class="small">Preferred Channel</label>
<select name="pref">
<option>WhatsApp</option><option>SMS</option><option>Email</option>
</select>
</div>
</div>
<label class="small"><input required="" type="checkbox"/> I accept the terms and privacy policy.</label>
<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">
<button class="btn" type="submit">Save</button>
<a class="btn-blue" onclick="openReview()">Quick Google Review ⭐</a>
</div>
</form>
</section>
</main>
<script src="/assets/js/universal-client.js"></script>
<script>prefillFromAPI('profileForm');</script>
</body></html>
