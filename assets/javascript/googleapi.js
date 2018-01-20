var infoWindow;

// Geolocation of where you are located with an infoWindow
function initMap() {
  var myLatLng = { lat: 39.739236, lng: -104.990251 }; //Dynamtic populate their location from firebase
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: myLatLng
  });
  infoWindow = new google.maps.InfoWindow();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent("Here You Are");
        infoWindow.open(map);
        map.setCenter(pos);
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(map);
  }

  //Hard Coding Each Trail within 150 Miles of Denver, CO

  var denverCOTrail1 = new google.maps.Marker({
    position: { lat: 39.7554, lng: -104.8423 },
    map: map,
    title: "Train Name: Sand Creek Tour",
    animation: google.maps.Animation.DROP
    // draggable: false
  });

  var denverCOTrail2 = new google.maps.Marker({
    position: { lat: 39 / 7524, lng: -105.2104 },
    map: map,
    title: "Trail Name: Golden Summit Trail",
    animation: google.maps.Animation.DROP
  });

  var denverCOTrail3 = new google.maps.Marker({
    position: { lat: 39.6903, lng: -105.1524 },
    map: map,
    title: "Trail Name: Green Mountain Tour",
    animation: google.maps.Animation.DROP
  });

  var denverCOTrail4 = new google.maps.Marker({
    position: { lat: 39.8902, lng: -104.9639 },
    map: map,
    title: "Trail Name: Jaycee to Carpenter Park Lakes",
    animation: google.maps.Animation.DROP
  });

  var denverCOTrail5 = new google.maps.Marker({
    position: { lat: 39.7162, lng: -105.2098 },
    map: map,
    title: "Trail Name: Apex-Enchanted Lollipop",
    animation: google.maps.Animation.DROP
  });

  var denverCOTrail6 = new google.maps.Marker({
    position: { lat: 39.7162, lng: -105.2098 },
    map: map,
    title: "Trail Name: Apex Park",
    animation: google.maps.Animation.DROP
  });

  var denverCOTrail7 = new google.maps.Marker({
    position: { lat: 39.7368, lng: -105.2455 },
    map: map,
    title: "Trail Name: Beaver Brook Out and Back",
    animation: google.maps.Animation.DROP
  });

  var denverCOTrail8 = new google.maps.Marker({
    position: { lat: 39.782, lng: -105.2297 },
    map: map,
    title: "Trail Name: North Table Mountain",
    animation: google.maps.Animation.DROP
  });

  var denverCOTrail9 = new google.maps.Marker({
    position: { lat: 39.782, lng: -105.2297 },
    map: map,
    title: "Trail Name: North Loop Trail",
    animation: google.maps.Animation.DROP
  });

  var denverCOTrail10 = new google.maps.Marker({
    position: { lat: 39.6944, lng: -105.2047 },
    map: map,
    title: "Trail Name: Matthews/Winters Red Rocks Loop",
    animation: google.maps.Animation.DROP
  });

  var denverCOTrai11 = new google.maps.Marker({
    position: { lat: 39.7736, lng: -105.2541 },
    map: map,
    title: "Trail Name: Mt. Galbraith Park Loop",
    animation: google.maps.Animation.DROP
  });

  var denverCOTrail12 = new google.maps.Marker({
    position: { lat: 39.6514, lng: -105.1744 },
    map: map,
    title: "Trail Name: Mount Carbon Loop",
    animation: google.maps.Animation.DROP
  });
}

