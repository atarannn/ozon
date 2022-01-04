// Google map start
function func() {
    const script = document.createElement('script');
    let key = '';
    if (window.location.href.match(/localhost/)) key = 'AIzaSyD9nfM9ITx5m84p5GxlRoXa24A6jBOFe3U';
    // const key = '';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`;
    document.getElementsByTagName('head')[0].appendChild(script);
}

const maps = document.querySelectorAll('.map');
const options = {
    rootMargin: '0px',
    threshold: 0.1,
};

maps.forEach((image) => {
    const callback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const lazyImage = entry.target;
                lazyImage.src = lazyImage.dataset.src;
                observer.unobserve(image);
                func();
            }
        });
    };
    const observer = new IntersectionObserver(callback, options);
    const target = image;
    observer.observe(target);
});

function setMap() {
    const gmarkers1 = [];
    // const { points, main: center } = data;
    const center = {
        lat: 50.4117039,
        lng: 30.5506373,
    };

    /** Массив, куда записываются выбраные категории */
    const choosedCategories = new Set();
    choosedCategories.add('main');
    /** Елементы, при клике на который будет происходить фильтрация */
        // const filterItems = document.querySelectorAll('[data-marker]');
    const map = new google.maps.Map(document.getElementById('map'), {
            zoom: 17,
            center,
            scrollwheel: false,
            navigationControl: false,
            mapTypeControl: false,
            scaleControl: false,
            draggable: true,
            language: 'en',
            // center: { lat: -33, lng: 151 },
            disableDefaultUI: true,
            styles: [
                {
                    "featureType": "administrative",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "saturation": -10
                        },
                        {
                            "lightness": 30
                        }
                    ]
                },
                {
                    "featureType": "landscape.man_made",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        },
                        {
                            "saturation": -60
                        },
                        {
                            "lightness": 10
                        }
                    ]
                },
                {
                    "featureType": "landscape.natural",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        },
                        {
                            "saturation": -60
                        },
                        {
                            "lightness": 60
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        },
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 60
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        },
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 60
                        }
                    ]
                }
            ]
        });
    // const filterMarkers = function filterMarkers(category, categoriesArray) {
    //   gmarkers1.forEach((el) => {
    //     if (categoriesArray.has(el.category)) {
    //       el.setMap(map);
    //       el.setAnimation(google.maps.Animation.DROP);
    //     } else {
    //       el.setMap(null);
    //     }
    //   });
    // };
    // filterItems.forEach((item) => {
    //   item.addEventListener('click', () => {
    //     item.classList.toggle('active');
    //     if (item.classList.contains('active')) {
    //       choosedCategories.add(item.dataset.category);
    //     } else {
    //       choosedCategories.delete(item.dataset.category);
    //     }
    //     filterMarkers('main', choosedCategories);
    //   });
    // });

    var baseFolder = './assets/images/markers/';
    const defaultMarkerSize = new google.maps.Size(40, 49);
    const buildLogoSize = new google.maps.Size(54, 66);
    const markersAdresses = {
        main: `${baseFolder}marker-main.svg`,
        park: `${baseFolder}marker-park.svg`,
        metro: `${baseFolder}marker-metro.svg`,
        pool: `${baseFolder}marker-pool.svg`,
        monument: `${baseFolder}marker-monument.svg`,
    };
    const markerPopupStyle = `
       style="
       background: transparent;
       padding: 5px 10px;
       font-family: "Helvetica Neue",sans-serif;
       font-weight: 300;
       font-size: 14px;
       line-height: 100%;
       color: #4D4D4C;"
      `;
     const points = [{
         content: `<div ${markerPopupStyle}>вулиця Вільшанська, 2-6</div>`,
         position: { lat: 50.4117039, lng: 30.5506373 },
         type: 'main',
         icon: { url: markersAdresses.main, scaledSize: buildLogoSize }
       }, {
         content: `<div ${markerPopupStyle}>Національний Ботанічний сад ім. Гришко</div>`,
         position: { lat: 50.41093, lng: 30.548896 },
         type: 'park',
         icon: { url: markersAdresses.park, scaledSize: defaultMarkerSize }
       }, {
         content: `<div ${markerPopupStyle}>Metro</div>`,
         position: { lat: 50.412498, lng: 30.548456 },
         type: 'metro',
         icon: { url: markersAdresses.metro, scaledSize: defaultMarkerSize }
        }, {
         content: `<div ${markerPopupStyle}>Pool</div>`,
         position: { lat: 50.410878, lng: 30.552630 },
         type: 'pool',
         icon: { url: markersAdresses.pool, scaledSize: defaultMarkerSize }
        }, {
         content: `<div ${markerPopupStyle}>Monument</div>`,
         position: { lat: 50.412382, lng: 30.553199},
         type: 'monument',
         icon: { url: markersAdresses.monument, scaledSize: defaultMarkerSize }
        },
     ];
    const infowindow = new google.maps.InfoWindow({
        content: '',
        maxWidth: 400,
    });
    points.forEach((marker) => {
        const category = marker.type;
        const mapMarker = new google.maps.Marker({
            map,
            category,
            icon: marker.icon,
            position: new google.maps.LatLng(marker.position.lat, marker.position.lng),
        });

        google.maps.event.addListener(mapMarker, 'click', function () {
            infowindow.setContent(marker.content);
            infowindow.open(map, mapMarker);
            map.panTo(this.getPosition());
        });
        mapMarker.name = marker.type;
        gmarkers1.push(mapMarker);
    });
}

function initMap() {
    setMap();
    // $.ajax({
    //   method: 'GET',
    //   url: 'url',
    //   data: 'action=infrastructure',
    // }).done((data) => {
    //   setMap(JSON.parse(data));
    // });
}

// function helperMapInit() {
// const helperMap = $('[data-helper-map]');
// const map = $('#map');
// $('.page__inner').before(helperMap);
// function throttle(f, t) {
//   let previousCall;
//   return (args) => {
//     const lastCall = Date.now();
//     if (previousCall === undefined // function is being called for the first time
//       || (lastCall - previousCall) > t) { // throttle time has elapsed
//       previousCall = lastCall;
//       f(args);
//     }
//   };
// }
// const throttleLogger = throttle(() => {
//   const heightWrap = window.innerHeight;
//   const mapTop = map.offset().top;
//   if (mapTop - heightWrap <= 0) {
//     helperMap[0].style.visibility = 'hidden';
//   } else {
//     helperMap[0].style.visibility = 'visible';
//   }
// }, 400);
// locoScroll.on('scroll', (event) => {
//   throttleLogger(event);
// });

// helperMap.on('click', () => {
//   locoScroll.scrollTo(map[0]);
// });
// }

window.addEventListener('load', () => {
    // helperMapInit();
    /** Выдвижная панель маркеров на мобильной версии */
    // const legend = document.querySelector('[data-mob-accordeon]');
    // const legendTitle = legend.querySelector('.map__legend-title');
    // legendTitle.addEventListener('click', () => {
    //   legend.classList.toggle('opened');
    //   // добавить плавность появление блока с маркерами
    //   if (legend.classList.contains('opened')) {
    //     gsap.fromTo('.map__legend-markers-wrap', { maxHeight: 0 },
    //       { maxHeight: '50vh' });
    //   } else {
    //     gsap.fromTo('.map__legend-markers-wrap', { maxHeight: '50vh' }, { maxHeight: 0 });
    //   }
    // });
    // legend.addEventListener('mouseenter', () => {
    //   if (locoScroll !== undefined) locoScroll.stop();
    // });
    // legend.addEventListener('mouseleave', () => {
    //   if (locoScroll !== undefined) locoScroll.start();
    // });
});
