
// Configuration should be loaded from server
const REVIEW_URL = document.querySelector('meta[name="review-url"]')?.getAttribute('content') || "https://www.google.com/maps/search/Dalmia+Computers+Purulia";

function saveUniversal(formEl, source){
  const f = new FormData(formEl);
  const rec = {};
  f.forEach((v,k)=>{ rec[k]=v; });
  rec._source = source||'form';
  rec._ts = new Date().toISOString();

  const mobile = (rec.mobile||'').replace(/\D/g,'');
  if(!mobile){ alert('Mobile number is required'); return false; }

  // Merge into existing
  const KEY = 'dc_universal_db';
  const db = JSON.parse(localStorage.getItem(KEY) || '{}');
  const cur = db[mobile] || {};
  db[mobile] = Object.assign(cur, rec);
  localStorage.setItem(KEY, JSON.stringify(db));

  // prepare WhatsApp share link for customer to update later
  const link = location.origin + '/forms/profile.php?m=' + encodeURIComponent(mobile);
  const msg = `Hi! Update your details for best service & offers. ${link}`;
  const wa = 'https://wa.me/?text=' + encodeURIComponent(msg);
  document.getElementById('shareWA')?.setAttribute('href', wa);
  document.getElementById('profileLink')?.setAttribute('href', link);

  // offer JSON download for staff
  const blob = new Blob([JSON.stringify(db,null,2)], {type:'application/json'});
  const a = document.getElementById('exportDb');
  if(a){ a.href = URL.createObjectURL(blob); a.download='dc_universal_db.json'; }

  return true;
}

function openReview(){
  window.open(REVIEW_URL, '_blank', 'noopener');
}

function prefillFromQuery(formId){
  const p = new URLSearchParams(location.search);
  const mobile = p.get('m');
  if(!mobile) return;
  const db = JSON.parse(localStorage.getItem('dc_universal_db') || '{}');
  const row = db[mobile];
  if(!row) return;
  const form = document.getElementById(formId);
  if(!form) return;
  for(const [k,v] of Object.entries(row)){
    if(form[k]) form[k].value = v;
  }
}
