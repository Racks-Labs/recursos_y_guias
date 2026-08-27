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
    slug: 'vast-ollama',
    titulo: 'Vast.ai paso a paso',
    kicker: 'Runbook · Infraestructura',
    resumen: 'Alquilar una GPU en Vast.ai y montar encima un agente de codificación con Ollama y Claude Code. Los 32 pasos, desde crear la cuenta hasta apagar la instancia sin dejarte el contador vivo.',
    etiquetas: ['Vast.ai', 'Ollama', 'Claude Code', 'GPU'],
    estado: 'live',
    fecha: '2026-08'
  }
];
