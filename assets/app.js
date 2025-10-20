'use strict';

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
    time: 'Incerto',
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
    time: 'Manhã',
    title: 'Farmácia Dona Farma — Rua Almirante Tamandaré',
    description: 'Avistado por uma pessoa entre 9 e 10 h da manhã do dia 19/10 na Farmácia Dona Farma (Rua Almirante Tamandaré, 66).',
    coords: [-22.93213, -43.1761142],
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
