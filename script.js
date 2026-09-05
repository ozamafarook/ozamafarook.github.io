const $ = (selector, context = document) => context.querySelector(selector);
const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];

const header = $('#siteHeader');
const nav = $('#navbar');
const menu = $('#menuToggle');
const backToTop = $('#backToTop');

function closeMobileMenu({ restoreFocus = false } = {}) {
  if (!nav || !menu) return;
  nav.classList.remove('active');
  menu.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-label', 'Open menu');
  const icon = $('i', menu);
  if (icon) icon.className = 'fa-solid fa-bars';
  if (restoreFocus) menu.focus();
}

if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = nav.classList.toggle('active');
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    const icon = $('i', menu);
    if (icon) icon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
  });

  $$('a', nav).forEach(link => link.addEventListener('click', () => closeMobileMenu()));
}

const sections = $$('section[id]');
const navLinks = $$('.navbar a');

function updateScrollUI() {
  header?.classList.toggle('scrolled', scrollY > 18);
  backToTop?.classList.toggle('visible', scrollY > 520);

  let current = '';
  sections.forEach(section => {
    if (scrollY >= section.offsetTop - 150) current = section.id;
  });

  navLinks.forEach(link => {
    const active = link.getAttribute('href') === `#${current}`;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}

let scrollUpdateQueued = false;
addEventListener('scroll', () => {
  if (scrollUpdateQueued) return;
  scrollUpdateQueued = true;
  requestAnimationFrame(() => {
    updateScrollUI();
    scrollUpdateQueued = false;
  });
}, { passive: true });
addEventListener('load', updateScrollUI);
backToTop?.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px' });

  $$('.reveal').forEach(element => observer.observe(element));
} else {
  $$('.reveal').forEach(element => element.classList.add('is-visible'));
}

const modalState = { lastFocus: null };

function openModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;

  // V19: hidden CV/certificate/PDF/drawing media is not downloaded on initial page load.
  $$('[data-modal-src]', modal).forEach(media => {
    if (!media.getAttribute('src')) media.setAttribute('src', media.dataset.modalSrc);
  });

  modalState.lastFocus = document.activeElement;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');
  $('.modal-close', modal)?.focus();
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('modal-open');
  modalState.lastFocus?.focus?.();
}

$$('[data-modal]').forEach(control => {
  control.addEventListener('click', () => openModal(control.dataset.modal));
});

$$('[data-close-modal]').forEach(control => {
  control.addEventListener('click', () => closeModal(control.closest('.modal')));
});

addEventListener('keydown', event => {
  const openModalElement = $('.modal.open');

  if (event.key === 'Escape') {
    if (openModalElement) {
      closeModal(openModalElement);
      return;
    }
    if (nav?.classList.contains('active')) closeMobileMenu({ restoreFocus: true });
  }

  if (event.key === 'Tab' && openModalElement) {
    const focusable = $$('button,[href],[tabindex]:not([tabindex="-1"])', openModalElement)
      .filter(element => !element.disabled && element.getAttribute('aria-hidden') !== 'true');
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

const drawingThumbs = $$('.drawing-thumb');
const drawingMainImage = $('#drawingMainImage');
const drawingTitle = $('#drawingTitle');
const drawingCategory = $('#drawingCategory');
const drawingDescription = $('#drawingDescription');
const drawingModalImage = $('#drawingModalImage');
const drawingModalTitle = $('#drawingModalTitle');

function selectDrawing(control, { focus = false } = {}) {
  drawingThumbs.forEach(thumb => {
    const selected = thumb === control;
    thumb.classList.toggle('active', selected);
    thumb.setAttribute('aria-selected', String(selected));
    thumb.tabIndex = selected ? 0 : -1;
  });

  const { image, title, category, description } = control.dataset;
  if (drawingMainImage) {
    drawingMainImage.style.opacity = '.25';
    setTimeout(() => {
      drawingMainImage.src = image;
      drawingMainImage.alt = title;
      drawingMainImage.style.opacity = '1';
    }, 120);
  }
  if (drawingTitle) drawingTitle.textContent = title;
  if (drawingCategory) drawingCategory.textContent = category;
  if (drawingDescription) drawingDescription.textContent = description;
  if (focus) control.focus();
}

drawingThumbs.forEach((thumb, index) => {
  thumb.addEventListener('click', () => selectDrawing(thumb));
  thumb.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') nextIndex = (index + 1) % drawingThumbs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') nextIndex = (index - 1 + drawingThumbs.length) % drawingThumbs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = drawingThumbs.length - 1;
    selectDrawing(drawingThumbs[nextIndex], { focus: true });
  });
});

function openSelectedDrawing() {
  const active = $('.drawing-thumb.active');
  if (!active || !drawingModalImage || !drawingModalTitle) return;
  drawingModalImage.src = active.dataset.image;
  drawingModalImage.alt = active.dataset.title;
  drawingModalTitle.textContent = active.dataset.title;
  openModal('drawingModal');
}

$('#openDrawing')?.addEventListener('click', openSelectedDrawing);
$('#openDrawingText')?.addEventListener('click', openSelectedDrawing);

const year = $('#year');
if (year) year.textContent = new Date().getFullYear();

addEventListener('resize', () => {
  if (innerWidth > 820 && nav?.classList.contains('active')) closeMobileMenu();
});

// MOI-SSD documentation viewer
const moiFrame = $('#moiDocFrame');
const moiTitle = $('#moiDocsTitle');
const moiOpenLink = $('#moiDocOpenLink');
const moiOpenButton = $('#moiDocOpenButton');

function selectMoiDocument(control) {
  if (!control?.dataset.moidoc) return;
  const src = control.dataset.moidoc;
  const title = control.dataset.moidocTitle || 'MOI-SSD Documentation';

  $$('.moi-doc-nav-item').forEach(item => {
    const active = item.dataset.moidoc === src;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });

  if (moiTitle) moiTitle.textContent = title;
  if (moiFrame) {
    moiFrame.src = `${src}#view=FitH`;
    moiFrame.title = title;
  }
  if (moiOpenLink) moiOpenLink.href = src;
  if (moiOpenButton) moiOpenButton.href = src;
}

$$('[data-moidoc]').forEach(control => {
  control.addEventListener('click', () => selectMoiDocument(control));
});
