// google maps api

// Initialize Firebase
// Brians Firebase DB
var config = {
  apiKey: "AIzaSyAst2LMBiU-oQ7YPuGZK4MEYi0gwOTB4Ag",
  authDomain: "parking-app-170123.firebaseapp.com",
  databaseURL: "https://parking-app-170123.firebaseio.com",
  projectId: "parking-app-170123",
  storageBucket: "parking-app-170123.appspot.com",
  messagingSenderId: "137520573980"
};

firebase.initializeApp(config);

var database = firebase.database();

var map;

// function to add markers to the map
function addMarkerToMap(lat, long, infoWindowHtml){
  
  var infowindow = new google.maps.InfoWindow({
    content: infoWindowHtml,
    maxWidth: 400
  }); 
  var myLatLng = new google.maps.LatLng(lat, long); 
  var marker = new google.maps.Marker({ 
    position: myLatLng,
    icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
    map: map, 
    animation: google.maps.Animation.DROP, 
    })
  
  marker.addListener('click', function(){
    infowindow.open(map, marker); 
  })
      
}

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 15,
    center: new google.maps.LatLng(41.4995344,-81.6944326),
    mapTypeId: 'roadmap'
  });
  
  var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
    var icons = {
      parking: {
        icon: iconBase + 'parking_lot_maps.png'
      },
      library: {
        icon: iconBase + 'library_maps.png'
      },
      info: {
        icon: iconBase + 'info-i_maps.png'
      }
    };
  
  var features = [
    {
      // your current location
      position: new google.maps.LatLng(),
      type: 'info'
    },
//    {
//      // Lot 8 across the street
//      position: new google.maps.LatLng(41.5035047,-81.6050436),
//      type: 'parking'
//    }
  ]
  
  features.forEach(function(feature) {
    var marker = new google.maps.Marker({
      position: feature.position,
      icon: icons[feature.type].icon,
      map: map
    });
    console.log(marker);
    console.log(features.position);
  });
}

// function to initialize map based on current location
navigator.geolocation.getCurrentPosition(function(position) {
  
  var location = new google.maps.LatLng(position.coords.latitude,position.coords.longitude)
  
  map.panTo(location);
   
});

// update map with all posts from Firebase
database.ref('Posts').on('child_added', function(snap){

// each child/post in database
var currentPost = snap.val();
  console.log(currentPost);
  
// content for each Info Window
var contentString = 
    '<div><h2>Parking Available</h2><p class="lead">'
    + currentPost.comment +'</p>'
    + '<p>Posted by '+currentPost.postedBy+' at '+currentPost.timestamp+'</p> <p><strong>Price: </strong>'
    + currentPost.price +' <strong>Spots Available:</strong> '
    + currentPost.spotsLeft +'</p></div>';

//Add each loaction to the map along with markers
addMarkerToMap(currentPost.location[0],currentPost.location[1],contentString);

})
  




