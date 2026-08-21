(function(){
  function getBasePath(){
    var scripts = document.getElementsByTagName('script');
    for(var i=0;i<scripts.length;i++){
      var src = scripts[i].getAttribute('src') || '';
      var clean = src.split('?')[0];
      var marker = 'assets/js/includes.js';
      var pos = clean.indexOf(marker);
      if(pos !== -1){ return clean.slice(0, pos); }
    }
    return '';
  }
  var BASE = getBasePath();
  window.TECHRECYCLE_BASE = BASE;
  window.trUrl = function(path){
    if(!path) return BASE || './';
    if(/^https?:\/\//i.test(path) || /^mailto:/i.test(path) || /^tel:/i.test(path) || /^#/i.test(path)) return path;
    if(path.charAt(0) === '/') return BASE + path.slice(1);
    return path;
  };
  function load(id, url){
    var el=document.getElementById(id); if(!el) return Promise.resolve();
    return fetch(window.trUrl(url)).then(function(r){ if(!r.ok) throw new Error(url); return r.text(); }).then(function(html){ el.innerHTML=html; });
  }
  Promise.all([load('site-header','/partials/header.html?v=5.7'), load('site-footer','/partials/footer.html?v=5.7')]).then(function(){
    document.dispatchEvent(new CustomEvent('techrecycle:includes-loaded'));
  }).catch(function(err){ console.warn('Include failed', err); });
})();
