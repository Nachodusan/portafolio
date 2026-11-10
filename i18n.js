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
    'hero.bio.text':     'Construyo productos con LLMs y la evaluación que demuestra que funcionan. Casi todo lo que entrego vive donde el modelo tiene que acertar —fichas clínicas, material oficial— así que el grounding, la abstención y la medición me importan más que la fluidez. Y lo primero que mido es mi propio instrumento: en la mitad de mis repos el primer hallazgo fue que el harness estaba mal.',
    'hero.bio.name':     '— Ignacio Duque Sandoval',
    'hero.cta.line1':    'Iniciar',
    'hero.cta.line2':    'conversación',
    'hero.scroll':       'scroll',
    'hero.badge.aria':   'Gafete 3D arrastrable',

    'cap.label':         'Capacidades',
    'cap.title.a':       'Primero la medición:',
    'cap.title.b':       'después el modelo.',
    'cap.lead':          'Un número que nadie auditó no es un resultado. Construyo el sistema y el instrumento que lo juzga, y publico los dos —incluidas las veces en que el instrumento estaba mal.',
    'cap.1.title.a':     'Evaluación',
    'cap.1.title.b':     'de LLMs.',
    'cap.1.desc':        'Golden sets anclados a datos reales, verificación de trayectoria y corridas repetidas. Un caso que pasó una vez no pasó: se reporta como inestable, no como porcentaje. Los resultados negativos se publican como se encontraron.',
    'cap.2.title.a':     'RAG y',
    'cap.2.title.b':     'recuperación.',
    'cap.2.desc':        'Retrieval híbrido con reranker usado como gate de abstención: si no está en el material, el sistema lo dice en vez de inventar. Bases vectoriales comparadas a recall fijo, no a los defaults de cada vendor.',
    'cap.3.title.a':     'Inferencia',
    'cap.3.title.b':     'on-device.',
    'cap.3.desc':        'Modelos cuantizados corriendo en el teléfono y en Apple Silicon, sin nube. Medido por throughput sostenido y no por la primera generación, porque un iPhone pierde el 39% cuando se calienta.',

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
    'work.lead':         'Siete proyectos. En cuatro de ellos el primer hallazgo fue que mi propia medición estaba mal, y eso está escrito en el README en lugar de corregido en silencio.',
    'work.morebtn':      'Ver más en GitHub',
    'work.cta':          'Ver en GitHub',

    'work.p1.tag':       'Evaluación de agentes',
    'work.p1.title':     'agent-evals — Evaluar lo que el agente hizo, no sólo lo que respondió',
    'work.p1.b1':        'Verificación de trayectoria: qué herramientas llamó, en qué orden, de qué errores se recuperó. La respuesta final es sólo una de las comprobaciones.',
    'work.p1.b2':        'Un caso pasa si pasaron todos los intentos; cualquier cosa en el medio se reporta como inestable en vez de redondearse a un porcentaje.',
    'work.p1.b3':        'Apuntado a mi propio sql-agent encontró tres cosas que una corrida no puede ver: un caso que pasaba era una moneda al aire (0/3, después 1/3), el agente reportaba SQL que nunca había ejecutado, y un cuarto de las “fallas” del modelo débil eran crashes dentro de mi código.',
    'work.p1.b4':        'Sin dependencias en el núcleo. 30 tests.',
    'work.p4.tag':       'Inferencia on-device',
    'work.p4.title':     'tinyllm-ios — El número de tokens/seg que un teléfono realmente sostiene',
    'work.p4.b1':        'MLX Swift corriendo Qwen2.5-0.5B en 4 bits sobre un iPhone 16: 108.85 tok/s en la primera generación, 66.32 sostenidos en 150 corridas seguidas. Los dos son correctos; sólo uno describe usar la cosa.',
    'work.p4.b2':        'ProcessInfo.thermalState llega tarde: cuando iOS reportó presión térmica por primera vez, el throughput ya había perdido un cuarto. Una app que sólo degrada al cambiar el estado ya le entregó ese cuarto al usuario.',
    'work.p4.b3':        'Una curva que baja tiene una segunda explicación idéntica por dentro —estado acumulado en el proceso—, así que la suite deja enfriar tres minutos y repite el lote. Recuperó el 99% de la ráfaga con la memoria plana en las 300 generaciones: eso convierte “térmico” en un hallazgo y no en una suposición.',
    'work.p4.b4':        'La primera medición fueron 12 corridas y decía “retenido 86%, sin throttling”. Aritméticamente correcta, equivocada por 39%. Ese reporte quedó guardado y el informe ahora se advierte solo.',
    'work.p5.tag':       'RAG & Evaluación de LLM',
    'work.p5.title':     'Tutor IA — Facilitador de aprendizaje sobre material oficial del Mineduc',
    'work.p5.b1':        'RAG de doble corpus tipado: el texto del estudiante como fuente citable y la guía docente como pedagogía anclada al objetivo de aprendizaje.',
    'work.p5.b2':        'Retrieval híbrido (denso + léxico + RRF) con reranker como gate de abstención: si no está en el material, el tutor se abstiene.',
    'work.p5.b3':        'Verificación NLI direccional por oración y detección de premisa falsa contra alucinaciones, corriendo en el chat real.',
    'work.p5.b4':        'Harness propio con golden set anclado a chunks reales: recall@5 de 88% sobre ~38.000 chunks en 35 asignaturas. Un experimento midió el techo del modelo en matemática y la materia salió del alcance.',
    'work.p6.tag':       'App Móvil & IA',
    'work.p6.title':     'Bitácora — Diario hablado para acompañar la terapia',
    'work.p6.b1':        'Apps nativas en SwiftUI y Jetpack Compose con transcripción de voz on-device: el audio no sale del teléfono.',
    'work.p6.b2':        'Memoria larga con pgvector: los resúmenes de cada día se vectorizan, se recuperan y se reordenan en cada turno.',
    'work.p6.b3':        'El psicólogo recibe un informe mensual donde cada dato está respaldado por una cita literal del paciente, que nunca ve el informe, para no empujarlo al autodiagnóstico.',
    'work.p6.b4':        '268 tests automatizados (151 backend, 96 iOS, 21 Android), cola de sincronización offline que no duplica, y techo de gasto mensual con costo por llamada registrado.',

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

    // --- añadidas: capacidades y proyectos (21)
    'cap.4.desc':     'La app, el backend, la capa de datos y el despliegue. Apps nativas en SwiftUI y Jetpack Compose, APIs en Node y Python, Postgres sin ORM, y servidores Linux propios por cliente.',
    'cap.4.title.a':  'Producto',
    'cap.4.title.b':  'de punta a punta.',
    'work.p2.b1':     'Preguntas en lenguaje natural respondidas consultando una base: loop LangGraph, tool calling, y cada paso trazado con latencia, tokens y costo.',
    'work.p2.b2':     'El esquema de ejemplo está sembrado con trampas —fan-out de joins, montos en centavos, pedidos anulados— para que adivinar se castigue.',
    'work.p2.b3':     '6/8 en el golden set, y las dos fallas son SQL válido devolviendo números seguros y equivocados. La prosa se lee perfecta en los dos casos: por eso la corrección se mide contra queries de referencia, no contra el texto.',
    'work.p2.b4':     'La primera versión del harness reportaba 3/8 y estaba mal ella misma. Ahora el comparador tiene sus propios tests.',
    'work.p2.tag':    'Agente + evaluación',
    'work.p2.title':  'sql-agent — Un loop de agente, y la evaluación que atrapa lo que parece correcto',
    'work.p3.b1':     'Comparar bases vectoriales con la configuración por defecto mide los defaults. Toda implementación de HNSW negocia precisión por velocidad en una perilla, así que esto la barre y compara a recall igualado.',
    'work.p3.b2':     'La brecha crece con la precisión: a recall 0.90 Qdrant y pgvector están a 40% uno del otro; a 0.99 son 3.4×. Un número por motor habría elegido uno de esos al azar.',
    'work.p3.b3':     'Chroma queda fuera de la comparación con el motivo escrito: su ef_search se acepta, se persiste, se reporta de vuelta y es inerte —resultados idénticos para las 500 consultas en toda la barrida.',
    'work.p3.b4':     'La sección más larga del README son las cinco formas en que el benchmark estuvo mal antes de estar bien, incluido un bug mío que inflaba la latencia de pgvector 2.4×. Tres de esas cinco hoy son guards automáticos.',
    'work.p3.tag':    'Benchmarking',
    'work.p3.title':  'vector-db-bench — Latencia a recall fijo, no a los defaults de cada vendor',
    'work.p7.b1':     'Llama 3.1 8B vía MLX + recuperación BM25 sobre 319 ejemplos curados + Piper TTS, end-to-end en Apple Silicon y sin dependencias cloud.',
    'work.p7.b2':     'Post-procesador léxico de 150+ reglas que garantiza voseo y vocabulario regional donde el modelo solo no llega.',
    'work.p7.b3':     'Decisión arquitectónica documentada con la evidencia A/B: prompt engineering + retrieval le ganó al fine-tuning LoRA en datasets chicos de tareas estilísticas. Tres iteraciones descartadas.',
    'work.p7.b4':     'El resultado negativo está publicado en el README en lugar de quedar en una carpeta.',
    'work.p7.tag':    'IA Conversacional local',
    'work.p7.title':  'Che IA — Asistente de voz rioplatense corriendo entero en local',
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
    'hero.bio.text':     'I build LLM products and the evaluation that proves they work. Most of what I ship sits where the model has to be right — clinical records, official coursebooks — so grounding, abstention and measurement matter more than fluency. And the first thing I measure is my own instrument: in half my repos, the first finding was that the harness was wrong.',
    'hero.bio.name':     '— Ignacio Duque Sandoval',
    'hero.cta.line1':    'Start a',
    'hero.cta.line2':    'conversation',
    'hero.scroll':       'scroll',
    'hero.badge.aria':   'Draggable 3D badge',

    'cap.label':         'Capabilities',
    'cap.title.a':       'Measurement first:',
    'cap.title.b':       'then the model.',
    'cap.lead':          'A number nobody audited is not a result. I build the system and the instrument that judges it, and publish both — including the times the instrument was wrong.',
    'cap.1.title.a':     'LLM',
    'cap.1.title.b':     'evaluation.',
    'cap.1.desc':        'Golden sets anchored to real data, trajectory checks and repeated runs. A case that passed once has not passed: it is reported as flaky rather than as a percentage. Negative results get published as found.',
    'cap.2.title.a':     'RAG and',
    'cap.2.title.b':     'retrieval.',
    'cap.2.desc':        'Hybrid retrieval with a reranker used as an abstention gate: if it is not in the material, the system says so instead of inventing. Vector databases compared at fixed recall, not at each vendor’s defaults.',
    'cap.3.title.a':     'On-device',
    'cap.3.title.b':     'inference.',
    'cap.3.desc':        'Quantised models running on the phone and on Apple Silicon, no cloud. Measured by sustained throughput rather than by the first generation, because an iPhone loses 39% once it warms up.',

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
    'work.lead':         'Seven projects. In four of them the first finding was that my own measurement was wrong, and that is written up in the README rather than quietly fixed.',
    'work.morebtn':      'See more on GitHub',
    'work.cta':          'View on GitHub',

    'work.p1.tag':       'Agent evaluation',
    'work.p1.title':     'agent-evals — Evaluate what the agent did, not just what it answered',
    'work.p1.b1':        'Trajectory checks: which tools it called, in what order, which errors it recovered from. The final answer is only one of the assertions.',
    'work.p1.b2':        'A case passes only if every attempt passed; anything in between is reported as flaky rather than rounded into a percentage.',
    'work.p1.b3':        'Pointed at my own sql-agent it found three things one run cannot see: a passing case was a coin flip (0/3, then 1/3), the agent was reporting SQL it had never executed, and a quarter of the weaker model’s “failures” were crashes inside my own code.',
    'work.p1.b4':        'Zero dependencies in the core. 30 tests.',
    'work.p4.tag':       'On-device inference',
    'work.p4.title':     'tinyllm-ios — The tokens/sec figure a phone can actually hold',
    'work.p4.b1':        'MLX Swift running Qwen2.5-0.5B at 4-bit on an iPhone 16: 108.85 tok/s on the first generation, 66.32 sustained over 150 back-to-back runs. Both correct; only one describes using the thing.',
    'work.p4.b2':        'ProcessInfo.thermalState is a lagging indicator: by the time iOS first reported thermal pressure, a quarter of the throughput was already gone. An app that only degrades on a state change has shipped that quarter to the user.',
    'work.p4.b3':        'A declining curve has a second explanation that looks identical from inside — accumulated state in the process — so the suite idles three minutes and repeats the batch. It recovered 99% of the burst figure with memory flat across all 300 generations, which makes “thermal” a finding rather than a guess.',
    'work.p4.b4':        'The first measurement was 12 runs and reported “retained 86%, never throttled”. Arithmetically correct, wrong by 39%. That report is kept, and the report now warns about itself.',
    'work.p5.tag':       'RAG & LLM evaluation',
    'work.p5.title':     'Tutor IA — Study facilitator grounded in official Mineduc coursebooks',
    'work.p5.b1':        'Typed dual-corpus RAG: the student’s textbook as the citable source of truth, the teacher’s guide as pedagogy anchored to the learning objective.',
    'work.p5.b2':        'Hybrid retrieval (dense + lexical + RRF) with a reranker as an abstention gate: if it is not in the material, the tutor abstains.',
    'work.p5.b3':        'Per-sentence directional NLI verification and false-premise detection against hallucination, running in the live chat.',
    'work.p5.b4':        'Own harness with a golden set anchored to real chunks: recall@5 of 88% over ~38,000 chunks across 35 subjects. An experiment measured the model’s ceiling on mathematics and the subject left the scope.',
    'work.p6.tag':       'Mobile App & AI',
    'work.p6.title':     'Bitácora — Voice journal to support therapy',
    'work.p6.b1':        'Native SwiftUI and Jetpack Compose apps with on-device transcription: the audio never leaves the phone.',
    'work.p6.b2':        'Long-term memory with pgvector: each day’s summary is embedded, retrieved and reranked on every turn.',
    'work.p6.b3':        'The psychologist receives a monthly report where every data point is backed by a literal quote from the patient, who never sees the report, to avoid nudging them toward self-diagnosis.',
    'work.p6.b4':        '268 automated tests (151 backend, 96 iOS, 21 Android), an offline sync queue that does not duplicate, and a monthly spend ceiling with per-call cost logged.',

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

    // --- added: capabilities and projects (21)
    'cap.4.desc':     'The app, the backend, the data layer and the deploy. Native apps in SwiftUI and Jetpack Compose, APIs in Node and Python, Postgres without an ORM, and a dedicated Linux box per client.',
    'cap.4.title.a':  'End-to-end',
    'cap.4.title.b':  'product.',
    'work.p2.b1':     'Natural-language questions answered by querying a database: LangGraph loop, tool calling, every step traced with latency, tokens and cost.',
    'work.p2.b2':     'The sample schema is seeded with traps — join fan-out, amounts in cents, cancelled orders — so that guessing is punished.',
    'work.p2.b3':     '6/8 on the golden set, and both failures are valid SQL returning confidently wrong numbers. The prose reads perfectly in both cases, which is why correctness is graded against reference queries rather than against the text.',
    'work.p2.b4':     'The first version of the harness reported 3/8 and was itself wrong. The comparator now has tests of its own.',
    'work.p2.tag':    'Agent + evaluation',
    'work.p2.title':  'sql-agent — An agent loop, and the eval that catches what only looks right',
    'work.p3.b1':     'Comparing vector databases at default settings measures the defaults. Every HNSW implementation trades accuracy for speed on a knob, so this sweeps it and compares at fixed recall.',
    'work.p3.b2':     'The gap widens with accuracy: at recall 0.90 Qdrant and pgvector are within 40% of each other; at 0.99 it is 3.4×. One number per engine would have picked one of those at random.',
    'work.p3.b3':     'Chroma is excluded from the comparison with the reason stated: its ef_search is accepted, persisted, reported back, and inert — identical results for all 500 queries across the whole sweep.',
    'work.p3.b4':     'The README’s longest section is the five ways the benchmark was wrong before it was right, including a client bug of mine inflating pgvector’s latency 2.4×. Three of those five are now automatic guards.',
    'work.p3.tag':    'Benchmarking',
    'work.p3.title':  'vector-db-bench — Latency at matched recall, not at whatever the defaults were',
    'work.p7.b1':     'Llama 3.1 8B via MLX + BM25 retrieval over 319 curated examples + Piper TTS, end-to-end on Apple Silicon with no cloud dependency.',
    'work.p7.b2':     'A 150+ rule lexical post-processor guarantees voseo and regional vocabulary where the model alone falls short.',
    'work.p7.b3':     'Architectural decision documented with the A/B evidence: prompt engineering + retrieval beat LoRA fine-tuning on small stylistic datasets. Three iterations discarded.',
    'work.p7.b4':     'The negative result is published in the README rather than left in a folder.',
    'work.p7.tag':    'Local conversational AI',
    'work.p7.title':  'Che IA — Rioplatense voice assistant running entirely on-device',
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
