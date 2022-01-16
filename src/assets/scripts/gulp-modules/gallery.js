function sideSwitchArrow(swiper, arrowArgs, conArgs) {
    const arrow = arrowArgs;
    const container = conArgs;
    const mediumCordValue = document.documentElement.clientWidth / 2;
    document.body.append(arrow);
    container.style.cursor = 'none';
    arrow.style.cursor = 'none';
    arrow.style.zIndex = 10;
    arrow.__proto__.hide = function some() {
        this.style.opacity = '0';
        this.style.pointerEvents = 'none';
        // this.style.transition = 'transform .2s, opacity .4s';
        // this.style.transition = 'opacity .4s';
        // this.style.transitionTimingFunction = 'easy-in';
    };
    arrow.__proto__.show = function some() {
        this.style.opacity = '1';
        // this.style.transition = 'transform .2s, opacity .4s';
        // this.style.transition = 'opacity .4s';
        // this.style.transitionTimingFunction = 'easy-in';
    };
    arrow.dataset.side = 'leftSide';
    arrow.hide();

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

    if (document.documentElement.clientWidth < 992) {
        container.style.cursor = 'pointer';
        arrow.style.cursor = 'pointer';
    }

    function desktopNavButtonHandler(evt) {
        arrow.style.left = `${evt.clientX - 18}px`;
        arrow.style.top = `${evt.clientY - 18}px`;

        // arrow.style.transform = `translate3d(${evt.clientX}px, ${evt.clientY}px, 0)`;
        getCursorSide(evt.clientX);
        // handleArrowVisibility(evt);
    }

    function getCursorSide(x) {
        if (x < (mediumCordValue)) {
            arrow.classList.add('left-side');
            arrow.dataset.side = 'leftSide';
        } else {
            arrow.classList.remove('left-side');
            arrow.dataset.side = 'rightSide';
        }
    }
    container.addEventListener('click', () => {
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
}

const slider = new Swiper('.swiper-container', {
    loop: false,
    slidesPerView: 1.4,
    spaceBetween: 40,
    navigation: {
        nextEl: document.querySelector('[data-next]'),
        prevEl: document.querySelector('[data-prev]'),
    },
    preloadImages: false,
    lazy: true,
    speed: 400,
    watchSlidesVisibility: true,

    breakpoints: {
        320: {
            slidesPerView: 1.1,
            spaceBetween: 10
        },
        992: {
            slidesPerView: 1.4,
            spaceBetween: 40
        },
    }
});

sideSwitchArrow(
    slider,
    document.querySelector('.moving-arrow'),
    document.querySelector('.swiper-container'),
);
