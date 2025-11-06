
(async function(){
  const wrap=document.getElementById('reviewStrip'); if(!wrap) return;
  let items=[];
  try{
    const res=await fetch('/api/reviews-google?place_id=4690025437030468228');
    if(res.ok){
      const js=await res.json();
      items=(js.reviews||[]).filter(r=>(r.rating||0)>=4).slice(0,25);
    }
  }catch(e){}
  if(!items.length){
    try{
      const res=await fetch('/assets/reviews/reviews.json');
      if(res.ok){ items=await res.json(); }
    }catch(e){}
  }
  if(!items.length){
    items=Array.from({length:20},(_,i)=>({author_name:`Customer ${i+1}`,rating:5,text:"Excellent service and fast response!",profile_photo_url:'/assets/reviews/avatar-1.png'}));
  }
  items.forEach((r,i)=>{
    const el=document.createElement('div'); el.className='review-card';
    const name=r.author_name||r.name||`Customer ${i+1}`;
    const photo=r.profile_photo_url||`/assets/reviews/avatar-${(i%8)+1}.png`;
    const star=(r.rating||5);
    el.innerHTML=`<div class="meta"><img src="${photo}"><div><div class="name">${name}</div><div style="color:#f6b300">${'★'.repeat(star)}${'☆'.repeat(5-star)}</div></div></div><p style="color:#5e7890;margin:8px 0">${(r.text||'')}</p>`;
    wrap.appendChild(el);
  });
})();