# Estilo Racks Academy · recursos y guías

Este repositorio publica recursos en HTML estático con el lenguaje visual del
sistema de producción de Racks — el tema oscuro de `learn.racks.university` y
el panel `panel-news.racks.academy`. Todo vive en `assets/racks.css` y
`assets/racks.js`. No hay compilación: se edita el HTML y GitHub Pages lo sirve.

Tres cosas definen la casa: **Inter y JetBrains Mono**, **esquinas rectas** y
**un solo acento naranja**.

---

## 1. Tokens

Son los del sistema de producción: el tema oscuro de `learn.racks.university`
y el panel `panel-news.racks.academy`. No son aproximaciones — están copiados
de la hoja compilada que sirven esas aplicaciones. Si allí cambia un valor, se
cambia en `assets/racks.css` y todos los recursos se mueven a la vez.

### Superficies y líneas

| Token              | Valor     | Uso                                  |
|--------------------|-----------|--------------------------------------|
| `--surface-deep`   | `#0a0a0a` | Pozos: bloques de código             |
| `--background`     | `#121212` | Fondo de página                      |
| `--card`           | `#171717` | Tarjetas, paneles, índice            |
| `--surface-raised` | `#1a1a1a` | Tarjeta en hover                     |
| `--muted`          | `#262626` | Relleno apagado, código en línea     |
| `--border`         | `#333`    | Borde estándar                       |
| `--line`           | `#292929` | Separadores dentro de una tarjeta    |
| `--watermark`      | `#171717` | La «R» del fondo                     |

### Texto

| Token                | Valor     | Uso                        |
|----------------------|-----------|----------------------------|
| `--foreground`       | `#f7f7f7` | Titulares y énfasis        |
| `--card-foreground`  | `#ededed` | Texto dentro de código     |
| `--text-secondary`   | `#c7c7c7` | Cuerpo                     |
| `--muted-foreground` | `#9ca3b0` | Secundario, etiquetas      |
| `--mid-gray`         | `#696969` | Apoyo, numeración de pasos |

### Marca y semánticos

| Token                    | Valor     | Uso                        |
|--------------------------|-----------|----------------------------|
| `--academy-orange`       | `#f5911a` | Acento único               |
| `--academy-orange-dark`  | `#d87c00` | Hover del botón primario   |
| `--accent-green`         | `#10b77f` | `.ok`, estado publicado    |
| `--accent-blue`          | `#468af6` | `.note`, flujos            |
| `--accent-purple`        | `#9a72f8` | Reservado                  |
| `--warning`              | `#fbba23` | `.caution`, borrador       |
| `--destructive`          | `#ef4d4d` | `.warn`                    |

### Tipografía

```css
--font-sans: Inter, "Helvetica Neue", Arial, sans-serif;
--font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace;
```

**Inter** para el texto y **JetBrains Mono** para código, etiquetas en
mayúsculas, numeración de pasos y cifras. Son las dos fuentes de la casa: no
se sustituye la mono por la del sistema, porque se nota en todo el documento.
Se cargan desde Google Fonts en el `<head>` de cada recurso.

### Geometría

```css
--radius: 0;        /* el sistema es de esquina recta, en todo */
--measure: 46rem;   /* ancho de lectura de un recurso */
--shell: 74rem;     /* ancho del catálogo */
```

El radio **es cero**: tarjetas, botones, fichas, bloques de código y píldoras.
Redondear una esquina es salirse del sistema.

### Firmas de la casa

- `::selection` naranja sobre el fondo de página.
- `.watermark-r`: la **R** de 400 px, peso 800, en `#171717`, abajo a la
  derecha. Se oculta en modo incrustado y al imprimir.
- `.dot-grid`: rejilla de puntos de 24 px.
- Barra de scroll fina, en `--line` sobre transparente.

### Reglas de uso

- **Un acento por bloque.** El naranja marca lo activo o lo importante; dos
  elementos naranjas compitiendo en la misma tarjeta anulan el efecto.
- **Jerarquía por color, no por tamaño:** `#f7f7f7` titular o dato, `#c7c7c7`
  cuerpo, `#9ca3b0` apoyo, `#696969` lo prescindible.
- El rojo, el verde y el ámbar son sólo para estado (`.warn`, `.ok`,
  `.caution`, `.pill--*`), nunca decorativos.

## 2. Estructura de un recurso

```
recursos/<slug>.html      el recurso
assets/racks.css          el sistema
assets/racks.js           copiar código, índice activo, altura del iframe
assets/recursos.js        el catálogo que pinta index.html
assets/portadas.js        las portadas, dibujadas en canvas
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
| `.note` / `.warn` / `.ok` / `.caution` (+ `*-title`) | Aviso informativo, de peligro, de confirmación, de precaución |
| `.code` + `.copy` + `<pre>` | Bloque de código con botón de copiar |
| `pre .c` / `pre .k` | Comentario / valor a sustituir dentro del código |
| `.field` (`<dt>`/`<dd>`) | Ficha de campos y parámetros |
| `.mode`, `.fork` (+ `.pick`) | Opciones; `.pick` marca la recomendada |
| `.tag` | Etiqueta corta junto a un `<h3>` |
| `.tablewrap` + `<table>` | Tabla; el envoltorio la hace scrolleable en móvil |
| `.chip`, `.btn`, `.btn--primary` | Controles; un `.chip` en `<span>` es etiqueta estática, en `<button>` es interactivo |
| `.launch` + `.launch-label` | Panel de arranque: para qué sirve y frase con la que empezar |
| `.verdict-card` + `.go` / `.hold` / `.stop` | Veredictos en semáforo: avanzar, esperar, parar |
| `.lead-list` | Lista destacada, con los `<strong>` en blanco |
| `.meter`, `.readout`, `.scale` | Medidores y calculadoras |
| `.res-grid`, `.res-card`, `.pill` | Tarjetas del catálogo |
| `.swatches`, `.swatch` | Muestrario de color |

`racks.js` cablea solo los `.copy` y el índice: no hace falta escribir JS para
eso en cada recurso.

Hay hoja de impresión: al imprimir o exportar a PDF, el recurso sale en tinta
negra sobre blanco, sin barra ni marca de agua, y con la URL detrás de cada
enlace externo — el mismo criterio que learn.racks.university con sus guías.

---

## 3 bis. Portadas

Cada recurso tiene portada, y la dibuja `assets/portadas.js` en un `<canvas>`
con las fuentes del sistema — no hay imágenes que mantener: la portada sale
siempre al día con lo que diga el catálogo.

Salen **dos versiones por recurso**, idénticas salvo la firma: **Carlos Adams**
y **Jaime Racks**. Se descargan desde los botones de cada ficha del índice, en
PNG de 2400×3000 (el doble del lienzo de 1200×1500, proporción 4:5).

La composición, de arriba abajo:

| Zona | De dónde sale |
|---|---|
| Sello arriba a la derecha | `portada.coleccion` — la colección, no el formato |
| Título en tres alturas | `portada.prefijo` · `portada.destacado` (en color) · `portada.resto` |
| Ilustración | `portada.grafico` |
| Firma entre filetes | el autor elegido |
| Banda inferior | `portada.promesa`; una línea por salto, `*entre asteriscos*` va en negrita |

**El título de la portada es el de la ficha.** `destacado` + `resto` son el
`titulo` del recurso partido en dos alturas, no un titular aparte: si cambia
el nombre del recurso, cambia la portada.

**Cada recurso tiene su color y su ilustración**, elegidos por lo que enseña.
No son adorno: dicen lo que se lleva el lector.

| Recurso | Color | Ilustración |
|---|---|---|
| Claude Code y skills | `#468af6` azul | terminal con skills acoplándose |
| Mods | `#9a72f8` morado | bloques de juego, y uno que añades tú |
| Apps | `#10b77f` verde | móvil publicado, con su enlace |
| Validación | `#fbba23` ámbar | veredicto: avanzar, esperar, parar |
| GPU por horas | `#f5911a` naranja | tarjeta gráfica y contador |

Los colores salen todos de los semánticos del sistema (sección 1): el acento
de la portada cambia, el resto del lenguaje no.

Para una ilustración nueva: una función más en `GRAFICOS`, dentro de
`assets/portadas.js`, y su nombre en `portada.grafico`. Recibe un cuadrado y
la unidad tipográfica, y pinta con el acento del recurso.

Para añadir un autor: una entrada más en `AUTORES`. El índice se rehace solo.

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
