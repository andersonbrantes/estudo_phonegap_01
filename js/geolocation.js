var map;

function showCurrentPosition() {
  console.log('call showCurrentPosition');

  // try html5 geolocation
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(geolocationSuccess, handleNoGeolocation, { timeout: 3000,
      enableHighAccuracy: true, maximumAge: 75000 });
  }
}

function geolocationSuccess(p) {
  $('#Latitude').text("Latitude: " + p.coords.latitude);
  $('#Longitude').text("Longitude: " + p.coords.longitude);

  var pos = new google.maps.LatLng(p.coords.latitude, p.coords.longitude);

  var mapOptions = {
    center: pos,
    zoom: 13,
    mapType: google.maps.MapTypeId.ROADMAP
  };

  map = new google.maps.Map($('#geomap')[0], mapOptions);

  var marker = new google.maps.Marker({
    position: pos,
    title: "Sua posição"
  });

  marker.setMap(map);
  map.setCenter(pos);
}

function handleNoGeolocation(errorflag) {
  if(errorflag) {
    var content = "Erro, a geolocalização falhou";
  } else {
    var content = "Erro, o seu navegador nçao suporta a geolocalização";
  }

  console.log('Error, ' + errorflag.message);

  var options = {
    map: map,
    position: new google.maps.LatLng(60, 105),
    content: content
  }

  var infowindow = new google.maps.InfoWindow(options);
  map.setCenter(options.position);
}