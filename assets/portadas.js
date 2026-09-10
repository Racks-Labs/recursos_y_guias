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

  /* El acento cambia por recurso: lo fija dibuja() antes de pintar nada.
     Es el único color que varía; el resto del sistema se queda igual. */
  var ACENTO = T.naranja;

  function conAlfa(hex, a) {
    var n = parseInt(hex.slice(1), 16);
    return 'rgba(' + (n >> 16 & 255) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')';
  }

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

  /* Encaja un texto en varias líneas, con el cuerpo más grande que quepa. */
  function encajaMulti(c, texto, peso, ideal, anchoMax, min, maxLineas, altoMax) {
    var palabras = texto.split(/\s+/);
    for (var size = ideal; size >= min; size -= 1) {
      c.font = peso + ' ' + size + 'px ' + SANS;
      var lineas = [], actual = '';
      for (var i = 0; i < palabras.length; i++) {
        var prueba = actual ? actual + ' ' + palabras[i] : palabras[i];
        if (c.measureText(prueba).width > anchoMax && actual) { lineas.push(actual); actual = palabras[i]; }
        else actual = prueba;
      }
      if (actual) lineas.push(actual);
      var cabe = lineas.every(function (l) { return c.measureText(l).width <= anchoMax; });
      if (cabe && lineas.length <= maxLineas && (!altoMax || lineas.length * size * 1.06 <= altoMax)) {
        return { size: size, lineas: lineas };
      }
    }
    c.font = peso + ' ' + min + 'px ' + SANS;
    return { size: min, lineas: [texto] };
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
  /* Ilustraciones · una por recurso, dibujando lo que se lleva el lector */
  /* ------------------------------------------------------------------ */

  /* Todas reciben un cuadrado (X, Y, S) y la unidad tipográfica U, y pintan
     línea naranja sobre el fondo. Para añadir una: una función más aquí y su
     nombre en portada.grafico dentro de assets/recursos.js. */

  function trazo(c, U, factor) {
    c.strokeStyle = ACENTO;
    c.lineWidth = Math.max(2, U * (factor || 0.15));
    c.lineJoin = 'round';
    c.lineCap = 'round';
    c.setLineDash([]);
  }

  function caja(c, x, y, w, h, relleno) {
    c.beginPath(); c.rect(x, y, w, h);
    if (relleno) { c.fillStyle = relleno; c.fill(); } else { c.stroke(); }
  }

  function poli(c, pts, cerrar) {
    c.beginPath();
    c.moveTo(pts[0][0], pts[0][1]);
    for (var i = 1; i < pts.length; i++) c.lineTo(pts[i][0], pts[i][1]);
    if (cerrar) c.closePath();
  }

  var GRAFICOS = {};

  /* --- Claude Code: una terminal con skills enchufándose --------------- */
  GRAFICOS.skills = function (c, X, Y, S, U) {
    var tx = X + S * 0.03, ty = Y + S * 0.10, tw = S * 0.60, th = S * 0.76;
    trazo(c, U);

    caja(c, tx, ty, tw, th);                       /* marco de la terminal */
    var barra = ty + S * 0.11;
    c.beginPath(); c.moveTo(tx, barra); c.lineTo(tx + tw, barra); c.stroke();

    c.fillStyle = ACENTO;                       /* semáforo de la barra */
    for (var i = 0; i < 3; i++) {
      c.beginPath();
      c.arc(tx + S * 0.055 + i * S * 0.065, ty + S * 0.055, S * 0.019, 0, Math.PI * 2);
      c.fill();
    }

    /* prompt: el chevron y el cursor */
    poli(c, [[tx + S * 0.07, ty + S * 0.22], [tx + S * 0.13, ty + S * 0.29],
             [tx + S * 0.07, ty + S * 0.36]]);
    c.stroke();
    c.fillStyle = ACENTO;
    c.fillRect(tx + S * 0.17, ty + S * 0.21, S * 0.24, S * 0.055);
    c.fillRect(tx + S * 0.07, ty + S * 0.44, S * 0.30, S * 0.035);
    c.fillRect(tx + S * 0.07, ty + S * 0.52, S * 0.18, S * 0.035);

    /* tres skills acoplándose por la derecha; la última, la que escribes tú */
    var mx = X + S * 0.74, mw = S * 0.24, mh = S * 0.18;
    [0, 1, 2].forEach(function (k) {
      var my = Y + S * 0.14 + k * S * 0.28;
      c.beginPath();
      c.moveTo(tx + tw, my + mh / 2); c.lineTo(mx, my + mh / 2);
      c.stroke();
      if (k < 2) { caja(c, mx, my, mw, mh, ACENTO); }
      else { c.setLineDash([U * 0.34, U * 0.28]); caja(c, mx, my, mw, mh); c.setLineDash([]); }
    });
  };

  /* --- Mods: bloques de videojuego, y uno que añades tú --------------- */
  GRAFICOS.mods = function (c, X, Y, S, U) {
    var cx = X + S * 0.50, base = Y + S * 0.78;
    var a = S * 0.185, alto = S * 0.205;   /* semiancho y altura del cubo */

    function cubo(px, py, discontinuo) {
      trazo(c, U, 0.13);
      if (discontinuo) c.setLineDash([U * 0.34, U * 0.28]);

      poli(c, [[px, py - alto], [px + a, py - alto / 2],
               [px, py], [px - a, py - alto / 2]], true);
      if (!discontinuo) { c.fillStyle = conAlfa(ACENTO, 0.16); c.fill(); }
      c.stroke();

      poli(c, [[px - a, py - alto / 2], [px, py],
               [px, py + alto], [px - a, py + alto / 2]], true);
      c.stroke();
      poli(c, [[px + a, py - alto / 2], [px, py],
               [px, py + alto], [px + a, py + alto / 2]], true);
      c.stroke();
      c.setLineDash([]);
    }

    cubo(cx - a, base);                    /* la pila que ya existe */
    cubo(cx + a, base);
    cubo(cx, base - alto * 1.5);
    cubo(cx, base - alto * 3.2, true);     /* el mod que colocas */

    /* la flecha que baja: lo que tú añades */
    trazo(c, U, 0.13);
    var fy = base - alto * 4.3;
    c.beginPath(); c.moveTo(cx, Y + S * 0.02); c.lineTo(cx, fy); c.stroke();
    poli(c, [[cx - S * 0.045, fy - S * 0.05], [cx, fy], [cx + S * 0.045, fy - S * 0.05]]);
    c.stroke();
  };

  /* --- Apps: un móvil con la app publicada y su enlace ---------------- */
  GRAFICOS.apps = function (c, X, Y, S, U) {
    var pw = S * 0.46, ph = S * 0.86;
    var px = X + S * 0.17, py = Y + S * 0.06;
    trazo(c, U);

    caja(c, px, py, pw, ph);
    c.fillStyle = ACENTO;
    c.fillRect(px + S * 0.145, py + S * 0.035, S * 0.13, S * 0.016);   /* auricular */

    c.fillRect(px + S * 0.05, py + S * 0.10, pw - S * 0.10, S * 0.10); /* cabecera */
    [0, 1, 2].forEach(function (k) {                                    /* contenido */
      c.fillStyle = conAlfa(ACENTO, 0.35);
      c.fillRect(px + S * 0.05, py + S * 0.25 + k * S * 0.09, pw - S * 0.10 - k * S * 0.06, S * 0.045);
    });
    c.fillStyle = ACENTO;
    c.fillRect(px + S * 0.05, py + ph - S * 0.17, pw - S * 0.10, S * 0.075); /* botón */

    /* el globo: publicada y con enlace propio */
    var gx = X + S * 0.80, gy = Y + S * 0.30, gr = S * 0.15;
    trazo(c, U, 0.13);
    c.beginPath(); c.arc(gx, gy, gr, 0, Math.PI * 2); c.stroke();
    c.beginPath(); c.moveTo(gx - gr, gy); c.lineTo(gx + gr, gy); c.stroke();
    c.beginPath(); c.ellipse(gx, gy, gr * 0.45, gr, 0, 0, Math.PI * 2); c.stroke();

    c.beginPath();                                   /* del móvil al globo */
    c.moveTo(px + pw, py + ph * 0.42); c.lineTo(gx - gr - S * 0.03, gy + gr * 0.5);
    c.stroke();
  };

  /* --- Validación: el veredicto, avanzar / esperar / parar ------------ */
  GRAFICOS.validacion = function (c, X, Y, S, U) {
    var bw = S * 0.92, bh = S * 0.22, bx = X + S * 0.04;
    var icono = bh * 0.62;

    [0, 1, 2].forEach(function (k) {
      var by = Y + S * 0.08 + k * (bh + S * 0.11);
      var activo = k === 0;
      trazo(c, U, 0.12);

      if (activo) { caja(c, bx, by, bw, bh, ACENTO); }
      else { c.globalAlpha = 0.55; caja(c, bx, by, bw, bh); c.globalAlpha = 1; }

      var ix = bx + bh * 0.5, iy = by + bh * 0.5;
      c.strokeStyle = activo ? T.fondo : ACENTO;
      c.lineWidth = Math.max(2, U * 0.16);
      c.globalAlpha = activo ? 1 : 0.55;

      if (k === 0) {                                   /* avanzar */
        poli(c, [[ix - icono * 0.34, iy], [ix - icono * 0.06, iy + icono * 0.28],
                 [ix + icono * 0.36, iy - icono * 0.30]]);
        c.stroke();
      } else if (k === 1) {                            /* esperar */
        c.beginPath();
        c.moveTo(ix - icono * 0.16, iy - icono * 0.30); c.lineTo(ix - icono * 0.16, iy + icono * 0.30);
        c.moveTo(ix + icono * 0.16, iy - icono * 0.30); c.lineTo(ix + icono * 0.16, iy + icono * 0.30);
        c.stroke();
      } else {                                          /* parar */
        c.beginPath();
        c.moveTo(ix - icono * 0.28, iy - icono * 0.28); c.lineTo(ix + icono * 0.28, iy + icono * 0.28);
        c.moveTo(ix + icono * 0.28, iy - icono * 0.28); c.lineTo(ix - icono * 0.28, iy + icono * 0.28);
        c.stroke();
      }

      /* la línea que representa el argumento de cada veredicto */
      c.strokeStyle = activo ? T.fondo : ACENTO;
      c.lineWidth = Math.max(2, U * 0.11);
      c.beginPath();
      c.moveTo(bx + bh, by + bh * 0.5);
      c.lineTo(bx + bw - bh * (0.5 + k * 0.9), by + bh * 0.5);
      c.stroke();
      c.globalAlpha = 1;
    });
  };

  /* --- GPU por horas: la tarjeta y el contador ------------------------ */
  GRAFICOS.gpu = function (c, X, Y, S, U) {
    var tx = X + S * 0.02, ty = Y + S * 0.24, tw = S * 0.70, th = S * 0.50;
    trazo(c, U);

    caja(c, tx, ty, tw, th);                       /* la tarjeta */

    [0.26, 0.62].forEach(function (p) {            /* los dos ventiladores */
      var fx = tx + tw * p, fy = ty + th * 0.5, fr = th * 0.28;
      c.beginPath(); c.arc(fx, fy, fr, 0, Math.PI * 2); c.stroke();
      c.beginPath(); c.arc(fx, fy, fr * 0.3, 0, Math.PI * 2); c.stroke();
      for (var k = 0; k < 3; k++) {
        var ang = k * Math.PI * 2 / 3;
        c.beginPath();
        c.moveTo(fx + Math.cos(ang) * fr * 0.32, fy + Math.sin(ang) * fr * 0.32);
        c.lineTo(fx + Math.cos(ang) * fr * 0.92, fy + Math.sin(ang) * fr * 0.92);
        c.stroke();
      }
    });

    c.fillStyle = ACENTO;                       /* conector PCIe */
    for (var j = 0; j < 7; j++) {
      c.fillRect(tx + S * 0.06 + j * S * 0.058, ty + th, S * 0.034, S * 0.065);
    }

    /* el contador: se paga por horas */
    var rx = X + S * 0.80, ry = Y + S * 0.17, rr = S * 0.19;
    trazo(c, U, 0.13);
    c.fillStyle = T.fondo;
    c.beginPath(); c.arc(rx, ry, rr, 0, Math.PI * 2); c.fill(); c.stroke();
    c.beginPath();
    c.moveTo(rx, ry - rr * 0.55); c.lineTo(rx, ry);
    c.lineTo(rx + rr * 0.45, ry + rr * 0.28);
    c.stroke();
  };

  /* --- Modernizar webs: el móvil de antes y el de después -------------- */
  GRAFICOS.webs = function (c, X, Y, S, U) {
    var pw = S * 0.34, ph = S * 0.80, py = Y + S * 0.08;
    var ax = X + S * 0.04, bx = X + S * 0.62;

    /* la web vieja: marco discontinuo, maquetación de tabla, todo apagado */
    trazo(c, U, 0.12);
    c.globalAlpha = 0.55;
    c.setLineDash([U * 0.34, U * 0.28]);
    caja(c, ax, py, pw, ph);
    c.setLineDash([]);
    var gx = ax + S * 0.045, gy = py + S * 0.10, gw = pw - S * 0.09, gh = ph * 0.60;
    caja(c, gx, gy, gw, gh);                                   /* la tabla */
    c.beginPath();
    c.moveTo(gx, gy + gh / 3); c.lineTo(gx + gw, gy + gh / 3);
    c.moveTo(gx, gy + gh * 2 / 3); c.lineTo(gx + gw, gy + gh * 2 / 3);
    c.moveTo(gx + gw * 0.45, gy); c.lineTo(gx + gw * 0.45, gy + gh);
    c.stroke();
    c.fillStyle = ACENTO;                                       /* texto diminuto */
    [0, 1, 2].forEach(function (k) {
      c.fillRect(gx, gy + gh + S * 0.05 + k * S * 0.035, gw * (0.9 - k * 0.2), S * 0.014);
    });
    c.globalAlpha = 1;

    /* la flecha: lo que haces tú */
    trazo(c, U, 0.14);
    var fy = py + ph * 0.5, f0 = ax + pw + S * 0.05, f1 = bx - S * 0.05;
    c.beginPath(); c.moveTo(f0, fy); c.lineTo(f1, fy); c.stroke();
    poli(c, [[f1 - S * 0.05, fy - S * 0.045], [f1, fy], [f1 - S * 0.05, fy + S * 0.045]]);
    c.stroke();

    /* la web nueva: marco firme, cabecera, foto, texto y botón de llamar */
    trazo(c, U, 0.14);
    caja(c, bx, py, pw, ph);
    c.fillStyle = ACENTO;
    c.fillRect(bx + S * 0.11, py + S * 0.03, S * 0.12, S * 0.014);       /* auricular */
    c.fillRect(bx + S * 0.045, py + S * 0.09, pw - S * 0.09, S * 0.075);  /* cabecera */
    c.fillStyle = conAlfa(ACENTO, 0.30);
    c.fillRect(bx + S * 0.045, py + S * 0.20, pw - S * 0.09, S * 0.20);   /* la foto */
    c.fillStyle = conAlfa(ACENTO, 0.45);
    [0, 1, 2].forEach(function (k) {
      c.fillRect(bx + S * 0.045, py + S * 0.44 + k * S * 0.06, (pw - S * 0.09) * (1 - k * 0.22), S * 0.028);
    });
    c.fillStyle = ACENTO;
    c.fillRect(bx + S * 0.045, py + ph - S * 0.13, pw - S * 0.09, S * 0.07);  /* llamar */
  };

  /* --- Agentes: el bucle, con el agente en medio y sus herramientas ---- */
  GRAFICOS.agentes = function (c, X, Y, S, U) {
    var cx = X + S * 0.40, cy = Y + S * 0.50, R = S * 0.36;
    var box = S * 0.24;

    /* el bucle: un arco casi completo, con punta de flecha */
    trazo(c, U, 0.13);
    var a0 = -Math.PI * 0.35, a1 = Math.PI * 1.45;
    c.beginPath(); c.arc(cx, cy, R, a0, a1); c.stroke();
    var ex = cx + Math.cos(a1) * R, ey = cy + Math.sin(a1) * R;
    var t = a1 + Math.PI / 2;                                   /* tangente */
    poli(c, [[ex - Math.cos(t) * S * 0.07 + Math.cos(a1) * S * 0.045, ey - Math.sin(t) * S * 0.07 + Math.sin(a1) * S * 0.045],
             [ex, ey],
             [ex - Math.cos(t) * S * 0.07 - Math.cos(a1) * S * 0.045, ey - Math.sin(t) * S * 0.07 - Math.sin(a1) * S * 0.045]]);
    c.stroke();

    /* cuatro paradas del bucle: plan, acción, resultado, comprobación */
    c.fillStyle = ACENTO;
    [0.05, 0.45, 0.85, 1.25].forEach(function (k) {
      var a = Math.PI * k;
      c.fillRect(cx + Math.cos(a) * R - S * 0.03, cy + Math.sin(a) * R - S * 0.03, S * 0.06, S * 0.06);
    });

    /* el agente, en el centro, con su prompt */
    c.fillStyle = T.fondo;
    c.fillRect(cx - box / 2, cy - box / 2, box, box);
    caja(c, cx - box / 2, cy - box / 2, box, box);
    poli(c, [[cx - box * 0.28, cy - box * 0.18], [cx - box * 0.08, cy], [cx - box * 0.28, cy + box * 0.18]]);
    c.stroke();
    c.fillStyle = ACENTO;
    c.fillRect(cx + box * 0.02, cy + box * 0.08, box * 0.26, box * 0.10);

    /* las herramientas, enchufadas a la derecha */
    var tx = X + S * 0.82, tw = S * 0.16, th = S * 0.13;
    [0, 1, 2].forEach(function (k) {
      var ty = Y + S * 0.22 + k * S * 0.22;
      c.beginPath(); c.moveTo(cx + R, ty + th / 2); c.lineTo(tx, ty + th / 2); c.stroke();
      if (k < 2) caja(c, tx, ty, tw, th, ACENTO);
      else { c.setLineDash([U * 0.34, U * 0.28]); caja(c, tx, ty, tw, th); c.setLineDash([]); }
    });
  };

  /* --- Hermes: el chat en el móvil y las skills que va apilando -------- */
  GRAFICOS.hermes = function (c, X, Y, S, U) {
    /* la burbuja del chat, arriba a la izquierda, con el prompt dentro */
    var bx = X + S * 0.02, by = Y + S * 0.04, bw = S * 0.54, bh = S * 0.32;
    trazo(c, U, 0.14);
    caja(c, bx, by, bw, bh);
    poli(c, [[bx + S * 0.08, by + bh], [bx + S * 0.08, by + bh + S * 0.09], [bx + S * 0.18, by + bh]]);
    c.stroke();
    c.fillStyle = T.fondo;                                      /* abre la burbuja hacia el rabo */
    c.fillRect(bx + S * 0.082, by + bh - S * 0.012, S * 0.096, S * 0.024);
    poli(c, [[bx + S * 0.07, by + S * 0.09], [bx + S * 0.13, by + S * 0.16], [bx + S * 0.07, by + S * 0.23]]);
    c.stroke();
    c.fillStyle = ACENTO;
    c.fillRect(bx + S * 0.17, by + S * 0.125, S * 0.22, S * 0.06);
    c.fillStyle = conAlfa(ACENTO, 0.45);
    c.fillRect(bx + S * 0.07, by + S * 0.255, S * 0.34, S * 0.035);

    /* las skills: una pila abajo a la derecha que crece; la de arriba, aún por aprender */
    var sx = X + S * 0.60, sw = S * 0.36, sh = S * 0.14, hueco = S * 0.04;
    var base = Y + S * 0.96;
    [0, 1, 2].forEach(function (k) {
      var sy = base - (k + 1) * (sh + hueco);
      if (k < 2) caja(c, sx, sy, sw, sh, ACENTO);
      else { c.setLineDash([U * 0.34, U * 0.28]); caja(c, sx, sy, sw, sh); c.setLineDash([]); }
    });

    /* de la conversación a la pila: sale por debajo del rabo, dobla y baja hasta la skill nueva */
    var topePila = base - 3 * (sh + hueco);
    var ly = by + bh + S * 0.20;                                /* por debajo del rabo de la burbuja */
    var mx = sx + sw / 2;
    c.beginPath();
    c.moveTo(bx + S * 0.13, by + bh + S * 0.09);
    c.lineTo(bx + S * 0.13, ly);
    c.lineTo(mx, ly);
    c.lineTo(mx, topePila - S * 0.03);
    c.stroke();
    poli(c, [[mx - S * 0.045, topePila - S * 0.085], [mx, topePila - S * 0.03], [mx + S * 0.045, topePila - S * 0.085]]);
    c.stroke();
  };

  /* --- Conceptos: el mapa entero, desplegado como un índice ----------- */
  GRAFICOS.conceptos = function (c, X, Y, S, U) {
    var mx = X + S * 0.06;                       /* tronco principal */
    var sx = X + S * 0.28;                       /* tronco de los hijos */
    var x1 = X + S * 0.16, x2 = X + S * 0.38;    /* sangrías de cada nivel */
    var h  = S * 0.075;

    /* cada fila: [centro en Y, nivel, ancho de la caja] */
    var filas = [
      [0.14, 1, 0.58],
      [0.27, 2, 0.34],
      [0.40, 2, 0.44],
      [0.53, 1, 0.50],
      [0.66, 2, 0.38],
      [0.79, 1, 0.62],
      [0.92, 2, 0.30]
    ];

    trazo(c, U, 0.11);

    /* el tronco, rematado arriba: de ahí cuelga todo */
    var alto = Y + S * 0.04;
    c.beginPath(); c.moveTo(mx, alto); c.lineTo(mx, Y + S * 0.79); c.stroke();
    c.fillStyle = ACENTO;
    c.fillRect(mx - S * 0.035, alto - S * 0.035, S * 0.07, S * 0.07);

    /* los tramos de los que cuelgan los hijos de cada bloque */
    [[0.14, 0.40], [0.53, 0.66], [0.79, 0.92]].forEach(function (g) {
      c.beginPath();
      c.moveTo(sx, Y + S * g[0] + h / 2);
      c.lineTo(sx, Y + S * g[1]);
      c.stroke();
    });

    filas.forEach(function (f) {
      var y = Y + S * f[0];
      var raiz = f[1] === 1;

      c.beginPath();                              /* el codo hasta la caja */
      c.moveTo(raiz ? mx : sx, y);
      c.lineTo(raiz ? x1 : x2, y);
      c.stroke();

      if (raiz) {
        caja(c, x1, y - h / 2, S * f[2], h, ACENTO);
      } else {
        c.globalAlpha = 0.7;
        caja(c, x2, y - h / 2, S * f[2], h);
        c.globalAlpha = 1;
      }
    });
  };

  /* --- Encargo: la web publicada y el correo que la lleva ------------- */
  GRAFICOS.encargo = function (c, X, Y, S, U) {
    /* el navegador con la web nueva, arriba a la izquierda */
    var nx = X + S * 0.02, ny = Y + S * 0.06, nw = S * 0.68, nh = S * 0.52;
    trazo(c, U, 0.13);
    caja(c, nx, ny, nw, nh);

    var barra = ny + S * 0.09;                       /* la barra del navegador */
    c.beginPath(); c.moveTo(nx, barra); c.lineTo(nx + nw, barra); c.stroke();
    c.fillStyle = ACENTO;
    for (var i = 0; i < 3; i++) {
      c.fillRect(nx + S * 0.035 + i * S * 0.045, ny + S * 0.037, S * 0.022, S * 0.022);
    }
    c.fillStyle = conAlfa(ACENTO, 0.45);             /* la dirección, ya con su enlace */
    c.fillRect(nx + S * 0.19, ny + S * 0.040, nw - S * 0.23, S * 0.016);

    c.fillStyle = ACENTO;                            /* cabecera de la web */
    c.fillRect(nx + S * 0.045, barra + S * 0.045, nw - S * 0.09, S * 0.075);
    c.fillStyle = conAlfa(ACENTO, 0.30);             /* la foto */
    c.fillRect(nx + S * 0.045, barra + S * 0.145, nw * 0.46, S * 0.17);
    c.fillStyle = conAlfa(ACENTO, 0.45);             /* el texto */
    [0, 1, 2].forEach(function (k) {
      c.fillRect(nx + nw * 0.53, barra + S * 0.150 + k * S * 0.048,
                 (nw * 0.40) * (1 - k * 0.18), S * 0.024);
    });
    c.fillStyle = ACENTO;                            /* el botón que ahora sí funciona */
    c.fillRect(nx + nw * 0.53, barra + S * 0.305, nw * 0.24, S * 0.045);

    /* el sobre, abajo a la derecha: la demo sale por correo */
    var sw = S * 0.40, sh = S * 0.27;
    var sx = X + S * 0.56, sy = Y + S * 0.68;
    trazo(c, U, 0.13);
    c.fillStyle = T.fondo;
    c.fillRect(sx, sy, sw, sh);
    caja(c, sx, sy, sw, sh);
    poli(c, [[sx, sy], [sx + sw / 2, sy + sh * 0.58], [sx + sw, sy]]);
    c.stroke();

    /* del navegador al sobre: el enlace que se manda */
    c.beginPath();
    c.moveTo(nx + nw * 0.30, ny + nh);
    c.lineTo(nx + nw * 0.30, sy + sh * 0.45);
    c.lineTo(sx - S * 0.04, sy + sh * 0.45);
    c.stroke();
    poli(c, [[sx - S * 0.095, sy + sh * 0.45 - S * 0.045],
             [sx - S * 0.04, sy + sh * 0.45],
             [sx - S * 0.095, sy + sh * 0.45 + S * 0.045]]);
    c.stroke();
  };

  /* --- Pipeline: los roles en cadena, la salida de uno entrando en el
         siguiente, con el punto donde para a esperar a la persona -------- */
  GRAFICOS.pipeline = function (c, X, Y, S, U) {
    var w = S * 0.27, h = S * 0.15;                 /* cada rol, una caja */
    var paso = S * 0.235;
    var cajas = [0, 1, 2, 3].map(function (k) {
      return { x: X + S * 0.02 + k * paso, y: Y + S * 0.02 + k * paso };
    });

    trazo(c, U, 0.13);

    /* de cada rol al siguiente: baja desde su salida, dobla, y entra por
       la izquierda del que viene */
    cajas.forEach(function (b, k) {
      if (k === cajas.length - 1) return;
      var n = cajas[k + 1];
      var sx = b.x + w * 0.62, ey = n.y + h / 2;
      c.beginPath();
      c.moveTo(sx, b.y + h);
      c.lineTo(sx, ey);
      c.lineTo(n.x - S * 0.02, ey);
      c.stroke();
      poli(c, [[n.x - S * 0.07, ey - S * 0.04], [n.x - S * 0.02, ey], [n.x - S * 0.07, ey + S * 0.04]]);
      c.stroke();
    });

    cajas.forEach(function (b, k) {
      var primera = k === 0, ultima = k === cajas.length - 1;
      if (primera) {
        /* la tarjeta de Notion que lo dispara */
        caja(c, b.x, b.y, w, h, conAlfa(ACENTO, 0.30));
        c.fillStyle = ACENTO;
        c.fillRect(b.x + S * 0.03, b.y + S * 0.03, S * 0.04, S * 0.04);
        c.fillRect(b.x + S * 0.09, b.y + S * 0.035, w * 0.55, S * 0.03);
        c.fillRect(b.x + S * 0.03, b.y + S * 0.095, w * 0.75, S * 0.02);
      } else if (ultima) {
        /* la pieza terminada */
        caja(c, b.x, b.y, w, h, ACENTO);
        c.fillStyle = T.fondo;
        c.fillRect(b.x + S * 0.03, b.y + S * 0.03, w * 0.55, S * 0.03);
        c.fillRect(b.x + S * 0.03, b.y + S * 0.08, w * 0.35, S * 0.02);
        c.fillRect(b.x + w - S * 0.07, b.y + h - S * 0.07, S * 0.04, S * 0.04);
      } else {
        /* un rol: caja vacía con su salida, que es lo que baja al siguiente */
        c.fillStyle = T.fondo;
        c.fillRect(b.x, b.y, w, h);
        caja(c, b.x, b.y, w, h);
        c.fillStyle = conAlfa(ACENTO, 0.45);
        c.fillRect(b.x + S * 0.03, b.y + S * 0.035, w * 0.5, S * 0.025);
        c.fillStyle = ACENTO;
        c.fillRect(b.x + w * 0.52, b.y + h - S * 0.045, w * 0.20, S * 0.045);
      }
    });

    /* el punto de control: la persona, antes de la pieza final */
    var ult = cajas[cajas.length - 1], pen = cajas[cajas.length - 2];
    var px = pen.x + w * 0.62, py = ult.y + h / 2;
    var d = S * 0.09;
    c.fillStyle = T.fondo;
    c.fillRect(px - d / 2, py - d / 2, d, d);
    c.setLineDash([U * 0.34, U * 0.28]);
    caja(c, px - d / 2, py - d / 2, d, d);
    c.setLineDash([]);
  };

  function grafico(c, r, x, y, w, h, U) {
    var dibujo = GRAFICOS[(r.portada || {}).grafico];
    if (!dibujo) return;
    var S = Math.min(w * 0.98, h * 1.04);
    dibujo(c, x + (w - S) / 2, y + (h - S) / 2, S, U);
    c.setLineDash([]);
    c.globalAlpha = 1;
  }

  /* ------------------------------------------------------------------ */
  /* Portada                                                             */
  /* ------------------------------------------------------------------ */

  function dibuja(canvas, r, autorId, escala) {
    var s = escala || 1;
    var W = Math.round(LIENZO.w * s), H = Math.round(LIENZO.h * s);
    var P = r.portada || {};
    var autor = AUTORES.filter(function (a) { return a.id === autorId; })[0] || AUTORES[0];

    ACENTO = P.color || T.naranja;

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
    var y = H * 0.115;

    if (P.prefijo) {
      var sPre = encaja(c, P.prefijo.toUpperCase(), '800', U * 1.62, CW, U * 0.9);
      c.fillStyle = T.titulo;
      c.textAlign = 'center';
      c.fillText(P.prefijo.toUpperCase(), cx, y + sPre);
      y += sPre * 1.28;
    }

    if (P.destacado) {
      var des = encajaMulti(c, P.destacado.toUpperCase(), '800', U * 3.15, CW, U * 1.25, 2);
      c.fillStyle = ACENTO;
      c.textAlign = 'center';
      if ('letterSpacing' in c) c.letterSpacing = '-0.03em';
      des.lineas.forEach(function (l, i) {
        c.fillText(l, cx, y + des.size * (1 + i * 1.06));
      });
      if ('letterSpacing' in c) c.letterSpacing = '0px';
      y += des.size * (1 + (des.lineas.length - 1) * 1.06) + des.size * 0.20;
    }

    if (P.resto) {
      var res = encajaMulti(c, P.resto.toUpperCase(), '800', U * 1.95, CW, U * 0.95, 2);
      c.fillStyle = T.titulo;
      c.textAlign = 'center';
      res.lineas.forEach(function (l, i) {
        c.fillText(l, cx, y + res.size * (1 + i * 1.12));
      });
      y += res.size * (1 + (res.lineas.length - 1) * 1.12) + res.size * 0.24;
    }
    c.textAlign = 'left';

    /* --- banda inferior con la promesa --- */
    var lineas = (P.promesa || '').split('\n').filter(Boolean);
    var pCuerpo = U * 0.92, pLh = pCuerpo * 1.5;
    var bandaAlto = lineas.length ? pLh * lineas.length + U * 2.1 : 0;
    var bandaY = H - bandaAlto - H * 0.022;

    if (lineas.length) {
      c.fillStyle = ACENTO;
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
    var gY = y + U * 1.25;
    var gAlto = (aY - U * 1.3) - gY;
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
