// Minimal JS; marks active nav and confirms CSP works without externals.
(function(){
  var path = location.pathname.replace(/\/+/g,'/');
  var map = {'/':'home','/products/':'products','/repairs/':'repairs','/contact/':'contact'};
  var key = map[path] || null;
  if(key){ var a = document.querySelector('a[data-nav="'+key+'"]'); if(a){ a.setAttribute('aria-current','page'); } }
  console.log('Dalmia Computers static bundle loaded.');
})();