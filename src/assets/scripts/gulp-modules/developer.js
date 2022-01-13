const swiper = new Swiper('.swiper', {
    slidesPerView: 5,
    spaceBetween: 50,
    slidesPerGroup: 1,
    shadowOffset: 50,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 0
        },
        425: {
            slidesPerView: 2,
            spaceBetween: 10
        },
        575: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        991: {
            slidesPerView: 5,
            spaceBetween: 50
        },
    }

});
