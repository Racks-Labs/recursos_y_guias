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
                'agentes' | 'hermes' | 'conceptos' | 'encargo' | 'pipeline' |
                'ugc' | 'guiones' | 'fotos' | 'metodo' | 'loops' | 'rodaje' | 'radar' |
                'cerebro' | 'reparto' | 'montaje' |
                'termometro' | 'sobre' | 'humanizar' | 'entrevista' | 'panel' | 'tutor'; la ilustración,
                que dibuja lo que se lleva el lector, no un adorno
     color      acento de la portada, elegido por el tema del recurso
     promesa    banda inferior; una línea por salto, *entre asteriscos* va en negrita

   destacado + resto son el título de arriba partido en dos alturas: la
   portada dice exactamente lo mismo que la ficha, no un titular aparte.
   ========================================================================== */

window.RACKS_RESOURCES = [
  {
    slug: 'skill-predictor-viralidad',
    titulo: 'Predice si tu reel va a funcionar antes de publicarlo',
    kicker: 'Skill · Reels',
    resumen: 'Skill para Claude que puntúa sobre 100 el guion o la transcripción de un reel antes de publicarlo, señala el segundo exacto en el que se irá la gente y lo reescribe con un gancho mejor, un bucle abierto y un CTA que genere comentarios.',
    etiquetas: ['Claude', 'Skills', 'Reels', 'Guiones'],
    estado: 'live',
    fecha: '2026-11',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Skill:',
      destacado: 'Predice si tu reel va a funcionar',
      resto: 'antes de publicarlo',
      grafico: 'termometro',
      color: '#f5911a',
      promesa: 'TU GUION, *PUNTUADO SOBRE 100*\nY REESCRITO PARA *RETENER MÁS*'
    }
  },
  {
    slug: 'skill-email-que-convierte',
    titulo: 'Reescribe tus emails para que hagan clic',
    kicker: 'Skill · Email',
    resumen: 'Skill para Claude que puntúa tu email de venta, newsletter o secuencia en siete puntos, señala las tres frases que más conversión matan y te lo devuelve reescrito, con cinco asuntos alternativos y una versión corta para hacer test A/B.',
    etiquetas: ['Claude', 'Skills', 'Email', 'Copywriting'],
    estado: 'live',
    fecha: '2026-11',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Skill:',
      destacado: 'Reescribe tus emails',
      resto: 'para que hagan clic',
      grafico: 'sobre',
      color: '#468af6',
      promesa: 'MÁS GENTE *LO ABRE*, LO LEE\nY *HACE CLIC*'
    }
  },
  {
    slug: 'skill-humanizador',
    titulo: 'Haz que tus textos con IA suenen a ti',
    kicker: 'Skill · Escritura',
    resumen: 'Skill para Claude que detecta las marcas de un texto escrito con IA —las rayas, el «no es solo X, es Y», los tríos, las palabras de siempre— y lo reescribe para que suene a persona y a tu voz, con lo que ha cambiado y una nota de «cuánto suena a IA» antes y después.',
    etiquetas: ['Claude', 'Skills', 'Escritura', 'Copywriting'],
    estado: 'live',
    fecha: '2026-11',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Skill:',
      destacado: 'Haz que tus textos con IA',
      resto: 'suenen a ti',
      grafico: 'humanizar',
      color: '#9a72f8',
      promesa: 'SIN *MARCAS DE IA*\nY CON *TU VOZ*'
    }
  },
  {
    slug: 'skill-ideas-10-minutos',
    titulo: '20 ideas de contenido que solo tú puedes contar',
    kicker: 'Skill · Ideas de contenido',
    resumen: 'Skill para Claude que te entrevista durante unos diez minutos, con diez preguntas de una en una, y saca de tus respuestas veinte ideas de contenido con su gancho y su formato. Marca las tres con más potencial y escribe el guion de la primera.',
    etiquetas: ['Claude', 'Skills', 'Contenido', 'Ideas'],
    estado: 'live',
    fecha: '2026-11',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Skill:',
      destacado: '20 ideas de contenido',
      resto: 'que solo tú puedes contar',
      grafico: 'entrevista',
      color: '#fbba23',
      promesa: 'DIEZ PREGUNTAS SOBRE *TU EXPERIENCIA*\nY *VEINTE IDEAS* QUE SALEN DE AHÍ'
    }
  },
  {
    slug: 'skill-validacion-producto-v2',
    titulo: 'Pon tu producto delante de cinco clientes antes de lanzarlo',
    kicker: 'Skill · Producto',
    resumen: 'Versión 2.0 del validador de producto: Claude simula a cinco clientes distintos de tu avatar, les pregunta si lo comprarían y a qué precio, puntúa dolor, dinero, competencia, diferencia y canal, y te da un veredicto y un plan de validación en 48 horas con clientes reales.',
    etiquetas: ['Claude', 'Skills', 'Producto', 'Validación'],
    estado: 'live',
    fecha: '2026-11',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Skill:',
      destacado: 'Pon tu producto delante de cinco clientes',
      resto: 'antes de lanzarlo',
      grafico: 'panel',
      color: '#10b77f',
      promesa: 'CINCO CLIENTES SIMULADOS\nY UN *PLAN DE 48 HORAS* CON CLIENTES REALES'
    }
  },
  {
    slug: 'skill-aprendizaje-personalizado',
    titulo: 'Aprende cualquier tema con un tutor a tu medida',
    kicker: 'Skill · Aprendizaje',
    resumen: 'Skill para Claude que lo convierte en un tutor particular: diagnostica lo que sabes, divide el tema en bloques, explica con ejemplos de tu mundo, te hace practicar de memoria y te deja preguntas de repaso para mañana, dentro de tres días y dentro de una semana.',
    etiquetas: ['Claude', 'Skills', 'Aprendizaje'],
    estado: 'live',
    fecha: '2026-11',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Skill:',
      destacado: 'Aprende cualquier tema',
      resto: 'con un tutor a tu medida',
      grafico: 'tutor',
      color: '#468af6',
      promesa: 'DIAGNÓSTICO, *PRÁCTICA ACTIVA*\nY *REPASO ESPACIADO*'
    }
  },
  {
    slug: 'edicion-video-claude',
    titulo: 'Edita tus vídeos con Claude sin abrir Premiere',
    kicker: 'Guía · Edición de vídeo',
    resumen: 'Los 5 flujos que usamos para editar con Claude Code, con los prompts listos para copiar: montar un reel desde las tomas, centrar la cara en vertical, 10 carruseles en una hora, anuncios montados solos y 10 versiones de un vídeo. Con el caso real del Racks Friday y la revisión antes de publicar.',
    etiquetas: ['Claude Code', 'Vídeo', 'ffmpeg', 'Prompts'],
    estado: 'live',
    fecha: '2026-11',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'Edita tus vídeos con Claude',
      resto: 'sin abrir Premiere',
      grafico: 'montaje',
      color: '#f5911a',
      promesa: 'LOS *5 FLUJOS* QUE USAMOS PARA EDITAR\nCON LOS *PROMPTS LISTOS* PARA COPIAR'
    }
  },
  {
    slug: 'skill-reel-5-piezas',
    titulo: 'Saca cinco piezas de cada reel que funciona',
    kicker: 'Skill · Contenido',
    resumen: 'Skill para Claude que convierte la transcripción de un reel, TikTok o vídeo en un carrusel, un post de texto, un email, una secuencia de stories y un guion nuevo, con el calendario para publicarlas sin que se pisen. Lista para copiar o descargar como SKILL.md.',
    etiquetas: ['Claude', 'Skills', 'Contenido', 'Reels'],
    estado: 'live',
    fecha: '2026-11',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Skill:',
      destacado: 'Saca cinco piezas',
      resto: 'de cada reel que funciona',
      grafico: 'reparto',
      color: '#9a72f8',
      promesa: 'UN VÍDEO QUE YA FUNCIONÓ\nCONVERTIDO EN *CINCO FORMATOS*'
    }
  },
  {
    slug: 'deepseek-agente',
    titulo: 'Tu agente con DeepSeek por unos pocos dólares al mes',
    kicker: 'Guía · DeepSeek V4.1 Flash',
    resumen: 'Cómo conectar DeepSeek V4.1 Flash, el modelo abierto de DeepSeek, a tu agente: la API key, Claude Code en diez minutos, OpenCode y cualquier agente compatible con OpenAI, lo que cuesta de verdad y qué significa que los pesos sean tuyos. Con cinco tareas para estrenarlo.',
    etiquetas: ['DeepSeek', 'Claude Code', 'Agentes', 'Modelos abiertos'],
    estado: 'live',
    fecha: '2026-11',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'Tu agente con DeepSeek',
      resto: 'por unos pocos dólares al mes',
      grafico: 'cerebro',
      color: '#fbba23',
      promesa: 'UN CEREBRO *ABIERTO* PARA TU AGENTE\nEN *CLAUDE CODE EN DIEZ MINUTOS*'
    }
  },
  {
    slug: 'herramientas-ia-futuro',
    titulo: 'Las herramientas de IA que siguen y las que puedes dejar de pagar',
    kicker: 'Listado · Herramientas de IA',
    resumen: 'Qué herramientas de IA tienen futuro, cuáles están en riesgo y cuáles puedes dar de baja hoy, con Claude en el centro: Higgsfield, ElevenLabs, Notion, Canva, Runway, Sora, Apple Intelligence y más. Con el motivo de cada veredicto, qué usar en su lugar y las fuentes.',
    etiquetas: ['Claude', 'Herramientas', 'Conectores', 'Listado'],
    estado: 'live',
    fecha: '2026-10',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Listado:',
      destacado: 'Las herramientas de IA que siguen',
      resto: 'y las que puedes dejar de pagar',
      grafico: 'radar',
      color: '#10b77f',
      promesa: 'FUTURO, EN RIESGO O *ACABADA*\nCON *CLAUDE EN EL CENTRO*'
    }
  },
  {
    slug: 'workflows-video-marcas',
    titulo: 'Los tres vídeos con IA que más venden a marcas',
    kicker: 'Guía · Vídeo con IA para marcas',
    resumen: 'Los workflows con mayor retorno: arrancar con los archivos del cliente y Higgsfield conectado a ChatGPT o Claude, tomas de dron de una propiedad para anuncios inmobiliarios sin dron, y tres anuncios UGC del mismo producto para testear cuál vende. Con el prompt de cada uno listo para copiar.',
    etiquetas: ['Higgsfield', 'ChatGPT', 'Claude', 'Vídeo'],
    estado: 'live',
    fecha: '2026-10',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'Los tres vídeos con IA',
      resto: 'que más venden a marcas',
      grafico: 'rodaje',
      color: '#9a72f8',
      promesa: 'LOS WORKFLOWS *CON MAYOR ROI*\nCON EL PROMPT DE CADA UNO *LISTO PARA COPIAR*'
    }
  },
  {
    slug: 'seis-agentes-empresa',
    titulo: 'Los seis agentes de IA por los que paga una empresa',
    kicker: 'Guía · Agentes para empresas',
    resumen: 'El Buzón, la Calculadora, la Cinta, la Memoria, el Aviso y el Relevo: qué hace cada uno, un ejemplo concreto, lo que le quita de encima al dueño y lo que necesita para no liarla. Con el orden en que se montan.',
    etiquetas: ['Agentes', 'Empresas', 'Automatización'],
    estado: 'live',
    fecha: '2026-10',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'Los seis agentes de IA',
      resto: 'por los que paga una empresa',
      grafico: 'loops',
      color: '#468af6',
      promesa: 'UN *EJEMPLO* DE CADA UNO Y LO QUE\nLE QUITA DE ENCIMA *AL DUEÑO*'
    }
  },
  {
    slug: 'metodo-cerrar-clientes',
    titulo: 'El método con el que cerramos clientes de automatización',
    kicker: 'Método · Negocio con agentes',
    resumen: 'Cómo cerramos clientes de automatización con agentes en Racks: el caso del instalador eléctrico que pasó de un día de cálculos a 2 minutos, las cuatro fases del método y el filtro para saber si eres la persona que lo tiene que aplicar.',
    etiquetas: ['Agentes', 'Negocio', 'Ventas'],
    estado: 'live',
    fecha: '2026-10',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'El método con el que cerramos',
      resto: 'clientes de automatización',
      grafico: 'metodo',
      color: '#f5911a',
      promesa: 'DE *UN DÍA DE CÁLCULOS* A DOS MINUTOS\nY CÓMO SE *VENDE ESE TIEMPO*'
    }
  },
  {
    slug: 'prompts-fotos-scroll',
    titulo: '3 prompts para que tus fotos paren el scroll',
    kicker: 'Prompts · Imagen con IA',
    resumen: 'Sube una foto de tu cara a Magnific, pega el prompt y genera en 4:5. Tres ilusiones ópticas listas para copiar: minifigura cabezona, cabeza gigante en Mallorca y gigante sobre la Puerta de Alcalá.',
    etiquetas: ['Magnific', 'Imagen', 'Prompts'],
    estado: 'live',
    fecha: '2026-09',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Recurso:',
      destacado: '3 prompts para que tus fotos',
      resto: 'paren el scroll',
      grafico: 'fotos',
      color: '#468af6',
      promesa: 'SUBE *TU CARA*, PEGA EL PROMPT\nY GENERA *EN 4:5*'
    }
  },
  {
    slug: 'guiones-con-tu-voz',
    titulo: 'Treinta días de guiones con tu voz y la skill que los escribe',
    kicker: 'Guía · Contenido con IA',
    resumen: 'Los tres prompts del reel, completos: el estratega que analiza lo que funciona en tu nicho, los treinta días de guiones con tu voz y el calendario por horas, y skill-creator para convertir tu voz en una skill que escribe un guion cada vez que le das un tema. Con lo que hay que preparar antes para que no se invente nada.',
    etiquetas: ['Claude', 'Contenido', 'Skills', 'Reels'],
    estado: 'live',
    fecha: '2026-09',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'Treinta días de guiones con tu voz',
      resto: 'y la skill que los escribe',
      grafico: 'guiones',
      color: '#fbba23',
      promesa: 'LOS TRES PROMPTS Y LA *SKILL* QUE ESCRIBE\nCOMO TÚ *CADA VEZ QUE LE DAS UN TEMA*'
    }
  },
  {
    slug: 'avatares-ugc-higgsfield',
    titulo: 'Avatares UGC que no parecen IA, con Higgsfield',
    kicker: 'Guía · Vídeo UGC con IA',
    resumen: 'La cadena entera para producir un anuncio UGC con avatar en Higgsfield: qué modelo va en cada paso, el storyboard de ocho casillas que se convierte en ocho cortes, el pase anti-slop y las plantillas de cada prompt. Con las frases obligatorias, las que arruinan el render y la tabla de fallos.',
    etiquetas: ['Higgsfield', 'UGC', 'Vídeo', 'Prompts'],
    estado: 'live',
    fecha: '2026-09',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'Avatares UGC que no parecen IA',
      resto: 'con Higgsfield',
      grafico: 'ugc',
      color: '#9a72f8',
      promesa: 'LOS CUATRO MODELOS *EN ORDEN*\nY LA PLANTILLA DE *CADA PROMPT*'
    }
  },
  {
    slug: 'equipo-marketing-claude',
    titulo: 'Un equipo de marketing completo con Claude, que trabaja solo',
    kicker: 'Guía · Marketing con IA',
    resumen: 'El pipeline entero, de la tarjeta en Notion a la pieza lista para publicar: la carpeta de marca, el prompt que define los seis roles, la skill que lo fija, los conectores de Notion, Figma y Canva y el disparador. Con los prompts exactos para copiar y los tres puntos donde intervienes tú.',
    etiquetas: ['Claude', 'Marketing', 'Skills', 'Notion'],
    estado: 'live',
    fecha: '2026-09',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'Un equipo de marketing completo',
      resto: 'con Claude, que trabaja solo',
      grafico: 'pipeline',
      color: '#468af6',
      promesa: 'LO QUE USAMOS *EN NUESTRA EMPRESA*:\nDE LA CARPETA DE MARCA A *NOTION*'
    }
  },
  {
    slug: 'clonar-web-negocio',
    titulo: 'Claude + Google Maps: webs de negocios locales que puedes vender',
    kicker: 'Runbook · Negocio con IA',
    resumen: 'La sesión entera, paso a paso: sacar negocios locales de un enlace de Google Maps, reconstruir la web de uno con Claude Code, publicarla en Vercel con su enlace propio y salir con el correo de contacto y el de seguimiento ya escritos.',
    etiquetas: ['Claude Code', 'Vercel', 'Next.js', 'Negocio'],
    estado: 'live',
    fecha: '2026-09',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Runbook:',
      destacado: 'Claude + Google Maps',
      resto: 'webs de negocios locales que puedes vender',
      grafico: 'encargo',
      color: '#9a72f8',
      promesa: 'DEL MAPA A UNA WEB *PUBLICADA*\nY EL CORREO *YA ESCRITO*'
    }
  },
  {
    slug: 'conceptos-claude-code',
    titulo: 'Todos los conceptos de Claude Code, explicados en cristiano',
    kicker: 'Guía · Claude Code de cero',
    resumen: 'Los treinta términos que sueltan en cualquier vídeo de Claude Code —contexto, tokens, skills, MCP, hooks, subagentes, checkpoints—: qué es cada uno, para qué sirve y cuándo se usa. Con el vídeo de 34 minutos arriba y la chuleta al final.',
    etiquetas: ['Claude Code', 'Conceptos', 'Vídeo'],
    estado: 'live',
    fecha: '2026-09',
    portada: {
      coleccion: 'Colección Racks',
      prefijo: 'Guía:',
      destacado: 'Todos los conceptos',
      resto: 'de Claude Code, explicados en cristiano',
      grafico: 'conceptos',
      color: '#10b77f',
      promesa: 'LOS TREINTA: *QUÉ SIGNIFICA CADA UNO*\nY SOBRE TODO *CUÁNDO SE USA*'
    }
  },
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
