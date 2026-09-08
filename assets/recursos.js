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
     grafico    'skills' | 'mods' | 'apps' | 'validacion' | 'gpu' | 'webs' |
                'agentes' | 'hermes'; la ilustración,
                que dibuja lo que se lleva el lector, no un adorno
     color      acento de la portada, elegido por el tema del recurso
     promesa    banda inferior; una línea por salto, *entre asteriscos* va en negrita

   destacado + resto son el título de arriba partido en dos alturas: la
   portada dice exactamente lo mismo que la ficha, no un titular aparte.
   ========================================================================== */

window.RACKS_RESOURCES = [
  {
    slug: 'webs-ia',
    titulo: 'De 0 a 2.000 $ modernizando webs con agentes de IA',
    kicker: 'Guía · Negocio con IA',
    resumen: 'El modelo de negocio entero: sacar negocios locales de Google Maps, detectar webs desactualizadas, reconstruirlas con Claude Code y ofrecerlas ya hechas a puerta fría por email. Con la calculadora de objetivo, los precios reales y los prompts.',
    etiquetas: ['Claude Code', 'Negocio', 'Cold email'],
    estado: 'live',
    fecha: '2026-09',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'De 0 a 2.000 $',
      resto: 'modernizando webs con agentes de IA',
      grafico: 'webs',
      color: '#fbba23',
      promesa: 'ENCONTRAR, *RECONSTRUIR* Y VENDER\nA PUERTA FRÍA *DESDE EL EMAIL*'
    }
  },
  {
    slug: 'agentes-ia',
    titulo: 'Aprende a usar agentes de IA desde cero',
    kicker: 'Guía · Agentes de IA',
    resumen: 'Qué es un agente, cómo trabaja, cómo se le pide bien, cómo se le dan herramientas y permisos y cuánto cuesta. Con Claude Code, OpenClaw y Hermes instalables en diez minutos, y el glosario para no perderse.',
    etiquetas: ['Agentes', 'Claude Code', 'OpenClaw', 'Hermes'],
    estado: 'live',
    fecha: '2026-09',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'Aprende a usar agentes de IA',
      resto: 'desde cero',
      grafico: 'agentes',
      color: '#468af6',
      promesa: 'QUÉ SON, CÓMO SE LES PIDE Y CÓMO *NO LIARLA*\nCON *CLAUDE CODE*, OPENCLAW Y HERMES'
    }
  },
  {
    slug: 'hermes',
    titulo: 'Instala y domina Hermes, el agente que aprende contigo',
    kicker: 'Guía · Hermes Agent',
    resumen: 'Instalación y uso completo de Hermes Agent, el agente open source de Nous Research: de la terminal a tu Telegram, con skills que crea él solo, memoria entre sesiones, tareas programadas y la seguridad bien puesta.',
    etiquetas: ['Hermes', 'Agentes', 'Telegram', 'Open source'],
    estado: 'live',
    fecha: '2026-09',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'Instala y domina Hermes',
      resto: 'el agente que aprende contigo',
      grafico: 'hermes',
      color: '#9a72f8',
      promesa: 'DE LA TERMINAL A *TU TELEGRAM*\nCON SKILLS, MEMORIA Y *TAREAS PROGRAMADAS*'
    }
  },
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
