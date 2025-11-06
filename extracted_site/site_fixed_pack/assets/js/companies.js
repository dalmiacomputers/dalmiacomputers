
async function loadCompanies(){
  try{
    const res = await fetch('/assets/data/companies.json', {cache:'no-store'});
    const list = await res.json();
    const sel = document.getElementById('brand');
    sel.innerHTML = '<option value="">Select a company…</option>' + list.map(c=>`<option value="${c.name}">${c.name}</option>`).join('');
    sel.onchange = ()=>{
      const c = list.find(x=>x.name===sel.value);
      if(!c){ document.getElementById('careBox').innerHTML=''; return; }
      document.getElementById('careBox').innerHTML = `
        <div class="card">
          <b>${c.name} — Customer Care</b>
          <p class="small">Phone: ${c.care}</p>
          <a class="btn" href="${c.site}" target="_blank">Open Official Support</a>
        </div>`;
    };
    // quick search
    const q = document.getElementById('brandSearch');
    q.oninput = ()=>{
      const v = q.value.toLowerCase();
      for(const opt of sel.options){
        if(!opt.value) continue;
        opt.hidden = !opt.text.toLowerCase().includes(v);
      }
    }
  }catch(e){
    document.getElementById('careBox').innerHTML='<div class="card">Could not load companies.json</div>';
  }
}
document.addEventListener('DOMContentLoaded', loadCompanies);
