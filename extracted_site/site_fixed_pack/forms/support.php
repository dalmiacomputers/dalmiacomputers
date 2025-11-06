<!DOCTYPE html>
<html lang="en"><head>
<meta charset="utf-8"/><meta content="width=device-width, initial-scale=1" name="viewport"/>
<title>Customer Care — Dalmia Computers</title>
<link href="/assets/css/base.css" rel="stylesheet"/>
<meta content="Dalmia Computers — Your Trusted Tech Partner in Purulia." name="description"/>
<meta name="csrf-token" content="<?php echo bin2hex(random_bytes(32)); ?>"/></head><body>
<main class="container">
<h1 class="h1">Customer Care — Service Profile</h1>
<p class="sub">Your details are stored centrally (mobile-number based). Upload invoice, get reminders, and faster support. </p>
<section class="card">
<form class="form" id="ccForm" onsubmit="event.preventDefault(); saveUniversalAPI(this,'support').then(()=>alert('Saved!'))">
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
<div class="grid grid-2">
<div>
<label class="small">Invoice Upload (PDF/JPG/PNG)</label>
<input accept=".pdf,.jpg,.jpeg,.png" name="invoice" type="file"/>
</div>
<div>
<label class="small">Issue / Notes (if any)</label>
<textarea name="notes" placeholder="Describe problem, if any" rows="3"></textarea>
</div>
</div>
<label class="small"><input required="" type="checkbox"/> I accept the terms and privacy policy.</label>
<div style="display:flex;gap:10px;flex-wrap:wrap;margin-top:8px">
<button class="btn" type="submit">Save Profile</button>
<a class="btn-ghost" id="profileLink" target="_blank">Open My Update Link</a>
<a class="btn-blue" id="shareWA" target="_blank">Share via WhatsApp</a>
<a class="btn" onclick="openReview()">Quick Google Review ⭐</a>
</div>
</form>
</section>
</main>
<script src="/assets/js/universal-client.js"></script>
</body></html>
