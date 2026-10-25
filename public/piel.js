/* Comportamiento compartido de todas las páginas (piel editorial).
   Cabecera que se esconde al bajar y vuelve al subir, como en accenture.com. */
(function(){
  var nav=document.getElementById('navbar');if(!nav)return;
  var body=document.body,last=window.scrollY,UMBRAL=6;
  function sync(){
    var y=window.scrollY;
    if(y<80){body.classList.remove('nav-up');}
    else if(y>last+UMBRAL){body.classList.add('nav-up');}
    else if(y<last-UMBRAL){body.classList.remove('nav-up');}
    last=y;
  }
  window.addEventListener('scroll',sync,{passive:true});
  nav.addEventListener('focusin',function(){body.classList.remove('nav-up');});
  nav.addEventListener('mouseenter',function(){body.classList.remove('nav-up');});
  sync();
})();

/* Idioma: el desplegable se abre con un clic o un toque y muestra el idioma activo */
(function(){
  var menu=document.getElementById('lang-menu');if(!menu)return;
  var main=menu.querySelector('.lang-main'),cur=menu.querySelector('.lang-cur');
  function pinta(){cur.textContent=(document.documentElement.lang||'es').toUpperCase();}
  function cierra(){menu.classList.remove('open');main.setAttribute('aria-expanded','false');}
  main.addEventListener('click',function(e){e.stopPropagation();var abierto=menu.classList.toggle('open');main.setAttribute('aria-expanded',abierto);});
  menu.querySelectorAll('[data-lang]').forEach(function(b){b.addEventListener('click',function(){setTimeout(pinta,0);cierra();});});
  document.addEventListener('click',function(e){if(!menu.contains(e.target))cierra();});
  document.addEventListener('keydown',function(e){if(e.key==='Escape')cierra();});
  pinta();
})();
