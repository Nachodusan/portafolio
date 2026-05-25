document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     0. ICONS BOOT (defensive — also called inline)
     ============================================================ */
  if (window.lucide) window.lucide.createIcons();

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ============================================================
     1. CUSTOM CURSOR (desktop only)
     ============================================================ */
  const cursor = document.getElementById('cursor');
  const cursorDot = document.getElementById('cursor-dot');
  const isFinePointer = window.matchMedia('(pointer: fine)').matches && window.innerWidth > 1024;

  if (isFinePointer && cursor && cursorDot) {
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    let dx = mx, dy = my;

    window.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

    function loopCursor() {
      cx += (mx - cx) * 0.18;
      cy += (my - cy) * 0.18;
      dx += (mx - dx) * 0.55;
      dy += (my - dy) * 0.55;
      cursor.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      cursorDot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
      requestAnimationFrame(loopCursor);
    }
    loopCursor();

    const hoverables = document.querySelectorAll('a, button, [data-cursor], .magnetic-cta, .phone-app-button, .device-toggle-btn');
    hoverables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
    });
  }

  /* ============================================================
     2. SCROLL PROGRESS
     ============================================================ */
  const progress = document.getElementById('scroll-progress');
  if (progress) {
    const updateProgress = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const scrolled = total > 0 ? h.scrollTop / total : 0;
      progress.style.transform = `scaleX(${scrolled})`;
    };
    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /* ============================================================
     3. NAV MOBILE MENU + ANCHOR LINKS
     ============================================================ */
  const burger = document.getElementById('nav-burger');
  const overlay = document.getElementById('menu-overlay');

  function closeMenu() {
    if (!overlay) return;
    overlay.classList.remove('open');
    burger && burger.classList.remove('open');
    document.body.style.overflow = '';
  }
  function toggleMenu() {
    if (!overlay) return;
    const isOpen = overlay.classList.toggle('open');
    burger && burger.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
  burger && burger.addEventListener('click', toggleMenu);

  document.querySelectorAll('[data-nav], a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#') || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        closeMenu();
        target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth' });
      }
    });
  });

  /* ============================================================
     4. MAGNETIC CTA
     ============================================================ */
  if (isFinePointer && !prefersReduced) {
    document.querySelectorAll('.magnetic-cta').forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) * 0.25;
        const dy = (e.clientY - cy) * 0.25;
        el.style.transform = `translate(${dx}px, ${dy}px)`;
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0, 0)';
      });
    });
  }

  /* ============================================================
     5. SCROLL REVEAL
     ============================================================ */
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  /* ============================================================
     6. KINETIC MARQUEE — scroll velocity boost
     ============================================================ */
  const track = document.getElementById('kinetic-track');
  if (track && !prefersReduced) {
    let baseDuration = 40;
    let lastScroll = window.scrollY;
    let burst = 0;
    window.addEventListener('scroll', () => {
      const delta = Math.abs(window.scrollY - lastScroll);
      lastScroll = window.scrollY;
      burst = Math.min(40, burst + delta);
    }, { passive: true });
    setInterval(() => {
      burst *= 0.85;
      const dur = Math.max(8, baseDuration - burst * 0.4);
      track.style.animationDuration = `${dur}s`;
    }, 80);
  }

  /* 6.5 legacy CSS badge removed — replaced by badge3d.js (three + rapier) */
  /* eslint-disable */ if (false) {
  const badgeStage  = document.getElementById('badge-stage');
  const badgeAnchor = document.getElementById('badge-anchor');
  const badgeCard   = document.getElementById('badge-card');
  const badgeInner  = document.getElementById('badge-card-inner');
  const badgeRing   = document.getElementById('badge-ring');
  const cordLeft     = document.getElementById('cord-left');
  const cordLeftMain = document.getElementById('cord-left-main');
  const cordLeftHi   = document.getElementById('cord-left-hi');
  const cordRight    = document.getElementById('cord-right');
  const cordRightMain= document.getElementById('cord-right-main');
  const cordRightHi  = document.getElementById('cord-right-hi');
  const heroSection = document.getElementById('home');

  if (badgeStage && badgeCard && cordLeft && cordRight && heroSection) {
    const CORD_LEN = 200;          // fixed pendulum cord length (rigid)
    const cardW = () => badgeCard.offsetWidth;
    const cardH = () => badgeCard.offsetHeight;

    // Anchor: top of hero, slightly right of center
    let anchorX = 0, anchorY = 0;
    function placeAnchor() {
      const stageW = badgeStage.offsetWidth;
      anchorX = stageW - Math.min(280, stageW * 0.22);
      anchorY = 95;
      badgeAnchor.style.left = `${anchorX}px`;
      badgeAnchor.style.top  = `${anchorY}px`;
    }
    placeAnchor();
    window.addEventListener('resize', placeAnchor);

    // Pendulum state: angle in radians (0 = hanging straight down)
    let angle = 0;
    let angularVel = 0;

    // Card center derived from angle
    let px = anchorX;
    let py = anchorY + CORD_LEN;

    let isDragging = false;
    let dragStartX = 0, dragStartY = 0;
    let dragMoved = false;
    let lastAngle = 0;
    let lastT = performance.now();

    const ANCHOR_HALF = 22;   // half-width of anchor bar (two attachment points)
    const STRAND_SPLIT = 30;  // outward bulge for V-shape of the cord
    function setCordPath(ringX, ringY) {
      const ax = anchorX, ay = anchorY;
      const dx = ringX - ax;
      const dy = ringY - ay;
      const dist = Math.hypot(dx, dy) || 0.0001;
      // Perpendicular unit vector (for outward bulge of each strand)
      const px_ = -dy / dist, py_ = dx / dist;
      const slack = Math.max(0, NATURAL_LEN - dist) * 0.55;

      // Endpoints at anchor: left/right
      const lAx = ax - ANCHOR_HALF, lAy = ay;
      const rAx = ax + ANCHOR_HALF, rAy = ay;

      // Mid control points: bulge outward perpendicular to main vector + sag
      const midX = (ax + ringX) / 2;
      const midY = (ay + ringY) / 2 + 15 + slack;
      const lCx = midX - px_ * STRAND_SPLIT;
      const lCy = midY - py_ * STRAND_SPLIT;
      const rCx = midX + px_ * STRAND_SPLIT;
      const rCy = midY + py_ * STRAND_SPLIT;

      const dLeft  = `M ${lAx} ${lAy} Q ${lCx} ${lCy} ${ringX} ${ringY}`;
      const dRight = `M ${rAx} ${rAy} Q ${rCx} ${rCy} ${ringX} ${ringY}`;

      cordLeft.setAttribute('d',  dLeft);
      cordRight.setAttribute('d', dRight);
      cordLeftMain  && cordLeftMain.setAttribute('d',  dLeft);
      cordRightMain && cordRightMain.setAttribute('d', dRight);
      cordLeftHi    && cordLeftHi.setAttribute('d',  dLeft);
      cordRightHi   && cordRightHi.setAttribute('d', dRight);
    }

    function applyCard() {
      const dx = px - anchorX;
      const dy = py - anchorY;
      const angleDeg = Math.atan2(dx, dy) * (180 / Math.PI);
      const cw = cardW(), ch = cardH();
      const len = Math.hypot(dx, dy);
      const ux = len ? dx / len : 0;
      const uy = len ? dy / len : 1;
      const topX = px - ux * (ch / 2);
      const topY = py - uy * (ch / 2);
      badgeCard.style.left = `${topX - cw / 2}px`;
      badgeCard.style.top  = `${topY}px`;
      badgeCard.style.transform = `rotate(${angleDeg}deg)`;

      // Ring sits slightly above the clip top (~14px above card-top along the card-up direction)
      const ringX = topX - ux * 12;
      const ringY = topY - uy * 12;
      if (badgeRing) {
        badgeRing.style.left = `${ringX}px`;
        badgeRing.style.top  = `${ringY}px`;
      }
      setCordPath(ringX, ringY);
    }

    // Stage intro hint
    badgeStage.classList.add('intro');
    setTimeout(() => badgeStage.classList.remove('intro'), 4500);
    const hintEl = document.getElementById('badge-hint');
    if (hintEl) {
      hintEl.style.left = `${anchorX}px`;
      hintEl.style.top  = `${anchorY + CORD_LEN + cardH() + 30}px`;
    }

    // Rigid pendulum physics
    function loop() {
      const now = performance.now();
      const dt = Math.min(32, now - lastT) / 16.666;
      lastT = now;

      if (!isDragging && !prefersReduced) {
        // Angular gravity restores toward angle = 0 (straight down)
        const accel = -0.012 * Math.sin(angle);
        angularVel += accel * dt;
        angularVel *= 0.992;       // light damping → many swings before resting
        angle += angularVel * dt;
        if (Math.abs(angularVel) < 0.0002 && Math.abs(angle) < 0.001) {
          angle = 0; angularVel = 0;
        }
      }

      // Derive card position from rigid cord
      px = anchorX + Math.sin(angle) * CORD_LEN;
      py = anchorY + Math.cos(angle) * CORD_LEN;

      applyCard();
      requestAnimationFrame(loop);
    }
    applyCard();
    requestAnimationFrame(loop);

    // Pointer handlers
    function stagePoint(clientX, clientY) {
      const r = badgeStage.getBoundingClientRect();
      return { x: clientX - r.left, y: clientY - r.top };
    }

    function angleFromPointer(px_, py_) {
      // Angle from anchor to pointer (0 = straight down)
      const dx = px_ - anchorX;
      const dy = py_ - anchorY;
      return Math.atan2(dx, dy);
    }

    function onDown(e) {
      e.preventDefault();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const p = stagePoint(cx, cy);
      isDragging = true;
      dragMoved = false;
      dragStartX = p.x;
      dragStartY = p.y;
      lastAngle = angleFromPointer(p.x, p.y);
      angularVel = 0;
      badgeCard.classList.add('dragging');
    }
    function onMove(e) {
      if (!isDragging) return;
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      const p = stagePoint(cx, cy);
      if (Math.hypot(p.x - dragStartX, p.y - dragStartY) > 6) dragMoved = true;

      // Angle of pointer relative to anchor — that becomes the new pendulum angle
      const newAngle = angleFromPointer(p.x, p.y);
      // Clamp swing
      const clamped = Math.max(-1.4, Math.min(1.4, newAngle));
      angularVel = (clamped - angle) * 0.6;
      angle = clamped;
      lastAngle = newAngle;
    }
    function onUp() {
      if (!isDragging) return;
      isDragging = false;
      badgeCard.classList.remove('dragging');
      // Click without drag = flip
      if (!dragMoved) {
        badgeCard.classList.toggle('flipped');
      }
    }

    badgeCard.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);

    badgeCard.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);

    // Small startup swing for life
    angle = 0.18;
    angularVel = 0;
  }
  } /* end legacy badge block */

  /* ============================================================
     7. PHONE 3D MOCKUP — drag to tilt + spring back
     ============================================================ */
  const phoneScene = document.getElementById('phone-3d-scene');
  const phoneBody = document.getElementById('phone-3d-body');
  const toggleIosBtn = document.getElementById('toggle-ios');
  const toggleAndroidBtn = document.getElementById('toggle-android');

  if (phoneScene && phoneBody) {
    toggleIosBtn && toggleIosBtn.addEventListener('click', () => {
      phoneScene.className = 'phone-3d-scene ios';
      toggleIosBtn.classList.add('active');
      toggleAndroidBtn && toggleAndroidBtn.classList.remove('active');
    });
    toggleAndroidBtn && toggleAndroidBtn.addEventListener('click', () => {
      phoneScene.className = 'phone-3d-scene android';
      toggleAndroidBtn.classList.add('active');
      toggleIosBtn && toggleIosBtn.classList.remove('active');
    });

    let rotateX = 10, rotateY = -15;
    let isDragging = false, startX = 0, startY = 0;
    let velocityX = 0, velocityY = 0;

    function updateInertia() {
      if (!isDragging) {
        const targetX = 10, targetY = -15;
        const stiffness = 0.08, damping = 0.85;
        const forceX = (targetX - rotateX) * stiffness;
        const forceY = (targetY - rotateY) * stiffness;
        velocityX = (velocityX + forceX) * damping;
        velocityY = (velocityY + forceY) * damping;
        rotateX += velocityX;
        rotateY += velocityY;
        phoneBody.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      }
      requestAnimationFrame(updateInertia);
    }

    phoneBody.addEventListener('mousedown', (e) => {
      isDragging = true; startX = e.clientX; startY = e.clientY; velocityX = 0; velocityY = 0;
    });
    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      rotateY += dx * 0.15;
      rotateX -= dy * 0.15;
      rotateX = Math.max(Math.min(rotateX, 40), -20);
      rotateY = Math.max(Math.min(rotateY, 30), -50);
      phoneBody.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      startX = e.clientX; startY = e.clientY;
    });
    window.addEventListener('mouseup', () => { isDragging = false; });

    phoneBody.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
      velocityX = 0; velocityY = 0;
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const dx = e.touches[0].clientX - startX;
      const dy = e.touches[0].clientY - startY;
      rotateY += dx * 0.15;
      rotateX -= dy * 0.15;
      rotateX = Math.max(Math.min(rotateX, 40), -20);
      rotateY = Math.max(Math.min(rotateY, 30), -50);
      phoneBody.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      startX = e.touches[0].clientX; startY = e.touches[0].clientY;
    }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });

    updateInertia();
  }

  /* ============================================================
     8. PHONE OS ROUTING — apps, chat, github, contact
     ============================================================ */
  const appButtons = document.querySelectorAll('.phone-app-button');
  const homeScreen = document.getElementById('screen-home');
  const simScreens = document.querySelectorAll('.sim-screen');
  const homeHardwareBtn = document.getElementById('phone-home-indicator');

  function returnHome() {
    simScreens.forEach(s => s.classList.remove('active'));
    if (homeScreen) {
      homeScreen.classList.add('active');
      homeScreen.style.pointerEvents = 'auto';
    }
  }

  appButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const appName = btn.getAttribute('data-app');
      const target = document.getElementById(`screen-${appName}`);
      if (!target) return;
      if (homeScreen) {
        homeScreen.classList.remove('active');
        homeScreen.style.pointerEvents = 'none';
      }
      simScreens.forEach(s => s.classList.remove('active'));
      target.classList.add('active');
      if (appName === 'github') triggerGitHubCommitFlow();
    });
  });

  homeHardwareBtn && homeHardwareBtn.addEventListener('click', returnHome);
  document.querySelectorAll('.sim-app-close').forEach(b => b.addEventListener('click', returnHome));

  // Chat
  const chatArea = document.getElementById('chat-msg-area');
  const chatChoices = document.querySelectorAll('.sim-chat-choice-btn');
  const chatAnswers = {
    fav: "Mi stack preferido para producción es Next.js + Tailwind CSS en el front, Node.js + NestJS para microservicios del backend, y PostgreSQL como base de datos por su solidez. Me encanta TypeScript en todo el flujo.",
    projs: "Busco colaborar en proyectos desafiantes: plataformas SaaS escalables, aplicaciones móviles híbridas complejas (Flutter/Kotlin) y desarrollos que integren IoT e IA para automatizar flujos del mundo real.",
    avail: "¡Sí, estoy disponible! Podemos agendar una videollamada para analizar los requerimientos de tu proyecto o conversar sobre alianzas freelance. Escríbeme a dusanemp@gmail.com o usa el formulario aquí."
  };
  function appendChatBubble(text, sender) {
    const bubble = document.createElement('div');
    bubble.className = `sim-chat-bubble ${sender}`;
    bubble.textContent = text;
    chatArea && chatArea.appendChild(bubble);
    const scroller = chatArea && chatArea.closest('.sim-scroll-body');
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
    return bubble;
  }
  chatChoices.forEach(choice => {
    choice.addEventListener('click', () => {
      const key = choice.getAttribute('data-chat-opt');
      const userText = choice.textContent;
      appendChatBubble(userText, 'user');
      choice.style.display = 'none';
      setTimeout(() => {
        const typing = appendChatBubble('Tipeando…', 'dusan typing');
        setTimeout(() => {
          typing.remove();
          appendChatBubble(chatAnswers[key], 'dusan');
        }, 1200);
      }, 500);
    });
  });

  // GitHub commits sim
  let hasTriggeredGithub = false;
  function triggerGitHubCommitFlow() {
    if (hasTriggeredGithub) return;
    hasTriggeredGithub = true;
    const commitFeed = document.getElementById('commit-feed-area');
    const mockCommits = [
      { hash: 'e94fa10', msg: 'feat: configure system websocket layer', time: 'hace 2 horas' },
      { hash: 'b149b5c', msg: 'fix: optimize relational database indexing', time: 'hace 1 día' },
      { hash: '7fa56e0', msg: 'chore: deploy Docker compose sensor cluster', time: 'hace 3 días' },
      { hash: 'd95a201', msg: 'refactor: isolate hardware telemetry APIs', time: 'hace 5 días' }
    ];
    let i = 0;
    function appendCommit() {
      if (i >= mockCommits.length) return;
      const c = mockCommits[i++];
      const item = document.createElement('div');
      item.className = 'sim-commit-item';
      item.innerHTML = `
        <div class="sim-commit-dot"></div>
        <div class="sim-commit-info">
          <span class="sim-commit-hash">commit ${c.hash}</span>
          <span class="sim-commit-msg">${c.msg}</span>
          <span class="sim-commit-time">${c.time}</span>
        </div>
      `;
      commitFeed && commitFeed.appendChild(item);
      setTimeout(appendCommit, 600);
    }
    appendCommit();
    const chartGrid = document.getElementById('github-chart-cells');
    if (chartGrid) {
      chartGrid.innerHTML = '';
      for (let n = 0; n < 24; n++) {
        const cell = document.createElement('div');
        cell.className = 'sim-chart-cell';
        const r = Math.random();
        if (r > 0.8) cell.classList.add('ultra');
        else if (r > 0.6) cell.classList.add('high');
        else if (r > 0.4) cell.classList.add('med');
        else if (r > 0.25) cell.classList.add('low');
        chartGrid.appendChild(cell);
      }
    }
  }

  // Phone contact compose -> modal
  const simContactBtn = document.getElementById('sim-contact-submit');
  if (simContactBtn) {
    simContactBtn.addEventListener('click', () => {
      const n = document.getElementById('sim-name').value.trim();
      const e = document.getElementById('sim-email').value.trim();
      const m = document.getElementById('sim-msg').value.trim();
      if (!n || !e) { alert("Por favor, introduce tu Nombre y Correo en el teléfono."); return; }
      document.getElementById('user-name').value = n;
      document.getElementById('user-email').value = e;
      document.getElementById('user-message').value = m;
      document.querySelectorAll('.field__input').forEach(f => f.dispatchEvent(new Event('input')));
      returnHome();
      document.getElementById('success-modal').classList.add('show');
    });
  }

  /* ============================================================
     9. CONTACT MODAL
     ============================================================ */
  const contactTrigger = document.getElementById('main-contact-trigger');
  const successModal = document.getElementById('success-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const contactForm = document.getElementById('portfolio-contact-form');
  const directEmailBtn = document.getElementById('direct-email-btn');
  const inputFields = document.querySelectorAll('.field__input');

  /* CTA "Iniciar proyecto" ahora abre WhatsApp directo (es un <a> con href) — sin modal. */
  closeModalBtn && closeModalBtn.addEventListener('click', () => successModal.classList.remove('show'));
  successModal && successModal.addEventListener('click', (e) => {
    if (e.target === successModal) successModal.classList.remove('show');
  });

  inputFields.forEach(field => {
    if (field.value.trim() !== "") field.setAttribute('placeholder-shown', 'false');
    field.addEventListener('input', () => {
      if (field.value.trim() !== "") field.setAttribute('placeholder-shown', 'false');
      else field.removeAttribute('placeholder-shown');
    });
  });

  contactForm && contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('user-name').value.trim();
    const email = document.getElementById('user-email').value.trim();
    const message = document.getElementById('user-message').value.trim();
    if (!name || !email || !message) { alert("Por favor completa todos los campos."); return; }
    const subject = encodeURIComponent(`Mensaje de Portafolio - ${name}`);
    const body = encodeURIComponent(`Hola Ignacio,\n\nMi nombre es ${name} (${email}). Te escribo por el siguiente motivo:\n\n${message}\n\nSaludos.`);
    successModal.classList.remove('show');
    contactForm.reset();
    inputFields.forEach(f => f.removeAttribute('placeholder-shown'));
    window.location.href = `mailto:dusanemp@gmail.com?subject=${subject}&body=${body}`;
  });

  directEmailBtn && directEmailBtn.addEventListener('click', () => {
    successModal.classList.remove('show');
    const subject = encodeURIComponent("Contacto directo desde Portafolio");
    const body = encodeURIComponent("Hola Ignacio,\n\nMe gustaría conversar sobre un proyecto...\n\nSaludos.");
    window.location.href = `mailto:dusanemp@gmail.com?subject=${subject}&body=${body}`;
  });

  /* ============================================================
    10. Re-render lucide icons in case content updated after boot
     ============================================================ */
  if (window.lucide) window.lucide.createIcons();
});
