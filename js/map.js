var map;
var service;
var infowindow;

function initialize() {
  var pyrmont = new google.maps.LatLng(34.0704,118.4469);

  map = new google.maps.Map(document.getElementById('mychill-where'), {
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: '2500',
    type: 'food'
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function initMap() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('mychill-where'), {
    center: {lat: -34.397, lng: 150.644},
    scrollwheel: false,
    zoom: 8
  });
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    var i = Math.random() * results.length;
      var place = results[i];
      createMarker(results[i]);
  }
}