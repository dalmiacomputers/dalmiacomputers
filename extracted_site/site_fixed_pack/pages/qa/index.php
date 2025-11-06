<!DOCTYPE html>
<html><head>
<meta charset="utf-8"/><meta content="width=device-width, initial-scale=1" name="viewport"/>
<link href="/assets/css/base.css" rel="stylesheet"/><title>Questions &amp; Answers — Dalmia Computers</title>
<meta content="Expert answers about laptops, printers, CCTV, networking, Tally &amp; Quick Heal. Read in your language." name="description"/>
</head><body>
<main class="container">
<h1 class="h1">Questions &amp; Answers</h1>
<p class="sub">Ask in English / বাংলা / हिन्दी. We answer in the same language. Use the dropdown to read in your preferred language.</p>
<section class="card">
<div class="grid grid-3">
<div><label class="small">Choose language</label>
<select id="lang"><option value="en">English</option><option value="bn">বাংলা</option><option value="hi">हिन्दी</option></select></div>
<div><label class="small">Your Question</label><input id="qtext" placeholder="Type your question"/></div>
<div><label class="small"> </label><button class="btn" onclick="ask()">Ask</button></div>
</div>
<p class="small">Note: General tech/business questions only; we avoid sensitive or unrelated topics.</p>
</section>
<section class="card" id="answers"><b>Recent Answers</b><div id="list"></div></section>
</main>
<script src="/assets/js/universal-client.js"></script>
<script>
async function load(lang){ const r=await fetch('/api/list_qa.php?lang='+lang); const j=await r.json(); const box=document.getElementById('list'); box.innerHTML=''; (j.items||[]).forEach(it=>{ const d=document.createElement('div'); d.className='card'; d.innerHTML='<b>Q:</b> '+it.question+'<br><div class="small"><b>A:</b> '+it.answer+'</div>'; box.appendChild(d); }); }
async function ask(){ const lang=document.getElementById('lang').value; const q=document.getElementById('qtext').value.trim(); if(!q) return;
  // Placeholder: simple rule-based answer (to avoid external API). You can later replace with server-side LLM.
  let a='Thanks for asking. We will get back shortly.';
  if(/tally|voucher|gst|tdl/i.test(q)) a = (lang==='bn')?'ট্যালি সম্পর্কিত আপনার প্রশ্নটি নোট করা হয়েছে— আমরা শীঘ্রই উত্তর দেব।': (lang==='hi')?'टैली से जुड़ा आपका प्रश्न दर्ज हो गया है — हम शीघ्र उत्तर देंगे।':'We noted your Tally question — our team will reply shortly.';
  if(/quick\s*heal|antivirus|virus|malware/i.test(q)) a = (lang==='bn')?'কুইক হিল/অ্যান্টিভাইরাস সম্পর্কে— নিরাপদ থাকার টিপস ও সেরা লাইসেন্সিং আমরা শেয়ার করব।': (lang==='hi')?'क्विक हील/एंटीवायरस— सुरक्षा टिप्स और सही लाइसेंसिंग हम साझा करेंगे।':'Quick Heal/antivirus — we’ll share safety tips and best licensing.';
  await fetch('/api/save_qa.php',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,answer:a,lang})});
  document.getElementById('qtext').value=''; load(lang);
}
document.getElementById('lang').addEventListener('change', e=>load(e.target.value));
load('en');
</script>
</body></html>
