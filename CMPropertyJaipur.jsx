import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import {
  Phone,
  MessageCircle,
  Menu,
  X,
  ShieldCheck,
  LayoutGrid,
  MapPin,
  Users,
  Instagram,
  ArrowLeft,
  RotateCw,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Copy / dictionary                                                  */
/* ------------------------------------------------------------------ */

const COPY = {
  en: {
    nav: ["Home", "Projects", "3D Tours", "Locations", "About", "Contact"],
    heroEyebrow: "JDA APPROVED · JAIPUR",
    heroTitle: "Your Dream Home in\nJaipur Starts Here",
    heroSub: "JDA Approved Gated Townships, Plots & Luxury Villas",
    ctaPrimary: "Explore Projects 3D",
    ctaSecondary: "Call Now: 9636330811",
    dragHint: "drag to rotate",
    projectsEyebrow: "FEATURED DEVELOPMENTS",
    projectsTitle: "Three addresses worth arriving at",
    viewIn3D: "View in 3D",
    mapEyebrow: "WHERE WE BUILD",
    mapTitle: "Pinned across Jaipur",
    mapHint: "Select a marker to see what's rising there",
    whyEyebrow: "WHY C.M. PROPERTY",
    whyTitle: "Built on paperwork you can trust",
    why: [
      { t: "JDA Approved", d: "Every plot carries clean, verifiable JDA sanction — no shortcuts." },
      { t: "Gated Community", d: "Controlled-entry townships with security and shared green space." },
      { t: "Prime Locations", d: "Patrakaar, Kalwar Road, Ajmer Road — where the city is expanding." },
      { t: "500+ Families", d: "Trusted by families and investors across Jaipur since day one." },
    ],
    footerDisclaimer:
      "Renderings are artistic impressions for illustrative purposes only. Final layouts, dimensions and specifications are subject to JDA-approved sanctioned plans. C.M. Property Jaipur acts as a marketing & channel partner.",
    quickLinks: "Quick Links",
    getInTouch: "Get in Touch",
    backHome: "Back to Home",
    explorerEyebrow: "INTERACTIVE 3D TOUR",
    explorerHint: "Drag to rotate · Scroll or pinch to zoom",
    finish: "Exterior Finish",
    specs: "Overview",
    selectProject: "Select a development",
    resetView: "Reset View",
  },
  hi: {
    nav: ["होम", "प्रोजेक्ट्स", "3D टूर", "लोकेशन", "हमारे बारे में", "संपर्क"],
    heroEyebrow: "JDA अप्रूव्ड · जयपुर",
    heroTitle: "आपका सपनों का घर\nयहीं से शुरू होता है",
    heroSub: "JDA अप्रूव्ड गेटेड टाउनशिप, प्लॉट्स और लक्ज़री विला",
    ctaPrimary: "प्रोजेक्ट्स 3D में देखें",
    ctaSecondary: "अभी कॉल करें: 9636330811",
    dragHint: "घुमाने के लिए ड्रैग करें",
    projectsEyebrow: "फीचर्ड प्रोजेक्ट्स",
    projectsTitle: "तीन पते, जो पहुँचने लायक हैं",
    viewIn3D: "3D में देखें",
    mapEyebrow: "हम कहाँ बना रहे हैं",
    mapTitle: "जयपुर भर में हमारी परियोजनाएँ",
    mapHint: "वहाँ क्या बन रहा है देखने के लिए मार्कर चुनें",
    whyEyebrow: "सी.एम. प्रॉपर्टी क्यों",
    whyTitle: "भरोसेमंद कागज़ी कार्रवाई पर बना",
    why: [
      { t: "JDA अप्रूव्ड", d: "हर प्लॉट पूरी तरह वेरिफाइड JDA स्वीकृति के साथ।" },
      { t: "गेटेड कम्युनिटी", d: "सुरक्षा और साझा हरियाली के साथ नियंत्रित प्रवेश टाउनशिप।" },
      { t: "प्राइम लोकेशन", d: "पत्रकार, कालवाड़ रोड, अजमेर रोड — जहाँ शहर बढ़ रहा है।" },
      { t: "500+ परिवार", d: "शुरुआत से ही जयपुर के परिवारों और निवेशकों का भरोसा।" },
    ],
    footerDisclaimer:
      "प्रस्तुत चित्र केवल कलात्मक कल्पना हैं। अंतिम लेआउट व विवरण JDA स्वीकृत योजनाओं के अनुसार होंगे। सी.एम. प्रॉपर्टी जयपुर एक मार्केटिंग व चैनल पार्टनर के रूप में कार्य करता है।",
    quickLinks: "क्विक लिंक्स",
    getInTouch: "संपर्क करें",
    backHome: "होम पर वापस जाएँ",
    explorerEyebrow: "इंटरैक्टिव 3D टूर",
    explorerHint: "घुमाने के लिए ड्रैग करें · ज़ूम के लिए स्क्रॉल करें",
    finish: "बाहरी फिनिश",
    specs: "विवरण",
    selectProject: "एक प्रोजेक्ट चुनें",
    resetView: "व्यू रीसेट करें",
  },
};

const PROJECTS = [
  {
    name: "Vrindavan Residency",
    area: "Patrakaar Colony Extension",
    tag: "Gated Township",
    config: "3–4 BHK Plots",
    blurb: "Plotted township with internal parks, wide roads and a central square.",
    trim: 0xb08d57,
  },
  {
    name: "Luxury Villa",
    area: "DCM, Ajmer Road",
    tag: "4BHK Villa",
    config: "4 BHK Independent Villa",
    blurb: "Independent villas set back from the road, built for families who entertain.",
    trim: 0x8b9aa6,
  },
  {
    name: "100 Gaj 4BHK",
    area: "Govindpura, Kalwar Road",
    tag: "Compact Plot Homes",
    config: "100 Gaj · 4 BHK",
    blurb: "Right-sized plots for first-time owners, close to the Kalwar Road belt.",
    trim: 0xa07a4c,
  },
];

const FINISHES = [
  { id: "ivory", label: "Ivory Stone", color: 0xe8e3d8 },
  { id: "sand", label: "Warm Sand", color: 0xcbb994 },
  { id: "charcoal", label: "Charcoal", color: 0x2c2e34 },
];

const PINS = [
  { id: "patrakaar", label: "Patrakaar", x: 46, y: 30, project: 0 },
  { id: "kalwar", label: "Kalwar Road", x: 22, y: 52, project: 2 },
  { id: "vaishali", label: "Vaishali Nagar", x: 30, y: 70, project: null },
  { id: "ajmer", label: "Ajmer Road", x: 18, y: 78, project: 1 },
  { id: "azad", label: "Azad Marg", x: 66, y: 46, project: null },
];

const HOTSPOTS = [
  { key: "living", label: { en: "Living Room", hi: "लिविंग रूम" }, pos: [0, 0.35, 1.2] },
  { key: "suite", label: { en: "Master Suite", hi: "मास्टर सुइट" }, pos: [0.4, 1.5, -0.1] },
  { key: "deck", label: { en: "Garden Deck", hi: "गार्डन डेक" }, pos: [-1.4, -0.1, 1.6] },
];

/* ------------------------------------------------------------------ */
/*  Minimal geometric divider                                          */
/* ------------------------------------------------------------------ */

function SectionDivider({ className = "" }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px w-16 sm:w-24 bg-current opacity-40" />
      <span className="w-1.5 h-1.5 rotate-45 bg-current opacity-80" />
      <span className="h-px w-16 sm:w-24 bg-current opacity-40" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Shared helper: build a modern villa mesh group                     */
/* ------------------------------------------------------------------ */

function buildVilla({ wallColor = 0xe8e3d8, trimColor = 0xb08d57, scale = 1 } = {}) {
  const group = new THREE.Group();
  const wallMat = new THREE.MeshStandardMaterial({ color: wallColor, roughness: 0.55 });
  const glassMat = new THREE.MeshStandardMaterial({ color: 0x2b3138, roughness: 0.15, metalness: 0.6 });
  const trimMat = new THREE.MeshStandardMaterial({ color: trimColor, roughness: 0.3, metalness: 0.5 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x1c1d21, roughness: 0.6 });

  const baseVolume = new THREE.Mesh(new THREE.BoxGeometry(3.4, 1.1, 2.2), wallMat);
  baseVolume.position.y = 0.15;
  group.add(baseVolume);

  const upperVolume = new THREE.Mesh(new THREE.BoxGeometry(2.1, 1.0, 1.7), darkMat);
  upperVolume.position.set(0.4, 1.15, -0.1);
  group.add(upperVolume);

  const glassBand = new THREE.Mesh(new THREE.BoxGeometry(3.1, 0.5, 0.06), glassMat);
  glassBand.position.set(0, 0.15, 1.13);
  group.add(glassBand);

  const upperGlass = new THREE.Mesh(new THREE.BoxGeometry(1.9, 0.5, 0.05), glassMat);
  upperGlass.position.set(0.4, 1.15, 0.76);
  group.add(upperGlass);

  const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(2.3, 0.08, 1.9), trimMat);
  roofSlab.position.set(0.4, 1.7, -0.1);
  group.add(roofSlab);

  const canopy = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.06, 0.7), trimMat);
  canopy.position.set(-0.6, 0.85, 1.55);
  group.add(canopy);

  for (let i = -1; i <= 1; i += 2) {
    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.03, 0.85, 8), darkMat);
    post.position.set(-0.6 + i * 0.55, 0.42, 1.85);
    group.add(post);
  }

  const plinth = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.16, 2.6), darkMat);
  plinth.position.y = -0.46;
  group.add(plinth);

  group.scale.setScalar(scale);
  return { group, materials: { wall: wallMat, trim: trimMat, glass: glassMat, dark: darkMat } };
}

/* ------------------------------------------------------------------ */
/*  Hero scene — rotating skyline + small draggable villa              */
/* ------------------------------------------------------------------ */

function useHeroScene(mountRef) {
  const dragState = useRef({ dragging: false, lastX: 0, lastY: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0d10, 0.03);

    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 200);
    camera.position.set(0, 3.2, 13);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x22262e, 1.6);
    scene.add(ambient);
    const keyLight = new THREE.DirectionalLight(0xd9c39a, 1.6);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x3a4650, 1.3);
    rimLight.position.set(-8, 4, -6);
    scene.add(rimLight);
    const groundGlow = new THREE.PointLight(0xb08d57, 1.1, 20);
    groundGlow.position.set(0, -1, 4);
    scene.add(groundGlow);

    const skyline = new THREE.Group();
    const buildingMats = [0x1b1d22, 0x24262c, 0x2c2e34, 0x14151a].map(
      (col) => new THREE.MeshStandardMaterial({ color: col, roughness: 0.5, metalness: 0.25 })
    );
    const accentMat = new THREE.MeshStandardMaterial({ color: 0xb08d57, roughness: 0.3, metalness: 0.5 });

    for (let i = 0; i < 30; i++) {
      const angle = (i / 30) * Math.PI * 2;
      const radius = 16 + Math.random() * 6;
      const h = 1.4 + Math.random() * 4.6;
      const w = 0.6 + Math.random() * 0.8;
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, w), buildingMats[i % buildingMats.length]);
      mesh.position.set(Math.cos(angle) * radius, h / 2 - 2.2, Math.sin(angle) * radius);
      skyline.add(mesh);
      if (Math.random() > 0.75) {
        const cap = new THREE.Mesh(new THREE.BoxGeometry(w * 1.05, 0.04, w * 1.05), accentMat);
        cap.position.set(mesh.position.x, mesh.position.y + h / 2 + 0.02, mesh.position.z);
        skyline.add(cap);
      }
    }

    const hillMat = new THREE.MeshStandardMaterial({ color: 0x16171b, roughness: 1 });
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 25 + Math.random() * 5;
      const h = 2.4 + Math.random() * 2.2;
      const hill = new THREE.Mesh(new THREE.ConeGeometry(5 + Math.random() * 2, h, 6), hillMat);
      hill.position.set(Math.cos(angle) * radius, h / 2 - 3, Math.sin(angle) * radius);
      skyline.add(hill);
    }
    scene.add(skyline);

    const { group: villaGroup } = buildVilla({ scale: 1 });
    villaGroup.position.set(0, -0.3, 3.2);
    scene.add(villaGroup);

    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24;
      positions[i * 3 + 1] = Math.random() * 10 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(
      particleGeo,
      new THREE.PointsMaterial({
        color: 0xb08d57,
        size: 0.035,
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      })
    );
    scene.add(particles);

    const dom = renderer.domElement;
    const onPointerDown = (e) => {
      dragState.current.dragging = true;
      dragState.current.lastX = e.clientX;
      dragState.current.lastY = e.clientY;
    };
    const onPointerMove = (e) => {
      if (!dragState.current.dragging) return;
      const dx = e.clientX - dragState.current.lastX;
      const dy = e.clientY - dragState.current.lastY;
      villaGroup.rotation.y += dx * 0.008;
      villaGroup.rotation.x = THREE.MathUtils.clamp(villaGroup.rotation.x + dy * 0.004, -0.3, 0.3);
      dragState.current.lastX = e.clientX;
      dragState.current.lastY = e.clientY;
    };
    const onPointerUp = () => {
      dragState.current.dragging = false;
    };
    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    dom.style.touchAction = "none";

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    let raf;
    let t = 0;
    const animate = () => {
      t += 0.005;
      skyline.rotation.y += 0.0008;
      if (!dragState.current.dragging) villaGroup.rotation.y += 0.0014;
      villaGroup.position.y = -0.3 + Math.sin(t * 1.2) * 0.05;

      const pos = particleGeo.attributes.position;
      for (let i = 0; i < particleCount; i++) {
        pos.array[i * 3 + 1] += 0.0035;
        if (pos.array[i * 3 + 1] > 8) pos.array[i * 3 + 1] = -2;
      }
      pos.needsUpdate = true;

      camera.position.y = 3.2 + Math.sin(t * 0.6) * 0.07;
      camera.lookAt(0, 0.5, 2);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      dom.removeEventListener("pointerdown", onPointerDown);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
  }, [mountRef]);
}

/* ------------------------------------------------------------------ */
/*  Explorer scene — big draggable + zoomable house, live hotspots     */
/* ------------------------------------------------------------------ */

function useExplorerScene(mountRef, hotspotRefs, initial) {
  const matRef = useRef(null);
  const stateRef = useRef({
    dragging: false,
    lastX: 0,
    lastY: 0,
    rotY: 0.6,
    rotX: 0.15,
    distance: 8.5,
  });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth || window.innerWidth;
    const height = mount.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0d10, 0.018);

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 200);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    mount.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x22262e, 1.7);
    scene.add(ambient);
    const keyLight = new THREE.DirectionalLight(0xd9c39a, 1.8);
    keyLight.position.set(6, 8, 6);
    scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0x3a4650, 1.2);
    rimLight.position.set(-7, 3, -6);
    scene.add(rimLight);

    // simple ground plane for grounding
    const ground = new THREE.Mesh(
      new THREE.CircleGeometry(9, 48),
      new THREE.MeshStandardMaterial({ color: 0x141519, roughness: 0.9 })
    );
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.62;
    scene.add(ground);

    const ringMat = new THREE.MeshBasicMaterial({ color: 0xb08d57, transparent: true, opacity: 0.25 });
    const ring = new THREE.Mesh(new THREE.RingGeometry(3.4, 3.45, 64), ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.6;
    scene.add(ring);

    const { group: villaGroup, materials } = buildVilla({
      wallColor: initial.finishColor,
      trimColor: initial.trimColor,
      scale: 1.35,
    });
    matRef.current = materials;
    scene.add(villaGroup);

    const s = stateRef.current;
    const updateCamera = () => {
      const r = s.distance;
      camera.position.set(
        Math.sin(s.rotY) * Math.cos(s.rotX) * r,
        1.6 + Math.sin(s.rotX) * r * 0.5,
        Math.cos(s.rotY) * Math.cos(s.rotX) * r
      );
      camera.lookAt(0, 0.4, 0);
    };
    updateCamera();

    const dom = renderer.domElement;
    const onPointerDown = (e) => {
      s.dragging = true;
      s.lastX = e.clientX;
      s.lastY = e.clientY;
    };
    const onPointerMove = (e) => {
      if (!s.dragging) return;
      const dx = e.clientX - s.lastX;
      const dy = e.clientY - s.lastY;
      s.rotY += dx * 0.006;
      s.rotX = THREE.MathUtils.clamp(s.rotX + dy * -0.004, -0.35, 0.55);
      s.lastX = e.clientX;
      s.lastY = e.clientY;
      updateCamera();
    };
    const onPointerUp = () => {
      s.dragging = false;
    };
    const onWheel = (e) => {
      e.preventDefault();
      s.distance = THREE.MathUtils.clamp(s.distance + e.deltaY * 0.006, 4.5, 13);
      updateCamera();
    };
    dom.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    dom.addEventListener("wheel", onWheel, { passive: false });
    dom.style.touchAction = "none";

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const projectVec = new THREE.Vector3();
    let raf;
    let t = 0;
    const animate = () => {
      t += 0.01;
      if (!s.dragging) {
        s.rotY += 0.0011;
        updateCamera();
      }
      villaGroup.position.y = Math.sin(t * 0.9) * 0.04;

      const rect = mount.getBoundingClientRect();
      if (rect.width && rect.height) {
        HOTSPOTS.forEach((h, i) => {
          const el = hotspotRefs.current[i];
          if (!el) return;
          projectVec.set(h.pos[0], h.pos[1] * 1.0, h.pos[2]).multiplyScalar(1);
          projectVec.applyMatrix4(villaGroup.matrixWorld);
          projectVec.project(camera);
          const x = (projectVec.x * 0.5 + 0.5) * rect.width;
          const y = (-projectVec.y * 0.5 + 0.5) * rect.height;
          const behind = projectVec.z > 1;
          el.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
          el.style.opacity = behind ? "0" : "1";
        });
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    // expose a reset function on the mount node for the sidebar button
    mount.__cmpReset = () => {
      s.rotY = 0.6;
      s.rotX = 0.15;
      s.distance = 8.5;
      updateCamera();
    };

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      dom.removeEventListener("pointerdown", onPointerDown);
      dom.removeEventListener("wheel", onWheel);
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) {
          if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
          else obj.material.dispose();
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mountRef]);

  // live-update materials when finish / trim changes, without rebuilding the scene
  useEffect(() => {
    if (!matRef.current) return;
    matRef.current.wall.color.set(initial.finishColor);
    matRef.current.trim.color.set(initial.trimColor);
  }, [initial.finishColor, initial.trimColor]);

  return stateRef;
}

/* ------------------------------------------------------------------ */
/*  Tilt card                                                          */
/* ------------------------------------------------------------------ */

function TiltCard({ project, lang, onView }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({ transform: `perspective(900px) rotateY(${px * 7}deg) rotateX(${-py * 7}deg) translateZ(6px)` });
  };
  const onMouseLeave = () => setStyle({ transform: "perspective(900px) rotateY(0) rotateX(0)" });

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ ...style, transition: "transform 0.35s ease" }}
      className="relative rounded-sm p-6 sm:p-7 flex flex-col justify-between min-h-[300px] cmp-card"
    >
      <div>
        <span className="text-xs tracking-[0.2em] cmp-gold-text uppercase">{project.tag}</span>
        <h3 className="cmp-serif text-2xl sm:text-3xl mt-3 cmp-ivory-text font-medium">{project.name}</h3>
        <p className="text-sm cmp-muted-text mt-1">{project.area}</p>
        <p className="text-sm cmp-ivory-text mt-4 leading-relaxed opacity-70">{project.blurb}</p>
      </div>
      <button
        onClick={onView}
        className="mt-6 self-start text-xs tracking-[0.15em] uppercase cmp-gold-text border-b border-current pb-1 hover:opacity-70 transition-opacity"
      >
        {COPY[lang].viewIn3D} →
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Explorer page                                                      */
/* ------------------------------------------------------------------ */

function ExplorerPage({ lang, explorerProject, setExplorerProject, onBack }) {
  const [finishId, setFinishId] = useState("ivory");
  const mountRef = useRef(null);
  const hotspotRefs = useRef([]);
  const c = COPY[lang];

  const project = PROJECTS[explorerProject];
  const finish = FINISHES.find((f) => f.id === finishId);

  useExplorerScene(mountRef, hotspotRefs, {
    finishColor: finish.color,
    trimColor: project.trim,
  });

  const handleReset = () => {
    const mount = mountRef.current;
    if (mount && mount.__cmpReset) mount.__cmpReset();
  };

  return (
    <div className="min-h-screen w-full" style={{ background: "var(--ink)" }}>
      <div className="flex items-center justify-between px-5 sm:px-8 h-16 cmp-glass sticky top-0 z-30">
        <button onClick={onBack} className="flex items-center gap-2 text-sm cmp-ivory-text hover:cmp-gold-text transition-colors">
          <ArrowLeft size={16} /> {c.backHome}
        </button>
        <div className="cmp-serif text-base sm:text-lg cmp-ivory-text font-medium">
          C.M. <span className="cmp-gold-text">PROPERTY</span> JAIPUR
        </div>
        <div className="flex items-center gap-2">
          <a href="https://wa.me/919636330811" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="WhatsApp">
            <MessageCircle size={18} className="cmp-gold-text" />
          </a>
          <a href="tel:9636330811" className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Call">
            <Phone size={18} className="cmp-gold-text" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-8 pb-4 text-center">
        <span className="text-xs tracking-[0.3em] cmp-gold-text">{c.explorerEyebrow}</span>
        <h1 className="cmp-serif text-3xl sm:text-5xl mt-3 cmp-ivory-text font-medium">{project.name}</h1>
        <p className="text-sm cmp-muted-text mt-2">{c.explorerHint}</p>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
        <div
          ref={mountRef}
          className="relative rounded-sm overflow-hidden"
          style={{ height: "min(62vh, 560px)", background: "radial-gradient(circle at 50% 30%, #17181d, var(--ink))", border: "1px solid var(--line)" }}
        >
          {HOTSPOTS.map((h, i) => (
            <div
              key={h.key}
              ref={(el) => (hotspotRefs.current[i] = el)}
              className="absolute left-0 top-0 pointer-events-none transition-opacity duration-200"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full cmp-dot" />
                <span className="text-[10px] sm:text-xs tracking-wide cmp-ivory-text bg-black/40 backdrop-blur-sm px-2 py-1 rounded-sm whitespace-nowrap">
                  {h.label[lang]}
                </span>
              </div>
            </div>
          ))}

          <button
            onClick={handleReset}
            className="absolute bottom-3 right-3 flex items-center gap-1.5 text-[11px] tracking-wide cmp-ivory-text bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-sm hover:bg-black/60 transition-colors"
          >
            <RotateCw size={12} /> {c.resetView}
          </button>
        </div>

        <div className="flex flex-col gap-6">
          <div className="cmp-card rounded-sm p-5">
            <h4 className="text-xs tracking-[0.2em] cmp-gold-text uppercase mb-3">{c.selectProject}</h4>
            <div className="flex flex-col gap-2">
              {PROJECTS.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => setExplorerProject(i)}
                  className={`text-left px-3 py-2 rounded-sm text-sm transition-colors ${
                    i === explorerProject ? "cmp-btn-primary" : "cmp-ivory-text opacity-70 hover:opacity-100 hover:bg-white/5"
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>

          <div className="cmp-card rounded-sm p-5">
            <h4 className="text-xs tracking-[0.2em] cmp-gold-text uppercase mb-3">{c.finish}</h4>
            <div className="flex gap-3">
              {FINISHES.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFinishId(f.id)}
                  className="flex flex-col items-center gap-1.5"
                  aria-label={f.label}
                >
                  <span
                    className="w-8 h-8 rounded-full block"
                    style={{
                      background: `#${f.color.toString(16).padStart(6, "0")}`,
                      boxShadow: finishId === f.id ? "0 0 0 2px var(--gold-2)" : "0 0 0 1px var(--line)",
                    }}
                  />
                  <span className="text-[10px] cmp-muted-text">{f.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="cmp-card rounded-sm p-5">
            <h4 className="text-xs tracking-[0.2em] cmp-gold-text uppercase mb-3">{c.specs}</h4>
            <dl className="text-sm space-y-2">
              <div className="flex justify-between">
                <dt className="cmp-muted-text">{lang === "en" ? "Location" : "स्थान"}</dt>
                <dd className="cmp-ivory-text text-right">{project.area}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="cmp-muted-text">{lang === "en" ? "Configuration" : "कॉन्फ़िगरेशन"}</dt>
                <dd className="cmp-ivory-text text-right">{project.config}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="cmp-muted-text">{lang === "en" ? "Type" : "प्रकार"}</dt>
                <dd className="cmp-ivory-text text-right">{project.tag}</dd>
              </div>
            </dl>
          </div>

          <a href="tel:9636330811" className="cmp-btn-primary text-center px-6 py-3 rounded-sm text-sm tracking-wide font-medium">
            {COPY[lang].ctaSecondary}
          </a>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main App                                                            */
/* ------------------------------------------------------------------ */

export default function App() {
  const [lang, setLang] = useState("en");
  const [menuOpen, setMenuOpen] = useState(false);
  const [page, setPage] = useState("home");
  const [activePin, setActivePin] = useState(null);
  const [highlighted, setHighlighted] = useState(null);
  const [explorerProject, setExplorerProject] = useState(0);

  const mountRef = useRef(null);
  const projectsRef = useRef(null);
  const mapRef = useRef(null);
  const whyRef = useRef(null);
  const footerRef = useRef(null);
  const cardRefs = useRef([]);

  useHeroScene(mountRef);

  const c = COPY[lang];

  const openExplorer = useCallback((idx = 0) => {
    setExplorerProject(idx);
    setPage("explorer");
    window.scrollTo(0, 0);
  }, []);

  const goHome = useCallback(() => {
    setPage("home");
    window.scrollTo(0, 0);
  }, []);

  const scrollToRef = (ref) => {
    setTimeout(() => ref.current?.scrollIntoView({ behavior: "smooth", block: "start" }), page === "home" ? 0 : 60);
  };

  const handleNav = (index) => {
    setMenuOpen(false);
    switch (index) {
      case 0: // Home
        if (page !== "home") goHome();
        else window.scrollTo({ top: 0, behavior: "smooth" });
        break;
      case 1: // Projects
        if (page !== "home") setPage("home");
        scrollToRef(projectsRef);
        break;
      case 2: // 3D Tours
        openExplorer(explorerProject);
        break;
      case 3: // Locations
        if (page !== "home") setPage("home");
        scrollToRef(mapRef);
        break;
      case 4: // About
        if (page !== "home") setPage("home");
        scrollToRef(whyRef);
        break;
      case 5: // Contact
        if (page !== "home") setPage("home");
        scrollToRef(footerRef);
        break;
      default:
        break;
    }
  };

  const handlePinClick = (pin) => {
    setActivePin(pin.id === activePin ? null : pin.id);
  };

  const handleViewProject = (idx) => {
    setHighlighted(idx);
    openExplorer(idx);
  };

  return (
    <div className="cmp-root min-h-screen w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&family=Inter:wght@400;500;600&family=Noto+Sans+Devanagari:wght@400;500;600&display=swap');

        .cmp-root {
          --ink: #0c0d10;
          --ink-2: #131418;
          --panel: #17181d;
          --line: rgba(176, 141, 87, 0.22);
          --gold: #b08d57;
          --gold-2: #cbab7a;
          --ivory: #efeee9;
          --muted: #9a978f;
          background: var(--ink);
          color: var(--ivory);
          font-family: 'Inter', 'Noto Sans Devanagari', sans-serif;
          overflow-x: hidden;
        }
        .cmp-serif { font-family: 'Cormorant Garamond', 'Noto Sans Devanagari', serif; }
        .cmp-gold-text { color: var(--gold-2); }
        .cmp-muted-text { color: var(--muted); }
        .cmp-ivory-text { color: var(--ivory); }
        .cmp-dot { background: var(--gold-2); box-shadow: 0 0 0 3px rgba(203,171,122,0.25); }

        .cmp-glass {
          background: rgba(12, 13, 16, 0.72);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border-bottom: 1px solid var(--line);
        }
        .cmp-card {
          background: linear-gradient(160deg, var(--panel), var(--ink-2));
          border: 1px solid var(--line);
        }
        .cmp-card.highlight {
          box-shadow: 0 0 0 1px var(--gold-2), 0 0 32px rgba(203,171,122,0.18);
        }
        .cmp-btn-primary {
          background: var(--gold-2);
          color: var(--ink);
        }
        .cmp-btn-primary:hover { filter: brightness(1.08); }
        .cmp-btn-secondary {
          border: 1px solid rgba(239,238,233,0.35);
          color: var(--ivory);
        }
        .cmp-btn-secondary:hover { background: rgba(239,238,233,0.06); }

        .cmp-pin {
          width: 10px; height: 10px; border-radius: 50%;
          background: var(--gold-2);
          box-shadow: 0 0 0 3px rgba(203,171,122,0.2);
        }
        .cmp-pin::after {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid rgba(203,171,122,0.4);
          animation: cmpPulse 2.6s ease-out infinite;
        }
        @keyframes cmpPulse {
          0% { transform: scale(0.6); opacity: 0.7; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        .cmp-hero-fade {
          background: linear-gradient(180deg, rgba(12,13,16,0.1) 0%, rgba(12,13,16,0.4) 55%, var(--ink) 100%);
        }

        @media (prefers-reduced-motion: reduce) {
          .cmp-pin::after { animation: none; }
        }
      `}</style>

      {page === "explorer" ? (
        <ExplorerPage
          lang={lang}
          explorerProject={explorerProject}
          setExplorerProject={setExplorerProject}
          onBack={goHome}
        />
      ) : (
        <>
          {/* ---------------- Navbar ---------------- */}
          <header className="fixed top-0 left-0 right-0 z-50 cmp-glass">
            <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
              <button onClick={() => handleNav(0)} className="cmp-serif text-lg sm:text-xl tracking-wide cmp-ivory-text font-medium">
                C.M. <span className="cmp-gold-text">PROPERTY</span> JAIPUR
              </button>

              <nav className="hidden lg:flex items-center gap-8 text-sm tracking-wide">
                {c.nav.map((item, i) => (
                  <button key={item} onClick={() => handleNav(i)} className="cmp-ivory-text hover:cmp-gold-text transition-colors opacity-80 hover:opacity-100">
                    {item}
                  </button>
                ))}
              </nav>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setLang(lang === "en" ? "hi" : "en")}
                  className="hidden sm:block text-xs tracking-widest cmp-gold-text border border-current rounded-full px-3 py-1 hover:bg-white/5 transition-colors"
                >
                  {lang === "en" ? "हिं" : "EN"}
                </button>
                <a href="https://wa.me/919636330811" target="_blank" rel="noreferrer" className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="WhatsApp">
                  <MessageCircle size={19} className="cmp-gold-text" />
                </a>
                <a href="tel:9636330811" className="p-2 rounded-full hover:bg-white/10 transition-colors" aria-label="Call">
                  <Phone size={19} className="cmp-gold-text" />
                </a>
                <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
                  {menuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>
            </div>

            {menuOpen && (
              <div className="lg:hidden cmp-glass px-5 pb-5 flex flex-col gap-3 text-sm">
                {c.nav.map((item, i) => (
                  <button key={item} onClick={() => handleNav(i)} className="py-1 opacity-80 text-left">
                    {item}
                  </button>
                ))}
                <button
                  onClick={() => setLang(lang === "en" ? "hi" : "en")}
                  className="text-xs tracking-widest cmp-gold-text border border-current rounded-full px-3 py-1 self-start mt-1"
                >
                  {lang === "en" ? "हिं में देखें" : "View in English"}
                </button>
              </div>
            )}
          </header>

          {/* ---------------- Hero ---------------- */}
          <section className="relative h-screen w-full overflow-hidden">
            <div ref={mountRef} className="absolute inset-0" />
            <div className="absolute inset-0 cmp-hero-fade pointer-events-none" />

            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-5 pt-16">
              <span className="text-xs sm:text-sm tracking-[0.3em] cmp-gold-text mb-5">{c.heroEyebrow}</span>
              <h1 className="cmp-serif text-4xl sm:text-6xl md:text-7xl leading-[1.05] whitespace-pre-line cmp-ivory-text font-medium">
                {c.heroTitle}
              </h1>
              <p className="mt-5 text-base sm:text-lg cmp-muted-text max-w-xl">{c.heroSub}</p>

              <div className="mt-9 flex flex-col sm:flex-row gap-4">
                <button onClick={() => openExplorer(0)} className="cmp-btn-primary px-7 py-3 rounded-sm text-sm tracking-wide font-medium">
                  {c.ctaPrimary}
                </button>
                <a href="tel:9636330811" className="cmp-btn-secondary px-7 py-3 rounded-sm text-sm tracking-wide">
                  {c.ctaSecondary}
                </a>
              </div>

              <span className="absolute bottom-8 text-[11px] tracking-[0.2em] cmp-muted-text opacity-80 uppercase">
                {c.dragHint}
              </span>
            </div>
          </section>

          <div className="cmp-gold-text py-8" style={{ background: "var(--ink-2)" }}>
            <SectionDivider />
          </div>

          {/* ---------------- Featured Projects ---------------- */}
          <section ref={projectsRef} className="relative py-20 sm:py-28 px-5 sm:px-8" style={{ background: "var(--ink-2)" }}>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-14">
                <span className="text-xs tracking-[0.3em] cmp-gold-text">{c.projectsEyebrow}</span>
                <h2 className="cmp-serif text-3xl sm:text-5xl mt-4 cmp-ivory-text font-medium">{c.projectsTitle}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
                {PROJECTS.map((p, i) => (
                  <div key={p.name} ref={(el) => (cardRefs.current[i] = el)} className={highlighted === i ? "highlight rounded-sm" : ""}>
                    <TiltCard project={p} lang={lang} onView={() => handleViewProject(i)} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="cmp-gold-text py-8" style={{ background: "var(--ink)" }}>
            <SectionDivider />
          </div>

          {/* ---------------- Jaipur Map ---------------- */}
          <section ref={mapRef} className="relative py-20 sm:py-28 px-5 sm:px-8" style={{ background: "var(--ink)" }}>
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-4">
                <span className="text-xs tracking-[0.3em] cmp-gold-text">{c.mapEyebrow}</span>
                <h2 className="cmp-serif text-3xl sm:text-5xl mt-4 cmp-ivory-text font-medium">{c.mapTitle}</h2>
                <p className="text-sm cmp-muted-text mt-3">{c.mapHint}</p>
              </div>

              <div
                className="relative mt-10 rounded-sm overflow-hidden mx-auto"
                style={{
                  maxWidth: 760,
                  aspectRatio: "4/3",
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(176,141,87,0.08), transparent 60%), radial-gradient(circle at 70% 70%, rgba(176,141,87,0.06), transparent 55%), var(--ink-2)",
                  border: "1px solid var(--line)",
                }}
              >
                <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 75" preserveAspectRatio="none">
                  <path d="M0 20 Q30 10 55 25 T100 15" stroke="#b08d57" strokeWidth="0.4" fill="none" />
                  <path d="M0 55 Q35 60 60 45 T100 60" stroke="#b08d57" strokeWidth="0.4" fill="none" />
                  <path d="M20 0 Q25 40 15 75" stroke="#b08d57" strokeWidth="0.3" fill="none" />
                  <path d="M70 0 Q65 35 80 75" stroke="#b08d57" strokeWidth="0.3" fill="none" />
                </svg>

                {PINS.map((pin) => (
                  <div key={pin.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
                    <button onClick={() => handlePinClick(pin)} className="relative flex flex-col items-center group" aria-label={pin.label}>
                      <span className="cmp-pin relative block" />
                      <span className="mt-2 text-[10px] sm:text-xs tracking-wide cmp-ivory-text opacity-70 whitespace-nowrap">{pin.label}</span>
                    </button>

                    {activePin === pin.id && (
                      <div className="absolute z-20 top-full mt-2 left-1/2 -translate-x-1/2 w-48 cmp-card rounded-sm p-4 text-left shadow-xl">
                        {pin.project !== null ? (
                          <>
                            <p className="text-sm cmp-serif cmp-ivory-text">{PROJECTS[pin.project].name}</p>
                            <p className="text-[11px] cmp-muted-text mt-1">{PROJECTS[pin.project].tag}</p>
                            <button onClick={() => handleViewProject(pin.project)} className="mt-3 text-[11px] tracking-wide cmp-gold-text uppercase border-b border-current">
                              {c.viewIn3D} →
                            </button>
                          </>
                        ) : (
                          <p className="text-xs cmp-muted-text">{lang === "en" ? "New launch coming soon." : "जल्द ही नया लॉन्च।"}</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="cmp-gold-text py-8" style={{ background: "var(--ink-2)" }}>
            <SectionDivider />
          </div>

          {/* ---------------- Why Choose Us ---------------- */}
          <section ref={whyRef} className="relative py-20 sm:py-28 px-5 sm:px-8" style={{ background: "var(--ink-2)" }}>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-14">
                <span className="text-xs tracking-[0.3em] cmp-gold-text">{c.whyEyebrow}</span>
                <h2 className="cmp-serif text-3xl sm:text-5xl mt-4 cmp-ivory-text font-medium">{c.whyTitle}</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[ShieldCheck, LayoutGrid, MapPin, Users].map((Icon, i) => (
                  <div key={i} className="cmp-card rounded-sm p-6 text-center flex flex-col items-center">
                    <Icon size={26} className="cmp-gold-text mb-4" strokeWidth={1.5} />
                    <h3 className="cmp-serif text-xl cmp-ivory-text font-medium">{c.why[i].t}</h3>
                    <p className="text-xs cmp-muted-text mt-2 leading-relaxed">{c.why[i].d}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ---------------- Footer ---------------- */}
          <footer ref={footerRef} className="relative pt-16 pb-8 px-5 sm:px-8" style={{ background: "var(--ink)" }}>
            <div className="cmp-gold-text mb-12"><SectionDivider /></div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10">
              <div>
                <div className="cmp-serif text-xl cmp-ivory-text mb-3 font-medium">
                  C.M. <span className="cmp-gold-text">PROPERTY</span> JAIPUR
                </div>
                <p className="text-xs cmp-muted-text leading-relaxed">C.M. JDA Jaipur</p>
              </div>

              <div>
                <h4 className="text-xs tracking-[0.2em] cmp-gold-text uppercase mb-4">{c.quickLinks}</h4>
                <ul className="space-y-2 text-sm opacity-80">
                  {c.nav.map((item, i) => (
                    <li key={item}>
                      <button onClick={() => handleNav(i)} className="hover:cmp-gold-text transition-colors">{item}</button>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs tracking-[0.2em] cmp-gold-text uppercase mb-4">{c.getInTouch}</h4>
                <a href="tel:9636330811" className="flex items-center gap-2 text-sm mb-3 hover:cmp-gold-text transition-colors">
                  <Phone size={15} className="cmp-gold-text" /> 9636330811
                </a>
                <a href="https://www.instagram.com/_c.m.property_jaipur" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm hover:cmp-gold-text transition-colors">
                  <Instagram size={15} className="cmp-gold-text" /> @_c.m.property_jaipur
                </a>
              </div>
            </div>

            <p className="max-w-7xl mx-auto text-[11px] cmp-muted-text mt-12 leading-relaxed opacity-70">{c.footerDisclaimer}</p>
          </footer>
        </>
      )}
    </div>
  );
}
