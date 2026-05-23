import '@fontsource/unbounded/latin-400.css';
import '@fontsource/unbounded/cyrillic-400.css';
import '@fontsource/unbounded/latin-600.css';
import '@fontsource/unbounded/cyrillic-600.css';
import '@fontsource/unbounded/latin-800.css';
import '@fontsource/unbounded/cyrillic-800.css';
import '@fontsource/unbounded/latin-900.css';
import '@fontsource/unbounded/cyrillic-900.css';
import '@fontsource/ibm-plex-sans/latin-300.css';
import '@fontsource/ibm-plex-sans/cyrillic-300.css';
import '@fontsource/ibm-plex-sans/latin-400.css';
import '@fontsource/ibm-plex-sans/cyrillic-400.css';
import '@fontsource/ibm-plex-sans/latin-500.css';
import '@fontsource/ibm-plex-sans/cyrillic-500.css';
import '@fontsource/ibm-plex-sans/latin-600.css';
import '@fontsource/ibm-plex-sans/cyrillic-600.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/cyrillic-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import '@fontsource/ibm-plex-mono/cyrillic-500.css';
import '@fontsource/ibm-plex-mono/latin-600.css';
import '@fontsource/ibm-plex-mono/cyrillic-600.css';

import './style.css';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Keyboard, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

new Swiper('#slider', {
  modules: [Navigation, Pagination, Autoplay, Keyboard, A11y],
  loop: true,
  speed: 700,
  autoplay: {
    delay: 5500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.slider-next',
    prevEl: '.slider-prev',
  },
  pagination: {
    el: '.slider-dots',
    clickable: true,
    bulletElement: 'button',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
  },
  a11y: {
    prevSlideMessage: 'Предыдущее фото',
    nextSlideMessage: 'Следующее фото',
  },
});

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
