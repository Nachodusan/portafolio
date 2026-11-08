// =========================================================================
// i18n — Sistema de traducción ES/EN con persistencia en localStorage
// =========================================================================

const dict = {
  es: {
    'nav.capabilities':  'Capacidades',
    'nav.mobile':        'Móviles',
    'nav.work':          'Trabajo',
    'nav.contact':       'Contacto',
    'nav.cv':            'CV',
    'nav.menu':          'Abrir menú',
    'nav.lang':          'EN',
    'nav.lang.aria':     'Cambiar idioma a inglés',

    'menu.home':         'Inicio',

    'hero.meta':         'Disponible · Freelance & Colaboraciones · 2026',
    'hero.bio.lbl':      '[ 01 — Quién soy ]',
    'hero.bio.text':     'Soy desarrollador Full Stack con fortaleza en backend, arquitectura de sistemas y construcción de aplicaciones end-to-end. Diseño soluciones completas cuidando estructura, validación de datos, automatización, escalabilidad y despliegue.',
    'hero.bio.name':     '— Ignacio Duque Sandoval',
    'hero.cta.line1':    'Iniciar',
    'hero.cta.line2':    'conversación',
    'hero.scroll':       'scroll',
    'hero.badge.aria':   'Gafete 3D arrastrable',

    'cap.label':         'Capacidades',
    'cap.title.a':       'Más allá del código:',
    'cap.title.b':       'Soluciones integrales.',
    'cap.lead':          'No me limito a escribir funciones; diseño ecosistemas. Desde la arquitectura de datos hasta la experiencia final, mi enfoque es construir sistemas robustos, escalables y útiles.',
    'cap.1.title.a':     'Frontend',
    'cap.1.title.b':     'Reactivo.',
    'cap.1.desc':        'Interfaces modernas, rápidas y accesibles con Next.js.',
    'cap.2.title.a':     'Backend',
    'cap.2.title.b':     'Robusto.',
    'cap.2.desc':        'APIs seguras y bases de datos optimizadas con Supabase/SQL y Node.',
    'cap.3.title.a':     'Entrenador',
    'cap.3.title.b':     'de IA.',
    'cap.3.desc':        'Diseño y entreno modelos de IA adaptados a cada caso: desde fine-tuning de LLMs y pipelines RAG hasta inferencia local optimizada. Curado de datasets, evaluación rigurosa y decisión técnica sobre cuándo entrenar, recuperar o combinar.',

    'mobile.label':      'Móviles · Ingeniería',
    'mobile.title.a':    'Hecho para',
    'mobile.title.b':    'cada pantalla.',
    'mobile.lead.html':  'Experiencias nativas para <strong>iOS &amp; Android</strong> con motores multiplataforma — Flutter para velocidad de iteración, Kotlin para integración nativa profunda.',
    'mobile.feat1.h':    'Notificaciones Push',
    'mobile.feat1.p':    'Engagement en tiempo real con alertas instantáneas.',
    'mobile.feat2.h':    'Geolocalización',
    'mobile.feat2.p':    'Servicios basados en ubicación y mapas interactivos.',
    'mobile.feat3.h':    'Modo Offline',
    'mobile.feat3.p':    'Funcionalidad continua sin conexión a internet.',
    'mobile.feat4.h':    'Alto Rendimiento',
    'mobile.feat4.p':    'Animaciones fluidas a 60fps y optimización nativa.',
    'mobile.drag':       'Arrastra el dispositivo',
    'phone.app.profile': 'Perfil',
    'phone.app.projects':'Proyectos',
    'phone.app.contact': 'Contacto',
    'phone.profile.title':'Perfil Dusan',
    'phone.projects.title':'Proyectos',
    'phone.commits.title':'Commits',
    'phone.contact.title':'Contacto',
    'phone.chat.greet':  '¡Hola! Soy Ignacio. ¿Qué te gustaría saber sobre mis habilidades de desarrollo?',
    'phone.chat.opt1':   '¿Cuál es tu stack preferido?',
    'phone.chat.opt2':   '¿Qué proyectos buscas?',
    'phone.chat.opt3':   '¿Estás disponible?',
    'phone.proj.1.h':    '🛒 E-Commerce SaaS',
    'phone.proj.1.p':    'Gestión de inventario y Stripe.',
    'phone.proj.6.h':    '🧉 Che IA',
    'phone.proj.6.p':    'Asistente de voz rioplatense con RAG local.',
    'phone.proj.4.h':    '🎙️ Bitácora',
    'phone.proj.4.p':    'Diario hablado iOS/Android con memoria vectorial.',
    'phone.proj.5.h':    '📚 Tutor IA',
    'phone.proj.5.p':    'RAG con citas y abstención sobre material oficial.',
    'phone.chart.lbl':   'Contribuciones',
    'phone.form.name':   'Nombre',
    'phone.form.email':  'Email',
    'phone.form.msg':    'Mensaje',
    'phone.form.name.ph':'Tu nombre',
    'phone.form.email.ph':'correo@ejemplo.com',
    'phone.form.msg.ph': 'Mensaje...',
    'phone.form.btn':    'Componer Email',

    'work.label':        'Trabajo Seleccionado · 2024–2026',
    'work.title.a':      'Trabajo',
    'work.title.b':      'seleccionado.',
    'work.lead':         'Cuatro proyectos que reflejan experiencia en IA aplicada y RAG, mobile nativo y desarrollo web full stack.',
    'work.morebtn':      'Ver más en GitHub',
    'work.cta':          'Ver en GitHub',

    'work.p1.tag':       'Proyecto Web',
    'work.p1.title':     'Plataforma de Comercio Electrónico',
    'work.p1.b1':        'Implementación de sistema de gestión de productos e inventario.',
    'work.p1.b2':        'Integración de APIs para manejo dinámico de datos.',
    'work.p1.b3':        'Panel administrativo para gestión de ventas y productos.',
    'work.p1.b4':        'Interfaz responsiva optimizada para dispositivos móviles.',
    'work.p4.tag':       'IA Conversacional',
    'work.p4.title':     'Che IA — Asistente de voz rioplatense con persona porteña',
    'work.p4.b1':        'Sistema conversacional que combina Llama 3.1 8B + RAG sobre 319 ejemplos curados.',
    'work.p4.b2':        'TTS local con voz argentina + post-procesador léxico de 150+ reglas.',
    'work.p4.b3':        'Pipeline corriendo end-to-end en Apple Silicon, sin dependencias cloud.',
    'work.p4.b4':        'Decisión arquitectónica documentada: prompt engineering + retrieval supera al fine-tuning LoRA en datasets chicos de tareas estilísticas (descartadas 3 iteraciones).',
    'work.p5.tag':       'App Móvil & IA',
    'work.p5.title':     'Bitácora — Diario hablado para acompañar la terapia',
    'work.p5.b1':        'Apps nativas en SwiftUI y Jetpack Compose con transcripción de voz on-device: el audio no sale del teléfono.',
    'work.p5.b2':        'Memoria larga con pgvector: los resúmenes de cada día se vectorizan, se recuperan y se reordenan en cada turno.',
    'work.p5.b3':        'Servidor Node 22 + Fastify sobre PostgreSQL sin ORM, con respuestas en streaming de texto y voz.',
    'work.p5.b4':        'Guardas de producto: corte de riesgo duplicado en cliente y servidor, y techo de gasto mensual antes de llamar al proveedor.',
    'work.p6.tag':       'RAG & Evaluación de LLM',
    'work.p6.title':     'Tutor IA — Facilitador de aprendizaje sobre material oficial del Mineduc',
    'work.p6.b1':        'RAG de doble corpus tipado: el texto del estudiante como fuente citable y la guía docente como pedagogía anclada al objetivo de aprendizaje.',
    'work.p6.b2':        'Retrieval híbrido (denso + léxico + RRF) con reranker como gate de abstención: si no está en el material, el tutor se abstiene.',
    'work.p6.b3':        'Verificación NLI direccional por oración y detección de premisa falsa contra alucinaciones, corriendo en el chat real.',
    'work.p6.b4':        'Harness de evaluación propio con golden set anclado a chunks reales; un experimento de de-risking midió el techo del modelo y sacó matemática del scope.',

    'contact.label':     'Construyamos algo',
    'contact.lead':      '¿Tienes un proyecto en mente o simplemente quieres conectar? Mi bandeja de entrada siempre está abierta para nuevas oportunidades.',
    'contact.cta.line1': 'Iniciar',
    'contact.cta.line2': 'proyecto',
    'contact.cta.aria':  'Iniciar proyecto por WhatsApp',

    'foot.copy':         '© 2026 — Ignacio Duque Sandoval',
    'foot.built':        'Built in Chile · Argentina · dusan.codes',
    'foot.top':          'Volver arriba ↑',

    'modal.title':       'Enviar mensaje',
    'modal.name':        'Tu nombre',
    'modal.email':       'Tu email',
    'modal.msg':         'Cuéntame sobre tu proyecto…',
    'modal.direct':      'Email Directo',
    'modal.send':        'Enviar',
    'modal.close.aria':  'Cerrar',

    'wa.aria':           'WhatsApp',
  },

  en: {
    'nav.capabilities':  'Capabilities',
    'nav.mobile':        'Mobile',
    'nav.work':          'Work',
    'nav.contact':       'Contact',
    'nav.cv':            'CV',
    'nav.menu':          'Open menu',
    'nav.lang':          'ES',
    'nav.lang.aria':     'Switch language to Spanish',

    'menu.home':         'Home',

    'hero.meta':         'Available · Freelance & Collaborations · 2026',
    'hero.bio.lbl':      '[ 01 — Who I am ]',
    'hero.bio.text':     'I am a Full Stack developer with deep backend expertise, system architecture and end-to-end application engineering. I design complete solutions caring for structure, data validation, automation, scalability and deployment.',
    'hero.bio.name':     '— Ignacio Duque Sandoval',
    'hero.cta.line1':    'Start a',
    'hero.cta.line2':    'conversation',
    'hero.scroll':       'scroll',
    'hero.badge.aria':   'Draggable 3D badge',

    'cap.label':         'Capabilities',
    'cap.title.a':       'Beyond the code:',
    'cap.title.b':       'Integral solutions.',
    'cap.lead':          'I don\'t just write functions; I design ecosystems. From data architecture to the final experience, my focus is building robust, scalable and useful systems.',
    'cap.1.title.a':     'Reactive',
    'cap.1.title.b':     'Frontend.',
    'cap.1.desc':        'Modern, fast and accessible interfaces with Next.js.',
    'cap.2.title.a':     'Robust',
    'cap.2.title.b':     'Backend.',
    'cap.2.desc':        'Secure APIs and optimized databases with Supabase/SQL and Node.',
    'cap.3.title.a':     'AI',
    'cap.3.title.b':     'Trainer.',
    'cap.3.desc':        'I design and train AI models tailored to each case: from LLM fine-tuning and RAG pipelines to optimized local inference. Dataset curation, rigorous evaluation, and informed decisions on when to train, retrieve or combine.',

    'mobile.label':      'Mobile · Engineering',
    'mobile.title.a':    'Built for',
    'mobile.title.b':    'every screen.',
    'mobile.lead.html':  'Native experiences for <strong>iOS &amp; Android</strong> with multiplatform engines — Flutter for iteration speed, Kotlin for deep native integration.',
    'mobile.feat1.h':    'Push Notifications',
    'mobile.feat1.p':    'Real-time engagement with instant alerts.',
    'mobile.feat2.h':    'Geolocation',
    'mobile.feat2.p':    'Location-based services and interactive maps.',
    'mobile.feat3.h':    'Offline Mode',
    'mobile.feat3.p':    'Uninterrupted functionality without internet.',
    'mobile.feat4.h':    'High Performance',
    'mobile.feat4.p':    'Fluid 60fps animations and native optimization.',
    'mobile.drag':       'Drag the device',
    'phone.app.profile': 'Profile',
    'phone.app.projects':'Projects',
    'phone.app.contact': 'Contact',
    'phone.profile.title':'Dusan Profile',
    'phone.projects.title':'Projects',
    'phone.commits.title':'Commits',
    'phone.contact.title':'Contact',
    'phone.chat.greet':  'Hi! I\'m Ignacio. What would you like to know about my dev work?',
    'phone.chat.opt1':   'What\'s your preferred stack?',
    'phone.chat.opt2':   'What projects are you looking for?',
    'phone.chat.opt3':   'Are you available?',
    'phone.proj.1.h':    '🛒 E-Commerce SaaS',
    'phone.proj.1.p':    'Inventory management and Stripe.',
    'phone.proj.6.h':    '🧉 Che IA',
    'phone.proj.6.p':    'Rioplatense voice assistant with local RAG.',
    'phone.proj.4.h':    '🎙️ Bitácora',
    'phone.proj.4.p':    'Spoken journal for iOS/Android with vector memory.',
    'phone.proj.5.h':    '📚 Tutor IA',
    'phone.proj.5.p':    'RAG with citations and abstention over official material.',
    'phone.chart.lbl':   'Contributions',
    'phone.form.name':   'Name',
    'phone.form.email':  'Email',
    'phone.form.msg':    'Message',
    'phone.form.name.ph':'Your name',
    'phone.form.email.ph':'email@example.com',
    'phone.form.msg.ph': 'Message...',
    'phone.form.btn':    'Compose Email',

    'work.label':        'Selected Work · 2024–2026',
    'work.title.a':      'Selected',
    'work.title.b':      'work.',
    'work.lead':         'Four projects that reflect experience in applied AI and RAG, native mobile and full-stack web development.',
    'work.morebtn':      'See more on GitHub',
    'work.cta':          'View on GitHub',

    'work.p1.tag':       'Web Project',
    'work.p1.title':     'E-Commerce Platform',
    'work.p1.b1':        'Product and inventory management system implementation.',
    'work.p1.b2':        'API integration for dynamic data handling.',
    'work.p1.b3':        'Admin panel for sales and product management.',
    'work.p1.b4':        'Responsive interface optimized for mobile devices.',
    'work.p4.tag':       'Conversational AI',
    'work.p4.title':     'Che IA — Rioplatense voice assistant with porteño persona',
    'work.p4.b1':        'Conversational system combining Llama 3.1 8B + RAG over 319 curated examples.',
    'work.p4.b2':        'Local TTS with Argentine voice + lexical post-processor with 150+ rules.',
    'work.p4.b3':        'End-to-end pipeline running on Apple Silicon, zero cloud dependencies.',
    'work.p4.b4':        'Documented architectural decision: prompt engineering + retrieval beats LoRA fine-tuning on small stylistic datasets (3 iterations discarded).',
    'work.p5.tag':       'Mobile App & AI',
    'work.p5.title':     'Bitácora — Spoken journal to support therapy',
    'work.p5.b1':        'Native SwiftUI and Jetpack Compose apps with on-device speech transcription: audio never leaves the phone.',
    'work.p5.b2':        'Long-term memory with pgvector: daily summaries are embedded, retrieved and reranked on every turn.',
    'work.p5.b3':        'Node 22 + Fastify server over PostgreSQL with no ORM, streaming both text and voice responses.',
    'work.p5.b4':        'Production guardrails: risk cut-off duplicated on client and server, and a monthly spend cap enforced before calling the provider.',
    'work.p6.tag':       'RAG & LLM Evaluation',
    'work.p6.title':     'Tutor IA — Learning facilitator over official Mineduc material',
    'work.p6.b1':        'Typed dual-corpus RAG: the student textbook as the citable source of truth, the teacher guide as pedagogy anchored to each learning objective.',
    'work.p6.b2':        'Hybrid retrieval (dense + lexical + RRF) with a reranker as abstention gate: if it is not in the material, the tutor abstains.',
    'work.p6.b3':        'Per-sentence directional NLI verification and false-premise detection against hallucinations, running in the real chat.',
    'work.p6.b4':        'Custom eval harness with a golden set anchored to real chunks; a de-risking experiment measured the model ceiling and cut math from scope.',

    'contact.label':     'Let\'s build',
    'contact.lead':      'Got a project in mind or just want to connect? My inbox is always open for new opportunities.',
    'contact.cta.line1': 'Start',
    'contact.cta.line2': 'project',
    'contact.cta.aria':  'Start project via WhatsApp',

    'foot.copy':         '© 2026 — Ignacio Duque Sandoval',
    'foot.built':        'Built in Chile · Argentina · dusan.codes',
    'foot.top':          'Back to top ↑',

    'modal.title':       'Send message',
    'modal.name':        'Your name',
    'modal.email':       'Your email',
    'modal.msg':         'Tell me about your project…',
    'modal.direct':      'Direct Email',
    'modal.send':        'Send',
    'modal.close.aria':  'Close',

    'wa.aria':           'WhatsApp',
  },
};

const LS_KEY = 'dusan.lang';

function detectInitialLang() {
  const stored = localStorage.getItem(LS_KEY);
  if (stored === 'es' || stored === 'en') return stored;
  const nav = (navigator.language || 'es').toLowerCase();
  return nav.startsWith('en') ? 'en' : 'es';
}

function applyLang(lang) {
  const t = dict[lang] || dict.es;

  // Text content (default behaviour)
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // innerHTML (for keys ending in .html)
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Attributes: data-i18n-attr="aria-label:key|placeholder:key"
  document.querySelectorAll('[data-i18n-attr]').forEach(el => {
    const spec = el.getAttribute('data-i18n-attr');
    spec.split('|').forEach(pair => {
      const [attr, key] = pair.split(':').map(s => s.trim());
      if (attr && key && t[key] !== undefined) el.setAttribute(attr, t[key]);
    });
  });

  // Update <html lang>
  document.documentElement.lang = lang;
  localStorage.setItem(LS_KEY, lang);

  // Update toggle button visible text/aria (always shows the OPPOSITE language as the action)
  const btn = document.getElementById('lang-toggle');
  if (btn) {
    btn.textContent = t['nav.lang'];
    btn.setAttribute('aria-label', t['nav.lang.aria']);
    btn.dataset.lang = lang;
  }

  // Refresh Lucide icons if any text replacement nuked an <i>
  if (window.lucide) window.lucide.createIcons();
}

function toggleLang() {
  const current = (document.documentElement.lang === 'en') ? 'en' : 'es';
  const next = current === 'es' ? 'en' : 'es';
  applyLang(next);
}

// Boot
document.addEventListener('DOMContentLoaded', () => {
  applyLang(detectInitialLang());
  const btn = document.getElementById('lang-toggle');
  if (btn) btn.addEventListener('click', toggleLang);
});

// Expose for manual debug
window.setLang = applyLang;
