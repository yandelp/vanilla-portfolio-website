import { expData, projData } from './data.js';
document.getElementById('year').textContent = new Date().getFullYear();

const exp = document.getElementById('experiences-list')
const proj = document.getElementById('projects-list')


document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.getAttribute('href');
    const target = id === '#' ? document.body : document.querySelector(id);
    if (!target) return;
    const behavior = window.matchMedia('(prefers-reduced-motion: reduce)').matches
      ? 'auto' : 'smooth';
    if (id === '#about') {
      const content = target.querySelector('.about-grid') || target;
      const headerHeight = document.querySelector('header')?.getBoundingClientRect().height || 0;
      const bounds = content.getBoundingClientRect();
      const availableHeight = window.innerHeight - headerHeight;
      const breathingRoom = bounds.height <= availableHeight
        ? (availableHeight - bounds.height) / 2 : 24;
      window.scrollTo({
        top: Math.max(0, window.scrollY + bounds.top - headerHeight - breathingRoom),
        behavior
      });
    } else {
      target.scrollIntoView({ behavior });
    }
  });
});

function escapeText(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[char]);
}

function render() {
  exp.innerHTML = `
    <div class="list-header dark-text">
      <div class="centered-title"><h2 id="experience-title">experience</h2></div>
      <p>my professional journey so far</p>
    </div>
    ${expData.map((item, index) => `
      <article class="work-row project-row${item.img ? '' : ' work-row-no-photo'}" aria-labelledby="experience-${index}">
        <div class="work-logo"><img src="${escapeText(item.logo)}" alt="" loading="lazy"></div>
        <div class="work-copy">
          <h4 id="experience-${index}">${escapeText(item.company)}</h4>
          <p class="work-role">${escapeText(item.title)}</p>
          <p class="work-location">${escapeText(item.location)}</p>
          <p class="work-date">${escapeText(item.date)}</p>
          ${item.highlights?.length ? `<ul>${item.highlights.map(point => `<li>${escapeText(point)}</li>`).join('')}</ul>` : ''}
        </div>
        ${item.img ? `
          <button class="project-image" type="button" data-photo-kind="experience" data-photo-index="${index}" aria-haspopup="dialog" aria-label="View photo from ${escapeText(item.company)}"><img src="${escapeText(item.img)}" alt="${escapeText(item.company)} experience photo" loading="lazy"></button>` : ''}
      </article>`).join('')}`;

  proj.innerHTML = `
    <div class="list-header dark-text">
      <div class="centered-title"><h2 id="projects-title">projects</h2></div>
      <p>some stuff i've worked on</p>
    </div>
    ${projData.map((item, index) => `
      <article class="work-row project-row" aria-labelledby="project-${index}">
        <div class="work-logo"><img src="${escapeText(item.logo)}" alt="" loading="lazy"></div>
        <div class="work-copy">
          <h4 id="project-${index}">${escapeText(item.title)}</h4>
          <p class="work-description">${escapeText(item.desc)}</p>
          <a class="work-link abt-btn" href="${escapeText(item.link)}"${item.link.startsWith('#') ? '' : ' target="_blank" rel="noopener noreferrer"'}>view project</a>
        </div>
        ${item.img ? `<button class="project-image" type="button" data-photo-kind="project" data-photo-index="${index}" aria-haspopup="dialog" aria-label="View ${escapeText(item.title)} screenshot"><img src="${escapeText(item.img)}" alt="${escapeText(item.title)} preview" loading="lazy"></button>` : ''}
      </article>`).join('')}`;
}

render();

const photoDialog = document.createElement('dialog');
photoDialog.className = 'photo-modal';
photoDialog.setAttribute('aria-labelledby', 'photo-modal-title');
photoDialog.innerHTML = `
  <div class="photo-modal-bar">
    <h2 id="photo-modal-title"></h2>
    <button type="button" class="photo-modal-close" aria-label="Close photo" autofocus>close ×</button>
  </div>
  <img class="photo-modal-image" alt="">
`;
document.body.append(photoDialog);
const modalImage = photoDialog.querySelector('.photo-modal-image');
const modalTitle = photoDialog.querySelector('h2');
let photoOpener;
let previousOverflow;

function openWorkPhoto(event) {
  const button = event.target.closest('[data-photo-kind]');
  if (!button) return;
  const items = button.dataset.photoKind === 'experience' ? expData : projData;
  const item = items[Number(button.dataset.photoIndex)];
  if (!item?.img) return;
  modalImage.hidden = false;
  photoOpener = button;
  modalTitle.textContent = item.company || item.title;
  modalImage.src = item.img;
  modalImage.alt = `${item.company || item.title} photo`;
  previousOverflow = document.body.style.overflow;
  photoDialog.showModal();
  document.body.style.overflow = 'hidden';
}
exp.addEventListener('click', openWorkPhoto);
proj.addEventListener('click', openWorkPhoto);
photoDialog.querySelector('.photo-modal-close').addEventListener('click', () => photoDialog.close());
photoDialog.addEventListener('click', event => {
  const bounds = photoDialog.getBoundingClientRect();
  if (event.target === photoDialog && (
    event.clientX < bounds.left || event.clientX > bounds.right ||
    event.clientY < bounds.top || event.clientY > bounds.bottom
  )) photoDialog.close();
});
photoDialog.addEventListener('close', () => {
  document.body.style.overflow = previousOverflow;
  modalImage.removeAttribute('src');
  modalImage.hidden = false;
  photoOpener?.focus({ preventScroll: true });
});

// enlarge image cameos
document.querySelectorAll('.cameos-inner .experiences-list').forEach(card => {
  const image = card.querySelector(':scope > img');
  if (!image) return;
  const opener = document.createElement('button');
  opener.type = 'button';
  opener.className = 'cameo-photo';
  opener.setAttribute('aria-haspopup', 'dialog');
  opener.setAttribute('aria-label', `View ${image.alt}`);
  image.before(opener);
  opener.append(image);
  opener.addEventListener('click', () => {
    photoOpener = opener;
    modalTitle.textContent = card.querySelector('figcaption')?.textContent.trim() || image.alt;
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    previousOverflow = document.body.style.overflow;
    photoDialog.showModal();
    document.body.style.overflow = 'hidden';
  });
});
