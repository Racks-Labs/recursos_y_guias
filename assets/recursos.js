/* ==========================================================================
   Racks Academy · Catálogo de recursos
   --------------------------------------------------------------------------
   Fuente única de verdad del índice y de las portadas. Para publicar un
   recurso nuevo:

     1. Copia recursos/plantilla.html en recursos/<slug>.html y escríbelo.
     2. Añade una entrada aquí arriba del todo.

   Es un .js y no un .json a propósito: así el índice también funciona
   abriendo el archivo en local, sin servidor.

   Campos:
     slug       identificador estable; también es el nombre del archivo y la
                URL pública, así que no se cambia una vez publicado
     titulo     el gancho: qué se lleva quien lo lea, no de qué trata
     kicker     antetítulo corto para la ficha
     resumen    una o dos frases
     etiquetas  lista corta para el pie de la ficha
     estado     'live' | 'draft'
     fecha      AAAA-MM

   portada · lo que pinta assets/portadas.js
     coleccion  sello de arriba a la derecha; es la colección, no el formato
                (el formato ya lo dice prefijo, y repetirlo queda pobre)
     prefijo    primera línea del título, pequeña
     destacado  la línea grande, en naranja
     resto      tercera línea, mediana
     grafico    'skills' | 'mods' | 'apps' | 'validacion' | 'gpu'; la ilustración,
                que dibuja lo que se lleva el lector, no un adorno
     color      acento de la portada, elegido por el tema del recurso
     promesa    banda inferior; una línea por salto, *entre asteriscos* va en negrita

   destacado + resto son el título de arriba partido en dos alturas: la
   portada dice exactamente lo mismo que la ficha, no un titular aparte.
   ========================================================================== */

window.RACKS_RESOURCES = [
  {
    slug: 'skills-claude',
    titulo: 'Configura Claude Code y crea tus propias skills',
    kicker: 'Guía · Claude Code',
    resumen: 'Los seis trucos de configuración del creador de Claude Code, cómo instalar skills hechas por la comunidad y cómo escribir la tuya. Con los comandos y los prompts listos para copiar.',
    etiquetas: ['Claude Code', 'Skills', 'Configuración'],
    estado: 'live',
    fecha: '2026-08',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'Configura Claude Code',
      resto: 'y crea tus propias skills',
      grafico: 'skills',
      color: '#468af6',
      promesa: 'LOS SEIS TRUCOS DE *CONFIGURACIÓN* DEL CREADOR\nY CÓMO ESCRIBIR *TU PROPIA SKILL*'
    }
  },
  {
    slug: 'mods-claude',
    titulo: 'Crea mods para tus juegos sin saber programar',
    kicker: 'Guía · Modding con IA',
    resumen: 'De «quiero que el juego haga X» a un mod instalado, sin saber programar: Minecraft por datapacks, Stardew Valley con SMAPI y cómo ajustar a tu gusto mods que ya existen. Con los prompts exactos.',
    etiquetas: ['Claude Code', 'Mods', 'Videojuegos'],
    estado: 'live',
    fecha: '2026-08',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'Crea mods para tus juegos',
      resto: 'sin saber programar',
      grafico: 'mods',
      color: '#9a72f8',
      promesa: 'DE *«QUIERO QUE EL JUEGO HAGA X»*\nA UN *MOD FUNCIONANDO*'
    }
  },
  {
    slug: 'apps-claude',
    titulo: 'De una idea a tu app publicada, sin programar',
    kicker: 'Guía · Construir con IA',
    resumen: 'Describir, probar y pedir cambios hasta tener la app publicada gratis con enlace propio. Con la vía PWA para el móvil, la nativa de iPhone y los juegos de navegador.',
    etiquetas: ['Claude Code', 'Apps', 'Sin código'],
    estado: 'live',
    fecha: '2026-08',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'De una idea a tu app publicada',
      resto: 'sin programar',
      grafico: 'apps',
      color: '#10b77f',
      promesa: 'DESCRIBIR, PROBAR Y PEDIR CAMBIOS HASTA TENER\n*TU APP CON ENLACE PROPIO*'
    }
  },
  {
    slug: 'skill-pretest-producto',
    titulo: 'Skill de validación de producto',
    kicker: 'Skill · Producto',
    resumen: 'Skill para Claude que ordena lo que sabes de un producto, detecta qué puede frenar la compra y dice si hay base para avanzar, qué cambiar o qué dato falta. Con el bloque de instrucciones listo para pegar en el chat.',
    etiquetas: ['Claude', 'Producto', 'Validación'],
    estado: 'live',
    fecha: '2026-08',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Skill:',
      destacado: 'Skill de validación',
      resto: 'de producto',
      grafico: 'validacion',
      color: '#fbba23',
      promesa: 'CÓMO SABER SI UN *PRODUCTO* TIENE BASE\nANTES DE *MOVER RECURSOS*'
    }
  },
  {
    slug: 'vast-ollama',
    titulo: 'Tu agente de IA por horas, sin suscripción',
    kicker: 'Runbook · Infraestructura',
    resumen: 'Alquilar una GPU en Vast.ai y montar encima un agente de codificación con Ollama y Claude Code. Los 32 pasos, desde crear la cuenta hasta apagar la instancia sin dejarte el contador vivo.',
    etiquetas: ['Vast.ai', 'Ollama', 'Claude Code', 'GPU'],
    estado: 'live',
    fecha: '2026-08',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Runbook:',
      destacado: 'Tu agente de IA por horas',
      resto: 'sin suscripción',
      grafico: 'gpu',
      color: '#f5911a',
      promesa: 'CÓMO ALQUILAR UNA *GPU* Y MONTAR TU AGENTE\nSIN *DEJARTE EL CONTADOR VIVO*'
    }
  }
];
