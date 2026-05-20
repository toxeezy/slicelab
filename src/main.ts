import './style.css';

const KUFAR_URL = 'https://www.kufar.by/item/1069556781';
const PHONE_TEL = '+375336651586';

const kufar = document.getElementById('kufar-link') as HTMLAnchorElement | null;
if (kufar) kufar.href = KUFAR_URL;

const phone = document.getElementById('phone-link') as HTMLAnchorElement | null;
if (phone) phone.href = `tel:${PHONE_TEL}`;

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ---------- Slider ----------
const slider = document.getElementById('slider');
const track = document.getElementById('slider-track') as HTMLDivElement | null;
const prevBtn = document.getElementById('slider-prev');
const nextBtn = document.getElementById('slider-next');
const dotsWrap = document.getElementById('slider-dots');

if (slider && track && prevBtn && nextBtn && dotsWrap) {
  const slides = Array.from(track.children) as HTMLElement[];
  let index = 0;
  const total = slides.length;
  let autoTimer: number | undefined;

  const dots: HTMLButtonElement[] = slides.map((_, i) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('role', 'tab');
    btn.setAttribute('aria-label', `Слайд ${i + 1}`);
    btn.addEventListener('click', () => go(i, true));
    dotsWrap.appendChild(btn);
    return btn;
  });

  function render() {
    track!.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => {
      if (i === index) d.setAttribute('aria-current', 'true');
      else d.removeAttribute('aria-current');
    });
  }

  function go(i: number, userInitiated = false) {
    index = (i + total) % total;
    render();
    if (userInitiated) restartAuto();
  }

  function next() { go(index + 1); }
  function prev() { go(index - 1); }

  function startAuto() {
    autoTimer = window.setInterval(next, 5500);
  }
  function restartAuto() {
    if (autoTimer) window.clearInterval(autoTimer);
    startAuto();
  }

  prevBtn.addEventListener('click', () => { prev(); restartAuto(); });
  nextBtn.addEventListener('click', () => { next(); restartAuto(); });

  // pause on hover
  slider.addEventListener('mouseenter', () => {
    if (autoTimer) window.clearInterval(autoTimer);
  });
  slider.addEventListener('mouseleave', startAuto);

  // touch / swipe
  let touchStartX = 0;
  let touchDeltaX = 0;
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchDeltaX = 0;
  }, { passive: true });
  slider.addEventListener('touchmove', (e) => {
    touchDeltaX = e.touches[0].clientX - touchStartX;
  }, { passive: true });
  slider.addEventListener('touchend', () => {
    if (Math.abs(touchDeltaX) > 50) {
      if (touchDeltaX < 0) next(); else prev();
      restartAuto();
    }
  });

  // keyboard
  slider.setAttribute('tabindex', '0');
  slider.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') { next(); restartAuto(); }
    if (e.key === 'ArrowLeft')  { prev(); restartAuto(); }
  });

  render();
  startAuto();
}
