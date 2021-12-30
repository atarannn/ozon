const swiper = new Swiper('.swiper', {
    slidesPerView: 5,
    spaceBetween: 50,
    slidesPerGroup: 1,
    shadowOffset: 50,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});
