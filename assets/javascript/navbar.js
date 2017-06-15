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

  $("#new-search").keyup(function(event){
      if(event.keyCode == 13){
          submit();
      };      
  });

  $("#new-search").on("click", function(event){
        submit();
  });

  $(".park-now").on("click", function(event){
      var user = firebase.auth().currentUser;
      var uid = user.uid;
      database.ref("/users/" + uid).update({
          parkNow: true,
      }).then(function(subEvent){
          window.location.assign("geocoding.html");
      });
  });

  $(".post-now").on("click", function(event){
      getLocation();
  });

   var submit = function() {
      event.preventDefault();
      var newLoc = $("#new-search").val().trim();
      var user = firebase.auth().currentUser;
      var uid = user.uid;
      if (newLoc === "") {
        console.log('blocked')
        return;
      } else {

         database.ref("/users/" + uid).update({
              newSearch: newLoc,
          });
         window.location.assign("geocoding.html");
      };
  }

  function postLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(postPosition);
          console.log("worked");
      } else {
          coordinateReport.innerHTML = "Geolocation is not supported by this browser.";
      }
  };

  function postPosition(position) {
      var lat = position.coords.latitude; 
      var lng = position.coords.longitude; 
      database.ref("/parkingLocations").push({
          lat: lat,
          lng: lng,
      });
      
  };



  