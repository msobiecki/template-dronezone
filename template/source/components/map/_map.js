var googleMap = (function () {
  var _zoom, _location, _marker, _markers, _mapCenterPosition;

  var _mapStyle = [{
    "featureType": "administrative",
    "elementType": "all",
    "stylers": [{"saturation": "-100"}]
  }, {
    "featureType": "administrative.province",
    "elementType": "all",
    "stylers": [{"visibility": "off"}]
  }, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{"saturation": -100}, {"lightness": 65}, {"visibility": "on"}]
  }, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{"saturation": -100}, {"lightness": "50"}, {"visibility": "simplified"}]
  }, {"featureType": "road", "elementType": "all", "stylers": [{"saturation": "-100"}]}, {
    "featureType": "road.highway",
    "elementType": "all",
    "stylers": [{"visibility": "simplified"}]
  }, {
    "featureType": "road.arterial",
    "elementType": "all",
    "stylers": [{"lightness": "30"}]
  }, {"featureType": "road.local", "elementType": "all", "stylers": [{"lightness": "40"}]}, {
    "featureType": "transit",
    "elementType": "all",
    "stylers": [{"saturation": -100}, {"visibility": "simplified"}]
  }, {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [{"hue": "#ffff00"}, {"lightness": -25}, {"saturation": -97}]
  }, {"featureType": "water", "elementType": "labels", "stylers": [{"lightness": -25}, {"saturation": -100}]}];

  var map = {
    init: function () {
      this.catchDOM();
      if (isElement(this.$el)) {
        $.when(this.generateMap(this.$el)).then(this.generateMarker())
        this.bindEvent();
      }
    },
    catchDOM: function () {
      this.$el = $('.js-map')
    },
    bindEvent: function () {
      $(window).resize(this.resize.bind(this))
    },
    generateMap: function (container) {
      _location = this.$el.data('location');
      _zoom = this.$el.data('zoom');
      if (_location && _zoom) {
        this.mapObject = new google.maps.Map(container[0], {
          zoom: _zoom,
          center: new google.maps.LatLng(_location.lat, _location.lng),
          scrollwheel: false,
          streetViewControl: false,
          mapTypeControl: false,
          styles: _mapStyle
        });
        _mapCenterPosition = this.mapObject.getCenter();
      }
    },
    generateMarker: function () {
      _markers = this.$el.data('markers');
      $.each(_markers, function (index, element) {
        _marker = new google.maps.Marker({
          position: new google.maps.LatLng(element.lat, element.lng),
          map: map.mapObject,
          title: element.title,
          icon: element.icon
        });
      });
    },
    resize: function () {
      console.log('resize"')
      google.maps.event.trigger(this.mapObject, "resize");
      this.mapObject.setCenter(_mapCenterPosition);
    }
  };


  function isElement(item) {
    return item.length > 0
  }


  map.init();
});