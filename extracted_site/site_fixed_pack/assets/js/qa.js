
const LANGS = [
 'en','hi','bn','as','pa','gu','mr','kn','ta','te','ml','or','ur','sa',
 'kok','mni','ne','brx','doi','sat','ks','mai','sd',
 'ar','fr','de','es','zh','ja','ko'
];
let DB = {}; let curLang='en';
async function loadLang(l){ 
  curLang=l; 
  const res = await fetch(`/data/qa_${l}.json`).catch(()=>null);
  let data = res && res.ok ? await res.json() : (await (await fetch('/data/qa_en.json')).json());
  DB = data; renderList(); injectSchema();
}
function renderList(){
  const box = document.getElementById('list'); box.innerHTML='';
  (DB.items||[]).forEach((it,i)=>{
    const w = document.createElement('div');
    w.className='card';
    const q = document.createElement('div'); q.className='q'; q.textContent = 'Q'+(i+1)+'. '+it.q;
    const ans = document.createElement('div'); ans.className='a'; ans.style.display='none';
    ans.innerHTML = it.a.map((x,idx)=>`<div class="card"><b>Answer ${idx+1}:</b> ${x}</div>`).join('');
    const vote = document.createElement('div'); vote.className='vote';
    vote.innerHTML = `<button onclick="vote(${i},1)">👍 Helpful</button><button onclick="vote(${i},0)">👎 Not helpful</button>`;
    ans.appendChild(vote);
    q.addEventListener('click',()=>{ ans.style.display = ans.style.display==='none'?'block':'none'; });
    w.appendChild(q); w.appendChild(ans); box.appendChild(w);
  });
}
function vote(i,good){ try{ localStorage.setItem('qa_vote_'+curLang+'_'+i, good?'1':'0'); }catch(e){} alert('Thanks for your feedback!'); }
function injectSchema(){
  const old = document.getElementById('faqSchema'); if(old) old.remove();
  const node = document.createElement('script'); node.type='application/ld+json'; node.id='faqSchema';
  const main = (DB.items||[]).slice(0,30).map(it=>({ "@type":"Question", "name": it.q, "acceptedAnswer": { "@type":"Answer","text": it.a[0] || '' } }));
  node.textContent = JSON.stringify({ "@context":"https://schema.org","@type":"FAQPage","mainEntity": main });
  document.head.appendChild(node);
}
window.addEventListener('DOMContentLoaded', ()=> loadLang('en'));
