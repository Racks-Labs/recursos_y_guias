# Cómo se trabaja en este repositorio

Recursos y guías en HTML estático, con el estilo del sistema de producción de
Racks, publicados en GitHub Pages y pensados para incrustarse como iframe.

No hay compilación ni dependencias: se edita HTML y se empuja. Todo lo que
comparten los recursos vive en `assets/`.

```
index.html              catálogo: fichas, portadas y código de incrustación
recursos/<slug>.html    un archivo por recurso
recursos/plantilla.html punto de partida, con todos los bloques montados
assets/racks.css        tokens y bloques · fuente única del estilo
assets/racks.js         copiar código, índice activo, altura del iframe
assets/recursos.js      el catálogo · fuente única de qué existe
assets/portadas.js      las portadas, dibujadas en canvas
assets/fonts/           Inter y JetBrains Mono auto-alojadas
ESTILO.md               la referencia larga del sistema
```

---

## Publicar un recurso nuevo

1. **`cp recursos/plantilla.html recursos/<slug>.html`** y escribe el contenido.
   El slug es la URL pública: se elige una vez y no se cambia nunca más.
2. **Da de alta la entrada en `assets/recursos.js`**, arriba del todo. El
   índice y la portada se generan solos desde ahí; no hay nada que duplicar.
3. **Verifica en navegador** (ver más abajo) antes de empujar.
4. **Empuja a `main`.** El workflow de Pages publica solo.

Si el recurso nació en la raíz del repositorio, muévelo a `recursos/` y deja
en la ruta antigua un stub de redirección — hay cinco de ejemplo en la raíz.
Los enlaces publicados no se rompen nunca.

---

## Lo que no se negocia

### El estilo sale de producción, no se inventa

Los tokens de `assets/racks.css` están copiados del tema oscuro de
`learn.racks.university` y del panel. Si hace falta un valor nuevo, se saca de
ahí — no se elige a ojo.

Aviso por experiencia: la hoja compilada del panel trae variables de Tailwind
**sin sobrescribir** (`--font-mono`, `--radius`). No sirven. La referencia
buena es `learn.racks.university`.

- **Inter** para el texto y **JetBrains Mono** para código, etiquetas en
  mayúsculas, numeración y cifras.
- **Esquinas rectas.** `--radius: 0` en todo: tarjetas, botones, código,
  fichas, píldoras. Redondear una esquina es salirse del sistema.
- **Un acento por bloque.** Dos elementos naranjas compitiendo se anulan.
- Jerarquía por color: `#f7f7f7` titular, `#c7c7c7` cuerpo, `#9ca3b0` apoyo,
  `#696969` lo prescindible.

### Las fuentes van auto-alojadas

Están en `assets/fonts/` (OFL 1.1, ver `LICENCIAS.md`). **No vuelvas a añadir
un `<link>` a Google Fonts**: un recurso incrustado en otra web no debe
depender de un tercero para pintarse bien. La página no hace ni una petición
externa, y así se queda.

### El índice va con clave, los recursos no

`index.html` carga `assets/acceso.js` de forma **síncrona en el `<head>`**: marca
`is-locked` antes del primer pintado y el catálogo no llega a asomar. Lo que el
índice monte al cargar va dentro de `RacksAcceso.cuandoAbra(...)`.

La clave **no está en el repositorio**. Sólo vive su huella (PBKDF2-SHA256,
250.000 vueltas, sal `racks-academy/indice/v1`). Para cambiarla, genera la
nueva y sustituye `HUELLA` en `assets/acceso.js`:

```sh
python3 -c "import hashlib,binascii;print(binascii.hexlify(hashlib.pbkdf2_hmac('sha256',b'LA-CLAVE',b'racks-academy/indice/v1',250000,32)).decode())"
```

Sube también el número de `MEMORIA` (`racks.acceso.indice.v1`) si quieres echar
a quien ya tenía el acceso guardado en su navegador.

Dos cosas que conviene tener claras:

- **Los recursos siguen abiertos**, a propósito. Cerrarlos rompería la
  incrustación, que es para lo que existen.
- **Es una puerta de navegador, no un muro.** Frena a quien llega por la URL;
  no a quien lee el código. Si algún día hace falta de verdad, toca servidor.

### Desde un recurso no se vuelve al índice

Ni botón, ni el nombre de la barra, ni enlace en el cuerpo o el pie. La barra
superior es texto, no navegación. La plantilla ya viene así.

### Los títulos venden el beneficio

El `titulo` dice **qué se lleva quien lo lea**, no de qué trata:

- «Pre-test de producto» → «Skill de validación de producto»
- «Vast.ai paso a paso» → «Tu agente de IA por horas, sin suscripción»

El titular editorial dentro de la guía es otra cosa y se respeta: es su voz.
Cambiar el título toca el catálogo, el `<title>` y la miga de pan — **nunca
el slug**.

---

## Portadas

Las dibuja `assets/portadas.js` en canvas, con las fuentes del sistema. No hay
imágenes que mantener: salen siempre al día con el catálogo. Se descargan
desde cada ficha del índice, en dos versiones que sólo cambian la firma
(Carlos Adams / Jaime Racks), en PNG 2400×3000.

Tres reglas, las tres aprendidas a base de rehacerlas:

1. **El título de la portada es el del recurso.** `portada.destacado` +
   `portada.resto` son el `titulo` partido en dos alturas. Concatenados tienen
   que reproducirlo. No se inventa un titular aparte para la portada.
2. **Cada recurso, su ilustración.** `portada.grafico` apunta a una función de
   `GRAFICOS`. Dibuja **lo que se lleva el lector**, no un adorno, y no se
   reutiliza entre recursos: si dos portadas llevan el mismo dibujo, están mal.
   Para una nueva: una función más en `GRAFICOS` — recibe un cuadrado y la
   unidad tipográfica, y pinta con el acento del recurso.
3. **Cada recurso, su color.** `portada.color`, elegido por el tema y sacado de
   los semánticos del sistema (`#468af6` azul, `#9a72f8` morado, `#10b77f`
   verde, `#fbba23` ámbar, `#f5911a` naranja). El acento es lo único que varía.

El sello de arriba es la **colección**, no el formato: el formato ya lo dice
`prefijo` y repetirlo queda pobre.

---

## Incrustación

Todos los recursos aceptan `?embed=1` (quita barra, marca de agua y margen),
`&bg=transparent` y `&id=`. El recurso publica su altura al contenedor con
`postMessage` y responde a `request-height`. Está documentado en el índice y
en `ESTILO.md`; si tocas `assets/racks.js`, no rompas ese contrato.

---

## Verificar antes de empujar

Sirve un servidor estático y ábrelo con un navegador de verdad. En este
entorno hay Playwright y Chromium ya instalados. Comprueba:

- **Cero errores** de consola y de red. Si algo falla, no se empuja.
- Las **dos fuentes** cargan (`document.fonts`), y el radio es `0px`.
- **Ningún enlace al índice** desde un recurso, ni suelto ni con `?embed=1`.
- **Sin desbordamiento horizontal a 360 px.**
- Con `?embed=1`, sin margen muerto arriba, y la altura llega al contenedor.
- Si tocaste portadas: **las 5 × 2 combinaciones** renderizan sin colisiones y
  la descarga da un PNG real de 2400×3000.
- Si portaste contenido de un archivo a otro, **diff del texto plano** contra
  el original: no se pierde ni una frase.

---

## Empujar

`main` es la rama de publicación y el workflow de Pages sólo dispara ahí.

Suele haber **varias sesiones trabajando en paralelo** sobre este repositorio:
antes de empujar, `git fetch origin main` y mira si ha avanzado. Si aparece un
recurso nuevo con estilo viejo o con enlaces al índice, arréglalo en el mismo
empujón — si no, `main` queda incoherente.

`assets/racks.css`, `assets/recursos.js` y `assets/portadas.js` los tocan
todas las sesiones: ahí es donde chocan los merges.

**Pendiente de configuración manual:** en Settings → Pages, el origen tiene que
estar en **GitHub Actions**. Mientras siga en «Deploy from a branch» el
workflow corre pero no publica nada.
