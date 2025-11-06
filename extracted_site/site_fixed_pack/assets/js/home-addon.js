
(function(){
  const btn = document.querySelector('.bubble');
  let panel = document.getElementById('dcSana');
  if(!panel){
    panel = document.createElement('div');
    panel.id='dcSana'; panel.className='chat-panel';
    panel.innerHTML = `<header><b>DC‑SANA Assistant</b><button id="dcClose" class="btn">Close</button></header>
      <div id="chatLog" class="chat-log"><div class="msg">Hi! Ask about products, services or support. If I miss, I will handoff to WhatsApp.</div></div>
      <form id="chatForm"><input id="chatText" placeholder="Type your question..." /><button class="btn primary" type="submit">Send</button></form>`;
    document.body.appendChild(panel);
  }
  function openP(){ panel.style.display='flex'; }
  function closeP(){ panel.style.display='none'; }
  btn?.addEventListener('click', openP);
  panel.querySelector('#dcClose')?.addEventListener('click', closeP);
  panel.querySelector('#chatForm')?.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const t = panel.querySelector('#chatText'); const v = (t.value||'').trim(); if(!v) return;
    t.value=''; add(v,true);
    try{
      const r = await fetch('/api/chat', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({message:v})});
      const d = await r.json();
      add(d.reply || 'Our team will follow up on WhatsApp if needed.', false);
    }catch(e){ add('WhatsApp handoff: Sales 8145290001 · Service 9832767313 · TDL 9734290001', false); }
  });
  function add(text, me){ const n=document.createElement('div'); n.className='msg'+(me?' me':''); n.textContent=text; panel.querySelector('#chatLog').appendChild(n); panel.querySelector('#chatLog').scrollTop=999999; }
})();
