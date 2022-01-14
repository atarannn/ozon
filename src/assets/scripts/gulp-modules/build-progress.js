/* eslint-disable linebreak-style */

/**
 * @param {Object} props
 * @namespace
 * @property {NodeElement}  props.content           - Контент попапа.
 * @property {NodeList}  props.call       - Кнопка вызова попапа
 * @property {Object}  props.styles         - Стили попапа.
 * @property {NodeElement}  [props.close]      - Кнопка закрытия.
 * @property {Function}  props.afterOpenCb - Коллбек после первого открытия попапа.
 */
class Popup {
    constructor(props) {
        this.call = props.call;
        this.overlayClass = 'my-popup-overlay';
        this.uniqueClass = `${this.overlayClass}-${Math.random().toString().replace('.', '')}`;
        this.styles = props.styles || {};
        this.content = props.content;
        this.close = props.close;
        this.afterOpenCb = props.afterOpenCb || function () {};
        this.init();
    }

    init() {
        document.body.insertAdjacentHTML('beforeend', this.preparePopup());
        this.mountedPopup = document.querySelector(`.${this.uniqueClass}`);
        Object.entries(this.styles).forEach((el) => {
            // eslint-disable-next-line prefer-destructuring
            this.mountedPopup.style[el[0]] = el[1];
        });
        this.addContent();
        this.handleCallButton();
        this.mountedPopup.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(this.uniqueClass)) {
                this.closePopup();
            }
        });
        this.close.addEventListener('click', () => {
            this.closePopup();
        });
        this.afterOpenCb();
    }

    handleCallButton() {
        // eslint-disable-next-line no-prototype-builtins
        if (NodeList.prototype.isPrototypeOf(this.call)) {
            this.call.forEach((button) => {
                button.addEventListener('click', () => {
                    this.openPopup();
                });
            });
        } else {
            this.call.addEventListener('click', () => {
                this.openPopup();
            });
        }
    }

    // handleOpeningButtons
    addContent() {
        this.mountedPopup
            .querySelector('.my-popup-content')
            .insertAdjacentElement('beforeend', this.content);
    }

    closePopup() {
        gsap.timeline()
            .timeScale(2)
            .fromTo(
                this.mountedPopup.querySelector('.my-popup-content'),
                { y: 0, autoAlpha: 1 },
                { y: -100, autoAlpha: 0 },
            )
            .fromTo(
                this.mountedPopup,
                { autoAlpha: 1 },
                { autoAlpha: 0 },
            )
            .set(this.mountedPopup, { display: 'none' });
    }

    openPopup() {
        gsap.timeline()
            .timeScale(1.5)
            .set(this.mountedPopup, { display: 'flex' })
            .fromTo(
                this.mountedPopup,
                { autoAlpha: 0 },
                { autoAlpha: 1 },
            )
            .fromTo(
                this.mountedPopup.querySelector('.my-popup-content'),
                { y: -100, autoAlpha: 0 },
                { y: 0, autoAlpha: 1 },
            )
            .add(() => {
                this.afterOpenCb();
                window.dispatchEvent(new Event('popup-opened'));
            });
    }

    get popupStyles() {
        return `
        <style>
          .my-popup-overlay {
            position:fixed;
            display: none;
            left:0;
            top:0;
            width:100vw;
            height: 100vh;
            justify-content:center;
            align-items: center;
            z-index:10;
          }
        </style>
      `;
    }

    preparePopup() {
        return `
        <div class="my-popup-overlay ${this.uniqueClass}">
          <div class="my-popup-content">
          </div>
        </div>
        ${this.popupStyles}
      `;
    }
}

const popupContentInit = {
    title: 'Title',
    url: 'https://google.com',
};

const cards = document.querySelectorAll('[data-open]');

const renderTargets = {
    title: () => {
    },
    text: (val) => {
        document.querySelector('[data-detail-text]').innerHTML = val;
    },
    date: (val) => {
        document.querySelector('[data-detail-date]').innerHTML = val;
    },
    url: (val) => {
        document.querySelector('[data-detail-frame]').src = val;
    },
};

const buildPopup = new Popup({
    call: cards,
    content: document.querySelector('[data-build-progress]'),
    close: document.querySelector('[data-close]'),
});

const popupContent = new Proxy(popupContentInit, {
    set(obj, prop, value) {
        renderTargets[prop](value);
        return true;
    },
});

// cards.forEach((card) => {
//     card.addEventListener('click', () => {
//         requestBuildDetails(card.dataset.id, (response) => {
//             popupContent.title = response.title;
//             popupContent.text = response.text;
//             popupContent.url = response.video;
//             popupContent.date = response.date;
//         });
//         document.body.style.overflow = 'visible';
//     });
// });

buildPopup.close.addEventListener('click', () => {
    document.body.style.overflow = 'hidden';
});



function requestBuildDetails(id, cb = () => {}) {
    const sendData = new FormData();
    sendData.append('action', 'buildProgress');
    sendData.append('id', id);
    let sendUrl = '/wp-admin/admin-ajax.php';
    if (window.location.href.match(/localhost/)) sendUrl = './static/build-test.php';
    fetch(sendUrl, {
        method: 'POST',
        body: sendData,
    })
        .then(el => el.json())
        .then((el) => {
            cb(el);
        });
}
var swiper2 = new Swiper('.mySwiper2', {
    loop: false,
    spaceBetween: 5,
    slidesPerView: 4,
    width: 400,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,

    breakpoints: {
        320: {
            width: 250,
        },
        575: {
            width: 400
        }
    }
});
var swiper = new Swiper('.mySwiper', {
    loop: false,
    spaceBetween: 0,
    slidesPerView: 1,
    centeredSlides: true,
    navigation: {
        // nextEl: '.swiper-button-const-next',
        // prevEl: '.swiper-button-const-prev',
    },
    thumbs: {
        swiper: swiper2,
    },
});

/** СТрелка переключатель в зависимости от положения на єкране */
window.addEventListener('popup-opened', () => {
    swiper2.update();
    swiper.update();
})
function sideSwitchArrow(swiper, arrow, container) {
    const mediumCordValue = document.documentElement.clientWidth / 2;
    document.body.append(arrow);
    container.style.cursor = 'none';
    arrow.style.cursor = 'none';
    arrow.style.zIndex = 10;
    arrow.__proto__.hide = function() {
        this.style.opacity = '0';
        this.style.pointerEvents = 'none';
    };
    arrow.__proto__.show = function() {
        this.style.opacity = '1';
        // this.style.pointerEvents = 'auto';
    };
    arrow.dataset.side = 'leftSide';

    container.addEventListener('mousemove', desktopNavButtonHandler);
    container.addEventListener('mouseenter', () => {
        arrow.show();
    });
    container.addEventListener('mouseleave', () => {
        arrow.hide();
    });
    if (document.documentElement.clientWidth < 769) {
        window.removeEventListener('mousemove', desktopNavButtonHandler);
        arrow.remove();
    }

    /** Записывает координаты обьекта, на котором нужно скрыть стрелку переключения слайдера */
    /** ms ---> main-screen */

    function desktopNavButtonHandler(evt) {
        // arrow.style.position = 'fixed';
        arrow.style.left = `${evt.clientX - 18}px`;
        arrow.style.top = `${evt.clientY - 18}px`;

        getCursorSide(evt.clientX);
        handleArrowVisibility(evt);
    }

    function handleArrowVisibility() {}

    function getCursorSide(x) {
        if (x < mediumCordValue) {
            arrow.classList.add('left-side');
            arrow.dataset.side = 'leftSide';
            // switchGallerySlide('leftSide');
        } else {
            arrow.classList.remove('left-side');
            arrow.dataset.side = 'rightSide';
            // switchGallerySlide('rightSide')
        }
    }
    container.addEventListener('click', function clickToChange() {
        switchGallerySlide(arrow.dataset.side);
    });
    if (document.documentElement.clientWidth < 576) {
        container.removeEventListener('click', clickToChange);
    }
    const navigate = {
        leftSide: () => {
            swiper.slidePrev();
        },
        rightSide: () => {
            swiper.slideNext();
        },
    };

    function switchGallerySlide(side) {
        navigate[side]();
        return navigate.side;
    }

    // eslint-disable-next-line no-unused-vars
}
sideSwitchArrow(
    swiper,
    document.querySelector('.moving-arrow'),
    document.querySelector('.swiper '),
);
/** СТрелка переключатель в зависимости от положения на єкране END */
