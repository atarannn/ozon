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
cards.forEach((card) => {
    card.addEventListener('click', () => {
        requestBuildDetails(card.dataset.id, (response) => {
            popupContent.title = response.title;
            popupContent.text = response.text;
            popupContent.url = response.video;
            popupContent.date = response.date;
        });
        document.body.style.overflow = 'visible';
    });
});
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

var swiper = new Swiper(".mySwiper", {
    loop: true,
    slidesPerView: 3,
    freeMode: true,
    watchSlidesProgress: true,
});

var swiper2 = new Swiper(".mySwiper2", {
    loop: true,
    slidesPerView: 1,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    thumbs: {
        swiper: swiper,
    },
});
