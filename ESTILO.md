# Estilo Racks Academy · recursos y guías

Este repositorio publica recursos en HTML estático con el mismo lenguaje visual
que el panel de producción (`panel-news.racks.academy`). Todo vive en
`assets/racks.css` y `assets/racks.js`. No hay compilación: se edita el HTML y
GitHub Pages lo sirve.

---

## 1. Tokens

Copiados del panel. Si allí cambia un color, se cambia en `assets/racks.css`
y todos los recursos se mueven a la vez.

| Token             | Valor     | Uso                                   | En el panel               |
|-------------------|-----------|---------------------------------------|---------------------------|
| `--deep-black`    | `#121212` | Fondo de página                       | `--color-deep-black`      |
| `--carbon`        | `#181818` | Tarjetas, paneles, índice             | `--color-carbon`          |
| `--ink`           | `#0d0d0d` | Bloques de código                     | derivado                  |
| `--watermark`     | `#151515` | La «R» gigante del fondo              | `.watermark-r`            |
| `--border-grey`   | `#333`    | Borde estándar                        | `--color-border-grey`     |
| `--border-soft`   | `#242424` | Separadores dentro de una tarjeta     | derivado                  |
| `--text-grey`     | `#9ca3af` | Texto de cuerpo                       | `--color-text-grey`       |
| `--mid-gray`      | `#686868` | Texto secundario, etiquetas           | `--color-mid-gray`        |
| `--white`         | `#fff`    | Titulares y énfasis                   | `--color-white`           |
| `--academy-orange`| `#f5911a` | Acento único                          | `--color-academy-orange`  |

Semánticos (mismos valores que el panel, en `oklch` con respaldo en hex):
`--green`, `--red`, `--blue`, `--purple`, `--yellow`.

Geometría: `--radius: .5rem` (panel `--radius-lg`), `--radius-sm: .25rem`,
`--measure: 46rem` para lectura, `--shell: 74rem` para el catálogo.

Tipografía: **Inter** en todo (300–900, desde Google Fonts) y la monoespaciada
del sistema (`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas`) para
etiquetas, código y cifras — igual que `--font-mono` en el panel.

Firmas heredadas del panel: `::selection` naranja sobre negro, la clase
`.dot-grid` (rejilla de puntos de 24 px) y `.watermark-r`.

### Reglas de uso

- **Un acento por bloque.** El naranja marca lo activo o lo importante; dos
  elementos naranjas compitiendo en la misma tarjeta anulan el efecto.
- **Jerarquía por color, no por tamaño:** blanco = titular o dato, gris =
  cuerpo, gris medio = apoyo.
- El rojo y el verde son sólo para estado (`.warn`, `.ok`, `.pill--live`),
  nunca decorativos.

---

## 2. Estructura de un recurso

```
recursos/<slug>.html      el recurso
assets/racks.css          el sistema
assets/racks.js           copiar código, índice activo, altura del iframe
assets/recursos.js        el catálogo que pinta index.html
recursos/plantilla.html   punto de partida con todos los bloques
```

Esqueleto mínimo:

```html
<body data-resource-id="slug">
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <div class="watermark-r" aria-hidden="true">R</div>
  <header class="topbar" data-embed-hide>…</header>
  <main class="shell" id="contenido">
    <div class="wrap">
      <header class="masthead">…</header>
      <section>…</section>
      <footer>…</footer>
    </div>
  </main>
</body>
```

`.wrap` da el ancho de lectura; `.wrap--wide` el ancho del catálogo.

---

## 3. Bloques

| Clase | Para qué |
|---|---|
| `.masthead` + `.eyebrow` + `.standfirst` | Cabecera del recurso |
| `.toc` | Índice; `racks.js` marca la sección visible con `.is-active` |
| `.phase` | Antetítulo de sección, sobre el `<h2>` |
| `.step` + `.step-num` + `.step-body` | Paso numerado |
| `.note` / `.warn` / `.ok` (+ `*-title`) | Aviso informativo, de peligro, de confirmación |
| `.code` + `.copy` + `<pre>` | Bloque de código con botón de copiar |
| `pre .c` / `pre .k` | Comentario / valor a sustituir dentro del código |
| `.field` (`<dt>`/`<dd>`) | Ficha de campos y parámetros |
| `.mode`, `.fork` (+ `.pick`) | Opciones; `.pick` marca la recomendada |
| `.tag` | Etiqueta corta junto a un `<h3>` |
| `.tablewrap` + `<table>` | Tabla; el envoltorio la hace scrolleable en móvil |
| `.chip`, `.btn`, `.btn--primary` | Controles |
| `.meter`, `.readout`, `.scale` | Medidores y calculadoras |
| `.res-grid`, `.res-card`, `.pill` | Tarjetas del catálogo |
| `.swatches`, `.swatch` | Muestrario de color |

`racks.js` cablea solo los `.copy` y el índice: no hace falta escribir JS para
eso en cada recurso.

---

## 4. Incrustar como iframe

Todos los recursos aceptan parámetros en la URL:

| Parámetro | Efecto |
|---|---|
| `?embed=1` | Quita barra superior, marca de agua y margen exterior |
| `&bg=transparent` | Fondo transparente: lo pone el contenedor |
| `&id=loquesea` | Identifica el recurso en los mensajes de altura |

Los elementos con `data-embed-hide` desaparecen en modo incrustado.

### Alto automático

El recurso publica su altura al contenedor cada vez que cambia:

```js
{ source: 'racks-resource', type: 'resize', id, height, url }
```

En el contenedor:

```html
<iframe id="racks" src="…/recursos/vast-ollama.html?embed=1"
        style="width:100%;height:600px;border:0;display:block"
        loading="lazy" title="Vast.ai paso a paso"></iframe>
<script>
  addEventListener('message', function (e) {
    var d = e.data;
    // en un contenedor público, comprueba también e.origin
    if (d && d.source === 'racks-resource' && d.type === 'resize') {
      document.getElementById('racks').style.height = d.height + 'px';
    }
  });
</script>
```

El contenedor puede pedir la altura en cualquier momento enviando
`{source:'racks-embed', type:'request-height'}` al iframe — útil después de
abrir un acordeón o cambiar de pestaña.

Dentro de un iframe, los enlaces externos se abren en pestaña nueva y los
internos navegan en `_top`, para no encerrar al lector dentro del marco.

---

## 5. Publicar un recurso nuevo

1. `cp recursos/plantilla.html recursos/<slug>.html` y escribe el contenido.
2. Añade la entrada en `assets/recursos.js` (arriba del todo).
3. Empuja a `main`. El workflow `.github/workflows/pages.yml` publica el sitio.

En **Settings → Pages**, el origen debe estar en **GitHub Actions**.

---

## 6. Comprobaciones antes de publicar

- Se lee bien a 360 px de ancho: las tablas van en `.tablewrap` y los pasos
  colapsan a una columna.
- El foco del teclado se ve (`:focus-visible` naranja) y el índice funciona.
- Con `?embed=1` no queda margen muerto arriba ni barra de scroll horizontal.
- El pie dice **contra qué y cuándo** se verificó el contenido.
