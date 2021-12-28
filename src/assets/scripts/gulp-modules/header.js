function menuOpen(menu) {
  menu.classList.add('menu__active');
  // const createAnimation = (links, translateY = 0, delay = 0) => {
  //   links.forEach((link, i) => {
  //     gsap.from(link, {
  //       delay: delay + i / 10,
  //       y: translateY,
  //       opacity: 0,
  //     });
  //   });
  // };
  // const links1 = menu.querySelectorAll('[data-animation1]');
  // const links2 = menu.querySelectorAll('[data-animation2]');
  // const links3 = menu.querySelectorAll('[data-animation3]');
  // createAnimation(links1, 100, 0.5);
  // createAnimation(links2, 100, 0.8);
  // createAnimation(links3, 100, 1.1);
}

function menuClose(menu) {
  menu.classList.remove('menu__active');
}

function menuInit() {
  const menu = document.querySelector('.menu-wrap');
  document.querySelector('[data-open-menu]').addEventListener('click', () => menuOpen(menu));
  document.querySelector('[data-close-menu]').addEventListener('click', () => menuClose(menu));
}

function init() {
  $(document).ready(function () {
    $(".select").each(function () {
      // Variables
      var $this = $(this),
        selectOption = $this.find("option"),
        selectOptionLength = selectOption.length,
        selectedOption = selectOption.filter(":selected"),
        dur = 500;
      $this.hide();
      // Wrap all in select box
      $this.wrap('<div class="header__right-language"></div>');
      // Style box
      $("<div>", {
        class: "select__gap",
        text: "ук",
      }).insertAfter($this);

      var selectGap = $this.next(".select__gap"),
        caret = selectGap.find(".caret");
      // Add ul list
      $("<ul>", {
        class: "select__list",
      }).insertAfter(selectGap);

      var selectList = selectGap.next(".select__list");
      // Add li - option items
      for (var i = 0; i < selectOptionLength; i++) {
        $("<li>", {
          class: "select__item",
          html: $("<span>", {
            text: selectOption.eq(i).text(),
          }),
        })
          .attr("data-value", selectOption.eq(i).val())
          .appendTo(selectList);
      }
      // Find all items
      var selectItem = selectList.find("li");

      selectList.slideUp(0);
      selectGap.on("click", function () {
        if (!$(this).hasClass("on")) {
          $(this).addClass("on");
          selectList.slideDown(dur);

          selectItem.on("click", function () {
            var chooseItem = $(this).data("value");

            $("select").val(chooseItem).attr("selected", "selected");
            selectGap.text($(this).find("span").text());

            selectList.slideUp(dur);
            selectGap.removeClass("on");
          });
        } else {
          $(this).removeClass("on");
          selectList.slideUp(dur);
        }
      });
    });
  });
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

window.addEventListener('DOMContentLoaded', init);
