// google maps api

// Initialize Firebase
// Brians Firebase DB
var config = {
    apiKey: "AIzaSyDWDRxPYpZijnzqD2U5xSJaSwn69Ki-sfg",
    authDomain: "park-place-ca2a7.firebaseapp.com",
    databaseURL: "https://park-place-ca2a7.firebaseio.com",
    projectId: "park-place-ca2a7",
    storageBucket: "park-place-ca2a7.appspot.com",
    messagingSenderId: "29054600010"
  };
  firebase.initializeApp(config);

    var database = firebase.database();  
    var geocoder;
    var map;


window.onload = function(){
   database.ref("/users").once('value', function(snapshot){
          var user = firebase.auth().currentUser;
          var uid = user.uid;
          
      database.ref("/users/" + uid).on('value', function(snap){
          $("#new-location").text(snap.val().newSearch);
          
      }).done(function(response){
        initialize();
        codeAddress();
      });
      
                   
  });
};


  /* database.ref("/users").once('value', function(snapshot){
      var user = firebase.auth().currentUser;
      if (snapshot.child(user.uid).exists()) {
          var uid = user.uid;
          var query = firebase.database().ref("/users/" + uid + "/locations").orderByKey();
          query.once("value")
              .then(function(snap) {
                snap.forEach(function(childSnap) {
                      var newTableRow = $('<tr>')  
                      var newTableCell = $('<td class = "go-to-location">').text(childSnap.val().location).appendTo(newTableRow); 
                      newTableRow.appendTo($('#new-data'));
                });
              });

         database.ref("/users/" + uid + "/locations").on('child_added', function(snapshot){
            var newTableRow = $('<tr>')  
            var newTableCell = $('<td class = "go-to-location">').text(snapshot.val().location).appendTo(newTableRow); 
            newTableRow.appendTo($('#new-data'));
          });
      }           
    }); */

  /*$("#new-location").keyup(function(event){
    event.preventDefault();
    if(event.keyCode == 13){
      var location = $("#new-location").val().trim();
      var user = firebase.auth().currentUser;
      var uid = user.uid;

     database.ref("/users/" + uid + "/searches").push({
          location: location,
      });
      window.location.assign("geocoding.html");
      initialize();
      codeAddress();     
    }
  });

 $(document).on("click", ".go-to-location", function(event){
      window.location.assign("geocoding.html");
 });*/

  function initialize() {

    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
      zoom: 8,
      center: latlng
    }
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  }

  function codeAddress() {
    var address = document.getElementById('new-location').value;
    console.log(address);
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
  }

  $(".new-location").on("click", function(event){
      submit();
  });

  var submit = function() {
      event.preventDefault();
      console.log("pressed");
      var newLoc = $("#new-location").val();
      var location = newLoc.trim();
      var user = firebase.auth().currentUser;
      var uid = user.uid;
      if (newLoc === "") {
        console.log('blocked')
        return;
      } else {
         database.ref("/users/" + uid).push({
              location: location,
          });
         database.ref("/users/" + uid).update({
              newSearch: location,
          });
         codeAddress();
      };
  }


  $("#new-location").keyup(function(event){
      if(event.keyCode == 13){
          submit();
      };      
  });

  /*function addMarkerToMap(lat, long, htmlMarkupForInfoWindow){
  
  var infowindow = new google.maps.InfoWindow(); 
  var myLatLng = new google.maps.LatLng(lat, long); 
  var marker = new google.maps.Marker({ 
    position: myLatLng,
    icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
    map: map, 
    animation: google.maps.Animation.DROP, 
    })
  
  google.maps.event.addListener(marker, 'click', (function(marker, markerCount) { 
    return function() { infowindow.setContent(htmlMarkupForInfoWindow); infowindow.open(map, marker); }
    })
  )
}*/

 /* $(".park-now").on('click', function(event) {
  });

  $(".report-space").on('click', function(event) {
      window.location.assign("geocoding.html");
      database.ref("/users/" + uid).push({
          location: location,
      });
 
  });*/

//<onclick="codeAddress()">









/* function to add markers to the map
var map;
function addMarkerToMap(lat, long, htmlMarkupForInfoWindow){
  
  var infowindow = new google.maps.InfoWindow(); 
  var myLatLng = new google.maps.LatLng(lat, long); 
  var marker = new google.maps.Marker({ 
    position: myLatLng,
    icon: 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png',
    map: map, 
    animation: google.maps.Animation.DROP, 
    })
  
  google.maps.event.addListener(marker, 'click', (function(marker, markerCount) { 
    return function() { infowindow.setContent(htmlMarkupForInfoWindow); infowindow.open(map, marker); }
    })
  )
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

//Add each loaction to the map along with markers
addMarkerToMap(currentPost.location[0],currentPost.location[1],currentPost.comment);

})
$(".new-location").keyup(function(event){
    if(event.keyCode == 13){
        addMarkerToMap();
    }
});  */  
  



