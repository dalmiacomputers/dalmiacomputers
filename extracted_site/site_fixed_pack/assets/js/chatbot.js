
// Simple chatbot overlay + WhatsApp fallback
(function(){
  const btn = document.getElementById('chatBtn');
  if(!btn) return;
  btn.addEventListener('click', () => {
    const choice = prompt("Dalmia AI Assistant\nAsk your question below. If you need a human, type 'human'.\n\nSales: 9734290001 • Service: 8145290001 • TDL: 9734290001");
    if(!choice) return;
    if(/human/i.test(choice)){
      const opt = prompt("Route to: 1) Sales 2) Service 3) TDL");
      const map = { "1":"9734290001","2":"8145290001","3":"9734290001" };
      const num = map[opt?.trim()] || "9734290001";
      window.open(`https://wa.me/91${num}?text=${encodeURIComponent("Hi Dalmia Team, need help: "+choice)}`,'_blank');
      return;
    }
    alert("AI reply (preview): Thanks! We'll get back with the best guidance.\n— Next pass wires OpenAI backend.");
  });
})();
