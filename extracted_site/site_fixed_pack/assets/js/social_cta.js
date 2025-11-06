
// subtle pulse CTA on first visit
(function(){
  if(localStorage.getItem('dcSocialCTA')) return;
  const el = document.querySelector('.social');
  if(!el) return;
  el.style.animation="pulse 2s infinite";
  localStorage.setItem('dcSocialCTA','1');
})();