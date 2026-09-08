/* ==========================================================================
   Racks Academy · Catálogo de recursos
   --------------------------------------------------------------------------
   Fuente única de verdad del índice. Para publicar un recurso nuevo:

     1. Copia plantilla.html en recursos/<slug>.html y escribe el contenido.
     2. Añade una entrada aquí arriba del todo.

   Es un .js y no un .json a propósito: así el índice también funciona
   abriendo el archivo en local, sin servidor.

   Campos:
     slug     identificador estable; también es el nombre del archivo
     titulo   cómo aparece en la tarjeta
     kicker   antetítulo corto en mayúsculas
     resumen  una o dos frases
     etiquetas  lista corta para el pie de la tarjeta
     estado   'live' | 'draft'
     fecha    AAAA-MM
   ========================================================================== */

window.RACKS_RESOURCES = [
  {
    slug: 'skills-claude',
    titulo: 'Skills y configuración de Claude Code',
    kicker: 'Guía · Claude Code',
    resumen: 'Los seis trucos de configuración del creador de Claude Code, cómo instalar skills hechas por la comunidad y cómo escribir la tuya. Con los comandos y los prompts listos para copiar.',
    etiquetas: ['Claude Code', 'Skills', 'Configuración'],
    estado: 'live',
    fecha: '2026-08'
  },
  {
    slug: 'mods-claude',
    titulo: 'Tu primer mod con Claude',
    kicker: 'Guía · Modding con IA',
    resumen: 'De «quiero que el juego haga X» a un mod instalado, sin saber programar: Minecraft por datapacks, Stardew Valley con SMAPI y cómo ajustar a tu gusto mods que ya existen. Con los prompts exactos.',
    etiquetas: ['Claude Code', 'Mods', 'Videojuegos'],
    estado: 'live',
    fecha: '2026-08'
  },
  {
    slug: 'apps-claude',
    titulo: 'De idea a app con Claude',
    kicker: 'Guía · Construir con IA',
    resumen: 'Describir, probar y pedir cambios hasta tener la app publicada gratis con enlace propio. Con la vía PWA para el móvil, la nativa de iPhone y los juegos de navegador.',
    etiquetas: ['Claude Code', 'Apps', 'Sin código'],
    estado: 'live',
    fecha: '2026-08'
  },
  {
    slug: 'skill-pretest-producto',
    titulo: 'Pre-test de producto',
    kicker: 'Skill · Producto',
    resumen: 'Skill para Claude que ordena lo que sabes de un producto, detecta qué puede frenar la compra y dice si hay base para avanzar, qué cambiar o qué dato falta. Con el bloque de instrucciones listo para pegar en el chat.',
    etiquetas: ['Claude', 'Producto', 'Validación'],
    estado: 'live',
    fecha: '2026-08'
  },
  {
    slug: 'vast-ollama',
    titulo: 'Vast.ai paso a paso',
    kicker: 'Runbook · Infraestructura',
    resumen: 'Alquilar una GPU en Vast.ai y montar encima un agente de codificación con Ollama y Claude Code. Los 32 pasos, desde crear la cuenta hasta apagar la instancia sin dejarte el contador vivo.',
    etiquetas: ['Vast.ai', 'Ollama', 'Claude Code', 'GPU'],
    estado: 'live',
    fecha: '2026-08'
  }
];
