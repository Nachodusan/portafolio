/* =========================================================================
   Contenido del portafolio — fuente única para los dos mundos.
   Mismo material que index.html / i18n.js del sitio actual.
   ========================================================================= */
window.DUSAN = {
  nombre: 'Ignacio Duque Sandoval',
  rol: 'AI Trainer · Desarrollador Full-Stack y Mobile',
  meta: 'Disponible · Freelance &amp; Colaboraciones · 2026',
  titulo: ['AI · Trainer', 'Full-Stack', '+ Mobile', 'Developer'],
  tagline: 'LLM eval (Llama, RAG, MLX) &nbsp;|&nbsp; React · Python · Kotlin · Flutter<br>ES-AR/CL nativo &nbsp;|&nbsp; Open to Work',
  taglinePlano: 'LLM eval (Llama, RAG, MLX) · React · Python · Kotlin · Flutter · ES-AR/CL nativo · Open to Work',

  quienSoy: {
    label: '01 — Quién soy',
    texto: 'Soy desarrollador Full Stack con fortaleza en backend, arquitectura de sistemas y construcción de aplicaciones end-to-end. Diseño soluciones completas cuidando estructura, validación de datos, automatización, escalabilidad y despliegue.',
    firma: '— Ignacio Duque Sandoval',
    datos: [
      ['Ubicación', 'Argentina | Chile'],
      ['Idiomas', 'ES AR/CL nativo · inglés técnico'],
      ['Estado', 'Disponible para trabajo'],
      ['Años', '2024 — 2026']
    ]
  },

  capacidades: {
    label: '02 — Capacidades',
    titulo: 'Más allá del código: soluciones integrales.',
    lead: 'No me limito a escribir funciones; diseño ecosistemas. Desde la arquitectura de datos hasta la experiencia final, mi enfoque es construir sistemas robustos, escalables y útiles.',
    items: [
      { t: 'Frontend reactivo', d: 'Interfaces modernas, rápidas y accesibles con Next.js.',
        c: ['Next.js', 'React', 'TypeScript', 'Tailwind'] },
      { t: 'Backend robusto', d: 'APIs seguras y bases de datos optimizadas con Supabase/SQL y Node.',
        c: ['Node.js', 'PostgreSQL', 'MongoDB', 'REST APIs'] },
      { t: 'Entrenador de IA', d: 'Diseño y entreno modelos de IA adaptados a cada caso: desde fine-tuning de LLMs y pipelines RAG hasta inferencia local optimizada. Curado de datasets, evaluación rigurosa y decisión técnica sobre cuándo entrenar, recuperar o combinar.',
        c: ['LLMs', 'Fine-tuning', 'RAG', 'Embeddings', 'Datasets', 'MLX · PyTorch', 'Prompt Engineering'] }
    ]
  },

  mobile: {
    label: '03 — Móviles · Ingeniería',
    titulo: 'Hecho para cada pantalla.',
    lead: 'Experiencias nativas para <strong>iOS y Android</strong> con motores multiplataforma — Flutter para velocidad de iteración, Kotlin para integración nativa profunda.',
    items: [
      { t: 'Notificaciones push', d: 'Engagement en tiempo real con alertas instantáneas.' },
      { t: 'Geolocalización', d: 'Servicios basados en ubicación y mapas interactivos.' },
      { t: 'Modo offline', d: 'Funcionalidad continua sin conexión a internet.' },
      { t: 'Alto rendimiento', d: 'Animaciones fluidas a 60fps y optimización nativa.' }
    ]
  },

  trabajo: {
    label: '04 — Trabajo seleccionado',
    titulo: 'Trabajo seleccionado.',
    lead: 'Cuatro proyectos que reflejan experiencia en IA aplicada y RAG, mobile nativo y desarrollo web full stack.',
    items: [
      { id: 'bit', tag: 'App móvil &amp; IA', t: 'Bitácora — Diario hablado para acompañar la terapia',
        p: ['Apps nativas en SwiftUI y Jetpack Compose con transcripción de voz on-device: el audio no sale del teléfono.',
            'Memoria larga con pgvector: los resúmenes de cada día se vectorizan, se recuperan y se reordenan en cada turno.',
            'Servidor Node 22 + Fastify sobre PostgreSQL sin ORM, con respuestas en streaming de texto y voz.',
            'Guardas de producto: corte de riesgo duplicado en cliente y servidor, y techo de gasto mensual antes de llamar al proveedor.'],
        c: ['SwiftUI', 'Kotlin · Compose', 'Node 22 + Fastify', 'TypeScript', 'PostgreSQL + pgvector', 'RAG · Embeddings', 'TTS'],
        u: 'https://github.com/Nachodusan/bitacora-app' },
      { id: 'tut', tag: 'RAG &amp; evaluación de LLM', t: 'Tutor IA — Facilitador de aprendizaje sobre material oficial del Mineduc',
        p: ['RAG de doble corpus tipado: el texto del estudiante como fuente citable y la guía docente como pedagogía anclada al objetivo de aprendizaje.',
            'Retrieval híbrido (denso + léxico + RRF) con reranker como gate de abstención: si no está en el material, el tutor se abstiene.',
            'Verificación NLI direccional por oración y detección de premisa falsa contra alucinaciones, corriendo en el chat real.',
            'Harness de evaluación propio con golden set anclado a chunks reales; un experimento de de-risking midió el techo del modelo y sacó matemática del scope.'],
        c: ['TypeScript', 'Next.js', 'Turborepo', 'PostgreSQL + pgvector', 'Retrieval híbrido + RRF', 'bge-m3 · Reranker', 'NLI (mDeBERTa)', 'Python'],
        u: 'https://github.com/Nachodusan/tutor-ia' },
      { id: 'box', tag: 'Proyecto web', t: 'Plataforma de comercio electrónico',
        p: ['Implementación de sistema de gestión de productos e inventario.',
            'Integración de APIs para manejo dinámico de datos.',
            'Panel administrativo para gestión de ventas y productos.',
            'Interfaz responsiva optimizada para dispositivos móviles.'],
        c: ['React', 'JavaScript', 'HTML', 'CSS', 'REST APIs', 'PostgreSQL (SQL)'],
        u: 'https://github.com/Nachodusan/inthebox' },
      { id: 'che', tag: 'IA conversacional', t: 'Che IA — Asistente de voz rioplatense con persona porteña',
        p: ['Sistema conversacional que combina Llama 3.1 8B + RAG sobre 319 ejemplos curados.',
            'TTS local con voz argentina + post-procesador léxico de 150+ reglas.',
            'Pipeline corriendo end-to-end en Apple Silicon, sin dependencias cloud.',
            'Decisión arquitectónica documentada: prompt engineering + retrieval supera al fine-tuning LoRA en datasets chicos de tareas estilísticas (descartadas 3 iteraciones).'],
        c: ['Llama 3.1 8B (MLX)', 'BM25 Retrieval', 'Piper TTS', 'React + Vite', 'FastAPI', 'Web Speech API'],
        u: 'https://github.com/Nachodusan/ia-rioplatense' }
    ],
    masBtn: 'Ver más en GitHub',
    masUrl: 'https://github.com/Nachodusan'
  },

  contacto: {
    label: '05 — Construyamos algo',
    titulo: 'Construyamos algo.',
    lead: '¿Tenés un proyecto en mente o simplemente querés conectar? Mi bandeja de entrada siempre está abierta para nuevas oportunidades.',
    links: [
      { k: 'Email', v: 'dusanemp@gmail.com', u: 'mailto:dusanemp@gmail.com' },
      { k: 'WhatsApp', v: '+54 9 11 6803 7887', u: 'https://wa.me/5491168037887' },
      { k: 'LinkedIn', v: '/ignacio-d-361698102', u: 'https://www.linkedin.com/in/ignacio-d-361698102/' },
      { k: 'GitHub', v: '@nachodusan', u: 'https://github.com/Nachodusan' },
      { k: 'CV', v: 'cv.pdf', u: '../../cv.pdf' }
    ]
  },

  pie: ['© 2026 — Ignacio Duque Sandoval', 'Built in Chile · Argentina · dusan.codes']
};

/* ---------------------------------------------------------------
   Render del documento. Markup común; cada mundo lo pinta distinto
   con sus propias clases CSS bajo #doc.
   --------------------------------------------------------------- */
window.renderDoc = function (el) {
  const D = window.DUSAN;
  const chips = a => '<ul class="chips">' + a.map(x => '<li>' + x + '</li>').join('') + '</ul>';
  const head = (n, label, titulo, lead) =>
    '<header class="s-head">' +
      '<p class="s-label">' + label + '</p>' +
      (titulo ? '<h2 class="s-title">' + titulo + '</h2>' : '') +
      (lead ? '<p class="s-lead">' + lead + '</p>' : '') +
    '</header>';

  el.innerHTML =
    /* ---- quién soy ---- */
    '<section class="sec sec--yo" id="quien-soy">' +
      head(1, D.quienSoy.label, D.nombre, null) +
      '<p class="bio">' + D.quienSoy.texto + '</p>' +
      '<p class="firma">' + D.quienSoy.firma + '</p>' +
      '<dl class="datos">' + D.quienSoy.datos.map(([k, v]) =>
        '<div><dt>' + k + '</dt><dd>' + v + '</dd></div>').join('') + '</dl>' +
    '</section>' +

    /* ---- capacidades ---- */
    '<section class="sec" id="capacidades">' +
      head(2, D.capacidades.label, D.capacidades.titulo, D.capacidades.lead) +
      '<div class="caps">' + D.capacidades.items.map((c, i) =>
        '<article class="cap"><span class="cap-n">0' + (i + 1) + '</span>' +
        '<div class="cap-main"><h3>' + c.t + '</h3><p>' + c.d + '</p>' + chips(c.c) + '</div></article>'
      ).join('') + '</div>' +
    '</section>' +

    /* ---- mobile ---- */
    '<section class="sec" id="mobile">' +
      head(3, D.mobile.label, D.mobile.titulo, D.mobile.lead) +
      '<div class="feats">' + D.mobile.items.map(m =>
        '<div class="feat"><h4>' + m.t + '</h4><p>' + m.d + '</p></div>').join('') + '</div>' +
    '</section>' +

    /* ---- trabajo ---- */
    '<section class="sec" id="trabajo">' +
      head(4, D.trabajo.label, D.trabajo.titulo, D.trabajo.lead) +
      '<div class="works">' + D.trabajo.items.map((w, i) =>
        '<article class="work" id="w-' + w.id + '">' +
          '<div class="work-top"><span class="work-n">0' + (i + 1) + '</span><span class="work-tag">' + w.tag + '</span></div>' +
          '<h3 class="work-t">' + w.t + '</h3>' +
          '<ul class="pts">' + w.p.map(p => '<li>' + p + '</li>').join('') + '</ul>' +
          chips(w.c) +
          '<a class="repo" href="' + w.u + '" target="_blank" rel="noopener noreferrer">Ver en GitHub ↗</a>' +
        '</article>').join('') + '</div>' +
      '<a class="repo repo--mas" href="' + D.trabajo.masUrl + '" target="_blank" rel="noopener noreferrer">' + D.trabajo.masBtn + ' ↗</a>' +
    '</section>' +

    /* ---- contacto ---- */
    '<section class="sec" id="contacto">' +
      head(5, D.contacto.label, D.contacto.titulo, D.contacto.lead) +
      '<ul class="clinks">' + D.contacto.links.map(l =>
        '<li><span>' + l.k + '</span><a href="' + l.u + '" target="_blank" rel="noopener noreferrer">' + l.v + ' ↗</a></li>'
      ).join('') + '</ul>' +
    '</section>' +

    /* ---- pie ---- */
    '<footer class="pie"><span>' + D.pie[0] + '</span><span>' + D.pie[1] + '</span>' +
      '<a href="../">← los mundos</a></footer>';
};
