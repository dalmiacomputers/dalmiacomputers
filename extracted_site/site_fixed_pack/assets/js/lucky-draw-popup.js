
(function(){
  const el = document.createElement('div');
  el.innerHTML = `<div id="ldPop" style="position:fixed;inset:0;background:rgba(0,0,0,.5);display:none;align-items:center;justify-content:center;z-index:120">
    <div style="background:#fff;border-radius:16px;max-width:640px;width:92%;padding:18px;border:1px solid rgba(11,31,51,.08)">
      <h3 style="margin:0 0 8px">Monthly Lucky Draw</h3>
      <p style="margin:0 0 10px;color:#5e7890">Fill details to participate. Referral increases chances.</p>
      <form id="ldForm" style="display:grid;gap:8px">
        <input required placeholder="Full Name" style="padding:10px;border-radius:10px;border:1px solid #d8e2f0">
        <input required placeholder="Phone" style="padding:10px;border-radius:10px;border:1px solid #d8e2f0">
        <input placeholder="Referral Code (optional)" style="padding:10px;border-radius:10px;border:1px solid #d8e2f0">
        <div style="display:flex;gap:8px;justify-content:flex-end">
          <button type="button" id="ldClose" style="padding:10px 12px;border-radius:10px;border:1px solid #d8e2f0;background:#fff">Close</button>
          <button class="btn" style="padding:10px 12px;border:none;border-radius:10px;background:#0b1f33;color:#fff">Submit</button>
        </div>
      </form>
    </div></div>`;
  document.body.appendChild(el);
  const pop = document.getElementById('ldPop');
  document.querySelectorAll('a[href="/lucky-draw/"]').forEach(a => a.addEventListener('click', (e)=>{ e.preventDefault(); pop.style.display='flex'; }));
  document.getElementById('ldClose').addEventListener('click', ()=> pop.style.display='none');
  document.getElementById('ldForm').addEventListener('submit', (e)=>{ e.preventDefault(); alert("Entry received! Token PDF will be enabled in the next pass."); pop.style.display='none'; });
})();
