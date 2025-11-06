
// Placeholder mounts
window.addEventListener('DOMContentLoaded', () => {
  // WhatsApp community CTA
  const w = document.querySelector('[data-wa-community]');
  if (w) {
    w.addEventListener('click', () => {
      window.open('https://whatsapp.com/channel/0029Va4P2HNJuyA3g8qVrE0D', '_blank', 'noopener');
    });
  }
  // Fake visitor counter increment
  const vc = document.querySelector('[data-visit-counter]');
  if(vc){
    const base = 18420;
    const day = Math.floor(Date.now()/86400000);
    vc.textContent = base + (day*47);
  }
});
