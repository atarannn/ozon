window.onload = function () {
  document.body.classList.add('loaded_hiding');
  document.body.style.overflow = 'hidden';
  window.setTimeout(() => {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
    document.body.style.overflow = 'auto';
  }, 500);

};

function menuOpen(menu) {
  menu.classList.add('menu__active');
  const createAnimation = (links, translateY = 0, delay = 0) => {
    links.forEach((link, i) => {
      gsap.from(link, {
        delay: delay + i / 10,
        y: translateY,
        opacity: 0,
      });
    });
  };
  const links1 = menu.querySelectorAll('[data-animation]');
  const links2 = menu.querySelectorAll('[data-animation2]');
  createAnimation(links1, 100, 0.1);
  createAnimation(links2, 100, 0.3);
  menuOpenAnim();
  document.querySelector('.header__right-menu').style.opacity = '0';
  document.querySelector('.header__right-menu').style.visibility = 'hidden';
  document.querySelector('.header__right-menu').style.display = 'none';
  document.querySelector('.menu-top__right-close').style.opacity = '1';
  document.querySelector('.menu-top__right-close').style.display = 'flex';
  document.querySelector('.menu-top__right-close').style.visibility = 'visible';
}

function menuClose(menu) {
  menu.classList.remove('menu__active');
  menuCloseAnim();
  document.querySelector('.header__right-menu').style.opacity = '1';
  document.querySelector('.header__right-menu').style.visibility = 'visible';
  document.querySelector('.header__right-menu').style.display = 'flex';
  document.querySelector('.menu-top__right-close').style.opacity = '0';
  document.querySelector('.menu-top__right-close').style.display = 'none';
  document.querySelector('.menu-top__right-close').style.visibility = 'hidden';
}

function menuOpenAnim(evt, reverseArg) {
  const menu = document.querySelector('.menu-wrap');
  if  (menu === null) return;
  const tl = gsap.timeline({ paused: true });
  tl.to(menu, { autoAlpha: 1 })
  tl.fromTo(menu,
      { webkitClipPath: 'circle(0% at 150% 20%)' },
      { webkitClipPath: 'circle(150% at 50% 100%)', ease: 'power4.easeInOut', duration: 1.2, clearProps: 'all' }, '<');

  tl.play();
}

function menuCloseAnim(evt, reverseArg) {
  const menu = document.querySelector('.menu-wrap');
  if  (menu === null) return;
  const ease = 'power4.easeOut';
  const tl = gsap.timeline({ paused: true });
  // tl.set(menu, { opacity: 1, visibility: 'visible' });

    tl.fromTo(menu,
      { autoAlpha: 1, webkitClipPath: 'circle(150% at 50% 100%)', },
      {  webkitClipPath: 'circle(0% at 150% 20%)', ease: 'power4.easeInOut', duration: 1.25, clearProps: 'all' }, '<');
  tl.set(menu, { autoAlpha: 0 })
  tl.play();
}

function menuInit() {
  const menu = document.querySelector('.menu-wrap');
  document.querySelector('[data-open-menu]').addEventListener('click', () => {
    menuOpen(menu);
    document.body.style.overflow = 'hidden';
  });
  document.querySelector('[data-close-menu]').addEventListener('click', () => {
    menuClose(menu);
    document.body.style.overflow = 'auto';
  });
}

// function callPopup(callSelector, contentToOpenSelector, closeSelector) {
//   const call = document.querySelectorAll(callSelector);
//   const content = document.querySelector(contentToOpenSelector);
//   const close = document.querySelector(closeSelector);
//
//   call.forEach(elem => {
//     elem.addEventListener('click', () => {
//       content.style.display = 'flex';
//       content.classList.add('active');
//     });
//   });
//
//   close.addEventListener('click', () => {
//     content.classList.remove('active');
//     content.style.display = 'none';
//   });
// }
// callPopup('[data-open-call-popup]','[data-call-popup]','[data-close-call-popup]');

function formOpen(form) {
  form.classList.add('active');
  formOpenAnim();
}

function formClose(form) {
  form.classList.remove('active');
  formCloseAnim();
}

function formOpenAnim(evt, reverseArg) {
  const form = document.querySelector('[data-call-popup]');
  // if  (form === null) return;
  const tl = gsap.timeline({ paused: true });
  tl.to(form, { autoAlpha: 1 })
  tl.fromTo(form,
      {  webkitClipPath: 'circle(0% at 50% 50%)' },
      { webkitClipPath: 'circle(150% at 50% 100%)', ease: 'power4.easeInOut', duration: 0.8, clearProps: 'all' });
  tl.play();
}

function formCloseAnim(evt, reverseArg) {
  const form = document.querySelector('[data-call-popup]');
  // if  (form === null) return;
  const ease = 'power4.easeOut';
  const tl = gsap.timeline({ paused: true });
  tl.set(form, { opacity: 1, visibility: 'visible'});
  tl.fromTo(form,
      { autoAlpha: 1, webkitClipPath: 'circle(150% at 50% 100%)', },
      {  webkitClipPath: 'circle(0% at 50% 50%)', ease: 'power4.easeInOut', duration: 0.6, clearProps: 'all' }, '<');
  tl.set(form, { autoAlpha: 0 });
  tl.play();
}

function formInit() {
  const form = document.querySelector('[data-call-popup]');
  document.querySelectorAll('[data-open-call-popup]').forEach(elem => {
    elem.addEventListener('click', () => {
      formOpen(form);
      document.body.style.overflow = 'hidden';
    });
  });
  document.querySelector('[data-close-call-popup]').addEventListener('click', () => {
    formClose(form);
    document.body.style.overflow = 'auto';
  });
}


// Mobile phone menu start
const btnCallMobile = document.querySelector('.js-mobile-call');
const btnCloseMobile = document.querySelector('.js-mobile-close');
const formMobile = document.querySelector('.form-header-call');
const formCallMobile = document.querySelector('.js-mobile-form');
const form = document.querySelector('[data-call-popup]');

formCallMobile.addEventListener('click', () => {
  formOpen(form);
  formMobile.classList.remove('sideform-active');
  document.body.style.overflow = 'hidden';
});

btnCallMobile.addEventListener('click', () => {
  formMobile.classList.add('sideform-active');
  document.body.style.overflow = 'hidden';
});

btnCloseMobile.addEventListener('click', () => {
  formMobile.classList.remove('sideform-active');
  document.body.style.overflow = 'auto';
});
// Mobile phone menu end


// function callThanksPopup(callSelector, contentToOpenSelector, closeSelector) {
//   const submitBtn = document.querySelector(callSelector);
//   const callContent = document.querySelector('[data-call-popup]');
//   const content = document.querySelector(contentToOpenSelector);
//   const close = document.querySelectorAll(closeSelector);
//
//   submitBtn.addEventListener('click', () => {
//     content.classList.add('thanks-active');
//     callContent.classList.remove('active');
//   });
//
//   close.forEach(elem => {
//     elem.addEventListener('click', () => {
//       content.classList.remove('thanks-active');
//     });
//   })
//
// }
// callThanksPopup('[data-btn-submit]','[data-call-thanks-popup]', '[data-close-call-popup]');


function init() {
  // const unSelectHandler = (container) => {
  //   const elem = container.querySelector('.select-items');
  //   if (!elem.classList.contains('select-hide')) {
  //     container.classList.remove('select-arrow-active');
  //     elem.classList.add('select-hide');
  //   }
  //   window.removeEventListener('click', unSelectHandler);
  // };
  // const selectHandler = (event) => {
  //   event.stopPropagation();
  //   const container = event.target.closest('[data-lang]');
  //   container.classList.add('select-arrow-active');
  //   container.querySelector('.select-items').classList.remove('select-hide');
  //   window.addEventListener('click', unSelectHandler.bind(null, container));
  // };
  // // document.querySelector('[data-lang="mobile"]').addEventListener('click', selectHandler);
  // document.querySelector('[data-lang="desktop"]').addEventListener('click', selectHandler);

  menuInit();
  formInit();
}

const header = document.querySelector('.header');

function handleVisibilityOnScroll(elems = [], direction = 'up') {
  elems.forEach((elem) => {
    switch (direction) {
      case 'down':
        elem[0].classList.add(elem[1]);
        break;
      default:
        elem[0].classList.remove(elem[1]);
        break;
    }
  });
}

locoScroll.on('scroll', (position) => {
  if (position.scroll.y > 50) {
    handleVisibilityOnScroll([[header, 'not-on-top']], 'down');
  } else {
    handleVisibilityOnScroll([[header, 'not-on-top']]);
  }
});

function downButtonMobHandler() {
  $(document).ready(function () {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
        $(".pageup").css('opacity', '1');
      } else {
        $(".pageup").css('opacity', '0');
      }
    });

    $(".pageup").on("click", function () {
      var el = $(this);
      var dest = el.attr("href");
      if (dest !== undefined && dest !== '') {
        $("html").animate({
              scrollTop: $(dest).offset().top - 100
            }, 1000
        );
      }
      return false;
    });
  });
}

const isMobile = window.matchMedia('(max-width: 575px)').matches;
function downButtonHandlerWithLocoScroll() {
  if (locoScroll === undefined) {
    downButtonMobHandler();
    return;
  }
  locoScroll.on('scroll', ({ scroll }) => {
    if (scroll.y > 300) {
      $(".pageup").css('opacity', '1');
    } else {
      $(".pageup").css('opacity', '0');
    }
  })
  document.querySelector('.pageup').addEventListener('click', () => {
    locoScroll.scrollTo(0,0)
  })
}
isMobile && downButtonMobHandler();
!isMobile && downButtonHandlerWithLocoScroll();

window.addEventListener('DOMContentLoaded', init);


