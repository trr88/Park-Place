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

  $(document).on("click", ".park-now", function() {
      getLocation();
  });

  var coordinateReport = document.getElementById("coords-here");
  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
          console.log("worked")
      } else {
          coordinateReport.innerHTML = "Geolocation is not supported by this browser.";
      }
  };

  function showPosition(position) {
      var lat = position.coords.latitude; 
      var lng = position.coords.longitude; 
      database.ref("/parkingLocations").push({
          lat: lat,
          lng: lng,
      });
      console.log('worked')
  };
