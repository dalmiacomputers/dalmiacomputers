
// DC‑SANA widget placeholder
(function(){
  let open=false;
  const btn=document.createElement('div');
  btn.style.cssText="position:fixed;bottom:24px;right:24px;background:#178bff;border-radius:50%;width:56px;height:56px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:26px;cursor:pointer;z-index:9999;box-shadow:0 8px 22px rgba(0,0,0,.18)";
  btn.textContent="🤖";
  document.body.appendChild(btn);
  const panel=document.createElement('div');
  panel.style.cssText="position:fixed;bottom:90px;right:24px;width:340px;height:430px;background:#fff;border-radius:14px;border:1px solid #dde8f2;box-shadow:0 12px 38px rgba(0,0,0,.15);display:none;flex-direction:column;z-index:9999";
  panel.innerHTML=`
    <div style="padding:12px;border-bottom:1px solid #e9f2fb;font-weight:bold;display:flex;justify-content:space-between">
      <span>DC‑SANA Assistant</span>
      <span style="cursor:pointer" id="dcClose">✖️</span>
    </div>
    <iframe src="/pages/support/" style="flex:1;border:0"></iframe>
    <a href="https://wa.me/919734290001" target="_blank" style="padding:10px;text-align:center;background:#25D366;color:#fff;font-weight:bold;border-radius:0 0 14px 14px;display:block">Chat on WhatsApp</a>`;
  document.body.appendChild(panel);
  btn.onclick=()=>{open=!open;panel.style.display=open?"flex":"none"};
  panel.querySelector("#dcClose").onclick=()=>{open=false;panel.style.display="none"};
})();