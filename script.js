const loader = document.querySelector('.page-loader');
document.body.classList.add('loading');
window.addEventListener('load', () => {
  setTimeout(() => {
    loader.classList.add('done');
    document.body.classList.remove('loading');
  }, 500);
});

const header = document.querySelector('.site-header');
const backTop = document.querySelector('.back-top');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

function handleScroll() {
  header.classList.toggle('scrolled', window.scrollY > 10);
  backTop.classList.toggle('visible', window.scrollY > 500);
}
window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.classList.toggle('active', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.classList.remove('active');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

// Reveal sections as they enter the viewport.
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Keep one FAQ open at a time for a clean accordion experience.
document.querySelectorAll('.faq-item').forEach(item => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) other.open = false;
      });
    }
  });
});

backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
document.getElementById('year').textContent = new Date().getFullYear();

// Set your official WhatsApp number here in international format, digits only.
// Example: 2348012345678 (do not include +, spaces or dashes).
const WHATSAPP_NUMBER = '2348072490812';
const orderMessage = "Hello PrintFUO! I'd like to make an order. Please let me know how to get started.";
document.querySelectorAll('.whatsapp-link').forEach(link => {
  link.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
});


// PRINTFUO HERO GALLERY
// Add images by adding objects to PRINTFUO_GALLERY below. Put image files in
// assets/gallery/ and use their relative paths. The gallery supports swipe,
// previous/next buttons, dot navigation and keyboard-friendly buttons.
const PRINTFUO_GALLERY = [
  { src: 'assets/gallery/event-flyer.jpg', alt: 'Sample event flyer design', category: '01 / CREATIVE PRINTS', title: 'Make your moment.' },
  { src: 'assets/gallery/brand-design.jpg', alt: 'Sample business branding design', category: '02 / BRANDING', title: 'Make your brand stand out.' },
  { src: 'assets/gallery/publishing.jpg', alt: 'Sample book publishing design', category: '03 / PUBLISHING', title: 'From idea to finished book.' }
];

(() => {
  const track = document.getElementById('heroGalleryTrack');
  const dotsWrap = document.getElementById('heroGalleryDots');
  const count = document.getElementById('heroGalleryCount');
  if (!track || !dotsWrap || !count) return;

  // The array is the source of truth, so adding an item here adds a slide automatically.
  track.innerHTML = PRINTFUO_GALLERY.map((item) => `
    <figure class="gallery-slide">
      <img src="${item.src}" alt="${item.alt}" draggable="false">
      <figcaption><span>${item.category}</span><b>${item.title}</b></figcaption>
    </figure>
  `).join('');

  let current = 0;
  let startX = 0;
  let deltaX = 0;
  const slides = () => Array.from(track.children);

  dotsWrap.innerHTML = PRINTFUO_GALLERY.map((_, i) =>
    `<button class="gallery-dot${i === 0 ? ' active' : ''}" type="button" aria-label="Show image ${i + 1}" aria-current="${i === 0 ? 'true' : 'false'}"></button>`
  ).join('');

  const dots = Array.from(dotsWrap.querySelectorAll('.gallery-dot'));
  function showSlide(index) {
    current = (index + PRINTFUO_GALLERY.length) % PRINTFUO_GALLERY.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === current);
      dot.setAttribute('aria-current', i === current ? 'true' : 'false');
    });
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(PRINTFUO_GALLERY.length).padStart(2, '0')}`;
  }

  document.querySelector('.gallery-prev')?.addEventListener('click', () => showSlide(current - 1));
  document.querySelector('.gallery-next')?.addEventListener('click', () => showSlide(current + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => showSlide(i)));

  const frame = track.closest('.gallery-frame');
  frame.addEventListener('touchstart', e => {
    startX = e.changedTouches[0].clientX;
    deltaX = 0;
  }, { passive: true });
  frame.addEventListener('touchmove', e => {
    deltaX = e.changedTouches[0].clientX - startX;
  }, { passive: true });
  frame.addEventListener('touchend', () => {
    if (Math.abs(deltaX) > 45) showSlide(current + (deltaX < 0 ? 1 : -1));
    deltaX = 0;
  }, { passive: true });

  // Pointer swipe also works for mouse/trackpad users.
  let pointerStart = null;
  frame.addEventListener('pointerdown', e => {
    if (e.pointerType === 'mouse') pointerStart = e.clientX;
  });
  frame.addEventListener('pointerup', e => {
    if (pointerStart === null) return;
    const distance = e.clientX - pointerStart;
    if (Math.abs(distance) > 55) showSlide(current + (distance < 0 ? 1 : -1));
    pointerStart = null;
  });
  frame.addEventListener('pointercancel', () => { pointerStart = null; });

  showSlide(0);
})();
