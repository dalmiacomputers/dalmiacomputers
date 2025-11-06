
/*! DC Home Integration v4.3.1 */
(async function(){
  const confUrl='/admin/config.json';
  async function getConf(){
    try{const r=await fetch(confUrl,{cache:'no-store'}); if(!r.ok) throw 0; return await r.json();}
    catch(e){return {}}
  }
  function el(tag,attrs={},html=''){
    const n=document.createElement(tag);
    Object.entries(attrs).forEach(([k,v])=> n.setAttribute(k,v));
    if(html) n.innerHTML=html;
    return n;
  }
  function mount(section){
    const host=document.querySelector('#dc-home-'+section) || document.querySelector('[data-dc="'+section+'"]');
    if(host) return host;
    const container=el('section',{'class':'dc-rail dc-card','id':'dc-home-'+section});
    document.body.appendChild(container);
    return container;
  }
  const C = await getConf();

  /* Offers CTA */
  const offers = mount('offers');
  offers.innerHTML = `
    <h2>Monthly Offers</h2>
    <div class="dc-offers">
      <div class="cta">
        <p><strong>Fresh gifts & bundles</strong> — updated monthly. Limited stock.</p>
        <a href="/pages/offers/" aria-label="View Dalmia offers">View offers</a>
      </div>
    </div>`;

  /* Brand marquee */
  try{
    const r = await fetch('/assets/brands/brands.json'); 
    const list = r.ok? await r.json() : [];
    const marquee = mount('brands');
    const track = list.map(b=>`<img src="${b.src}" alt="${b.name} logo" loading="lazy">`).join('');
    marquee.innerHTML = `<h2>Our Partner Brands</h2><div class="dc-marquee"><div class="track">${track+track}</div></div>`;
  }catch(e){}

  /* Accessories slider */
  try{
    const r = await fetch('/pages/accessories/data.json'); 
    const items = r.ok? await r.json() : [];
    if(items.length){
      const acc = mount('accessories');
      acc.innerHTML = `<h2>Popular Accessories</h2>
        <div class="dc-snap">`+items.map(i=>`
          <div class="item dc-card">
            <img src="${i.img}" alt="${i.title}">
            <h4>${i.title}</h4>
            <p>${i.desc||''}</p>
          </div>`).join('')+`</div>`;
    }
  }catch(e){}

  /* Social row + WhatsApp community */
  const social = mount('social');
  const socials = [
    {name:'Facebook', href:C.facebook||'#', icon:'/assets/social/facebook.svg'},
    {name:'Instagram', href:C.instagram||'#', icon:'/assets/social/instagram.svg'},
    {name:'YouTube', href:C.youtube||'#', icon:'/assets/social/youtube.svg'},
    {name:'LinkedIn', href:C.linkedin||'#', icon:'/assets/social/linkedin.svg'},
    {name:'Twitter', href:C.twitter||'#', icon:'/assets/social/x.svg'},
    {name:'WhatsApp Community', href:C.whatsapp_channel||'#', icon:'/assets/social/whatsapp.svg'}
  ].filter(x=>x.href && x.href!=='#');
  social.innerHTML = '<h2>Connect with Us</h2>';
  const row = el('div',{'class':'dc-social'}, socials.map(s=>`<a href="${s.href}" target="_blank" rel="noopener"><img src="${s.icon}" alt="${s.name}">${s.name}</a>`).join(''));
  social.appendChild(row);

  /* Reviews rail (Trustindex / GBP / Elfsight) */
  const reviews = mount('reviews');
  let embed = C.trustindex_embed || C.gbp_embed || C.elfsight_embed || '';
  if(embed){
    reviews.innerHTML = '<h2>Customer Reviews</h2><div class="dc-reviews dc-card">'+embed+'</div>';
  } else {
    reviews.innerHTML = '<h2>Customer Reviews</h2><p class="dc-muted">Add Trustindex/GBP/Elfsight in Admin to show live reviews.</p>';
  }

  /* Chatbot teaser (DC-SANA) */
  const chat = mount('chat');
  chat.innerHTML = `<div class="dc-chat dc-card">
      <div class="dc-mini-amb"></div>
      <div>
        <strong>DC‑SANA</strong> — AI assistant powered by OpenAI. 
        <div style="font-size:13px;color:var(--dc-muted)">Stuck? Ask DC‑SANA. If needed we hand off to a human on WhatsApp.</div>
      </div>
      <a href="${C.whatsapp_channel||'#'}" class="dc-social-btn" style="margin-left:auto;text-decoration:none;background:var(--dc-blue);color:#fff;padding:8px 12px;border-radius:999px">Join Community</a>
    </div>`;

  /* GA4 */
  if(C.ga4){
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.googletagmanager.com/gtag/js?id='+C.ga4,'ga');
    window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('js', new Date());gtag('config', C.ga4);
  }
})();