// =========================================================================
// 3D PHYSICS BADGE — three.js + Rapier (vanilla ESM, sin React/Vite)
// Cadena de 9 RigidBodies con SphericalJoints + tarjeta rectangular,
// cordón Catmull-Rom (TubeGeometry), drag kinematic ↔ dynamic con raycast.
// =========================================================================
import * as THREE from 'three';
import RAPIER from 'https://cdn.skypack.dev/@dimforge/rapier3d-compat@0.13.1';

await RAPIER.init();

const canvas = document.getElementById('badge3d');
if (!canvas) {
  console.warn('[badge3d] canvas not found');
} else {
  try {
    bootBadge(canvas);
  } catch (err) {
    console.error('[badge3d] boot failed:', err);
  }
}

function bootBadge(canvas) {
  // ----------------------------------------------------------------------
  // Renderer / Scene / Camera
  // ----------------------------------------------------------------------
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);

  // Camera horizontal offset: shifts the world's origin to the right of the
  // canvas so the badge (which lives near world x = 0) appears in the right
  // portion of a wide hero canvas, leaving room on the left for the hero title.
  let cameraXOffset = -1.4;
  let cameraDist = 5.8;
  let cameraY = 2.1;        // camera height
  let cameraYTarget = 1.85; // lookAt height — slightly below camera = looks down

  function placeCamera() {
    camera.position.set(cameraXOffset, cameraY, cameraDist);
    camera.lookAt(cameraXOffset, cameraYTarget, 0);
  }
  placeCamera();

  function resize() {
    const w = canvas.clientWidth || 400;
    const h = canvas.clientHeight || 700;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Scale horizontal offset proportional to aspect — wider canvas pushes badge
    // further right so it never overlaps with the hero text on the left side.
    cameraXOffset = -Math.min(0.9, Math.max(0.0, (w / h) * 0.4 - 0.25));
    placeCamera();
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  // ----------------------------------------------------------------------
  // Lights
  // ----------------------------------------------------------------------
  scene.add(new THREE.AmbientLight(0xffffff, 0.45));

  const key = new THREE.DirectionalLight(0xffffff, 1.8);
  key.position.set(2.5, 4, 3);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.bias = -0.0006;
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 12;
  key.shadow.camera.left = -3;
  key.shadow.camera.right = 3;
  key.shadow.camera.top = 3;
  key.shadow.camera.bottom = -3;
  scene.add(key);

  const rim = new THREE.DirectionalLight(0x7c5cff, 1.1);
  rim.position.set(-3, 1.5, -1.5);
  scene.add(rim);

  const accent = new THREE.PointLight(0x00e5c5, 1.6, 8, 2);
  accent.position.set(0.6, -0.8, 2.5);
  scene.add(accent);

  // Subtle environment (procedural) so PhysicalMaterial reflects something
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x0a0a14);
  const envTex = pmrem.fromScene(envScene, 0.04).texture;
  scene.environment = envTex;

  // ----------------------------------------------------------------------
  // Physics world
  // ----------------------------------------------------------------------
  const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
  // Stiffer constraint solver — less elastic joints, more iterations
  world.integrationParameters.numSolverIterations = 24;
  if ('numAdditionalFrictionIterations' in world.integrationParameters) {
    world.integrationParameters.numAdditionalFrictionIterations = 6;
  }

  // Two anchor points (necklace style) — pushed above the visible frame.
  // ANCHOR_HALF controls how wide the lanyard sits at the top (V-spread).
  const ANCHOR_Y = 4.8;
  const ANCHOR_HALF = 0.55;
  const anchorL = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(-ANCHOR_HALF, ANCHOR_Y, 0)
  );
  const anchorR = world.createRigidBody(
    RAPIER.RigidBodyDesc.fixed().setTranslation(+ANCHOR_HALF, ANCHOR_Y, 0)
  );

  // Card constants
  const CARD_W = 0.85;
  const CARD_H = 1.2;
  const CARD_T = 0.02;
  const CARD_TOP_HALF = 0.22;   // where each strand attaches on the top edge of card

  // Each strand: longer cord
  const SEGMENTS = 12;
  const SEG = 0.185;

  function buildStrand(anchorBody, anchorXSign) {
    const chain = [anchorBody];
    for (let i = 1; i <= SEGMENTS; i++) {
      // Interpolate body initial X from anchor side toward the CENTRAL hole (single attachment)
      const t = i / (SEGMENTS + 1);
      const startX = anchorXSign * ANCHOR_HALF;
      const endX   = 0; // both strands converge at center
      const ix = startX + (endX - startX) * t;
      const iy = ANCHOR_Y - i * SEG;
      const rb = world.createRigidBody(
        RAPIER.RigidBodyDesc.dynamic()
          .setTranslation(ix, iy, 0)
          .setLinearDamping(8.0)
          .setAngularDamping(8.0)
          .setCcdEnabled(true)
      );
      world.createCollider(
        RAPIER.ColliderDesc.ball(0.03)
          .setDensity(40)
          .setCollisionGroups(0x00010000), // membership=group 1, filter=nothing
        rb
      );
      const prev = chain[chain.length - 1];
      const j = RAPIER.JointData.spherical(
        i === 1 ? { x: 0, y: 0, z: 0 } : { x: 0, y: -SEG / 2, z: 0 },
        { x: 0, y:  SEG / 2, z: 0 }
      );
      world.createImpulseJoint(j, prev, rb, true);
      chain.push(rb);
    }
    return chain;
  }

  const leftStrand  = buildStrand(anchorL, -1);
  const rightStrand = buildStrand(anchorR, +1);

  // Card body
  const cardRestY = ANCHOR_Y - SEGMENTS * SEG - CARD_H / 2 - 0.08;
  let cardBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(0, cardRestY, 0)
      .setLinearDamping(2.8)
      .setAngularDamping(3.5)
      .setCanSleep(false)
      .setCcdEnabled(true)
  );
  world.createCollider(
    RAPIER.ColliderDesc.cuboid(CARD_W / 2, CARD_H / 2, CARD_T / 2)
      .setDensity(0.25)
      .setRestitution(0.05)
      .setFriction(0.7)
      .setCollisionGroups(0x00020000), // membership=group 2, filter=nothing → no contacts
    cardBody
  );

  // Each strand's last ball → physical "knot" body, then knot → single joint to card top.
  // Decouples the tug-of-war between the two strands and the card rotation,
  // killing the jitter caused by two joints fighting for the same anchor point.
  const lastL = leftStrand[leftStrand.length - 1];
  const lastR = rightStrand[rightStrand.length - 1];
  // Joint attaches at the CLIP slit, above the card top — matches the visual.
  const SINGLE_HOLE = { x: 0, y: CARD_H / 2 + 0.20, z: 0 };
  const knotY = cardRestY + CARD_H / 2 + 0.24; // just above the clip slit
  const knotBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(0, knotY, 0)
      .setLinearDamping(6.0)
      .setAngularDamping(6.0)
      .setCcdEnabled(true)
  );
  world.createCollider(
    RAPIER.ColliderDesc.ball(0.025)
      .setDensity(60)
      .setCollisionGroups(0x00010000),
    knotBody
  );
  // Both strands → knot (small offsets so they meet visually at the D-ring)
  world.createImpulseJoint(
    RAPIER.JointData.spherical({ x: 0, y: -SEG / 2, z: 0 }, { x: 0, y: 0.012, z: 0 }),
    lastL, knotBody, true
  );
  world.createImpulseJoint(
    RAPIER.JointData.spherical({ x: 0, y: -SEG / 2, z: 0 }, { x: 0, y: 0.012, z: 0 }),
    lastR, knotBody, true
  );
  // Knot → card (single rigid spherical joint at the central hole)
  world.createImpulseJoint(
    RAPIER.JointData.spherical({ x: 0, y: -0.012, z: 0 }, SINGLE_HOLE),
    knotBody, cardBody, true
  );

  // ----------------------------------------------------------------------
  // Visual: two FLAT RIBBONS (event-style lanyard strap with brand print)
  // ----------------------------------------------------------------------
  const ribbonTex = buildRibbonTexture();
  ribbonTex.colorSpace = THREE.SRGBColorSpace;
  ribbonTex.wrapS = THREE.RepeatWrapping;
  ribbonTex.wrapT = THREE.RepeatWrapping;
  ribbonTex.anisotropy = renderer.capabilities.getMaxAnisotropy();
  const cordMat = new THREE.MeshStandardMaterial({
    map: ribbonTex,
    roughness: 0.85,
    metalness: 0.02,
    side: THREE.DoubleSide,
  });
  const RIBBON_WIDTH = 0.13;
  const cordMeshL = new THREE.Mesh(new THREE.BufferGeometry(), cordMat);
  const cordMeshR = new THREE.Mesh(new THREE.BufferGeometry(), cordMat);
  cordMeshL.castShadow = true;
  cordMeshR.castShadow = true;
  scene.add(cordMeshL, cordMeshR);

  // Chrome anchor beads (two)
  const beadMat = new THREE.MeshStandardMaterial({ color: 0xd5d5dc, metalness: 0.9, roughness: 0.25 });
  const beadGeom = new THREE.SphereGeometry(0.035, 24, 16);
  const beadL = new THREE.Mesh(beadGeom, beadMat);
  const beadR = new THREE.Mesh(beadGeom, beadMat);
  beadL.position.set(-ANCHOR_HALF, ANCHOR_Y, 0);
  beadR.position.set(+ANCHOR_HALF, ANCHOR_Y, 0);
  beadL.castShadow = beadR.castShadow = true;
  scene.add(beadL, beadR);

  // ----------------------------------------------------------------------
  // Visual: card (rounded extrude + PhysicalMaterial + canvas textures)
  // ----------------------------------------------------------------------
  const { texFront, texBack } = buildCardTextures();
  texFront.colorSpace = THREE.SRGBColorSpace;
  texBack.colorSpace  = THREE.SRGBColorSpace;
  texFront.anisotropy = renderer.capabilities.getMaxAnisotropy();
  texBack.anisotropy  = renderer.capabilities.getMaxAnisotropy();
  // Mirror back texture horizontally so it reads correctly when viewed from -Z
  texBack.wrapS = THREE.RepeatWrapping;
  texBack.repeat.x = -1;
  texBack.offset.x = 1;

  const frontMat = new THREE.MeshStandardMaterial({
    map: texFront,
    roughness: 0.35,
    metalness: 0.1,
    envMapIntensity: 1.0,
  });
  const backMat = new THREE.MeshStandardMaterial({
    map: texBack,
    roughness: 0.35,
    metalness: 0.1,
    envMapIntensity: 1.0,
  });
  const edgeMat = new THREE.MeshStandardMaterial({
    color: 0x16161e,
    metalness: 0.7,
    roughness: 0.35,
  });

  // BoxGeometry face order: +X, -X, +Y, -Y, +Z (front), -Z (back)
  const cardGeom = new THREE.BoxGeometry(CARD_W, CARD_H, CARD_T);
  const cardBodyMesh = new THREE.Mesh(cardGeom, [
    edgeMat, edgeMat,    // X sides
    edgeMat, edgeMat,    // Y sides
    frontMat, backMat,   // front (+Z), back (-Z)
  ]);
  cardBodyMesh.castShadow = true;
  cardBodyMesh.receiveShadow = true;
  scene.add(cardBodyMesh);

  // Transparent acrylic holder/sleeve framing the card. Rounded rectangle frame
  // with a hole cut to expose the printed card surface in the middle.
  (function addHolder() {
    const HOLDER_PAD = 0.05;
    const HOLDER_W = CARD_W + HOLDER_PAD * 2;
    const HOLDER_H = CARD_H + HOLDER_PAD * 2;
    const HOLDER_R = 0.06;
    const HOLDER_T = 0.05; // depth (thicker than card so it visually wraps it)
    const INSET = 0.025;   // how much smaller the cutout window is vs the card

    function roundedRectShape(w, h, r) {
      const s = new THREE.Shape();
      s.moveTo(-w/2 + r, -h/2);
      s.lineTo( w/2 - r, -h/2);
      s.quadraticCurveTo( w/2, -h/2,  w/2, -h/2 + r);
      s.lineTo( w/2,  h/2 - r);
      s.quadraticCurveTo( w/2,  h/2,  w/2 - r,  h/2);
      s.lineTo(-w/2 + r,  h/2);
      s.quadraticCurveTo(-w/2,  h/2, -w/2,  h/2 - r);
      s.lineTo(-w/2, -h/2 + r);
      s.quadraticCurveTo(-w/2, -h/2, -w/2 + r, -h/2);
      return s;
    }

    const outer = roundedRectShape(HOLDER_W, HOLDER_H, HOLDER_R);
    // Inner cutout window (slightly smaller than card so the printed area shows through)
    const winW = CARD_W - INSET * 2;
    const winH = CARD_H - INSET * 2;
    const winR = 0.035;
    const hole = new THREE.Path();
    hole.moveTo(-winW/2 + winR, -winH/2);
    hole.lineTo( winW/2 - winR, -winH/2);
    hole.quadraticCurveTo( winW/2, -winH/2,  winW/2, -winH/2 + winR);
    hole.lineTo( winW/2,  winH/2 - winR);
    hole.quadraticCurveTo( winW/2,  winH/2,  winW/2 - winR,  winH/2);
    hole.lineTo(-winW/2 + winR,  winH/2);
    hole.quadraticCurveTo(-winW/2,  winH/2, -winW/2,  winH/2 - winR);
    hole.lineTo(-winW/2, -winH/2 + winR);
    hole.quadraticCurveTo(-winW/2, -winH/2, -winW/2 + winR, -winH/2);
    outer.holes.push(hole);

    const frameGeo = new THREE.ExtrudeGeometry(outer, {
      depth: HOLDER_T,
      bevelEnabled: true,
      bevelSize: 0.004,
      bevelThickness: 0.004,
      bevelSegments: 2,
      curveSegments: 24,
    });
    frameGeo.translate(0, 0, -HOLDER_T / 2);

    const holderMat = new THREE.MeshPhysicalMaterial({
      color: 0xf0f2f5,
      metalness: 0.0,
      roughness: 0.15,
      transmission: 0.85,
      thickness: 0.4,
      ior: 1.45,
      transparent: true,
      opacity: 0.55,
      clearcoat: 0.8,
      clearcoatRoughness: 0.1,
      side: THREE.DoubleSide,
    });
    const holderMesh = new THREE.Mesh(frameGeo, holderMat);
    holderMesh.castShadow = true;
    holderMesh.receiveShadow = true;
    // Sit it centered with the card; depth wraps both faces.
    cardBodyMesh.add(holderMesh);
  })();

  // Two real metal grommets where each strand attaches to the card
  // (chrome disk + inner hole + tiny D-ring through it)
  const grommetMat = new THREE.MeshStandardMaterial({
    color: 0xe8e8ee, metalness: 1.0, roughness: 0.15,
  });
  const grommetDarkMat = new THREE.MeshStandardMaterial({
    color: 0x9a9aa4, metalness: 1.0, roughness: 0.35,
  });
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0xd0d0d8, metalness: 1.0, roughness: 0.18,
  });

  // Black plastic squeeze-clip mechanism that sits ABOVE the card and grips
  // its top edge. The lanyard cord threads through the slit hole at the top
  // of the clip — exactly like a physical event ID badge holder.
  // Group origin = the lanyard hole (so it lines up with SINGLE_HOLE).
  function makeClipMechanism() {
    const g = new THREE.Group();

    // -- Plastic body shape with slit for the cord
    const CW = 0.22;     // clip width
    const CH = 0.16;     // clip height
    const CD = 0.028;    // clip depth (thickness)
    const CR = 0.022;    // corner radius
    const SLIT_W = 0.09; // lanyard slot width
    const SLIT_H = 0.014;
    const SLIT_Y_FROM_TOP = 0.025;

    const body = new THREE.Shape();
    body.moveTo(-CW/2 + CR, -CH/2);
    body.lineTo( CW/2 - CR, -CH/2);
    body.quadraticCurveTo( CW/2, -CH/2,  CW/2, -CH/2 + CR);
    body.lineTo( CW/2,  CH/2 - CR);
    body.quadraticCurveTo( CW/2,  CH/2,  CW/2 - CR,  CH/2);
    body.lineTo(-CW/2 + CR,  CH/2);
    body.quadraticCurveTo(-CW/2,  CH/2, -CW/2,  CH/2 - CR);
    body.lineTo(-CW/2, -CH/2 + CR);
    body.quadraticCurveTo(-CW/2, -CH/2, -CW/2 + CR, -CH/2);

    // slit hole near top
    const slitY = CH/2 - SLIT_Y_FROM_TOP - SLIT_H/2;
    const slit = new THREE.Path();
    slit.moveTo(-SLIT_W/2, slitY - SLIT_H/2);
    slit.lineTo( SLIT_W/2, slitY - SLIT_H/2);
    slit.lineTo( SLIT_W/2, slitY + SLIT_H/2);
    slit.lineTo(-SLIT_W/2, slitY + SLIT_H/2);
    slit.lineTo(-SLIT_W/2, slitY - SLIT_H/2);
    body.holes.push(slit);

    const bodyGeo = new THREE.ExtrudeGeometry(body, {
      depth: CD,
      bevelEnabled: true,
      bevelSize: 0.003,
      bevelThickness: 0.003,
      bevelSegments: 2,
      curveSegments: 16,
    });
    bodyGeo.translate(0, 0, -CD / 2);

    const plasticMat = new THREE.MeshStandardMaterial({
      color: 0x18181f,
      roughness: 0.45,
      metalness: 0.05,
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, plasticMat);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;

    // Shift body so the SLIT (cord hole) ends up at the group origin.
    bodyMesh.position.y = -slitY;
    g.add(bodyMesh);

    // -- Horizontal chrome hardware bar (the lever you squeeze on real clips)
    const leverMat = new THREE.MeshStandardMaterial({
      color: 0xc8c8d0, metalness: 0.95, roughness: 0.22,
    });
    const lever = new THREE.Mesh(
      new THREE.CylinderGeometry(0.014, 0.014, CW - 0.02, 20),
      leverMat
    );
    lever.rotation.z = Math.PI / 2;
    lever.position.set(0, -0.045, CD / 2 + 0.005);
    lever.castShadow = true;
    g.add(lever);
    // Lever back side
    const leverBack = lever.clone();
    leverBack.position.z = -CD / 2 - 0.005;
    g.add(leverBack);
    // Tiny chrome rivets at lever ends
    const rivetMat = new THREE.MeshStandardMaterial({ color: 0xe2e2e8, metalness: 1.0, roughness: 0.18 });
    const rivetGeo = new THREE.CylinderGeometry(0.007, 0.007, CD + 0.012, 14);
    for (const sign of [-1, 1]) {
      const r = new THREE.Mesh(rivetGeo, rivetMat);
      r.rotation.x = Math.PI / 2;
      r.position.set(sign * (CW / 2 - 0.02), -0.045, 0);
      r.castShadow = true;
      g.add(r);
    }

    // -- Two black plastic prongs that grip the card top edge
    const prongMat = new THREE.MeshStandardMaterial({
      color: 0x0c0c12, roughness: 0.5, metalness: 0.05,
    });
    const prongGeo = new THREE.BoxGeometry(0.03, 0.06, 0.012);
    for (const sign of [-1, 1]) {
      const p = new THREE.Mesh(prongGeo, prongMat);
      // Hanging just below the body, gripping the card top
      p.position.set(sign * 0.055, -CH / 2 - slitY - 0.03, 0);
      p.castShadow = true;
      g.add(p);
    }

    return g;
  }

  // Single central grommet (legacy — kept for back-compat, no longer used).
  function makeCentralGrommet() {
    const g = new THREE.Group();
    const SLOT_W = 0.18;
    const SLOT_H = 0.022;
    const SLOT_Y = -0.05;  // sits inside the card, below the D-ring

    // Build the slot rim as a flat ring with rounded ends (capsule)
    function makeCapsuleRim(w, h, thick, depth, mat) {
      const r = h / 2;
      const outer = new THREE.Shape();
      outer.moveTo(-w/2 + r, -r);
      outer.lineTo( w/2 - r, -r);
      outer.absarc( w/2 - r, 0, r, -Math.PI/2, Math.PI/2, false);
      outer.lineTo(-w/2 + r, r);
      outer.absarc(-w/2 + r, 0, r, Math.PI/2, -Math.PI/2, false);
      const hole = new THREE.Path();
      const rInner = Math.max(0.001, r - thick);
      hole.moveTo(-w/2 + r, -rInner);
      hole.lineTo( w/2 - r, -rInner);
      hole.absarc( w/2 - r, 0, rInner, -Math.PI/2, Math.PI/2, false);
      hole.lineTo(-w/2 + r, rInner);
      hole.absarc(-w/2 + r, 0, rInner, Math.PI/2, -Math.PI/2, false);
      outer.holes.push(hole);
      const geo = new THREE.ExtrudeGeometry(outer, {
        depth, bevelEnabled: true, bevelSize: 0.002, bevelThickness: 0.002, bevelSegments: 1, curveSegments: 16,
      });
      geo.translate(0, 0, -depth / 2);
      const m = new THREE.Mesh(geo, mat);
      m.castShadow = true;
      return m;
    }

    // Front rim
    const rimFront = makeCapsuleRim(SLOT_W, SLOT_H, 0.012, 0.008, grommetMat);
    rimFront.position.set(0, SLOT_Y, CARD_T / 2 + 0.0035);
    g.add(rimFront);
    // Back rim
    const rimBack = makeCapsuleRim(SLOT_W, SLOT_H, 0.012, 0.008, grommetMat);
    rimBack.position.set(0, SLOT_Y, -CARD_T / 2 - 0.0035);
    g.add(rimBack);
    // Dark inner edge of the slot
    const inner = makeCapsuleRim(SLOT_W - 0.012, SLOT_H - 0.006, 0.004, CARD_T + 0.004, grommetDarkMat);
    inner.position.set(0, SLOT_Y, 0);
    g.add(inner);

    // D-ring threaded through the slot — at group origin (= joint point)
    const dRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.052, 0.008, 18, 40),
      ringMat
    );
    dRing.castShadow = true;
    g.add(dRing);

    // Tiny chrome clasp/hook visual where the cords join
    const clasp = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, 0.024, 16),
      ringMat
    );
    clasp.position.y = 0.05;
    clasp.castShadow = true;
    g.add(clasp);

    return g;
  }

  // Plastic clip mechanism sitting above the card top — lanyard threads through
  // the slit at its top. Group origin = the slit hole (where the cord meets it).
  // Joint anchor + cord visual endpoint both target this position.
  const CLIP_HOLE_Y = CARD_H / 2 + 0.20; // local Y of the slit hole in card space
  const grommetMesh = makeClipMechanism();
  grommetMesh.position.set(0, CLIP_HOLE_Y, 0);
  cardBodyMesh.add(grommetMesh);

  // Local offset for the cord endpoint lookup (matches clip slit).
  const _grommetLocal = new THREE.Vector3(0, CLIP_HOLE_Y, 0);

  // ----------------------------------------------------------------------
  // Drag interaction: pointer → raycast plane → kinematic body
  // ----------------------------------------------------------------------
  const raycaster = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
  const dragOffset = new THREE.Vector3();
  const dragTarget = new THREE.Vector3();

  let isDragging = false;
  let isDown = false;
  let downX = 0, downY = 0;
  let movedAfterDown = false;
  // Ring buffer of recent drag target positions for release follow-through
  const DRAG_HIST_SIZE = 8;
  const dragHistPos = new Array(DRAG_HIST_SIZE).fill(0).map(() => new THREE.Vector3());
  const dragHistTime = new Array(DRAG_HIST_SIZE).fill(0);
  let dragHistIdx = 0;

  function setNDC(clientX, clientY) {
    const r = canvas.getBoundingClientRect();
    ndc.x = ((clientX - r.left) / r.width) * 2 - 1;
    ndc.y = -(((clientY - r.top) / r.height) * 2 - 1);
  }

  function pointerWorld(clientX, clientY, depthZ) {
    setNDC(clientX, clientY);
    raycaster.setFromCamera(ndc, camera);
    // Plane parallel to camera at z = depthZ
    dragPlane.set(new THREE.Vector3(0, 0, 1), -depthZ);
    const out = new THREE.Vector3();
    raycaster.ray.intersectPlane(dragPlane, out);
    return out;
  }

  function onDown(e) {
    e.preventDefault();
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    isDown = true;
    movedAfterDown = false;
    downX = cx; downY = cy;
    setNDC(cx, cy);
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObject(cardBodyMesh, true);
    if (hits.length) {
      isDragging = true;
      // Switch to kinematic for direct control
      cardBody.setBodyType(RAPIER.RigidBodyType.KinematicPositionBased, true);
      const hitPoint = hits[0].point;
      const t = cardBody.translation();
      dragOffset.set(t.x - hitPoint.x, t.y - hitPoint.y, t.z - hitPoint.z);
    }
  }
  function onMove(e) {
    if (!isDown) return;
    const cx = e.touches ? e.touches[0].clientX : e.clientX;
    const cy = e.touches ? e.touches[0].clientY : e.clientY;
    if (Math.hypot(cx - downX, cy - downY) > 5) movedAfterDown = true;
    if (!isDragging) return;
    e.preventDefault?.();
    const world = pointerWorld(cx, cy, cardBody.translation().z);
    dragTarget.copy(world).add(dragOffset);
    // Constrain to a circle around the anchor midpoint so the cord
    // can never be over-stretched (which was making the card feel "stuck").
    const midY = ANCHOR_Y;
    const MAX_REACH = (SEGMENTS * SEG) + CARD_H * 0.5 + 0.2; // chain + half-card + margin
    const dx = dragTarget.x;
    const dy = dragTarget.y - midY;
    const d  = Math.hypot(dx, dy);
    if (d > MAX_REACH) {
      const k = MAX_REACH / d;
      dragTarget.x = dx * k;
      dragTarget.y = midY + dy * k;
    }
    // Soft outer safety bounds
    dragTarget.x = THREE.MathUtils.clamp(dragTarget.x, -3, 3);
    dragTarget.y = THREE.MathUtils.clamp(dragTarget.y, -3.5, ANCHOR_Y + 0.4);
    cardBody.setNextKinematicTranslation({ x: dragTarget.x, y: dragTarget.y, z: 0 });
    // Record into drag history for release follow-through.
    dragHistPos[dragHistIdx].set(dragTarget.x, dragTarget.y, 0);
    dragHistTime[dragHistIdx] = performance.now();
    dragHistIdx = (dragHistIdx + 1) % DRAG_HIST_SIZE;
  }
  function onUp() {
    if (!isDown) return;
    isDown = false;
    if (isDragging) {
      isDragging = false;
      cardBody.setBodyType(RAPIER.RigidBodyType.Dynamic, true);
      // Compute follow-through velocity = average cursor velocity over recent samples (~100 ms).
      const now = performance.now();
      let vx = 0, vy = 0, count = 0;
      let newest = -1, newestT = -Infinity;
      for (let i = 0; i < DRAG_HIST_SIZE; i++) {
        if (dragHistTime[i] > newestT) { newestT = dragHistTime[i]; newest = i; }
      }
      if (newest >= 0) {
        for (let i = 0; i < DRAG_HIST_SIZE; i++) {
          if (i === newest) continue;
          if (dragHistTime[i] <= 0) continue;
          const dt = (newestT - dragHistTime[i]) / 1000;
          if (dt > 0 && dt < 0.12) {
            vx += (dragHistPos[newest].x - dragHistPos[i].x) / dt;
            vy += (dragHistPos[newest].y - dragHistPos[i].y) / dt;
            count++;
          }
        }
        if (count > 0) { vx /= count; vy /= count; }
      }
      const FOLLOW = 0.6;
      cardBody.setLinvel(
        { x: vx * FOLLOW, y: vy * FOLLOW, z: 0 },
        true
      );
      // Kill only the Y-axis spin to avoid silly continuous flipping after a drag.
      const av = cardBody.angvel();
      cardBody.setAngvel({ x: av.x * 0.3, y: 0, z: av.z * 0.3 }, true);
      // Clear history so next drag starts fresh.
      for (let i = 0; i < DRAG_HIST_SIZE; i++) dragHistTime[i] = 0;
    } else if (!movedAfterDown) {
      // Click without drag: flip impulse around Y
      cardBody.applyTorqueImpulse({ x: 0, y: 0.06, z: 0 }, true);
    }
  }

  canvas.addEventListener('mousedown', onDown);
  window.addEventListener('mousemove', onMove);
  window.addEventListener('mouseup', onUp);

  canvas.addEventListener('touchstart', onDown, { passive: false });
  window.addEventListener('touchmove', onMove, { passive: false });
  window.addEventListener('touchend', onUp);

  // Pointer-events gating: enable canvas hits only when mouse is over the card.
  // Throttled to ~30 Hz so we don't raycast on every mousemove event.
  let lastHoverCheck = 0;
  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      canvas.style.pointerEvents = 'auto';
      canvas.classList.add('is-dragging');
      return;
    }
    const now = performance.now();
    if (now - lastHoverCheck < 33) return;
    lastHoverCheck = now;

    const r = canvas.getBoundingClientRect();
    const inBounds = e.clientX >= r.left && e.clientX <= r.right &&
                     e.clientY >= r.top  && e.clientY <= r.bottom;
    if (!inBounds) {
      canvas.style.pointerEvents = 'none';
      canvas.classList.remove('is-over', 'is-dragging');
      return;
    }
    setNDC(e.clientX, e.clientY);
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObject(cardBodyMesh, true);
    if (hits.length) {
      canvas.style.pointerEvents = 'auto';
      canvas.classList.add('is-over');
    } else {
      canvas.style.pointerEvents = 'none';
      canvas.classList.remove('is-over');
    }
  });

  // ----------------------------------------------------------------------
  // Sync mesh from body each frame
  // ----------------------------------------------------------------------
  function syncCard() {
    const p = cardBody.translation();
    const q = cardBody.rotation();
    cardBodyMesh.position.set(p.x, p.y, p.z);
    cardBodyMesh.quaternion.set(q.x, q.y, q.z, q.w);
  }

  // -------------------- Ribbon: smooth spline + parallel-transport frame --------------------
  // Densify the chain points with a Catmull-Rom curve so the ribbon looks like a
  // continuous strap, not a chain of straight segments. Orientation is propagated
  // by parallel transport from one cross-section to the next → no flips when the
  // tangent aligns with the camera direction.

  const SAMPLES_PER_SEG = 6;
  // Per strand controls: anchor + SEGMENTS chain bodies + shared knot + grommet on card.
  // (anchor counts as chain[0]) → (SEGMENTS+1) + 1 + 1 = SEGMENTS+3.
  const RIBBON_CONTROLS = SEGMENTS + 3;
  const RIBBON_SAMPLES  = (RIBBON_CONTROLS - 1) * SAMPLES_PER_SEG + 1;
  const RIBBON_VERTS    = RIBBON_SAMPLES * 2;
  const RIBBON_TRIS     = (RIBBON_SAMPLES - 1) * 2;

  function makeRibbonMesh() {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(RIBBON_VERTS * 3);
    const normals   = new Float32Array(RIBBON_VERTS * 3);
    const uvs       = new Float32Array(RIBBON_VERTS * 2);
    const indices   = new Uint16Array(RIBBON_TRIS * 3);
    // Pre-compute indices (static topology) and UVs along V axis.
    let ii = 0;
    for (let i = 0; i < RIBBON_SAMPLES - 1; i++) {
      const a = i * 2;
      indices[ii++] = a;     indices[ii++] = a + 1; indices[ii++] = a + 2;
      indices[ii++] = a + 1; indices[ii++] = a + 3; indices[ii++] = a + 2;
    }
    for (let i = 0; i < RIBBON_SAMPLES; i++) {
      const t = i / (RIBBON_SAMPLES - 1);
      uvs[i*4 + 0] = 0; uvs[i*4 + 1] = t * 5;
      uvs[i*4 + 2] = 1; uvs[i*4 + 3] = t * 5;
    }
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('normal',   new THREE.BufferAttribute(normals,   3));
    g.setAttribute('uv',       new THREE.BufferAttribute(uvs,       2));
    g.setIndex(new THREE.BufferAttribute(indices, 1));
    g.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 10); // disable frustum-cull churn
    return g;
  }

  const ribbonGeomL = makeRibbonMesh();
  const ribbonGeomR = makeRibbonMesh();
  cordMeshL.geometry.dispose(); cordMeshL.geometry = ribbonGeomL;
  cordMeshR.geometry.dispose(); cordMeshR.geometry = ribbonGeomR;
  cordMeshL.frustumCulled = false;
  cordMeshR.frustumCulled = false;

  // Reusable control-point buffers (one per strand)
  const ctrlL = new Array(RIBBON_CONTROLS).fill(0).map(() => new THREE.Vector3());
  const ctrlR = new Array(RIBBON_CONTROLS).fill(0).map(() => new THREE.Vector3());
  // Persistent parallel-transport frame, one normal vector per strand.
  const ptNormalL = new THREE.Vector3(1, 0, 0);
  const ptNormalR = new THREE.Vector3(1, 0, 0);

  const _knotWorld = new THREE.Vector3();
  const _grommetWorld = new THREE.Vector3();

  function fillStrandControls(chain, out) {
    for (let i = 0; i < chain.length; i++) {
      const t = chain[i].translation();
      out[i].set(t.x, t.y, t.z);
    }
    // Penultimate: physics knot where both strands meet
    const k = knotBody.translation();
    out[chain.length].set(k.x, k.y, k.z);
    // Last: grommet on the card → ribbon visually terminates at the D-ring
    cardBodyMesh.localToWorld(_grommetWorld.copy(_grommetLocal));
    out[chain.length + 1].copy(_grommetWorld);
  }

  // Scratch vectors for the ribbon update.
  const _p = new THREE.Vector3();
  const _pPrev = new THREE.Vector3();
  const _tan = new THREE.Vector3();
  const _tanPrev = new THREE.Vector3();
  const _bitan = new THREE.Vector3();
  const _proj = new THREE.Vector3();
  const _axis = new THREE.Vector3();
  const _q = new THREE.Quaternion();
  const _camFwd = new THREE.Vector3();

  function updateStrandRibbon(controls, geom, ptNormal, width) {
    const positions = geom.attributes.position.array;
    const normals   = geom.attributes.normal.array;
    const half = width / 2;

    // Build a single Catmull-Rom curve through all controls (centripetal = stable for sharp bends).
    const curve = new THREE.CatmullRomCurve3(controls, false, 'centripetal', 0.5);

    // Seed the parallel-transport normal from the previous frame's normal,
    // projected onto the plane perpendicular to the initial tangent.
    curve.getTangentAt(0, _tanPrev).normalize();
    _proj.copy(ptNormal).sub(_tanPrev.clone().multiplyScalar(ptNormal.dot(_tanPrev)));
    if (_proj.lengthSq() < 1e-6) {
      // Degenerate: pick a stable axis (camera-right approximation)
      camera.getWorldDirection(_camFwd);
      _proj.crossVectors(_tanPrev, _camFwd);
      if (_proj.lengthSq() < 1e-6) _proj.set(1, 0, 0);
    }
    _proj.normalize();
    ptNormal.copy(_proj);

    curve.getPointAt(0, _pPrev);

    for (let i = 0; i < RIBBON_SAMPLES; i++) {
      const t = i / (RIBBON_SAMPLES - 1);
      curve.getPointAt(t, _p);
      curve.getTangentAt(t, _tan).normalize();

      // Parallel transport: rotate the previous normal by the rotation that takes _tanPrev → _tan
      if (i > 0) {
        const dot = THREE.MathUtils.clamp(_tanPrev.dot(_tan), -1, 1);
        if (dot < 0.9999) {
          _axis.crossVectors(_tanPrev, _tan).normalize();
          const angle = Math.acos(dot);
          _q.setFromAxisAngle(_axis, angle);
          ptNormal.applyQuaternion(_q);
        }
      }
      // Re-orthogonalize against current tangent (numerical drift)
      ptNormal.sub(_tan.clone().multiplyScalar(ptNormal.dot(_tan))).normalize();

      // Bitangent (width direction)
      _bitan.crossVectors(_tan, ptNormal).normalize().multiplyScalar(half);

      // Two verts per cross-section
      const a = i * 6;
      positions[a    ] = _p.x - _bitan.x;
      positions[a + 1] = _p.y - _bitan.y;
      positions[a + 2] = _p.z - _bitan.z;
      positions[a + 3] = _p.x + _bitan.x;
      positions[a + 4] = _p.y + _bitan.y;
      positions[a + 5] = _p.z + _bitan.z;

      // Normal = the parallel-transport normal (perpendicular to the ribbon's surface)
      normals[a    ] = ptNormal.x;
      normals[a + 1] = ptNormal.y;
      normals[a + 2] = ptNormal.z;
      normals[a + 3] = ptNormal.x;
      normals[a + 4] = ptNormal.y;
      normals[a + 5] = ptNormal.z;

      _tanPrev.copy(_tan);
      _pPrev.copy(_p);
    }

    geom.attributes.position.needsUpdate = true;
    geom.attributes.normal.needsUpdate = true;
  }

  function updateCord() {
    fillStrandControls(leftStrand,  ctrlL);
    fillStrandControls(rightStrand, ctrlR);
    updateStrandRibbon(ctrlL, ribbonGeomL, ptNormalL, RIBBON_WIDTH);
    updateStrandRibbon(ctrlR, ribbonGeomR, ptNormalR, RIBBON_WIDTH);
  }

  // ----------------------------------------------------------------------
  // Animation loop — Rapier fixed step + render + idle ambient motion
  // ----------------------------------------------------------------------
  let last = performance.now();
  let acc = 0;
  const FIXED = 1 / 60;

  // Idle motion: when the card has been at rest for > 1.5s, occasionally apply a
  // tiny torque impulse so the badge looks alive ("breeze"). Re-arms after every
  // user interaction.
  let restTimer = 0;             // ms accumulated while card is at rest
  let nextBreezeIn = 4000;       // ms until next breeze impulse
  function maybeBreeze(dt) {
    if (isDragging) { restTimer = 0; nextBreezeIn = 4000 + Math.random() * 4000; return; }
    const lv = cardBody.linvel();
    const av = cardBody.angvel();
    const speed = Math.hypot(lv.x, lv.y, lv.z) + Math.hypot(av.x, av.y, av.z);
    if (speed < 0.06) {
      restTimer += dt * 1000;
      if (restTimer > 1500) {
        nextBreezeIn -= dt * 1000;
        if (nextBreezeIn <= 0) {
          const dir = Math.random() < 0.5 ? -1 : 1;
          const mag = (0.0015 + Math.random() * 0.0015) * dir;
          cardBody.applyTorqueImpulse({ x: 0, y: 0, z: mag }, true);
          nextBreezeIn = 4000 + Math.random() * 4000;
        }
      }
    } else {
      restTimer = 0;
      nextBreezeIn = 4000 + Math.random() * 4000;
    }
  }

  function tick() {
    const now = performance.now();
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    acc += dt;
    while (acc >= FIXED) {
      world.step();
      acc -= FIXED;
    }
    syncCard();
    maybeBreeze(dt);
    // Make sure the card's world matrix is current before we read grommet world pos.
    cardBodyMesh.updateMatrixWorld(true);
    updateCord();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
  tick();
}

// ============================================================
// Helpers
// ============================================================

function makeRoundedRectShape(w, h, r) {
  const x = -w / 2, y = -h / 2;
  const s = new THREE.Shape();
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y);
  s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r);
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h);
  s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r);
  s.quadraticCurveTo(x, y, x + r, y);
  return s;
}

function makeRoundedCardGeometry(w, h, t, r) {
  const shape = makeRoundedRectShape(w, h, r);
  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: t,
    bevelEnabled: true,
    bevelThickness: 0.004,
    bevelSize: 0.004,
    bevelSegments: 2,
    curveSegments: 16,
  });
  geom.translate(0, 0, -t / 2);
  return geom;
}

function buildCardTextures() {
  const W = 512, H = 720;

  // ---------- FRONT ----------
  const front = document.createElement('canvas');
  front.width = W; front.height = H;
  const f = front.getContext('2d');

  // bg gradient
  const bg = f.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, '#1a1a23');
  bg.addColorStop(1, '#08080d');
  f.fillStyle = bg;
  roundRect(f, 0, 0, W, H, 28, true, false);

  // brand gradient bar top
  const bb = f.createLinearGradient(0, 0, W, 0);
  bb.addColorStop(0, '#7C5CFF');
  bb.addColorStop(0.5, '#00E5C5');
  bb.addColorStop(1, '#FF5C8A');
  f.fillStyle = bb;
  f.fillRect(0, 0, W, 12);

  // top metadata
  f.fillStyle = '#7C5CFF';
  f.font = 'bold 22px "JetBrains Mono", monospace';
  f.fillText('</> DUSAN', 36, 86);

  // status pill
  f.strokeStyle = 'rgba(255,255,255,0.18)';
  f.lineWidth = 1.2;
  roundRect(f, 360, 60, 120, 30, 15, false, true);
  f.fillStyle = '#4ADE80';
  f.beginPath(); f.arc(380, 75, 5, 0, Math.PI*2); f.fill();
  f.fillStyle = '#B5B5BD';
  f.font = '500 13px "JetBrains Mono", monospace';
  f.fillText('ACTIVE', 396, 80);

  // avatar tile (gradient border + dark inner)
  const av = f.createLinearGradient(160, 130, 352, 322);
  av.addColorStop(0, '#7C5CFF');
  av.addColorStop(1, '#00E5C5');
  f.fillStyle = av;
  roundRect(f, 160, 130, 192, 192, 32, true, false);
  f.fillStyle = '#0a0a10';
  roundRect(f, 168, 138, 176, 176, 28, true, false);
  // ID placeholder text (visible until the photo loads)
  f.fillStyle = '#fff';
  f.font = 'bold 92px "Anton", Impact, sans-serif';
  f.textAlign = 'center';
  f.fillText('ID', W/2, 246);
  f.textAlign = 'left';

  // name
  f.fillStyle = '#F4F4F2';
  f.font = 'bold 42px "Space Grotesk", "Inter", sans-serif';
  f.textAlign = 'center';
  f.fillText('Ignacio Duque', W/2, 392);

  // role lines
  f.fillStyle = '#B5B5BD';
  f.font = '500 16px "JetBrains Mono", monospace';
  f.fillText('FULL-STACK DEVELOPER', W/2, 428);
  f.fillText('SYSTEM ARCHITECT', W/2, 452);

  // mini QR
  drawQR(f, 36, 540, 96);

  // info column right of mini QR
  f.textAlign = 'left';
  f.fillStyle = '#F4F4F2';
  f.font = 'bold 17px "JetBrains Mono", monospace';
  f.fillText('dusan.codes', 152, 560);
  f.fillStyle = '#B5B5BD';
  f.font = '500 14px "JetBrains Mono", monospace';
  f.fillText('Chile · Argentina', 152, 584);
  f.fillText('Available 2026', 152, 606);

  // dashed line
  f.strokeStyle = 'rgba(255,255,255,0.18)';
  f.lineWidth = 1;
  f.setLineDash([4, 5]);
  f.beginPath(); f.moveTo(36, 660); f.lineTo(W-36, 660); f.stroke();
  f.setLineDash([]);

  // footer
  f.fillStyle = '#6C6C78';
  f.font = '500 13px "JetBrains Mono", monospace';
  f.textAlign = 'left';
  f.fillText('N° 002 · CL/AR', 36, 690);
  f.textAlign = 'right';
  f.fillText('2026 — ∞', W-36, 690);

  // hole punch
  f.fillStyle = '#000';
  roundRect(f, W/2 - 48, 24, 96, 14, 7, true, false);
  // inner hole shadow
  f.fillStyle = 'rgba(0,0,0,0.6)';
  roundRect(f, W/2 - 44, 26, 88, 10, 5, true, false);

  const texFront = new THREE.CanvasTexture(front);

  // ---------- BACK ----------
  const back = document.createElement('canvas');
  back.width = W; back.height = H;
  const b = back.getContext('2d');

  const bgB = b.createLinearGradient(0, 0, W, H);
  bgB.addColorStop(0, '#14141c');
  bgB.addColorStop(1, '#06060a');
  b.fillStyle = bgB;
  roundRect(b, 0, 0, W, H, 28, true, false);

  // top labels
  b.fillStyle = '#6C6C78';
  b.font = '500 14px "JetBrains Mono", monospace';
  b.fillText('ACCESS CARD', 36, 86);
  b.textAlign = 'right';
  b.fillText('v2.6', W-36, 86);

  // big QR
  drawQR(b, (W - 240) / 2, 130, 240);

  // info
  b.textAlign = 'center';
  b.fillStyle = '#F4F4F2';
  b.font = 'bold 22px "JetBrains Mono", monospace';
  b.fillText('dusan.codes', W/2, 430);
  b.fillStyle = '#B5B5BD';
  b.font = '500 16px "JetBrains Mono", monospace';
  b.fillText('dusanemp@gmail.com', W/2, 462);
  b.fillText('+54 9 11 6803 7887', W/2, 490);

  // hologram strip
  const hg = b.createLinearGradient(0, 580, W, 640);
  hg.addColorStop(0, '#7C5CFF');
  hg.addColorStop(0.5, '#00E5C5');
  hg.addColorStop(1, '#FF5C8A');
  b.fillStyle = hg;
  roundRect(b, 36, 580, W - 72, 60, 8, true, false);
  // diagonal stripes overlay
  b.save();
  b.beginPath();
  roundRect(b, 36, 580, W - 72, 60, 8, false, true);
  b.clip();
  b.strokeStyle = 'rgba(0,0,0,0.25)';
  b.lineWidth = 2;
  for (let x = -20; x < W; x += 14) {
    b.beginPath();
    b.moveTo(x, 580);
    b.lineTo(x + 60, 640);
    b.stroke();
  }
  b.restore();

  // hole punch (mirrored on back too)
  b.fillStyle = '#000';
  roundRect(b, W/2 - 48, 24, 96, 14, 7, true, false);

  // signature line
  b.strokeStyle = 'rgba(255,255,255,0.18)';
  b.lineWidth = 1;
  b.beginPath(); b.moveTo(60, 686); b.lineTo(W-60, 686); b.stroke();
  b.textAlign = 'left';
  b.fillStyle = '#6C6C78';
  b.font = '500 11px "JetBrains Mono", monospace';
  b.fillText('SIGNATURE', 60, 706);

  const texBack = new THREE.CanvasTexture(back);

  // -- Async: load user photo and replace the avatar placeholder
  (function loadAvatarPhoto() {
    const AVATAR_X = 168, AVATAR_Y = 138, AVATAR_W = 176, AVATAR_H = 176, AVATAR_R = 28;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // Clear & repaint the avatar inner area, then draw the photo clipped to rounded square
      f.save();
      // dark base first (in case image has transparency)
      f.fillStyle = '#0a0a10';
      roundRect(f, AVATAR_X, AVATAR_Y, AVATAR_W, AVATAR_H, AVATAR_R, true, false);
      // clip path
      f.beginPath();
      const x = AVATAR_X, y = AVATAR_Y, w = AVATAR_W, h = AVATAR_H, r = AVATAR_R;
      f.moveTo(x + r, y);
      f.lineTo(x + w - r, y);
      f.quadraticCurveTo(x + w, y, x + w, y + r);
      f.lineTo(x + w, y + h - r);
      f.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
      f.lineTo(x + r, y + h);
      f.quadraticCurveTo(x, y + h, x, y + h - r);
      f.lineTo(x, y + r);
      f.quadraticCurveTo(x, y, x + r, y);
      f.closePath();
      f.clip();
      // "cover" fit — scale to fill, crop excess
      const ar = img.width / img.height;
      let dw = w, dh = h, dx = x, dy = y;
      if (ar > 1) {
        // wider → fit height, crop sides
        dh = h;
        dw = h * ar;
        dx = x - (dw - w) / 2;
      } else {
        // taller → fit width, crop top/bottom
        dw = w;
        dh = w / ar;
        dy = y - (dh - h) / 2;
      }
      f.drawImage(img, dx, dy, dw, dh);
      f.restore();
      texFront.needsUpdate = true;
    };
    img.onerror = () => {
      console.warn('[badge3d] me.jpg no encontrado — usando placeholder "ID"');
    };
    // Try jpg first, fall back to png if needed
    img.src = 'me.jpg?v=' + Date.now();
  })();

  return { texFront, texBack };
}

function buildRibbonTexture() {
  // Tall narrow canvas tiled along the ribbon length
  const W = 96, H = 384;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const x = c.getContext('2d');

  // Base brand gradient (vertical → tiled along ribbon length)
  const g = x.createLinearGradient(0, 0, 0, H);
  g.addColorStop(0,    '#6a4ee3');
  g.addColorStop(0.5,  '#5b3fd9');
  g.addColorStop(1,    '#6a4ee3');
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);

  // Subtle weave texture (vertical lines)
  x.fillStyle = 'rgba(0,0,0,0.12)';
  for (let i = 0; i < W; i += 3) x.fillRect(i, 0, 1, H);
  x.fillStyle = 'rgba(255,255,255,0.06)';
  for (let i = 1; i < W; i += 3) x.fillRect(i, 0, 1, H);

  // Edge stitching
  x.fillStyle = 'rgba(0,0,0,0.35)';
  x.fillRect(0, 0, 3, H);
  x.fillRect(W - 3, 0, 3, H);

  // Repeated brand text running along the ribbon
  x.save();
  x.translate(W / 2, 0);
  x.fillStyle = 'rgba(255,255,255,0.85)';
  x.font = 'bold 18px "JetBrains Mono", monospace';
  x.textAlign = 'center';
  x.textBaseline = 'middle';
  const steps = [
    '</>  DUSAN',
    '•  •  •',
    'FULL-STACK',
    '•  •  •',
  ];
  const spacing = H / steps.length;
  steps.forEach((txt, i) => {
    x.fillText(txt, 0, spacing * i + spacing / 2);
  });
  x.restore();

  const tex = new THREE.CanvasTexture(c);
  return tex;
}

function roundRect(ctx, x, y, w, h, r, fill, stroke) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
  if (fill) ctx.fill();
  if (stroke) ctx.stroke();
}

function drawQR(ctx, x, y, size) {
  const cells = 21;
  const cell = size / cells;
  // background
  ctx.fillStyle = '#fff';
  roundRect(ctx, x - 4, y - 4, size + 8, size + 8, 6, true, false);
  // deterministic pattern
  ctx.fillStyle = '#0a0a10';
  let s = 73810;
  const rand = () => (s = (s * 9301 + 49297) % 233280) / 233280;
  for (let i = 0; i < cells; i++) {
    for (let j = 0; j < cells; j++) {
      if (rand() > 0.5) ctx.fillRect(x + i * cell, y + j * cell, cell, cell);
    }
  }
  // 3 finder squares
  for (const [cx, cy] of [[0, 0], [cells - 7, 0], [0, cells - 7]]) {
    ctx.fillStyle = '#fff';
    ctx.fillRect(x + cx * cell, y + cy * cell, 7 * cell, 7 * cell);
    ctx.fillStyle = '#0a0a10';
    ctx.fillRect(x + cx * cell, y + cy * cell, 7 * cell, cell);
    ctx.fillRect(x + cx * cell, y + (cy + 6) * cell, 7 * cell, cell);
    ctx.fillRect(x + cx * cell, y + cy * cell, cell, 7 * cell);
    ctx.fillRect(x + (cx + 6) * cell, y + cy * cell, cell, 7 * cell);
    ctx.fillRect(x + (cx + 2) * cell, y + (cy + 2) * cell, 3 * cell, 3 * cell);
  }
}
