// Подключение функционала
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

const firstscreen = document.querySelector('.firstscreen');
if (firstscreen) {
    let firstscreenMmd3 = window.matchMedia('(min-width: 767.98px)');
    function firstscreenHandleMmd3Change(e) {
        if (e.matches) {
            function setCoordinates() {
                const header = document.querySelector('header.header');
                let headerHeight = header.offsetHeight;

                firstscreen.style.height = window.innerHeight + 'px';

                const image = document.querySelector('.firstscreen__image img'),
                    imageComputedStyle = window.getComputedStyle(image),
                    imageObjectFit = imageComputedStyle.getPropertyValue('object-fit'),
                    coordinates = {},
                    imagePositions = imageComputedStyle.getPropertyValue('object-position').split(' '),
                    horizontalPercentage = parseInt(imagePositions[0]) / 100,
                    verticalPercentage = parseInt(imagePositions[1]) / 100,
                    naturalRatio = image.naturalWidth / image.naturalHeight,
                    visibleRatio = image.width / image.height,
                    hotPots = document.querySelector('.firstscreen__points');

                let koef = 0;

                if (naturalRatio > visibleRatio) {
                    coordinates.sourceWidth = image.naturalHeight * visibleRatio
                    coordinates.sourceHeight = image.naturalHeight
                    coordinates.sourceX = (image.naturalWidth - coordinates.sourceWidth) * horizontalPercentage
                    coordinates.sourceY = 0
                    koef = (document.documentElement.clientHeight) / image.naturalHeight
                } else {
                    coordinates.sourceWidth = image.naturalWidth
                    coordinates.sourceHeight = image.naturalWidth / visibleRatio
                    coordinates.sourceX = 0
                    coordinates.sourceY = (image.naturalHeight - coordinates.sourceHeight) * verticalPercentage
                    koef = document.documentElement.clientWidth / image.naturalWidth
                }

                let style;
                style = 'top:' + (coordinates.sourceY * koef * -1) + 'px;';
                style += 'left:' + (coordinates.sourceX * koef * -1) + 'px;';
                style += 'height:' + (image.naturalHeight * koef) + 'px;';
                style += 'width:' + (image.naturalWidth * koef) + 'px;';

                hotPots.style.cssText = style;
            }

            // Добавление отступа к оболочке из-за фиксированной шапки
            const header = document.querySelector('header.header');

            function setFirstscreeMarginTop() {
                const headerHeight = header.offsetHeight;

                firstscreen.style.marginTop = -headerHeight + 'px';
            }

            setTimeout(() => {
                setCoordinates()
                setFirstscreeMarginTop();
            }, 100);

            window.addEventListener('resize', function (event) {
                setCoordinates()
                setFirstscreeMarginTop()
            }, true);

            document.addEventListener("beforePopupOpen", function (e) {
                const currentPopup = e.detail.popup;

                const popupItem = document.querySelector(currentPopup.hash);
                const popupParent = popupItem.closest('.firstscreen__item');

                const buttons = document.querySelectorAll('.item-firstscreen__button');
                buttons.forEach(element => {
                    element.style.opacity = 0;
                });

                const videoNormal = popupParent.querySelector('.item-firstscreen__video_normal');

                videoNormal.style.opacity = 1;
                videoNormal.play();
            });

            document.addEventListener("beforePopupClose", function (e) {
                const currentPopup = e.detail.popup;

                const popupItem = document.querySelector(currentPopup.hash);
                const popupParent = popupItem.closest('.firstscreen__item');

                const videoReverse = popupParent.querySelector('.item-firstscreen__video_reverse');

                console.log(videoReverse);

                videoReverse.style.opacity = 1;
                videoReverse.play();
            });

            document.addEventListener("afterPopupClose", function (e) {
                const currentPopup = e.detail.popup;

                const buttons = document.querySelectorAll('.item-firstscreen__button');
                buttons.forEach(element => {
                    element.style.opacity = 1;
                });

                const popupItem = document.querySelector(currentPopup.hash);
                const popupParent = popupItem.closest('.firstscreen__item');

                const videoNormal = popupParent.querySelector('.item-firstscreen__video_normal');
                const videoReverse = popupParent.querySelector('.item-firstscreen__video_reverse');

                setTimeout(() => {
                    videoNormal.load();
                    videoReverse.load();

                    videoNormal.style.opacity = 0;
                    videoReverse.style.opacity = 0;
                }, 1000);
            });
        }
    }
    firstscreenMmd3.addEventListener('change', firstscreenHandleMmd3Change);
    firstscreenHandleMmd3Change(firstscreenMmd3);

    let firstscreenMmd2 = window.matchMedia('(min-width: 991.98px)');
    function firstscreenHandleMmd2Change(e) {
        if (e.matches) {
            
        } else {
            firstscreen.style.marginTop = 0 + 'px';
        }
    }
    firstscreenMmd2.addEventListener('change', firstscreenHandleMmd2Change);
    firstscreenHandleMmd2Change(firstscreenMmd2);
}




