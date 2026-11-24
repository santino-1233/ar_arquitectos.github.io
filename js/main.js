/**
 * NR Arquitectura - Interacciones, Deslizamiento Cinematográfico y Cloudinary
 * 
 * Skills aplicadas:
 * - cinematic-ui-ux: Deslizamiento interpolado cinematográfico (glide sin teletransportación), easing cúbico y motion safety.
 * - antigravity-design-expert: Profundidad espacial, contadores fluidos y lightbox reactivo.
 * - design-taste-frontend: Rendimiento optimizado, cero emojis, micro-interacciones.
 */

// Configuración de Cloudinary
const CLOUDINARY_CLOUD_NAME = "lqmunxqm";
const CLOUDINARY_UPLOAD_PRESET = "NR_arquitectos";
const CLOUDINARY_TAG = "trabajo"; // Tag asignado a cada foto/video de obra
const ALBUM_ROOT = "obras";
const CLD_BASE = `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}`;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Barra de progreso de lectura y compactación del navbar
  wireScrollEffects();

  // 2. Menú móvil interactivo
  wireMobileMenu();

  // 3. Formulario de contacto hacia WhatsApp
  wireContactForm();

  // 4. Modal para dejar opinión en Google Maps
  wireReviewModal();

  // 5. Deslizamiento cinematográfico ultra-suave para todos los holders y anclas
  wireCinematicGlide();

  // 6. Revelado cinematográfico en scroll (Cinematic UI/UX)
  wireScrollReveal();

  // 7. Contadores animados y barras de progreso en estadísticas
  wireStatCounters();

  // 8. Galería de Obras por Cloudinary y Lightbox (en obras.html)
  wireCloudinaryGallery();
});

/* ==========================================================================
   1. SCROLL PROGRESS BAR Y NAVBAR COMPACT EFFECT
   ========================================================================== */
function wireScrollEffects() {
  const navbar = document.getElementById('navbar');
  const progressBar = document.getElementById('scroll-progress');

  const onScroll = () => {
    const scrollY = window.scrollY;

    // Navbar compact
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 20);
    }

    // Progress bar
    if (progressBar) {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ==========================================================================
   2. MENÚ MÓVIL
   ========================================================================== */
function wireMobileMenu() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
    });
  });
}

/* ==========================================================================
   3. FORMULARIO DE CONTACTO A WHATSAPP
   ========================================================================== */
function wireContactForm() {
  const form = document.getElementById('lead-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const localidad = document.getElementById('localidad').value.trim();
    const servicio = document.getElementById('servicio').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    const textoWsp = `Hola NR Arquitectura, me comunico a través de la web para consultar por un proyecto:%0A%0A• *Nombre:* ${encodeURIComponent(nombre)}%0A• *Teléfono:* ${encodeURIComponent(telefono)}%0A• *Zona:* ${encodeURIComponent(localidad)}%0A• *Servicio:* ${encodeURIComponent(servicio)}%0A• *Detalles:* ${encodeURIComponent(mensaje || 'Sin detalles adicionales')}`;

    window.open(`https://wa.me/5491122585196?text=${textoWsp}`, '_blank', 'noopener,noreferrer');
    form.reset();
  });
}

/* ==========================================================================
   4. MODAL DE RESEÑAS
   ========================================================================== */
function wireReviewModal() {
  const modal = document.getElementById('review-modal');
  const openModalBtn = document.getElementById('btn-open-review-modal');
  const closeModalBtn = document.getElementById('btn-close-modal');

  if (!modal || !openModalBtn) return;

  openModalBtn.addEventListener('click', () => modal.classList.add('active'));
  if (closeModalBtn) closeModalBtn.addEventListener('click', () => modal.classList.remove('active'));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

/* ==========================================================================
   5. DESLIZAMIENTO CINEMATOGRÁFICO ULTRA-SUAVE (GLIDE SIN TELETRANSPORTACIÓN)
   ========================================================================== */
function wireCinematicGlide() {
  // Función de interpolación easeInOutCubic para sensación arquitectónica suave
  const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  function smoothScrollTo(targetY, duration = 850) {
    // Si el usuario prefiere movimiento reducido, salto instantáneo sin mareo
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      window.scrollTo(0, targetY);
      return;
    }

    const startY = window.pageYOffset || document.documentElement.scrollTop;
    const diff = targetY - startY;
    if (Math.abs(diff) < 2) return;

    let startTime = null;

    function step(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      window.scrollTo(0, startY + (diff * easeProgress));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // Interceptar todos los clics a anclas y holders
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = 72;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        smoothScrollTo(targetPosition, 900);
      }
    });
  });
}

/* ==========================================================================
   6. REVELADO CINEMATOGRÁFICO EN SCROLL (Cinematic UI/UX)
   ========================================================================== */
function wireScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   7. CONTADORES ANIMADOS Y BARRAS DE PROGRESO
   ========================================================================== */
function wireStatCounters() {
  const counters = document.querySelectorAll('[data-count-to]');
  const progressBars = document.querySelectorAll('.progress-fill[data-progress]');
  if (!counters.length && !progressBars.length) return;

  const animateCount = (el) => {
    const target = parseInt(el.getAttribute('data-count-to'), 10) || 0;
    const duration = 1600;
    const start = performance.now();

    const step = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // Ease Out Cubic
      el.textContent = Math.round(eased * target);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target;
      }
    };
    requestAnimationFrame(step);
  };

  const animateProgress = (bar) => {
    const target = bar.getAttribute('data-progress');
    if (target) {
      bar.style.width = `${target}%`;
    }
  };

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCount);
    progressBars.forEach(animateProgress);
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.target.hasAttribute('data-count-to')) {
          animateCount(entry.target);
        } else if (entry.target.classList.contains('progress-fill')) {
          animateProgress(entry.target);
        }
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach(c => observer.observe(c));
  progressBars.forEach(p => observer.observe(p));
}

/* ==========================================================================
   8. GALERÍA CLOUDINARY Y LIGHTBOX (idéntico a la arquitectura de jaaamar)
   ========================================================================== */
const encodeId = (id) => id.split('/').map(encodeURIComponent).join('/');

function albumSlugFromId(publicId) {
  const p = publicId.split('/');
  return p[0] === ALBUM_ROOT && p.length >= 3 ? p[1] : '';
}

function albumTitle(slug) {
  if (!slug) return 'Obras y Proyectos';
  const t = slug.replace(/[-_]+/g, ' ').trim();
  if (/[A-Z_]/.test(slug)) return t;
  return t.replace(/\S+/g, (w) => w.charAt(0).toUpperCase() + w.slice(1));
}

const isCoverId = (publicId) => /(^|\/)portada-[^/]*$/.test(publicId);

function buildMediaItem(r, kind) {
  const id = encodeId(r.public_id);
  if (kind === 'video') {
    const frame = (t) => `${CLD_BASE}/video/upload/so_0,f_jpg,q_auto,${t}/${id}.jpg`;
    return {
      kind,
      created: r.created_at,
      isCover: isCoverId(r.public_id),
      thumb: frame('c_fill,g_auto,w_800,h_800'),
      small: frame('c_fill,g_auto,w_160,h_160'),
      poster: frame('c_limit,w_1200'),
      src: `${CLD_BASE}/video/upload/q_auto/${id}.mp4`,
    };
  }
  const img = (t) => `${CLD_BASE}/image/upload/f_auto,q_auto,${t}/${id}.${r.format}`;
  return {
    kind,
    created: r.created_at,
    isCover: isCoverId(r.public_id),
    thumb: img('c_fill,g_auto,w_800,h_800'),
    small: img('c_fill,g_auto,w_160,h_160'),
    src: img('c_limit,w_1600'),
  };
}

async function fetchResourceList(kind) {
  try {
    const res = await fetch(`${CLD_BASE}/${kind}/list/${CLOUDINARY_TAG}.json`);
    if (!res.ok) return [];
    const data = await res.json();
    const list = Array.isArray(data.resources) ? data.resources : [];
    return list.map((r) => ({
      slug: albumSlugFromId(r.public_id),
      item: buildMediaItem(r, kind),
    }));
  } catch (err) {
    console.warn(`No se pudo cargar la lista de ${kind}:`, err);
    return [];
  }
}

function groupIntoAlbums(entries) {
  const map = new Map();
  entries.forEach(({ slug, item }) => {
    if (!map.has(slug)) map.set(slug, []);
    map.get(slug).push(item);
  });

  const albums = [...map.entries()].map(([slug, items]) => {
    items.sort((a, b) => new Date(a.created) - new Date(b.created));
    const cover = items.find((i) => i.isCover) || items.find((i) => i.kind === 'image') || items[0];
    const ordered = [cover, ...items.filter((i) => i !== cover)];
    return {
      slug,
      title: albumTitle(slug),
      items: ordered,
      cover,
      latest: Math.max(...items.map((i) => new Date(i.created).getTime() || 0)),
    };
  });

  // Más recientes primero; 'Obras y Proyectos' sin carpeta específica al final
  albums.sort((a, b) => (a.slug === '' ? 1 : b.slug === '' ? -1 : b.latest - a.latest));
  return albums;
}

function countLabel(items) {
  const photos = items.filter((i) => i.kind === 'image').length;
  const videos = items.length - photos;
  const parts = [];
  if (photos) parts.push(`${photos} ${photos === 1 ? 'fotografía' : 'fotografías'}`);
  if (videos) parts.push(`${videos} ${videos === 1 ? 'video' : 'videos'}`);
  return parts.join(' · ');
}

function createLightbox() {
  const box = document.createElement('div');
  box.className = 'lightbox';
  box.setAttribute('role', 'dialog');
  box.setAttribute('aria-modal', 'true');
  box.setAttribute('aria-hidden', 'true');
  box.innerHTML = `
    <div class="lb-top">
      <div class="lb-info"><span class="lb-title"></span><span class="lb-count"></span></div>
      <button type="button" class="lb-close" aria-label="Cerrar">✕</button>
    </div>
    <button type="button" class="lb-nav lb-prev" aria-label="Anterior">‹</button>
    <div class="lb-stage"></div>
    <button type="button" class="lb-nav lb-next" aria-label="Siguiente">›</button>
    <div class="lb-thumbs"></div>`;
  document.body.appendChild(box);

  const $ = (sel) => box.querySelector(sel);
  const stage = $('.lb-stage');
  const thumbs = $('.lb-thumbs');
  let album = null;
  let index = 0;
  let lastFocus = null;

  const preload = (i) => {
    const it = album.items[(i + album.items.length) % album.items.length];
    if (it && it.kind === 'image') new Image().src = it.src;
  };

  function show(i) {
    const n = album.items.length;
    index = (i + n) % n;
    const it = album.items[index];
    stage.innerHTML = '';

    if (it.kind === 'video') {
      const v = document.createElement('video');
      v.src = it.src;
      v.poster = it.poster;
      v.controls = true;
      v.playsInline = true;
      v.preload = 'metadata';
      stage.appendChild(v);
    } else {
      const img = document.createElement('img');
      img.src = it.src;
      img.alt = `${album.title} — fotografía ${index + 1} de ${n}`;
      stage.appendChild(img);
    }

    $('.lb-count').textContent = `${index + 1} / ${n}`;
    thumbs.querySelectorAll('.lb-thumb').forEach((t, k) => {
      t.classList.toggle('active', k === index);
      if (k === index) t.scrollIntoView({ block: 'nearest', inline: 'center' });
    });

    $('.lb-prev').style.visibility = $('.lb-next').style.visibility = n > 1 ? 'visible' : 'hidden';
    thumbs.style.display = n > 1 ? 'flex' : 'none';
    if (n > 1) {
      preload(index + 1);
      preload(index - 1);
    }
  }

  function open(a, start = 0) {
    album = a;
    lastFocus = document.activeElement;
    $('.lb-title').textContent = a.title;
    thumbs.innerHTML = '';

    a.items.forEach((it, k) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'lb-thumb' + (it.kind === 'video' ? ' video' : '');
      b.setAttribute('aria-label', `Ver ${it.kind === 'video' ? 'video' : 'foto'} ${k + 1}`);
      const im = document.createElement('img');
      im.src = it.small;
      im.alt = '';
      im.loading = 'lazy';
      b.appendChild(im);
      b.addEventListener('click', () => show(k));
      thumbs.appendChild(b);
    });

    box.classList.add('open');
    box.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    show(start);
    $('.lb-close').focus();
  }

  function close() {
    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    stage.innerHTML = '';
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  $('.lb-close').addEventListener('click', close);
  $('.lb-prev').addEventListener('click', () => show(index - 1));
  $('.lb-next').addEventListener('click', () => show(index + 1));

  box.addEventListener('click', (e) => {
    if (e.target === box || e.target === stage) close();
  });

  document.addEventListener('keydown', (e) => {
    if (!box.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') show(index - 1);
    else if (e.key === 'ArrowRight') show(index + 1);
  });

  // Gestos táctiles para celulares
  let x0 = null;
  stage.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', (e) => {
    if (x0 === null) return;
    const dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
  });

  return { open };
}

async function wireCloudinaryGallery() {
  const grid = document.querySelector('[data-cloudinary-gallery]');
  if (!grid) return;

  const [images, videos] = await Promise.all([
    fetchResourceList('image'),
    fetchResourceList('video'),
  ]);
  const entries = images.concat(videos);

  if (!entries.length) {
    grid.innerHTML = `
      <div class="gallery-message">
        <p style="font-size: 18px; font-weight: 600; color: #fff; margin-bottom: 8px;">Galería de obras en preparación.</p>
        <p style="color: var(--text-muted); margin-bottom: 24px;">Podés ver nuestras obras recientes en nuestro Instagram oficial.</p>
        <a href="https://www.instagram.com/n.r.arquitectura/" target="_blank" rel="noopener" class="btn btn-accent">
          Ver en @n.r.arquitectura
        </a>
      </div>
    `;
    return;
  }

  const albums = groupIntoAlbums(entries);
  const lightbox = createLightbox();
  grid.innerHTML = '';

  albums.forEach((album) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'album-card reveal is-revealed';
    card.setAttribute('aria-label', `Abrir obra: ${album.title}`);

    const img = document.createElement('img');
    img.src = album.cover.thumb;
    img.alt = `Portada de la obra ${album.title}`;
    img.loading = 'lazy';

    const info = document.createElement('span');
    info.className = 'album-info';
    const t = document.createElement('span');
    t.className = 'album-title';
    t.textContent = album.title;
    const c = document.createElement('span');
    c.className = 'album-count';
    c.textContent = countLabel(album.items);
    info.append(t, c);

    card.append(img, info);
    card.addEventListener('click', () => lightbox.open(album, 0));
    grid.appendChild(card);
  });
}
