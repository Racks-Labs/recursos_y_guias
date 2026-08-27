/* ==========================================================================
   Racks Academy · Comportamiento compartido de los recursos
   --------------------------------------------------------------------------
   1. Botones de copiar en bloques de código
   2. Índice con sección activa
   3. Puente de incrustación: publica su altura al contenedor padre

   Todo es opcional y tolerante: si un recurso no tiene índice o no tiene
   código, no pasa nada.
   ========================================================================== */

(function () {
  'use strict';

  var html = document.documentElement;
  var params = new URLSearchParams(location.search);
  var EMBED = params.get('embed') === '1';
  var FRAMED = window.self !== window.top;

  /* El <head> de cada recurso marca .is-embed / .is-framed antes de pintar
     para evitar el salto. Lo repetimos aquí por si ese script no está. */
  if (EMBED) html.classList.add('is-embed');
  if (FRAMED) html.classList.add('is-framed');
  if (params.get('bg') === 'transparent') html.classList.add('is-transparent');

  /* ------------------------------------------------------------------ */
  /* 1. Copiar código                                                    */
  /* ------------------------------------------------------------------ */

  document.querySelectorAll('.copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var host = btn.closest('.code') || btn.parentNode;
      var pre = host.querySelector('pre');
      if (!pre) return;

      var text = pre.innerText;
      var done = function () {
        var previous = btn.textContent;
        btn.textContent = 'Copiado';
        btn.classList.add('is-done');
        setTimeout(function () {
          btn.textContent = previous;
          btn.classList.remove('is-done');
        }, 1600);
      };

      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(done, function () { fallback(text, done); });
      } else {
        fallback(text, done);
      }
    });
  });

  function fallback(text, done) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:-1000px;opacity:0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); done(); } catch (e) { /* sin portapapeles */ }
    document.body.removeChild(ta);
  }

  /* ------------------------------------------------------------------ */
  /* 2. Índice: marcar la sección visible                                */
  /* ------------------------------------------------------------------ */

  var tocLinks = Array.prototype.slice.call(
    document.querySelectorAll('.toc a[href^="#"]')
  );

  if (tocLinks.length && 'IntersectionObserver' in window) {
    var byId = {};
    var targets = [];

    tocLinks.forEach(function (a) {
      var el = document.getElementById(decodeURIComponent(a.hash.slice(1)));
      if (el) { byId[el.id] = a; targets.push(el); }
    });

    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        tocLinks.forEach(function (a) { a.classList.remove('is-active'); });
        var link = byId[entry.target.id];
        if (link) link.classList.add('is-active');
      });
    }, { rootMargin: '-10% 0px -70% 0px', threshold: 0 });

    targets.forEach(function (el) { spy.observe(el); });
  }

  /* ------------------------------------------------------------------ */
  /* 3. Puente de incrustación                                           */
  /* ------------------------------------------------------------------ */

  if (!FRAMED) return;

  var ID = params.get('id') || document.body.dataset.resourceId || location.pathname;
  var last = 0;

  function measure() {
    var body = document.body;
    var doc = document.documentElement;
    return Math.ceil(Math.max(
      body.scrollHeight, body.offsetHeight,
      doc.scrollHeight, doc.offsetHeight
    ));
  }

  function publish(force) {
    var height = measure();
    if (!force && Math.abs(height - last) < 2) return;
    last = height;
    try {
      window.parent.postMessage({
        source: 'racks-resource',
        type: 'resize',
        id: ID,
        height: height,
        url: location.href
      }, '*');
    } catch (e) { /* contenedor de otro origen sin permiso: nada que hacer */ }
  }

  /* Dentro de un iframe los enlaces externos deben salir del marco. */
  document.querySelectorAll('a[href]').forEach(function (a) {
    var href = a.getAttribute('href') || '';
    if (href.charAt(0) === '#' || a.hasAttribute('target')) return;
    if (/^https?:\/\//i.test(href) && a.host !== location.host) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    } else {
      a.target = '_top';   /* navegar entre recursos rompe el marco a propósito */
    }
  });

  /* El contenedor puede pedir la altura cuando quiera. */
  window.addEventListener('message', function (event) {
    var data = event.data;
    if (data && data.source === 'racks-embed' && data.type === 'request-height') publish(true);
  });

  if ('ResizeObserver' in window) {
    new ResizeObserver(function () { publish(false); }).observe(document.body);
  }

  window.addEventListener('load', function () { publish(true); });
  window.addEventListener('resize', function () { publish(false); });
  window.addEventListener('hashchange', function () { publish(true); });
  document.addEventListener('click', function () { setTimeout(publish, 60); });

  publish(true);
})();
