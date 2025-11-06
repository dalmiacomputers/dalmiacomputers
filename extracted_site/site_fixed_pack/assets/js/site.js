
window.DC_SITE = window.DC_SITE || {};
function openChannel(){
  alert('Tap OK to join our WhatsApp channel for future offers & updates.');
  window.open('https://whatsapp.com/channel/0029Va4P2HNJuyA3g8qVrE0D','_blank','noopener');
}
function initHero(){
  // Simple auto swap for 6 tiles backgrounds (replace URLs as you add images)
  const tiles = document.querySelectorAll('.tile');
  const imgs = [
    '/assets/hero/laptop.jpg','/assets/hero/desktop.jpg','/assets/hero/printer.jpg',
    '/assets/hero/cctv.jpg','/assets/hero/projector.jpg','/assets/hero/tablet.jpg'
  ];
  tiles.forEach((t,i)=>{ t.style.background=`center/cover no-repeat url('${imgs[i]||imgs[0]}')`; });
}
function initReviews(){
  const row=document.getElementById('reviewRow');
  if(!row) return;
  const REV=[
    {name:'S. Mukherjee',stars:5,text:'SSD upgrade + cleanup. Feels brand new!',avatar:'/assets/rev/1.jpg'},
    {name:'Anita Koley',stars:5,text:'Genuine printers, fair price. Same‑day install.',avatar:'/assets/rev/2.jpg'},
    {name:'Rahul Verma',stars:4,text:'Neat CCTV install. Remote view is solid.',avatar:'/assets/rev/3.jpg'},
    {name:'Md. Arif',stars:5,text:'Tally TDL saved hours every week.',avatar:'/assets/rev/4.jpg'},
    {name:'Priya S',stars:5,text:'Excellent behavior and fast service.',avatar:'/assets/rev/5.jpg'}
  ];
  REV.forEach(r=>{
    const d=document.createElement('div');
    d.className='review';
    d.innerHTML = `<div style="display:flex;align-items:center"><img class="avatar" src="${r.avatar}" alt="${r.name}"><div><b>${r.name}</b></div></div>
    <div class="meta"><span>${'★'.repeat(r.stars)}${'☆'.repeat(5-r.stars)}</span></div>
    <p>${r.text}</p>`;
    row.appendChild(d);
  });
  let x=0; function tick(){ x-=0.3; row.style.transform=`translateX(${x}px)`; requestAnimationFrame(tick);} tick();
}
document.addEventListener('DOMContentLoaded',()=>{ initHero(); initReviews(); });
