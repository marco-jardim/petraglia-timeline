'use strict';

const trackAnalyticsEvent = (name, payload = {}) => {
  if (!name || typeof window === 'undefined') {
    return false;
  }

  try {
    if (typeof window.sa_event !== 'function') {
      window.sa_event = function () {
        const args = Array.from(arguments);
        (window.sa_event.q = window.sa_event.q || []).push(args);
      };
    }

    window.sa_event(name, payload);
    return true;
  } catch (error) {
    // ignore analytics errors to avoid disrupting the UX
  }

  return false;
};

const photoProfiles = [
  {
    id: 'recent-20251017',
    src: 'assets/petraglia.jpg',
    alt: 'Foto recente de Antônio Petraglia, vestindo blusa cinza esverdeada.',
    title: 'Foto oficial antes do desaparecimento',
    description: 'Imagem mais recente do Petraglia.',
    meta: 'Fonte: Arquivo da família',
    badge: 'Foto recente',
    badgeClass: 'badge-recent',
    shortLabel: 'Recente'
  },
  {
    id: 'pre-disappearance',
    src: 'assets/petraglia2.jpg',
    alt: 'Foto oficial de Antônio Petraglia sorrindo, barba e cabelo grisalhos, vestindo camiseta cinza.',
    title: 'Foto de antes do desaparecimento',
    description: 'Registro fornecido pela família e usado nas buscas desde o primeiro dia.',
    meta: 'Fonte: Família Petraglia',
    badge: 'Foto oficial',
    badgeClass: 'badge-official',
    shortLabel: 'Recente'
  },
  {
    id: 'reference',
    src: 'assets/petraglia3.jpg',
    alt: 'Foto complementar de Antônio Petraglia com barba grisalha e camisa clara.',
    title: 'Foto complementar de referência',
    description: 'Imagem de apoio para reconhecer traços faciais e sorriso característico em diferentes iluminações.',
    meta: 'Fonte: Arquivo da família',
    badge: 'Referência',
    badgeClass: 'badge-reference',
    shortLabel: 'Referência'
  }
];

const galleryElements = {
  container: document.querySelector('.photo-gallery'),
  mainImage: document.getElementById('currentPhoto'),
  badge: document.getElementById('photoBadge'),
  title: document.getElementById('photoTitle'),
  description: document.getElementById('photoDescription'),
  meta: document.getElementById('photoMeta'),
  prev: document.getElementById('photoPrev'),
  next: document.getElementById('photoNext'),
  thumbs: document.getElementById('photoThumbnails'),
};

let currentPhotoIndex = 0;
let thumbButtons = [];

const updateThumbState = (activeIndex) => {
  thumbButtons.forEach((button, index) => {
    const isActive = index === activeIndex;
    button.setAttribute('aria-current', isActive ? 'true' : 'false');
    button.classList.toggle('is-active', isActive);
  });
};

const showPhoto = (index) => {
  if (!galleryElements.mainImage) {
    return;
  }

  currentPhotoIndex = (index + photoProfiles.length) % photoProfiles.length;
  const photo = photoProfiles[currentPhotoIndex];

  galleryElements.mainImage.src = photo.src;
  galleryElements.mainImage.alt = photo.alt;

  if (galleryElements.badge) {
    if (photo.badge) {
      galleryElements.badge.textContent = photo.badge;
      galleryElements.badge.className = `photo-badge ${photo.badgeClass || ''}`;
      galleryElements.badge.hidden = false;
    } else {
      galleryElements.badge.hidden = true;
    }
  }

  galleryElements.title.textContent = photo.title;
  galleryElements.description.textContent = photo.description;

  if (galleryElements.meta) {
    if (photo.meta) {
      galleryElements.meta.textContent = photo.meta;
      galleryElements.meta.hidden = false;
    } else {
      galleryElements.meta.textContent = '';
      galleryElements.meta.hidden = true;
    }
  }

  updateThumbState(currentPhotoIndex);
};

const movePhoto = (step) => {
  showPhoto(currentPhotoIndex + step);
};

const buildThumbnails = () => {
  if (!galleryElements.thumbs) {
    return;
  }

  galleryElements.thumbs.innerHTML = '';
  thumbButtons = photoProfiles.map((photo, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'photo-thumb';
    button.dataset.index = String(index);
    button.setAttribute('role', 'listitem');
    button.setAttribute('aria-label', `${photo.title}${photo.badge ? ` (${photo.badge})` : ''}`);

    const img = document.createElement('img');
    img.src = photo.src;
    img.alt = photo.alt;
    button.appendChild(img);

    const caption = document.createElement('span');
    caption.textContent = photo.shortLabel || photo.title;
    button.appendChild(caption);

    button.addEventListener('click', () => showPhoto(index));
    galleryElements.thumbs.appendChild(button);

    return button;
  });
};

if (galleryElements.mainImage) {
  buildThumbnails();
  showPhoto(0);

  galleryElements.prev?.addEventListener('click', () => movePhoto(-1));
  galleryElements.next?.addEventListener('click', () => movePhoto(1));

  galleryElements.container?.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      movePhoto(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      movePhoto(1);
    }
  });
}

const THEME_STORAGE_KEY = 'pt-theme-preference';
const themeButtons = Array.from(document.querySelectorAll('[data-theme-option]'));
const systemThemeQuery = typeof window.matchMedia === 'function'
  ? window.matchMedia('(prefers-color-scheme: dark)')
  : { matches: false };
const autoThemeButton = themeButtons.find((button) => button.dataset.themeOption === 'auto');

const readStoredTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  } catch (error) {
    // storage may be unavailable (private mode or restricted context)
  }
  return 'auto';
};

const persistTheme = (value) => {
  try {
    if (value === 'light' || value === 'dark') {
      localStorage.setItem(THEME_STORAGE_KEY, value);
    } else {
      localStorage.removeItem(THEME_STORAGE_KEY);
    }
  } catch (error) {
    // ignore persistence errors to avoid breaking the experience
  }
};

const setThemeAttribute = (value) => {
  const root = document.documentElement;
  if (value === 'light' || value === 'dark') {
    root.setAttribute('data-theme', value);
    root.style.colorScheme = value;
  } else {
    root.removeAttribute('data-theme');
    root.style.colorScheme = '';
  }
};

const updateThemeButtons = (active) => {
  themeButtons.forEach((button) => {
    const isActive = button.dataset.themeOption === active;
    button.setAttribute('aria-pressed', isActive ? 'true' : 'false');
  });
};

const updateAutoButtonLabel = () => {
  if (!autoThemeButton) {
    return;
  }
  const systemMode = systemThemeQuery.matches ? 'escuro' : 'claro';
  autoThemeButton.setAttribute('data-mode-label', `• ${systemMode.toUpperCase()}`);
  autoThemeButton.setAttribute(
    'title',
    `Usar o modo automático do sistema (${systemMode}).`
  );
};

let activeTheme = 'auto';

const applyTheme = (value, { persist = false } = {}) => {
  const resolved = value === 'light' || value === 'dark' ? value : 'auto';
  if (persist) {
    persistTheme(resolved);
  }
  setThemeAttribute(resolved);
  updateThemeButtons(resolved);
  updateAutoButtonLabel();
  activeTheme = resolved;
};

if (themeButtons.length) {
  activeTheme = readStoredTheme();
  applyTheme(activeTheme);

  const syncSystemTheme = () => {
    if (activeTheme === 'auto') {
      applyTheme('auto');
    }
  };

  if (typeof systemThemeQuery.addEventListener === 'function') {
    systemThemeQuery.addEventListener('change', syncSystemTheme);
  } else if (typeof systemThemeQuery.addListener === 'function') {
    systemThemeQuery.addListener(syncSystemTheme);
  }

  themeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.themeOption;
      applyTheme(selected, { persist: true });
    });
  });
} else {
  updateAutoButtonLabel();
}
const sanitizeAnalyticsToken = (value) => {
  if (!value) {
    return '';
  }
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
};

const createFallbackLinkEventName = (link, index) => {
  const descriptiveSources = [
    link.dataset.share,
    link.dataset.modeLabel,
    link.getAttribute('aria-label'),
    link.textContent,
    link.getAttribute('href'),
  ];

  for (const source of descriptiveSources) {
    const token = sanitizeAnalyticsToken(source);
    if (token) {
      return `link_click_${token}`;
    }
  }

  return `link_click_${index}`;
};

const resolveClosestContext = (element) => {
  let context = element.closest('[data-analytics-context]');
  if (context) {
    return context.getAttribute('data-analytics-context');
  }

  const sectionWithId = element.closest('section[id], header[id], footer[id], main[id]');
  if (sectionWithId && sectionWithId.id) {
    return sectionWithId.id;
  }

  const semanticContainer = element.closest('section, header, footer, main, aside, nav');
  if (semanticContainer && semanticContainer.tagName) {
    return semanticContainer.tagName.toLowerCase();
  }

  return 'document';
};

const getAnalyticsTheme = () => {
  if (activeTheme && activeTheme !== 'auto') {
    return activeTheme;
  }
  return document.documentElement.getAttribute('data-theme') || 'auto';
};

const buildLinkAnalyticsPayload = (link) => {
  let href = link.getAttribute('href') || '';
  let protocol = '';
  let hostname = '';

  try {
    const url = new URL(link.href, window.location.href);
    href = url.href;
    protocol = url.protocol.replace(':', '');
    hostname = url.hostname || '';
  } catch (error) {
    // relative or special URLs (e.g., tel:, #) may throw; ignore
  }

  const isExternal = hostname && hostname !== window.location.hostname;

  return {
    href,
    protocol: protocol || (href.split(':')[0] || ''),
    rel: link.getAttribute('rel') || '',
    target: link.getAttribute('target') || '',
    text: (link.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 140),
    theme: getAnalyticsTheme(),
    path: window.location.pathname,
    context: resolveClosestContext(link),
    external: isExternal,
  };
};

const attachAnalyticsToLinks = () => {
  const links = Array.from(document.querySelectorAll('a[href]'));
  links.forEach((link, index) => {
    if (link.dataset.analyticsBound === 'true') {
      return;
    }

    const eventName = link.dataset.analyticsEvent || createFallbackLinkEventName(link, index);

    link.addEventListener(
      'click',
      () => {
        trackAnalyticsEvent(eventName, buildLinkAnalyticsPayload(link));
      },
      { passive: true }
    );

    link.dataset.analyticsBound = 'true';
  });
};

const events = [
  {
    date: '2025-10-14',
    time: 'Incerta',
    title: 'Praia da Urca',
    description: 'Visto por um pescador na Praia da Urca.',
    coords: [-22.94794, -43.16326],
  },
  {
    date: '2025-10-15',
    time: 'Incerto',
    title: 'Restaurante Gohan — Rua Joaquim Silva',
    description: 'Avistado por um garçom em frente ao restaurante Gohan (Rua Joaquim Silva, 127), na Lapa, no dia 15/10.',
    coords: [-22.9152095, -43.1790386],
  },
  {
    date: '2025-10-15',
    time: '20:00',
    title: 'Boemia da Lapa Cavern Pub',
    description: 'Visto às 20h no Bar Boemia da Lapa Cavern Club (Avenida Mem de Sá, 104).',
    coords: [-22.9128251, -43.1827557],
  },
  {
    date: '2025-10-15',
    time: '23:30',
    title: 'Arcos da Lapa',
    description: 'Após ser encontrado deitado na Rua Gomes Freire, caminhou em direção aos Arcos da Lapa.',
    coords: [-22.9125944, -43.17985],
  },
  {
    date: '2025-10-16',
    time: '16:00',
    title: 'Travessa do Mosqueira',
    description: 'Missionárias da Caridade informaram que Antônio chegou às 16h para a refeição solidária no dia 16/10, aceitando refeição.',
    coords: [-22.9141483, -43.1793843],
  },
  {
    date: '2025-10-17',
    time: 'Manhã',
    title: 'Avenida Franklin Roosevelt, 166 (entre IBGE e Consulado da Itália)',
    description: 'Avistado na Avenida Franklin Roosevelt, nº 166 (entre o IBGE e o Consulado da Itália) na manhã do dia 17/10.',
    coords: [-22.9095275, -43.1702636],
  },
  {
    date: '2025-10-17',
    time: 'Manhã',
    title: 'Praça Edson Cortes',
    description: 'Avistado na Praça Edson Cortes, na Glória na manhã do dia 17/10, com aspecto sujo, interagindo com cachorro de rua.',
    coords: [-22.919457, -43.176493],
  },
  {
    date: '2025-10-17',
    time: '10:00',
    title: 'Escadaria Selarón',
    description: 'Visto por voluntária do SOS Crianças Desaparecidas próximo à base da Escadaria Selarón.',
    coords: [-22.9143222, -43.1789528],
  },
  {
    date: '2025-10-17',
    time: '14:00',
    title: 'Cinelândia',
    description: 'Visto na Cinelândia no ponto de distribuição de alimentos.',
    coords: [-22.9066, -43.1721],
  },
  {
    date: '2025-10-17',
    time: '16:00',
    title: 'Travessa do Mosqueira',
    description: 'Religiosas do convento relataram que Antônio retornou ao ponto de distribuição às 16h do dia 17/10, aceitando refeição.',
    coords: [-22.9141483, -43.1793843],
  },
  {
    date: '2025-10-17',
    time: 'Incerto',
    title: 'Arcos da Lapa',
    description: 'Avistado nos Arcos da Lapa no dia 17/10, trajando bermuda e descalço; horário não determinado; relato feito por uma pessoa em situação de rua.',
    coords: [-22.9125944, -43.17985],
  },
  {
    date: '2025-10-17',
    time: '19:00',
    title: 'Rio Farma — Rua da Glória',
    description: 'Equipe da drogaria Rio Farma (Rua da Glória, 268) informou que Antônio foi visto saindo da loja por volta das 19h do dia 17/10, seguindo em direção ao Largo da Glória.',
    coords: [-22.9193597, -43.179784],
  },
  {
    date: '2025-10-18',
    time: 'Almoço',
    title: 'Feira da Glória (Praça Paris)',
    description: 'Avistado próximo da Feira da Glória, durante o horário de almoço no dia 18/10; um flanelinha almoçou com ele e relatou detalhes pessoais que confirmam sua identidade.',
    coords: [-22.9168574, -43.1758537],
  },
  {
    date: '2025-10-18',
    time: 'Tarde',
    title: 'Arcos da Lapa',
    description: 'Avistado nos Arcos da Lapa no dia 18/10; recebeu um casaco de outra pessoa em situação de rua e seguiu em direção à Glória, possivelmente para a Avenida Marechal Câmara.',
    coords: [-22.9125944, -43.17985],
  },
  {
    date: '2025-10-18',
    time: 'Tarde',
    title: 'Travessa do Mosqueira',
    description: 'Avistado por um frequentador de bar na Travessa do Mosqueira no dia 18/10, à tarde, vestindo casaco, calça e chinelo.',
    coords: [-22.9141271, -43.1791717],
  },
  {
    date: '2025-10-19',
    time: 'Tarde/Noite',
    title: 'Rua Barão de São Félix, 132',
    description: 'Visto no Ferro Velho do Armandinho, na noite do dia 19/10. Supostamente, teria pedido para dormir no local.',
    coords: [-22.9012171,-43.1910096],
  },
  {
    date: '2025-10-19',
    time: '23:00',
    title: 'Rua Uruguaiana, 174',
    description: 'Visto na Rua Uruguaiana, 174, recebendo cobertores.',
    coords: [-22.9035074, -43.1794033],
  },  
  {
    date: '2025-10-20',
    time: 'Incerto',
    title: 'Rua Santana, 73',
    description: 'Visto na Rua Santana, 73, no dia 20/10; relato feito por um morador de rua que disse ter visto Antônio caminhando em direção à Lapa.',
    coords: [-22.9070785,-43.19413],
  },
];

const map = L.map('map', { scrollWheelZoom: true }).setView([-22.9128, -43.1805], 14);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
}).addTo(map);

const routePoints = [];
const timelineEl = document.getElementById('timeline');

const createSightingIcon = (label) => L.divIcon({
  html: `<div class="sighting-marker" title="Ponto de avistamento ${label}">${label}</div>`,
  iconSize: [26, 26],
  iconAnchor: [13, 26],
  popupAnchor: [0, -24],
  className: 'sighting-icon leaflet-div-icon',
});

events.forEach((event, index) => {
  const order = index + 1;
  routePoints.push(event.coords);
  const marker = L.marker(event.coords, { icon: createSightingIcon(order) }).addTo(map);

  const [year, month, day] = event.date.split('-');
  const displayDate = `${day}/${month}/${year}`;

  marker.bindPopup(`<strong>${order}. ${event.title}</strong><br>${displayDate} às ${event.time}<br>${event.description}`);

  const li = document.createElement('li');
  li.className = 'timeline-item';
  li.dataset.index = order;
  li.innerHTML = `
    <div class="timeline-date">${displayDate} &bull; ${event.time}</div>
    <div class="timeline-title">${event.title}</div>
    <div class="timeline-desc">${event.description}</div>
  `;
  li.addEventListener('click', () => {
    map.setView(event.coords, 17);
    marker.openPopup();
  });
  timelineEl.appendChild(li);
});

const polyline = L.polyline(routePoints, {
  color: '#ff6f00',
  weight: 4,
  opacity: 0.85,
  dashArray: '12 8',
  lineCap: 'round',
  lineJoin: 'round',
}).addTo(map);

map.fitBounds(polyline.getBounds(), { padding: [20, 20] });

const heatmapElement = document.getElementById('heatmapMap');
if (heatmapElement && typeof L.heatLayer === 'function') {
  const eventsForHeat = events.slice(1); // ignora 14/10
  const heatPoints = eventsForHeat.map((event, index) => {
    const weight = 0.5 + ((index + 1) / eventsForHeat.length) * 0.5;
    return [...event.coords, Number(weight.toFixed(2))];
  });

  const heatMap = L.map('heatmapMap', {
    scrollWheelZoom: true,
    zoomControl: true,
    attributionControl: true,
  }).setView([-22.914, -43.178], 14);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  }).addTo(heatMap);

  if (heatPoints.length) {
    L.heatLayer(heatPoints, {
      radius: 32,
      blur: 22,
      minOpacity: 0.35,
      maxZoom: 17,
      gradient: {
        0.2: '#38bdf8',
        0.45: '#60a5fa',
        0.6: '#fb923c',
        0.8: '#f97316',
        1: '#dc2626',
      },
    }).addTo(heatMap);
  }

  if (eventsForHeat.length > 1) {
    const heatBounds = L.latLngBounds(eventsForHeat.map((event) => event.coords));
    heatMap.fitBounds(heatBounds, { padding: [30, 30] });
  } else if (eventsForHeat.length === 1) {
    heatMap.setView(eventsForHeat[0].coords, 15);
  }
}

const shareButtons = document.querySelectorAll('[data-share]');
const shareFeedback = document.getElementById('shareFeedback');
const nativeShareButton = document.getElementById('nativeShare');
const shareMessagePlain = 'Ajude a encontrar Antônio Petraglia, 70 anos. Último contato no centro do Rio de Janeiro. Ligue (21) 2253-1177 - Disque Denúncia.';
const shareText = encodeURIComponent(shareMessagePlain);
const shareUrl = encodeURIComponent(window.location.href);

const shareLinks = {
  instagram: 'https://www.instagram.com/vamos_achar_antonio',
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
  x: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
  tiktok: 'https://www.tiktok.com/share?lang=pt-BR',
  whatsapp: `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
  telegram: `https://t.me/share/url?url=${shareUrl}&text=${shareText}`,
};

let feedbackTimeout;
const copyFallback = (message) => {
  if (!navigator.clipboard) {
    showFeedback('Copie a mensagem manualmente: ' + message, true);
    return;
  }
  navigator.clipboard
    .writeText(`${message} ${window.location.href}`)
    .then(() => showFeedback('Mensagem copiada! Abra o aplicativo e cole para compartilhar.'))
    .catch(() => showFeedback('Não foi possível copiar automaticamente. Copie manualmente.', true));
};

const showFeedback = (message, isError = false) => {
  clearTimeout(feedbackTimeout);
  shareFeedback.textContent = message;
  shareFeedback.dataset.status = isError ? 'error' : 'success';
  shareFeedback.classList.add('visible');
  feedbackTimeout = setTimeout(() => {
    shareFeedback.classList.remove('visible');
  }, 5000);
};

shareButtons.forEach((button) => {
  const platform = button.dataset.share;
  const shouldCopy = button.dataset.copy === 'true';
  const link = shareLinks[platform];

  if (!shouldCopy && link) {
    button.href = link;
    button.target = '_blank';
  }

  button.addEventListener('click', (event) => {
    if (shouldCopy) {
      event.preventDefault();
      copyFallback(shareMessagePlain);
      if (link) {
        window.open(link, '_blank', 'noopener');
      }
    }
  });
});

if (navigator.share) {
  nativeShareButton.addEventListener('click', async () => {
    try {
      await navigator.share({
        title: 'Ajude a encontrar Antônio Petraglia',
        text: shareMessagePlain,
        url: window.location.href,
      });
      showFeedback('Obrigado por compartilhar!');
    } catch (error) {
      if (error && error.name !== 'AbortError') {
        showFeedback('Compartilhamento cancelado ou indisponível.', true);
      }
    }
  });
} else {
  nativeShareButton.style.display = 'none';
}

attachAnalyticsToLinks();
