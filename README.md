# Dusan — AI Trainer · LLM Evals & RAG · On-Device

Portafolio personal de [Ignacio Duque Sandoval](https://github.com/Nachodusan).

Sitio estático con un gafete 3D interactivo (Three.js + Rapier physics), rediseño editorial inspirado en Antigravity × Nike, mockup móvil con OS simulado (iOS / Android), y secciones de capabilities, work y contacto.

## Stack

- **HTML / CSS / JavaScript** vanilla — sin build step.
- **Three.js** (ESM via importmap CDN) — escena 3D del gafete.
- **@dimforge/rapier3d-compat** — motor de física (cadena de eslabones + sphericalJoints + drag kinematic).
- **Lucide Icons** (CDN) — iconografía.
- **Google Fonts**: Inter, JetBrains Mono, Space Grotesk, Anton.

## Estructura

```
.
├── index.html      # Markup completo del sitio
├── style.css       # Sistema de tokens + componentes + responsive
├── script.js       # Lógica UI: nav, cursor, modal, mockup móvil, reveals
├── badge3d.js      # Gafete 3D + física Rapier (módulo ES)
├── i18n.js         # Diccionario ES/EN y conmutador de idioma
├── og-image.png    # Preview 1200×630 para compartir
└── README.md
```

## Desarrollo local

```bash
python3 -m http.server 8000
# abrir http://localhost:8000
```

No requiere instalación de dependencias — todo se carga vía CDN.

## Contacto

- **Web**: [dusan.codes](https://dusan.codes)
- **Email**: nachodusan@gmail.com
- **LinkedIn**: [ignaciodusan](https://www.linkedin.com/in/ignaciodusan/)
- **WhatsApp**: [+54 9 11 6803 7887](https://wa.me/5491168037887)
