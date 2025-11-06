// Patch v4.3: client-side glue for placeholders
(()=>{
  // Load admin-config (if present)
  fetch('/admin/config.json', {cache:'no-store'}).then(r=>r.ok?r.json():{}).then(cfg=>{
    window.DC_PATCH_CFG = cfg||{};
    // Example: If GA4 ID present, inject
    if (cfg.ga4_id){
      const s = document.createElement('script');
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${cfg.ga4_id}`;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date()); gtag('config', cfg.ga4_id);
      console.log('[DC] GA4 injected', cfg.ga4_id);
    }
  }).catch(()=>{});
})();