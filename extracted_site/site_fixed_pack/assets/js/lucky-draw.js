
function ldSubmit(e){
  e.preventDefault();
  const name = document.getElementById('ldName').value.trim();
  const phone = document.getElementById('ldPhone').value.trim();
  const ref = document.getElementById('ldRef').value.trim();
  const prize = 'Monthly Lucky Draw';
  const token = 'DC-'+ Math.random().toString(36).slice(2,8).toUpperCase();
  // Create printable ticket
  const w = window.open('', '_blank');
  w.document.write(`<html><head><title>${prize} — Ticket</title><style>body{font-family:Arial;padding:20px} .box{border:1px dashed #999;padding:16px;border-radius:8px} h2{margin:0 0 6px}</style></head><body><div class="box"><h2>Dalmia Computers — Lucky Draw Ticket</h2><p><b>Name:</b> ${name}<br/><b>Phone:</b> ${phone}<br/><b>Token:</b> ${token}<br/><b>Referral:</b> ${ref||'-'}</p><p>Keep this ticket. Winners will be notified via SMS/WhatsApp/Email.</p><p style="font-size:12px;color:#555">T&C apply. One entry per person per month. Bots/spam disqualify automatically.</p></div><script>window.print()</script></body></html>`);
  w.document.close();
  alert('Submitted! Your token: '+token+' (PDF/Print window opened).');
}
