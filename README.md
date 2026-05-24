# Dusan — Full-Stack Developer & System Architect

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
- **Email**: dusanemp@gmail.com
- **LinkedIn**: [ignacio-d-361698102](https://www.linkedin.com/in/ignacio-d-361698102/)
- **WhatsApp**: +52 81 2466 3818
