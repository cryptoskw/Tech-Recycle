(function(){
  var $ = function(sel, ctx){ return (ctx||document).querySelector(sel); };
  var $$ = function(sel, ctx){ return Array.prototype.slice.call((ctx||document).querySelectorAll(sel)); };
  function posts(){ return window.TECHRECYCLE_POSTS || []; }
  function silos(){ return window.TECHRECYCLE_SILOS || []; }
  function trUrl(path){ return (window.trUrl ? window.trUrl(path) : path); }
  function rewriteInternalLinks(ctx){
    $$("a[href^='/'], img[src^='/'], source[src^='/'], form[action^='/']", ctx||document).forEach(function(el){
      if(el.tagName === 'A') el.setAttribute('href', trUrl(el.getAttribute('href')));
      else if(el.tagName === 'FORM') el.setAttribute('action', trUrl(el.getAttribute('action')));
      else el.setAttribute('src', trUrl(el.getAttribute('src')));
    });
  }
  function escapeHtml(str){ return String(str||'').replace(/[&<>'"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c];}); }
  function card(p){
    var tags=(p.tags||[]).slice(0,3).map(function(t){return '<span>'+escapeHtml(t)+'</span>';}).join('');
    var image=p.image?'<div class="post-image"><img loading="lazy" src="'+escapeHtml(trUrl(p.image))+'" alt="'+escapeHtml(p.title)+'"></div>':'';
    return '<a class="post-card" href="'+escapeHtml(trUrl(p.url))+'">'+image+'<div class="post-card-body"><span class="type">'+escapeHtml(p.type)+'</span><h3>'+escapeHtml(p.title)+'</h3><p>'+escapeHtml(p.excerpt)+'</p><div class="post-tags">'+tags+'</div><div class="meta"><span>'+escapeHtml(p.siloName)+'</span><span>'+escapeHtml(p.readingTime)+'</span></div></div></a>';
  }
  function setupNav(){
    var btn=$('[data-nav-toggle]'), nav=$('[data-main-nav]');
    if(btn&&nav&&!btn.dataset.bound){btn.dataset.bound='true';btn.addEventListener('click',function(){var open=nav.classList.toggle('open');btn.setAttribute('aria-expanded',open?'true':'false');});}
    var path=location.pathname.replace(/\/index\.html$/,'/');
    $$('[data-main-nav] a').forEach(function(a){
      var raw=a.getAttribute('href')||'';
      if(!raw || raw.charAt(0)==='#') return;
      var linkPath;
      try { linkPath = new URL(raw, location.href).pathname.replace(/\/index\.html$/,'/'); } catch(e){ return; }
      if(linkPath === path || (linkPath !== '/' && path.indexOf(linkPath)===0)) a.classList.add('active');
    });
  }
  function renderSiloCards(){
    var wrap=$('[data-silo-cards]'); if(!wrap) return;
    wrap.innerHTML=silos().map(function(s){
      var count=posts().filter(function(p){return p.silo===s.id;}).length;
      return '<a class="silo-card" data-icon="'+escapeHtml(s.icon)+'" href="'+escapeHtml(trUrl(s.url))+'"><span class="type">'+escapeHtml(s.accent||'Library')+'</span><h3>'+escapeHtml(s.name)+'</h3><p>'+escapeHtml(s.description)+'</p><div class="meta"><span>'+count+' guides</span><span>Open →</span></div></a>';
    }).join('');
  }
  function renderHomeTracks(){
    $$('[data-home-silo]').forEach(function(section){
      var silo=section.getAttribute('data-home-silo'), track=$('[data-post-track]',section); if(!track) return;
      var list=posts().filter(function(p){return p.silo===silo;});
      track.innerHTML=list.length?list.map(card).join(''):'<div class="empty-state">Browse the main blog for the latest guides in this library.</div>';
    });
  }
  function renderFeatured(){ var wrap=$('[data-featured-posts]'); if(!wrap) return; wrap.innerHTML=posts().filter(function(p){return p.featured;}).slice(0,6).map(card).join(''); }
  function renderSiloPage(){
    var wrap=$('[data-silo-posts]'); if(!wrap) return;
    var silo=document.body.getAttribute('data-silo'); var list=posts().filter(function(p){return p.silo===silo;});
    wrap.innerHTML=list.length?list.map(card).join(''):'<div class="empty-state">Browse the main blog for related repair and recycling guides.</div>';
    var count=$('[data-silo-count]'); if(count) count.textContent=list.length + (list.length===1?' guide':' guides');
  }

  function renderBlogPage(){
    var wrap=$('[data-blog-posts]'); if(!wrap) return;
    var input=$('#blog-search');
    function sortedPosts(){
      return posts().slice().sort(function(a,b){ return String(b.date||'').localeCompare(String(a.date||'')); });
    }
    function render(){
      var q=input ? input.value.trim().toLowerCase() : '';
      var list=sortedPosts().filter(function(p){
        if(!q) return true;
        return [p.title,p.excerpt,p.siloName,(p.tags||[]).join(' '),p.type,p.brand,p.model,p.board].join(' ').toLowerCase().indexOf(q)>-1;
      });
      wrap.innerHTML=list.length?list.map(card).join(''):'<div class="empty-state">No matching article found yet. Try laptop recycling, data destruction, BIOS, board number, or no power.</div>';
    }
    render();
    if(input && !input.dataset.bound){ input.dataset.bound='true'; input.addEventListener('input',render); }
  }

  function renderRelated(){
    var wrap=$('[data-related-posts]'); if(!wrap) return;
    var silo=wrap.getAttribute('data-silo'), current=wrap.getAttribute('data-current-id');
    var list=posts().filter(function(p){return p.silo===silo && p.id!==current;}).slice(0,3);
    wrap.innerHTML=list.length?list.map(card).join(''):'<div class="empty-state">Explore the full blog for more related repair and recycling guides.</div>';
  }

  function runSearchTo(input, results, keepOpen){
    if(!input||!results) return;
    var q=input.value.trim().toLowerCase();
    if(q.length<2){results.innerHTML='<div class="search-result"><strong>Start typing to search</strong><span>Try BIOS, no power, data destruction, laptop recycling, CH341A, board number, or thermal pads.</span></div>'; if(results.id==='search-results') results.hidden=true; return;}
    var list=posts().filter(function(p){return [p.title,p.excerpt,p.siloName,(p.tags||[]).join(' '),p.brand,p.model,p.board,p.type].join(' ').toLowerCase().indexOf(q)>-1;}).slice(0,10);
    results.innerHTML=list.length?list.map(function(p){return '<a class="search-result" href="'+escapeHtml(trUrl(p.url))+'"><strong>'+escapeHtml(p.title)+'</strong><span>'+escapeHtml(p.siloName)+' · '+escapeHtml(p.readingTime)+'</span></a>';}).join(''):'<div class="search-result"><strong>No exact guide found yet</strong><span>Try broader terms such as recycle, BIOS, no power, data, board, charger, or display.</span></div>';
    if(results.id==='search-results') results.hidden=false;
  }
  function setupGlobalSearch(){
    var panel=$('[data-global-search]'), openBtn=$('[data-global-search-open]'), input=$('#global-library-search'), results=$('#global-search-results');
    if(!panel||!openBtn||!input||!results||openBtn.dataset.bound) return;
    openBtn.dataset.bound='true';
    function open(){panel.hidden=false;document.body.classList.add('search-open');setTimeout(function(){input.focus();runSearchTo(input,results,true);},20);} 
    function close(){panel.hidden=true;document.body.classList.remove('search-open');input.value='';results.innerHTML='';}
    openBtn.addEventListener('click',open);
    $$('[data-global-search-close]').forEach(function(btn){btn.addEventListener('click',close);});
    input.addEventListener('input',function(){runSearchTo(input,results,true);});
    $$('.quick-search-tags [data-search-term]').forEach(function(btn){btn.addEventListener('click',function(){input.value=btn.getAttribute('data-search-term')||'';runSearchTo(input,results,true);input.focus();});});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!panel.hidden) close(); if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open();}});
  }

  function setupSearch(){
    var input=$('#library-search'), results=$('#search-results'); if(!input||!results) return;
    function run(){
      var q=input.value.trim().toLowerCase();
      if(q.length<2){results.hidden=true;results.innerHTML='';return;}
      var list=posts().filter(function(p){return [p.title,p.excerpt,p.siloName,(p.tags||[]).join(' '),p.brand,p.model,p.board].join(' ').toLowerCase().indexOf(q)>-1;}).slice(0,8);
      results.innerHTML=list.length?list.map(function(p){return '<a class="search-result" href="'+escapeHtml(trUrl(p.url))+'"><strong>'+escapeHtml(p.title)+'</strong><span>'+escapeHtml(p.siloName)+' · '+escapeHtml(p.readingTime)+'</span></a>';}).join(''):'<div class="search-result"><strong>No guide found yet</strong><span>Try BIOS, board number, no power, CH341A, thermal pads, or recycle.</span></div>';
      results.hidden=false;
    }
    input.addEventListener('input', run);
    document.addEventListener('keydown', function(e){ if(e.key==='Escape'){results.hidden=true; input.blur();} });
    document.addEventListener('click', function(e){ if(!results.contains(e.target) && e.target!==input) results.hidden=true; });
  }

  function setupStaticForms(){
    $$('form.contact-form').forEach(function(form){
      if(form.dataset.staticReady) return;
      form.dataset.staticReady = 'true';
      form.setAttribute('action','https://formsubmit.co/info@techrecycle.co.za');
      form.setAttribute('method','POST');
      function ensureHidden(name, value){
        var input = form.querySelector('input[name="'+name+'"]');
        if(!input){ input = document.createElement('input'); input.type='hidden'; input.name=name; form.insertBefore(input, form.firstChild); }
        if(value !== undefined) input.value = value;
        return input;
      }
      ensureHidden('_subject','New TechRecycle website enquiry');
      ensureHidden('_template','table');
      ensureHidden('_next','https://techrecycle.co.za/thank-you/');
      ensureHidden('_replyto','');
      form.addEventListener('submit', function(){
        var email = form.querySelector('input[name="email"]');
        var reply = form.querySelector('input[name="_replyto"]');
        if(email && reply) reply.value = email.value || '';
      });
    });
  }

  function readingProgress(){
    if(document.body.getAttribute('data-page')!=='article') return;
    var bar=document.createElement('div');bar.className='reading-progress';document.body.appendChild(bar);
    window.addEventListener('scroll',function(){var h=document.documentElement.scrollHeight-window.innerHeight; var pct=h>0?(window.scrollY/h)*100:0; bar.style.width=pct+'%';},{passive:true});
  }
  function init(){ rewriteInternalLinks(document); setupStaticForms(); setupNav(); setupGlobalSearch(); renderSiloCards(); renderHomeTracks(); renderFeatured(); renderSiloPage(); renderBlogPage(); renderRelated(); setupSearch(); readingProgress(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
  document.addEventListener('techrecycle:includes-loaded', function(){ rewriteInternalLinks(document); setupStaticForms(); setupNav(); setupGlobalSearch(); });
})();