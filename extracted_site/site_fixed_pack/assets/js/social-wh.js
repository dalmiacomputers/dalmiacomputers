
(function(){
  const cfg = {
    whatsappChannel: "https://whatsapp.com/channel/0029Va4P2HNJuyA3g8qVrE0D",
    facebook: "https://www.facebook.com/dalmiashowroom/",
    instagram: "https://www.instagram.com/dalmiacomputers/",
    youtube: "https://www.youtube.com/@dalmiacomputers",      // update if needed
    x: "https://twitter.com/",                                // optional
    linkedin: "https://www.linkedin.com/",                    // optional
    gbp: "https://www.google.com/maps?cid=4690025437030468228"
  };

  function openCTA(title, desc, url){
    const overlay = document.getElementById('dcSocCTA');
    const t = document.getElementById('dcSocTitle');
    const d = document.getElementById('dcSocDesc');
    const go = document.getElementById('dcSocGo');
    if(!overlay) return;
    t.textContent = title;
    d.textContent = desc;
    go.onclick = () => { window.open(url, "_blank","noopener"); overlay.style.display='none'; };
    overlay.style.display='flex';
  }

  function mountRibbon(){
    const host = document.createElement('div');
    host.className = 'dc-social-ribbon';
    host.innerHTML = `
      <button class="dc-soc-btn" id="btn-gbp" title="Google Reviews">
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/googlemaps.svg" alt="Google Reviews">
      </button>
      <button class="dc-soc-btn" id="btn-fb" title="Facebook">
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/facebook.svg" alt="Facebook">
      </button>
      <button class="dc-soc-btn" id="btn-ig" title="Instagram">
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg" alt="Instagram">
      </button>
      <button class="dc-soc-btn" id="btn-yt" title="YouTube">
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/youtube.svg" alt="YouTube">
      </button>
      <button class="dc-soc-btn" id="btn-ln" title="LinkedIn">
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg" alt="LinkedIn">
      </button>
      <button class="dc-soc-btn" id="btn-x" title="X (Twitter)">
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg" alt="X">
      </button>
      <button class="dc-soc-btn" id="btn-wa" title="Join WhatsApp Community">
        <img src="https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/whatsapp.svg" alt="WhatsApp">
      </button>
    `;
    document.body.appendChild(host);

    document.getElementById('btn-gbp').onclick = ()=> openCTA('Review on Google','If we earned your trust, a minute matters ⭐', cfg.gbp);
    document.getElementById('btn-fb').onclick = ()=> openCTA('Follow on Facebook','Get deals, tips, and store updates.', cfg.facebook);
    document.getElementById('btn-ig').onclick = ()=> openCTA('Follow on Instagram','Visual updates, builds and behind-the-scenes.', cfg.instagram);
    document.getElementById('btn-yt').onclick = ()=> openCTA('Subscribe on YouTube','Demos, how-tos, product tours.', cfg.youtube);
    document.getElementById('btn-ln').onclick = ()=> openCTA('Connect on LinkedIn','For corporate & hiring updates.', cfg.linkedin);
    document.getElementById('btn-x').onclick = ()=> openCTA('Follow on X','Quick updates and alerts.', cfg.x);
    document.getElementById('btn-wa').onclick = ()=> openCTA('Join our WhatsApp Community','Future-ready updates straight to your phone 💙', cfg.whatsappChannel);
  }

  function mountModal(){
    const overlay = document.createElement('div');
    overlay.id = 'dcSocCTA';
    overlay.className = 'dc-soc-cta';
    overlay.innerHTML = `
      <div class="dc-soc-card">
        <h3 id="dcSocTitle">Join us</h3>
        <p id="dcSocDesc">Stay updated with important tips and offers.</p>
        <div class="dc-soc-actions">
          <button id="dcSocGo" class="dc-chip">Continue</button>
          <button id="dcSocClose" class="dc-close">Close</button>
        </div>
      </div>`;
    document.body.appendChild(overlay);
    document.getElementById('dcSocClose').onclick = ()=> overlay.style.display='none';
  }

  function boot(){
    mountRibbon();
    mountModal();
  }
  if(document.readyState==='loading'){ document.addEventListener('DOMContentLoaded', boot); }
  else { boot(); }
})();
