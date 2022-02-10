gsap.registerPlugin(ScrollTrigger);
window.addEventListener('load', () => {

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".page__inner", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".page__inner").style.transform ? "transform" : "fixed"
    });

    const paralaxImagesInfra = document.querySelectorAll('#infrastructure .block img');
    paralaxImagesInfra.forEach((image) => {
        const wrap = document.createElement('div');
        wrap.style.overflow = 'hidden';
        wrap.style.height = 'auto';
        image.parentElement.prepend(wrap);
        gsap.set(image, { willChange: 'transform', scale: 1.1 });
        wrap.prepend(image);

        gsap
            .timeline({
                ease: 'none',
                scrollTrigger: {
                    trigger: wrap,
                    scrub: 1.5,
                    scroller: '.page__inner',
                    // markers: true,
                    onLeave: () => {
                        console.log('leave');
                    },
                    // markers: true,
                },
            })
            .fromTo(
                image,
                {
                    y: -25,
                },
                {
                    y: 25,
                    ease: 'linear',
                },
            );
    });

    const paralaxImages = document.querySelectorAll('.terms-img img, .ecological__image img, .garden__image img, .aesthetics__image img, .infrastructure__image img, .card__item-image img, #values .slide img, #infrastructure .block img, #sfera .info-img img, .specifications-block img, .technical_control-img');
    paralaxImages.forEach((image) => {
        const wrap = document.createElement('div');
        wrap.style.overflow = 'hidden';
        wrap.style.height = '100%';
        image.parentElement.prepend(wrap);
        gsap.set(image, { willChange: 'transform', scale: 1.1 });
        wrap.prepend(image);

        gsap
            .timeline({
                ease: 'none',
                scrollTrigger: {
                    trigger: wrap,
                    scrub: 1.5,
                    scroller: '.page__inner',
                    // markers: true,
                    onLeave: () => {
                        console.log('leave');
                    },
                    // markers: true,
                },
            })
            .fromTo(
                image,
                {
                    y: -25,
                },
                {
                    y: 25,
                    ease: 'linear',
                },
            );
    });

    const paralaxImages2 = document.querySelectorAll('#advantages img, #day .block img');
    paralaxImages2.forEach((image) => {
        gsap.set(image, { willChange: 'transform', scale: 1.2 });

        gsap
            .timeline({
                ease: 'none',
                scrollTrigger: {
                    trigger: image,
                    scrub: 1,
                    scroller: '.page__inner',
                    onLeave: () => {
                        console.log('leave');
                    },
                    // markers: true,
                },
            })
            .fromTo(
                image,
                {
                    y: -25,
                },
                {
                    y: 25,
                    ease: 'linear',
                },
            );
    });

    const paralaxImages3 = document.querySelectorAll('#location .block img');
    paralaxImages3.forEach((image) => {
        gsap.set(image, { willChange: 'transform', scale: 1 });

        gsap
            .timeline({
                ease: 'none',
                scrollTrigger: {
                    trigger: image,
                    scrub: 1,
                    scroller: '.page__inner',
                    onLeave: () => {
                        console.log('leave');
                    },
                    // markers: true,
                },
            })
            .fromTo(
                image,
                {
                    x: -25,
                },
                {
                    x: 25,
                    ease: 'linear',
                },
            );
    });

    // анимация по кругу + движение
    const paralaxPattern = document.querySelectorAll('.promo__group img, .garden__pattern img, .apartments__pattern img, .video__pattern img, .infrastructure__pattern img, .apartments__pattern img, .info__pattern img');
    paralaxPattern.forEach((image) => {
        const wrap = document.createElement('div');
        wrap.style.overflow = 'visible';
        wrap.style.height = 'auto';
        image.parentElement.prepend(wrap);
        gsap.set(image, { willChange: 'transform', scale: 0.9, rotate: 0 });
        wrap.prepend(image);

        gsap
            .timeline({
                ease: 'none',
                scrollTrigger: {
                    trigger: wrap,
                    scrub: 1.1,
                    scroller: '.page__inner',
                    // markers: true,
                    onLeave: () => {
                        console.log('leave');
                    },
                    // markers: true,
                },
            })
            .fromTo(
                image,
                {
                    y: -50,
                    rotate: 30,
                },
                {
                    y: 50,
                    rotate: -30,
                    ease: 'ease',
                },
            );
    });

    // анимация по кругу
    const paralaxPattern2 = document.querySelectorAll('.card .pattern img, .eleventh__pattern img, .seventeenth__pattern img, .twentysecond__pattern img, .nineteenth__pattern img,.twentieth__pattern img, .twentyfirst__pattern img, .twentythird__pattern img');
    paralaxPattern2.forEach((image) => {
        const wrap = document.createElement('div');
        wrap.style.overflow = 'visible';
        wrap.style.height = 'auto';
        image.parentElement.prepend(wrap);
        gsap.set(image, { willChange: 'transform', scale: 0.9, rotate: 0 });
        wrap.prepend(image);

        gsap
            .timeline({
                ease: 'none',
                scrollTrigger: {
                    trigger: wrap,
                    scrub: 1.1,
                    scroller: '.page__inner',
                    // markers: true,
                    onLeave: () => {
                        console.log('leave');
                    },
                    // markers: true,
                },
            })
            .fromTo(
                image,
                {
                    y: 0,
                    rotate: 25,
                },
                {
                    y: 0,
                    rotate: -25,
                    ease: 'ease',
                },
            );
    });

    // анимация по кругу2
    const paralaxPattern5 = document.querySelectorAll('.tenth__pattern img, .eighteenth__pattern img');
    paralaxPattern5.forEach((image) => {
        const wrap = document.createElement('div');
        wrap.style.overflow = 'visible';
        wrap.style.height = 'auto';
        image.parentElement.prepend(wrap);
        gsap.set(image, { willChange: 'transform', scale: 0.9, rotate: 0 });
        wrap.prepend(image);

        gsap
            .timeline({
                ease: 'none',
                scrollTrigger: {
                    trigger: wrap,
                    scrub: 1.1,
                    scroller: '.page__inner',
                    // markers: true,
                    onLeave: () => {
                        console.log('leave');
                    },
                    // markers: true,
                },
            })
            .fromTo(
                image,
                {
                    y: 0,
                    rotate: 45,
                },
                {
                    y: 0,
                    rotate: -45,
                    ease: 'ease',
                },
            );
    });

    // анимация по кругу + большое движение
    const paralaxPattern4 = document.querySelectorAll('.twelfth__pattern img, .fifteenth__pattern img, .sixteenth__pattern img, .first__pattern img, .second__pattern img, .third__pattern img, .fourth__pattern img, .fifth__pattern img, .sixth__pattern img, .seventh__pattern img, .eighth__pattern img, .ninth__pattern img, .thirteenth__pattern img, .fourteenth__pattern img');
    paralaxPattern4.forEach((image) => {
        const wrap = document.createElement('div');
        wrap.style.overflow = 'visible';
        wrap.style.height = 'auto';
        image.parentElement.prepend(wrap);
        gsap.set(image, { willChange: 'transform', scale: 0.9, rotate: 0 });
        wrap.prepend(image);

        gsap
            .timeline({
                ease: 'none',
                scrollTrigger: {
                    trigger: wrap,
                    scrub: 1.1,
                    scroller: '.page__inner',
                    // markers: true,
                    onLeave: () => {
                        console.log('leave');
                    },
                    // markers: true,
                },
            })
            .fromTo(
                image,
                {
                    y: -50,
                    rotate: 35,
                },
                {
                    y: 50,
                    rotate: -35,
                    ease: 'ease',
                },
            );
    });


    const spanBezier1 = 'power4.inOut';
    const spanEntries1 = document.querySelectorAll('[data-span-entry1]');
    spanEntries1.forEach(section => {
        gsap.set(section, { overflow: 'hidden' });
        section.innerHTML = `
           <div>
             ${section.innerHTML}
           </div>
         `;
        const tl = gsap.timeline({
            paused: true,
            scrollTrigger: {
                triggerHook: 1,
                trigger: section,
                scroller: '.page__inner',
                start: '0% bottom',
                end: '100% bottom',
                once: true,
            },
        });
        tl.fromTo(
            section.querySelector('div'),
            { y: '50%', duration: 0, autoAlpha: 0},
            { y: 0, autoAlpha: 1, duration: 1, ease: spanBezier1},
        );
    });

    const spanBezier2 = 'power4.inOut';
    const spanEntries2 = document.querySelectorAll('[data-span-entry2]');
    spanEntries2.forEach(section => {
        gsap.set(section, { overflow: 'hidden' });
        section.innerHTML = `
           <div>
             ${section.innerHTML}
           </div>
         `;
        const tl = gsap.timeline({
            paused: true,
            scrollTrigger: {
                triggerHook: 1,
                trigger: section,
                scroller: '.page__inner',
                start: '0% bottom',
                end: '100% bottom',
                once: true,
            },
        });
        tl.fromTo(
            section.querySelector('div'),
            { y: '50%', duration: 0, autoAlpha: 0},
            { y: 0, autoAlpha: 1, duration: 1, ease: spanBezier2, delay: 0.1},
        );
    });

    const spanBezier3 = 'power4.inOut';
    const spanEntries3 = document.querySelectorAll('[data-span-entry3]');
    spanEntries3.forEach(section => {
        gsap.set(section, { overflow: 'hidden' });
        section.innerHTML = `
           <div>
             ${section.innerHTML}
           </div>
         `;
        const tl = gsap.timeline({
            paused: true,
            scrollTrigger: {
                triggerHook: 1,
                trigger: section,
                scroller: '.page__inner',
                start: '0% bottom',
                end: '100% bottom',
                once: true,
            },
        });
        tl.fromTo(
            section.querySelector('div'),
            { y: '50%', duration: 0, autoAlpha: 0},
            { y: 0, autoAlpha: 1, duration: 1, ease: spanBezier3, delay: 0.2},
        );
    });

    const spanBezier4 = 'power4.inOut';
    const spanEntries4 = document.querySelectorAll('[data-span-entry4]');
    spanEntries4.forEach(section => {
        gsap.set(section, { overflow: 'hidden' });
        section.innerHTML = `
           <div>
             ${section.innerHTML}
           </div>
         `;
        const tl = gsap.timeline({
            paused: true,
            scrollTrigger: {
                triggerHook: 1,
                trigger: section,
                scroller: '.page__inner',
                start: '0% bottom',
                end: '100% bottom',
                once: true,
            },
        });
        tl.fromTo(
            section.querySelector('div'),
            { y: '50%', duration: 0, autoAlpha: 0},
            { y: 0, autoAlpha: 1, duration: 1, ease: spanBezier4, delay: 0.3},
        );
    });
});



