console.log("loaded")
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

  $(".addData").on("click", function() {
      event.preventDefault();
      var location = $(".location").val().trim();
      var comments = $(".comments").val().trim();
      var currentDate = firebase.database.ServerValue.TIMESTAMP;
      database.ref("/users/" + email + "/locations").push({
        location: location,
        })
    });
  
  document.getElementByClass(".new-location").onkeyup = function(){
    if(event.keyCode == 13){
      event.preventDefault();
      var location = $(".location").val().trim();
      var comments = $(".comments").val().trim();
      var currentDate = firebase.database.ServerValue.TIMESTAMP;
      database.ref("/users/" + email + "/locations").push({
        location: location,
        })
    }
  });

  
  