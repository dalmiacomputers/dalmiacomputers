
(function(){
  const box = document.querySelector('.hero .slides'); if(!box) return;
  const slides = [...box.querySelectorAll('.slide')];
  const dots  = [...document.querySelectorAll('.ctrl button')];
  let i = 0, t=null;
  function show(n){
    i = (n+slides.length)%slides.length;
    slides.forEach((s,k)=> s.classList.toggle('active', k===i));
    dots.forEach((d,k)=> d.classList.toggle('active', k===i));
  }
  function next(){ show(i+1); }
  t = setInterval(next, 5000);
  dots.forEach((d,k)=> d.addEventListener('click', ()=>{show(k); clearInterval(t); t=setInterval(next,5000);}));
  show(0);
})();
