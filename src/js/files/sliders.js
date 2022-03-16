/*
Документация по работе в шаблоне: 
Документация слайдера: https://swiperjs.com/
Сниппет(HTML): swiper
*/

// Подключаем слайдер Swiper из node_modules
// При необходимости подключаем дополнительные модули слайдера, указывая их в {} через запятую
// Пример: { Navigation, Autoplay }
import Swiper, { Navigation, Lazy, Pagination } from 'swiper';
/*
Основниые модули слайдера:
Navigation, Pagination, Autoplay, 
EffectFade, Lazy, Manipulation
Подробнее смотри https://swiperjs.com/
*/

// Стили Swiper
// Базовые стили
import "../../scss/base/swiper.scss";
// Полный набор стилей из scss/libs/swiper.scss
// import "../../scss/libs/swiper.scss";
// Полный набор стилей из node_modules
// import 'swiper/css';

// Инициализация слайдеров
function initSliders() {
	// Перечень слайдеров
	// Проверяем, есть ли слайдер на стронице
	if (document.querySelector('.clients__slider')) { // Указываем скласс нужного слайдера
		// Создаем слайдер
		new Swiper('.clients__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Navigation, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 2.5,
			spaceBetween: 0,
			autoHeight: false,
			speed: 800,
			watchOverflow: true,

			loop: true,
			preloadImages: true,
			lazy: {
				loanOnTransitionStart: true,
				loadPrevNext: true,
			},

			// Кнопки "влево/вправо"
			navigation: {
				prevEl: '.clients__slider .swiper__button-prev',
				nextEl: '.clients__slider .swiper__button-next',
			},

			// Брейкпоинты

			breakpoints: {
				479.98: {
					slidesPerView: 3,
				},
				574.98: {
					slidesPerView: 4,
				},
				767.98: {
					slidesPerView: 5,
					spaceBetween: 20,
				},
				992: {
					slidesPerView: 6,
					spaceBetween: 40,
				},
			},

			// События
			on: {

			}
		});

		new Swiper('.portfolio__slider', { // Указываем скласс нужного слайдера
			// Подключаем модули слайдера
			// для конкретного случая
			modules: [Pagination, Lazy],
			observer: true,
			observeParents: true,
			slidesPerView: 1,
			spaceBetween: 20,
			autoHeight: false,
			speed: 800,
			watchOverflow: true,

			loop: false,
			preloadImages: true,
			lazy: {
				loanOnTransitionStart: true,
				loadPrevNext: true,
			},

			pagination: {
				el: '.swiper-pagination',
				clickable: true,
				dynamicBullets: true,
			},

			// Брейкпоинты

			breakpoints: {
				574.98: {
					slidesPerView: 2,
					spaceBetween: 10,
				},
				767.98: {
					slidesPerView: 2,
					spaceBetween: 20,
				},
				991.98: {
					slidesPerView: 2,
					spaceBetween: 40,
				},
			},

			// События
			on: {

			}
		});
	}
}
// Скролл на базе слайдера (по классу swiper_scroll для оболочки слайдера)
function initSlidersScroll() {
	// Добавление классов слайдера
	// при необходимости отключить
	bildSliders();

	let sliderScrollItems = document.querySelectorAll('.swiper_scroll');
	if (sliderScrollItems.length > 0) {
		for (let index = 0; index < sliderScrollItems.length; index++) {
			const sliderScrollItem = sliderScrollItems[index];
			const sliderScrollBar = sliderScrollItem.querySelector('.swiper-scrollbar');
			const sliderScroll = new Swiper(sliderScrollItem, {
				observer: true,
				observeParents: true,
				direction: 'vertical',
				slidesPerView: 'auto',
				freeMode: {
					enabled: true,
				},
				scrollbar: {
					el: sliderScrollBar,
					draggable: true,
					snapOnRelease: false
				},
				mousewheel: {
					releaseOnEdges: true,
				},
			});
			sliderScroll.scrollbar.updateSize();
		}
	}
}

window.addEventListener("load", function (e) {
	// Запуск инициализации слайдеров
	initSliders();
	// Запуск инициализации скролла на базе слайдера (по классу swiper_scroll)
	//initSlidersScroll();
});