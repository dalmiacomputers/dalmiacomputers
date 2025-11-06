
export function mountSana(){
  const w=document.createElement('div'); w.className='float-sana';
  w.innerHTML = `<div class="bubble">Hi! I’m DC-SANA. If I can’t answer, I’ll move you to WhatsApp.</div>
                 <img src="/assets/img/ambassador.png" alt="DC-SANA" title="Chat on WhatsApp">`;
  document.body.appendChild(w);
  w.querySelector('img').addEventListener('click', ()=>{
    window.open('https://wa.me/919734290001','_blank','noopener');
  });
}
document.addEventListener('DOMContentLoaded', mountSana);
