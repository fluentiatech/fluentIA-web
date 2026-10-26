'use strict';

/* ================================================
   MULTILINGUAL — ES / EN / FR
================================================ */
var I18N_SRC='/public/i18n/comun.js';
function cargaI18n(cb){if(window.TRANSLATIONS){cb();return;}var s=document.createElement('script');s.src=I18N_SRC;s.onload=cb;document.head.appendChild(s);}


var currentLang=(function(){try{return localStorage.getItem('fluentia_lang')||'es';}catch(e){return 'es';}})();

function applyLang(lang){
  /* el español ya está en el HTML; las otras lenguas se cargan solo cuando hacen falta */
  if(!window.TRANSLATIONS){
    if(lang==='es'){document.documentElement.lang='es';document.querySelectorAll('[data-lang]').forEach(function(b){b.classList.toggle('active',b.getAttribute('data-lang')==='es');});return;}
    cargaI18n(function(){applyLang(lang);});return;
  }
  var t=TRANSLATIONS[lang]||TRANSLATIONS.es;
  document.documentElement.lang=lang;
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var k=el.getAttribute('data-i18n');
    if(t[k]!==undefined)el.innerHTML=t[k];
  });
  document.querySelectorAll('[data-i18n-ph]').forEach(function(el){
    var k=el.getAttribute('data-i18n-ph');
    if(t[k]!==undefined)el.placeholder=t[k];
  });
  var sel=document.getElementById('cf-perfil');
  if(sel&&t['select.options']){
    var opts=t['select.options'];
    for(var i=0;i<sel.options.length&&i<opts.length;i++){sel.options[i].text=opts[i];}
  }
  document.querySelectorAll('[data-lang]').forEach(function(btn){
    btn.classList.toggle('active',btn.getAttribute('data-lang')===lang);
  });
}
function setLang(lang){
  currentLang=lang;
  try{localStorage.setItem('fluentia_lang',lang);}catch(e){}
  applyLang(lang);
}
applyLang(currentLang);

/* ---- MOBILE MENU ---- */
function openMenu(){
  var m=document.getElementById('mobile-menu');
  m.classList.add('open');
  document.body.style.overflow='hidden';
  document.querySelector('.nav-hamburger').setAttribute('aria-expanded','true');
}
function closeMenu(){
  var m=document.getElementById('mobile-menu');
  m.classList.remove('open');
  document.body.style.overflow='';
  document.querySelector('.nav-hamburger').setAttribute('aria-expanded','false');
}
document.getElementById('mobile-close').addEventListener('click',closeMenu);
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeMenu();});

/* ---- FORM ---- */
function handleForm(e){
  e.preventDefault();
  var consent=document.getElementById('cf-consent');
  if(consent&&!consent.checked){consent.reportValidity();return;}
  var btn=document.getElementById('form-btn');
  var t=(window.TRANSLATIONS&&(TRANSLATIONS[currentLang]||TRANSLATIONS.es))||{};
  btn.textContent=t['con.f.sent']||'✓ Mensaje enviado';
  btn.style.background='rgba(212,20,90,.12)';
  btn.style.color='#d4145a';
  btn.style.border='.5px solid rgba(212,20,90,.4)';
  btn.disabled=true;
}

/* ---- FORM · Preentrada Copiloto Fiscal (Formspree) ---- */
var FORMSPREE_ID='xykvzyav';
async function handleFiscal(e){
  e.preventDefault();
  var btn=document.getElementById('hf-btn');
  var inp=document.getElementById('hf-email');
  var consent=document.getElementById('hf-consent');
  var note=document.querySelector('.hf-note');
  if(inp&&!inp.checkValidity()){inp.reportValidity();return;}
  if(consent&&!consent.checked){consent.reportValidity();return;}
  btn.disabled=true;
  var prev=btn.textContent;
  btn.textContent='Enviando…';
  try{
    var res=await fetch('https://formspree.io/f/'+FORMSPREE_ID,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json'},
      body:JSON.stringify({
        email:(inp?inp.value:'').trim(),
        consent_comercial:(document.getElementById('hf-consent-com')&&document.getElementById('hf-consent-com').checked)?'sí':'no',
        formulario:'Copiloto Fiscal · Acceso anticipado',
        _subject:'Nuevo acceso anticipado — Copiloto Fiscal'
      })
    });
    if(!res.ok)throw new Error('formspree');
    btn.textContent='✓ Apuntado';
    btn.style.background='rgba(212,20,90,.14)';
    btn.style.color='#d4145a';
    if(inp)inp.disabled=true;
    if(consent)consent.disabled=true;
    if(note)note.textContent='¡Listo! Te escribiremos cuando abramos el acceso.';
  }catch(err){
    btn.disabled=false;
    btn.textContent=prev;
    if(note)note.textContent='No se pudo enviar. Inténtalo de nuevo o escríbenos a diego.morales@fluentiatech.es.';
  }
}

/* ---- Política de privacidad (modales) ---- */
function openPrivacy(e,id){
  if(e&&e.preventDefault)e.preventDefault();
  var m=document.getElementById(id||'privacy-modal');
  if(m){m.classList.add('open');document.body.style.overflow='hidden';}
}
function closePrivacy(e){
  if(e&&e.preventDefault)e.preventDefault();
  document.querySelectorAll('.privacy-modal.open').forEach(function(m){m.classList.remove('open');});
  document.body.style.overflow='';
}
document.addEventListener('keydown',function(ev){if(ev.key==='Escape')closePrivacy();});

/* ---- PROGRESS BAR & SCROLL HINT ---- */
window.addEventListener('scroll',function(){
  var total=document.documentElement.scrollHeight-window.innerHeight;
  var pct=total>0?(window.scrollY/total)*100:0;
  var _pb=document.getElementById('progress-bar'); if(_pb)_pb.style.width=pct+'%';
  if(pct>4){
    var sh=document.getElementById('scroll-hint');if(!sh)return;
    if(sh){sh.style.opacity='0';
    sh.style.pointerEvents='none';}
  }
},{passive:true});

/* ================================================
   ANIMACIONES DE CONTENIDO (GSAP + ScrollTrigger)
================================================ */
window.addEventListener('DOMContentLoaded',function(){
  gsap.registerPlugin(ScrollTrigger);

  /* ---- CONTENT SCROLL ANIMATIONS ---- */
  document.querySelectorAll('.sc').forEach(function(el,i){
    if(i===0)return;
    gsap.to(el,{opacity:1,y:0,duration:1,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 80%',end:'top 32%',scrub:true}});
  });
  gsap.from('.svc-card',{scale:.95,opacity:0,stagger:.1,duration:.7,ease:'power2.out',scrollTrigger:{trigger:'#servicios',start:'top 62%'}});
  gsap.from('.case-card',{opacity:0,y:24,stagger:.09,duration:.65,ease:'power2.out',scrollTrigger:{trigger:'#casos',start:'top 66%'}});
  gsap.from('.proc-step',{opacity:0,y:20,stagger:.1,duration:.6,ease:'power2.out',scrollTrigger:{trigger:'#proceso',start:'top 68%'}});
  gsap.from('.value-item',{opacity:0,y:22,stagger:.08,duration:.6,ease:'power2.out',scrollTrigger:{trigger:'#nosotros',start:'top 64%'}});


  window.addEventListener('resize',function(){ScrollTrigger.refresh();});
  gsap.set('#hero-sc',{opacity:1,y:0});
});
