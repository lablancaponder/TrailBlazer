// Global variables
var map;
var infoWindow;

// Retrieving local storage of Latitude and Longitude and changing the string to an integer using parseFloat
var mapLongitude = parseFloat(localStorage.getItem("longitude"));
var mapLatitude = parseFloat(localStorage.getItem("latitude"));

// Console.log to see the Latitude and Longitude from Local Storage
console.log(mapLatitude);
console.log(mapLongitude);

// Initialize Google Maps and creating a styled map
function initMap() {
  var styledMapType = new google.maps.StyledMapType(
    [
      { elementType: "geometry", stylers: [{ color: "#ebe3cd" }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
      {
        elementType: "labels.text.stroke",
        stylers: [{ color: "#f5f1e6" }]
      },
      {
        featureType: "administrative",
        elementType: "geometry.stroke",
        stylers: [{ color: "#c9b2a6" }]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "geometry.stroke",
        stylers: [{ color: "#dcd2be" }]
      },
      {
        featureType: "administrative.land_parcel",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ae9e90" }]
      },
      {
        featureType: "landscape.natural",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }]
      },
      {
        featureType: "poi",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }]
      },
      {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#93817c" }]
      },
      {
        featureType: "poi.park",
        elementType: "geometry.fill",
        stylers: [{ color: "#a5b076" }]
      },
      {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#447530" }]
      },
      {
        featureType: "road",
        elementType: "geometry",
        stylers: [{ color: "#f5f1e6" }]
      },
      {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#fdfcf8" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#f8c967" }]
      },
      {
        featureType: "road.highway",
        elementType: "geometry.stroke",
        stylers: [{ color: "#e9bc62" }]
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{ color: "#e98d58" }]
      },
      {
        featureType: "road.highway.controlled_access",
        elementType: "geometry.stroke",
        stylers: [{ color: "#db8555" }]
      },
      {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#806b63" }]
      },
      {
        featureType: "transit.line",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }]
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.fill",
        stylers: [{ color: "#8f7d77" }]
      },
      {
        featureType: "transit.line",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#ebe3cd" }]
      },
      {
        featureType: "transit.station",
        elementType: "geometry",
        stylers: [{ color: "#dfd2ae" }]
      },
      {
        featureType: "water",
        elementType: "geometry.fill",
        stylers: [{ color: "#b9d3c2" }]
      },
      {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#92998d" }]
      }
    ],
    { name: "Styled Map" }
  );

  // Options for Maps
  var mapOptions = {
    zoom: 14,
    center: { lat: mapLatitude, lng: mapLongitude },
    mapTypeControlOptions: {
      mapTypeIds: ["roadmap", "satellite", "hybrid", "terrain", "styled_map"]
    }
  };

  // Create a dynamtic map
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  console.log("Map: " + map);

  // Visual Map
  map.mapTypes.set("styled_map", styledMapType);
  map.setMapTypeId("styled_map");

  // InfoWindow
  var contentString =
    '<div class="iw-content>' +
    '<div class="iw-subTtile"><b><h4>Here is your trail</b></h4></div>' +
    "</div>";

  // Creating a variable for infoWindow
  var infoWindow = new google.maps.InfoWindow({
    content: contentString
  });

  // Creating markers for local storage latitude and longitude
  var marker = new google.maps.Marker({
    position: { lat: mapLatitude, lng: mapLongitude },
    map: map,
    animation: google.maps.Animation.DROP
  });
  console.log(marker);

  // Clicking the pin will open up an InfoWindow about the location
  google.maps.event.addListener(marker, "click", function() {

    infoWindow.open(map, marker);
  });

  // An Exit button on the InfoWindow
  google.maps.event.addListener(map, "click", function() {

    infoWindow.close();
  });

  //Google maps event waits for the creation of infoWindow HTML structure 'dom-ready' and before opening the infoWindow defined styles are applied
  google.maps.event.addListener(infoWindow, "domready", function() {
    //Reference the DIV which receives the content of infoWindow
    var iwOuter = $(".gm-style-iw");

    // The DIV needed to be change is above the .gm-style.iw
    var iwBackground = iwOuter.prev();

    // Remove the background shadow DIV
    iwBackground.children(":nth-child(2)").css({ background: "#ffffff" });

    var iwmain = iwBackground.children(":nth-child(2)");

    // Remove the white background DIV
    iwBackground.children(":nth-child(4)").css({ display: "none" });

    var iwCloseBtn = iwOuter.next();
  });
}
