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
