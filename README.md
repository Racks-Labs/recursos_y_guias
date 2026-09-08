# Recursos y guías · Racks Academy

Recursos en HTML estático con el estilo del sistema de producción de Racks
(Inter + JetBrains Mono, esquinas rectas, acento naranja), publicados en
GitHub Pages y listos para incrustar como iframe en cualquier página.

- **Índice:** `index.html` — catálogo, generador de código de incrustación y
  resumen del sistema de estilo.
- **Recursos:** `recursos/` — un archivo por recurso. Hoy: las guías de
  modernizar webs con agentes de IA (`webs-ia`), de agentes de IA desde cero
  (`agentes-ia`) y de Hermes (`hermes`); las de skills, mods y apps con
  Claude; la Skill de pre-test de producto y el runbook de Vast.ai.
- **Sistema:** `assets/racks.css` (tokens y bloques) y `assets/racks.js`
  (copiar código, índice activo, altura automática dentro de un iframe).
- **Punto de partida:** `recursos/plantilla.html`.
- **Referencia:** [ESTILO.md](ESTILO.md).

## Incrustar

```html
<iframe id="racks" src="…/recursos/vast-ollama.html?embed=1"
        style="width:100%;height:600px;border:0;display:block"
        loading="lazy" title="Vast.ai paso a paso"></iframe>
<script>
  addEventListener('message', function (e) {
    var d = e.data;
    if (d && d.source === 'racks-resource' && d.type === 'resize') {
      document.getElementById('racks').style.height = d.height + 'px';
    }
  });
</script>
```

Con `?embed=1` el recurso se sirve sin barra superior, sin marca de agua y sin
margen exterior. Añade `&bg=transparent` para que el fondo lo ponga el
contenedor.

## Publicar

No hay compilación. Se edita el HTML y se empuja a `main`; el workflow
`.github/workflows/pages.yml` sube el repositorio a Pages. El origen de
**Settings → Pages** debe ser **GitHub Actions**.

Para añadir un recurso: copia `recursos/plantilla.html` a `recursos/<slug>.html` y
registra la entrada en `assets/recursos.js`.
