function downButtonMobHandler() {
  $(".button-bottom").on("click", function () {
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
}

const isMob = window.matchMedia('(max-width: 575px)').matches;
function downButtonHandlerWithLocoScroll() {
  document.querySelector('.button-bottom').addEventListener('click', () => {
    locoScroll.scrollTo(document.querySelector('#bottom'), {
      offset: -100
    })
  })
}
isMob && downButtonMobHandler();
!isMob && downButtonHandlerWithLocoScroll();


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
    /* Content excerpted, show below */
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

  var baseFolder = './assets/images/markers/';
  const defaultMarkerSize = new google.maps.Size(40, 50);
  const buildLogoSize = new google.maps.Size(70, 87);
  const markersAdresses = {
    main: `${baseFolder}marker-main.svg`,
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
    icon: { url: markersAdresses.main, scaledSize: buildLogoSize },
  }];
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
}

