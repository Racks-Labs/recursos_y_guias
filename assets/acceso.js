/* ==========================================================================
   Racks Academy · Puerta de acceso
   --------------------------------------------------------------------------
   Deja el índice detrás de una clave. Es una puerta de navegador, no un
   servidor: frena a quien llega por la URL, no a quien lee el código. Los
   recursos sueltos siguen abiertos, que es lo que permite incrustarlos.

   La clave no está en el repositorio. Aquí sólo vive su huella, derivada con
   PBKDF2-SHA256 sobre 250.000 vueltas, así que del archivo no se saca la
   clave: hay que probarla. Para cambiarla, genera la huella nueva y sustituye
   HUELLA (queda documentado en CLAUDE.md).

   Carga SÍNCRONA en el <head>, antes de pintar: así el contenido protegido no
   llega a asomar.

   Uso desde la página:
     RacksAcceso.cuandoAbra(function () { … });   // monta lo que haya que montar
     RacksAcceso.abierto();                       // true si ya tiene acceso
     RacksAcceso.cierra();                        // olvida el acceso guardado
   ========================================================================== */

(function (global) {
  'use strict';

  var SAL      = 'racks-academy/indice/v1';
  var VUELTAS  = 250000;
  var HUELLA   = '006296f2cf7b8f0405155f52d6770500a73ad79d32bfafa168606b87e3bf5648';
  var MEMORIA  = 'racks.acceso.indice.v1';

  var html  = document.documentElement;
  var cola  = [];
  var listo = recuerda() === HUELLA;

  if (!listo) html.classList.add('is-locked');

  /* ------------------------------------------------------------------ */
  /* Memoria · guardamos la huella, no la clave                          */
  /* ------------------------------------------------------------------ */

  function recuerda() {
    try { return global.localStorage.getItem(MEMORIA); } catch (e) { return null; }
  }

  function apunta(valor) {
    try {
      if (valor) global.localStorage.setItem(MEMORIA, valor);
      else global.localStorage.removeItem(MEMORIA);
    } catch (e) { /* navegación privada: el acceso dura lo que la pestaña */ }
  }

  /* ------------------------------------------------------------------ */
  /* Comprobación                                                        */
  /* ------------------------------------------------------------------ */

  function hex(buffer) {
    return Array.prototype.map.call(new Uint8Array(buffer), function (b) {
      return ('0' + b.toString(16)).slice(-2);
    }).join('');
  }

  function deriva(clave) {
    var texto = new TextEncoder();
    return crypto.subtle
      .importKey('raw', texto.encode(clave), { name: 'PBKDF2' }, false, ['deriveBits'])
      .then(function (material) {
        return crypto.subtle.deriveBits({
          name: 'PBKDF2',
          salt: texto.encode(SAL),
          iterations: VUELTAS,
          hash: 'SHA-256'
        }, material, 256);
      })
      .then(hex);
  }

  function abre() {
    listo = true;
    html.classList.remove('is-locked');
    var puerta = document.getElementById('gate');
    if (puerta) puerta.parentNode.removeChild(puerta);
    cola.splice(0).forEach(function (fn) { fn(); });
  }

  /* ------------------------------------------------------------------ */
  /* Panel                                                               */
  /* ------------------------------------------------------------------ */

  function monta() {
    if (listo || document.getElementById('gate')) return;

    var puerta = document.createElement('div');
    puerta.className = 'gate';
    puerta.id = 'gate';
    puerta.innerHTML =
      '<form class="gate-panel" novalidate>' +
        '<span class="gate-mark" aria-hidden="true">R</span>' +
        '<p class="label gate-kicker">Acceso restringido</p>' +
        '<h1 class="gate-title">Recursos y guías.</h1>' +
        '<p class="gate-lead">El catálogo es privado. Escribe la clave para entrar.</p>' +
        '<label class="gate-label" for="gate-clave">Clave</label>' +
        '<input class="gate-input" id="gate-clave" type="password" name="clave" ' +
               'autocomplete="current-password" autocapitalize="off" ' +
               'autocorrect="off" spellcheck="false" required>' +
        '<button class="btn btn--primary gate-btn" type="submit">Entrar</button>' +
        '<p class="gate-aviso" role="status" aria-live="polite"></p>' +
      '</form>';

    document.body.appendChild(puerta);

    var form   = puerta.querySelector('form');
    var campo  = puerta.querySelector('.gate-input');
    var boton  = puerta.querySelector('.gate-btn');
    var aviso  = puerta.querySelector('.gate-aviso');

    campo.focus();

    function di(texto, mal) {
      aviso.textContent = texto;
      aviso.classList.toggle('is-error', !!mal);
    }

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var clave = campo.value;
      if (!clave) { di('Escribe la clave.', true); campo.focus(); return; }

      if (!global.crypto || !crypto.subtle) {
        di('Abre la página por https (o localhost): sin eso el navegador no puede comprobar la clave.', true);
        return;
      }

      boton.disabled = true;
      di('Comprobando…', false);

      deriva(clave).then(function (huella) {
        if (huella === HUELLA) {
          apunta(huella);
          di('Adelante.', false);
          abre();
        } else {
          boton.disabled = false;
          campo.value = '';
          campo.focus();
          di('Esa clave no es.', true);
        }
      }, function () {
        boton.disabled = false;
        di('No se ha podido comprobar la clave en este navegador.', true);
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', monta);
  } else {
    monta();
  }

  /* ------------------------------------------------------------------ */
  /* API                                                                 */
  /* ------------------------------------------------------------------ */

  global.RacksAcceso = {
    abierto: function () { return listo; },
    cuandoAbra: function (fn) { if (listo) fn(); else cola.push(fn); },
    cierra: function () {
      apunta(null);
      listo = false;
      html.classList.add('is-locked');
      monta();
    }
  };
})(window);
