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
