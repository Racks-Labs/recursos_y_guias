/* ==========================================================================
   Racks Academy · Portadas de los recursos
   --------------------------------------------------------------------------
   Portada tipo libro: colección arriba, título en tres alturas con la frase
   clave en naranja, gráfico de progresión, firma del autor entre filetes y
   banda inferior con la promesa.

   Se dibuja en un <canvas> con las fuentes que ya carga racks.css, así que
   el PNG sale con Inter de verdad. Sin dependencias.

   Cada recurso se genera a nombre de un autor: la firma es lo único que
   cambia entre versiones.

   Uso:
     await RacksPortadas.listo();
     RacksPortadas.dibuja(canvas, recurso, 'carlos-adams');
     RacksPortadas.descarga(recurso, 'carlos-adams');

   Todas las medidas salen de W y H, por eso el mismo código sirve para la
   miniatura del índice y para el PNG a doble resolución.
   ========================================================================== */

(function (global) {
  'use strict';

  /* los tokens del sistema en literal: el canvas no entiende var(--…) */
  var T = {
    fondo:   '#121212',
    lomo:    '#171717',
    naranja: '#f5911a',
    titulo:  '#f7f7f7',
    texto:   '#c7c7c7',
    tenue:   '#696969',
    borde:   '#333'
  };

  var SANS = 'Inter, "Helvetica Neue", Arial, sans-serif';
  var MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

  var LIENZO = { w: 1200, h: 1500 };   /* 4:5, la proporción del modelo */

  var AUTORES = [
    { id: 'carlos-adams', nombre: 'Carlos Adams' },
    { id: 'jaime-racks',  nombre: 'Jaime Racks'  }
  ];

  /* ------------------------------------------------------------------ */
  /* Texto                                                               */
  /* ------------------------------------------------------------------ */

  function anchoTracked(c, texto, tr) {
    var w = 0;
    for (var i = 0; i < texto.length; i++) w += c.measureText(texto[i]).width + tr;
    return w - (texto.length ? tr : 0);
  }

  function dibujaTracked(c, texto, x, y, tr) {
    for (var i = 0; i < texto.length; i++) {
      c.fillText(texto[i], x, y);
      x += c.measureText(texto[i]).width + tr;
    }
  }

  function centraTracked(c, texto, cx, y, tr) {
    dibujaTracked(c, texto, cx - anchoTracked(c, texto, tr) / 2, y, tr);
  }

  /* Encaja una línea en el ancho dado, empezando por el cuerpo ideal. */
  function encaja(c, texto, peso, ideal, anchoMax, min) {
    var size = ideal;
    while (size > min) {
      c.font = peso + ' ' + size + 'px ' + SANS;
      if (c.measureText(texto).width <= anchoMax) break;
      size -= 1;
    }
    c.font = peso + ' ' + size + 'px ' + SANS;
    return size;
  }

  /* «texto con *énfasis*» → [{t:'texto con ', b:false}, {t:'énfasis', b:true}] */
  function trozos(linea) {
    return linea.split('*').map(function (t, i) { return { t: t, b: i % 2 === 1 }; })
                .filter(function (p) { return p.t; });
  }

  function anchoTrozos(c, ps, size) {
    return ps.reduce(function (w, p) {
      c.font = (p.b ? '800 ' : '500 ') + size + 'px ' + SANS;
      return w + c.measureText(p.t).width;
    }, 0);
  }

  function dibujaTrozos(c, ps, x, y, size) {
    ps.forEach(function (p) {
      c.font = (p.b ? '800 ' : '500 ') + size + 'px ' + SANS;
      c.fillText(p.t, x, y);
      x += c.measureText(p.t).width;
    });
  }

  /* ------------------------------------------------------------------ */
  /* El gráfico de progresión                                            */
  /* ------------------------------------------------------------------ */

  function grafico(c, r, x, y, w, h, U) {
    /* sube con mesetas: sale de abajo a la izquierda y remata arriba a la derecha */
    var p = [[0,.90],[.13,.90],[.28,.62],[.44,.62],[.60,.38],[.72,.38],[1,.04]]
              .map(function (q) { return [x + q[0] * w, y + q[1] * h]; });

    c.save();
    c.strokeStyle = T.naranja;
    c.lineWidth = Math.max(2, U * 0.16);
    c.lineJoin = 'round';
    c.lineCap = 'round';
    c.beginPath();
    c.moveTo(p[0][0], p[0][1]);
    for (var i = 1; i < p.length; i++) c.lineTo(p[i][0], p[i][1]);
    c.stroke();
    c.restore();

    /* nodos con silueta de persona, como en el modelo */
    nodo(c, p[2][0], p[2][1], U * 0.95);
    nodo(c, p[4][0], p[4][1], U * 0.95);

    /* rótulo de salida, sobre el primer nodo */
    pastilla(c, r.portada.desde, p[2][0], p[2][1] - U * 2.3, U * 0.66, U);
    /* rótulo de llegada, en el remate */
    pastilla(c, r.portada.hasta, p[6][0] - U * 1.6, p[6][1] - U * 1.9, U * 0.78, U);
  }

  function nodo(c, x, y, rad) {
    c.save();
    c.fillStyle = T.naranja;
    c.beginPath(); c.arc(x, y, rad, 0, Math.PI * 2); c.fill();

    c.fillStyle = T.fondo;
    c.beginPath(); c.arc(x, y - rad * 0.22, rad * 0.30, 0, Math.PI * 2); c.fill();
    c.beginPath();
    c.arc(x, y + rad * 0.52, rad * 0.50, Math.PI * 1.15, Math.PI * 1.85, false);
    c.lineTo(x + rad * 0.42, y + rad * 0.62);
    c.lineTo(x - rad * 0.42, y + rad * 0.62);
    c.closePath(); c.fill();
    c.restore();
  }

  function pastilla(c, texto, cx, cy, cuerpo, U) {
    if (!texto) return;
    var tr = U * 0.06;
    c.save();
    c.font = '700 ' + cuerpo + 'px ' + SANS;
    var t = String(texto).toUpperCase();
    /* ancho mínimo: un rótulo de un carácter no debe quedar en cuadradito */
    var w = Math.max(anchoTracked(c, t, tr) + U * 1.1, U * 2.6);
    var h = cuerpo * 1.9;

    c.fillStyle = T.naranja;
    c.fillRect(cx - w / 2, cy - h / 2, w, h);
    c.fillStyle = T.fondo;
    centraTracked(c, t, cx, cy + cuerpo * 0.36, tr);
    c.restore();
  }

  /* ------------------------------------------------------------------ */
  /* Portada                                                             */
  /* ------------------------------------------------------------------ */

  function dibuja(canvas, r, autorId, escala) {
    var s = escala || 1;
    var W = Math.round(LIENZO.w * s), H = Math.round(LIENZO.h * s);
    var P = r.portada || {};
    var autor = AUTORES.filter(function (a) { return a.id === autorId; })[0] || AUTORES[0];

    canvas.width = W; canvas.height = H;
    var c = canvas.getContext('2d');
    c.textBaseline = 'alphabetic';
    c.textAlign = 'left';

    var M = W * 0.085;
    var U = W * 0.030;
    var CW = W - M * 2;
    var cx = W / 2;

    /* fondo */
    c.fillStyle = T.fondo;
    c.fillRect(0, 0, W, H);

    /* lomo */
    var lomo = W * 0.024;
    c.fillStyle = T.lomo;
    c.fillRect(0, 0, lomo, H);
    c.fillStyle = T.borde;
    c.fillRect(lomo, 0, Math.max(1, W * 0.0014), H);

    /* --- colección, arriba a la derecha --- */
    var col = (P.coleccion || 'RECURSO').toUpperCase();
    var cCuerpo = U * 0.70, cTr = U * 0.15;
    c.font = '600 ' + cCuerpo + 'px ' + MONO;
    var cw = anchoTracked(c, col, cTr) + U * 1.4;
    var ch = cCuerpo * 2.2;
    c.fillStyle = T.titulo;
    c.fillRect(W - M - cw, M * 0.72, cw, ch);
    c.fillStyle = T.fondo;
    dibujaTracked(c, col, W - M - cw + U * 0.5, M * 0.72 + ch * 0.68, cTr);

    /* --- título en tres alturas --- */
    var y = H * 0.155;

    if (P.prefijo) {
      var sPre = encaja(c, P.prefijo.toUpperCase(), '800', U * 1.62, CW, U * 0.9);
      c.fillStyle = T.titulo;
      c.textAlign = 'center';
      c.fillText(P.prefijo.toUpperCase(), cx, y + sPre);
      y += sPre * 1.28;
    }

    if (P.destacado) {
      var sDes = encaja(c, P.destacado.toUpperCase(), '800', U * 3.15, CW, U * 1.3);
      c.fillStyle = T.naranja;
      c.textAlign = 'center';
      if ('letterSpacing' in c) c.letterSpacing = '-0.03em';
      c.fillText(P.destacado.toUpperCase(), cx, y + sDes);
      if ('letterSpacing' in c) c.letterSpacing = '0px';
      y += sDes * 1.16;
    }

    if (P.resto) {
      var sRes = encaja(c, P.resto.toUpperCase(), '800', U * 1.95, CW, U * 1.0);
      c.fillStyle = T.titulo;
      c.textAlign = 'center';
      c.fillText(P.resto.toUpperCase(), cx, y + sRes);
      y += sRes * 1.2;
    }
    c.textAlign = 'left';

    /* --- banda inferior con la promesa --- */
    var lineas = (P.promesa || '').split('\n').filter(Boolean);
    var pCuerpo = U * 0.92, pLh = pCuerpo * 1.5;
    var bandaAlto = lineas.length ? pLh * lineas.length + U * 2.1 : 0;
    var bandaY = H - bandaAlto - H * 0.022;

    if (lineas.length) {
      c.fillStyle = T.naranja;
      c.fillRect(0, bandaY, W, bandaAlto);
      c.fillStyle = T.fondo;
      lineas.forEach(function (linea, i) {
        var ps = trozos(linea.toUpperCase());
        var cuerpo = pCuerpo;
        while (anchoTrozos(c, ps, cuerpo) > CW && cuerpo > U * 0.4) cuerpo -= 1;
        dibujaTrozos(c, ps, cx - anchoTrozos(c, ps, cuerpo) / 2,
                     bandaY + U * 1.35 + i * pLh + cuerpo * 0.8, cuerpo);
      });
    }

    /* --- firma del autor, entre filetes --- */
    var aCuerpo = U * 0.95, aTr = U * 0.26;
    var aY = bandaY - U * 2.6;
    c.font = '600 ' + aCuerpo + 'px ' + SANS;
    var nombre = autor.nombre.toUpperCase();
    var aw = anchoTracked(c, nombre, aTr);
    c.fillStyle = T.titulo;
    centraTracked(c, nombre, cx, aY, aTr);

    c.fillStyle = T.tenue;
    var filete = (CW - aw) / 2 - U * 1.4;
    if (filete > U) {
      var fy = aY - aCuerpo * 0.32;
      var grosor = Math.max(1, W * 0.0022);
      c.fillRect(M, fy, filete, grosor);
      c.fillRect(W - M - filete, fy, filete, grosor);
    }

    /* --- gráfico, en el hueco entre el título y la firma --- */
    var gY = y + U * 3.0;
    var gAlto = (aY - U * 3.0) - gY;
    if (gAlto > U * 3) grafico(c, r, M + U * 0.8, gY, CW - U * 1.6, gAlto, U);

    return canvas;
  }

  /* ------------------------------------------------------------------ */
  /* Fuentes y descarga                                                  */
  /* ------------------------------------------------------------------ */

  var promesaFuentes = null;

  function listo() {
    if (promesaFuentes) return promesaFuentes;
    if (!document.fonts) return (promesaFuentes = Promise.resolve());

    promesaFuentes = Promise.all([
      document.fonts.load('800 100px Inter'),
      document.fonts.load('700 40px Inter'),
      document.fonts.load('600 40px Inter'),
      document.fonts.load('500 40px Inter'),
      document.fonts.load('600 20px "JetBrains Mono"')
    ]).then(function () { return document.fonts.ready; });

    return promesaFuentes;
  }

  function descarga(r, autorId) {
    return listo().then(function () {
      var canvas = document.createElement('canvas');
      dibuja(canvas, r, autorId, 2);   /* x2: aguanta impresión y pantalla densa */

      return new Promise(function (resolve) {
        canvas.toBlob(function (blob) {
          var url = URL.createObjectURL(blob);
          var a = document.createElement('a');
          a.href = url;
          a.download = 'portada-' + r.slug + '-' + autorId + '.png';
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(function () { URL.revokeObjectURL(url); }, 2000);
          resolve();
        }, 'image/png');
      });
    });
  }

  global.RacksPortadas = {
    AUTORES: AUTORES,
    LIENZO: LIENZO,
    dibuja: dibuja,
    descarga: descarga,
    listo: listo
  };
})(window);
