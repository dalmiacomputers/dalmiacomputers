
(async function(){
  const host = document.getElementById('revRow'); if(!host) return;
  try{
    const res = await fetch('/assets/reviews/reviews.json');
    const items = await res.json();
    items.slice(0,30).forEach(r=>{
      const d=document.createElement('div'); d.className='card rev';
      d.innerHTML = `<div style='display:flex;align-items:center;gap:10px'>
        <img src='${r.avatar}' style='height:36px;width:36px;border-radius:50%;border:1px solid var(--line)'>
        <div><b>${r.name}</b><div class='small'>${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div></div>
      </div><p class='small' style='margin-top:8px'>${r.text}</p>`;
      host.appendChild(d);
    });
  }catch(e){ host.innerHTML = "<div class='small'>Reviews will appear here.</div>"; }
})();
