  
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
  var email;

 var userPage = [
    "<!--User's previous locations-->" +
    '<div class = "row">' +
    '<div class = "col-md-12">' +
    '<div class="panel panel-primary">' +
    '<!--Previous location info will be pushed here -->' +
    '<div class = "row push">' +
    '<div class = "col-md-4"></div>' +
    '<div class = "col-md-4">' +
    '<div class="panel-heading">' +
    '<div class="form-group has-feedback">' +
    '<input type="text" id = "new-location" class="form-control" placeholder="New Location" />' +
    '<i class="glyphicon glyphicon-search form-control-feedback"></i>' +
    '</div>' +
    '<!--<textarea class = "textarea address"></textarea>-->' +
    '</div>' +
              
    '</div>' + 
    '<div class = "col-md-4"></div>' +
    '</div>' +
    '<div class="panel-heading locations">' +
    '<h4>Your Locations</h4>' +
    '</div>' +
    '<!--table goes here-->' +
    '<table class="table">' +
    '<tbody id = "new-data">' +
    '<tr>' +
    '<td id="eName">Test</td>' +
    '</tr>' +
    '</tbody>' +
    '</table>' +
    '</div>' +
    '</div>' +
    '</div>'  ];

window.onload = function() {
  database.ref("/users").once('value', function(snapshot){
    var PPEmail = localStorage.getItem("ParkPlaceEmail");
    if (PPEmail) {
        $(".eMail-logIn").html(PPEmail);
        var userRef = snapshot.child(PPEmail);
        var pword = userRef.child('password');
        $(".password-logIn").html(pword.val());
        console.log(pword.val());
        console.log($(".password-logIn").text());
                    console.log('here');

        $(".logIn").click();      
    };
  });
};

  $(".password-logIn").keyup(function(event){
    if(event.keyCode == 13){
      console.log('clicked');
        $(".logIn").click();
    }
  });

  $(".password-registration").keyup(function(event){
    if(event.keyCode == 13){
        $(".addData").click();
    }
  });
  $(".confirm-password").keyup(function(event){
    if(event.keyCode == 13){
        $(".addData").click();
    }
  });

  $(".logIn").on("click", function() {
      database.ref("/users").once('value', function(snapshot){
        event.preventDefault();
        var emailInput = $(".eMail-logIn").text().trim();
        var password = $(".password-logIn").text().trim();
        var emailArray = emailInput.split("");
        for (var i = 0 ; i < emailArray.length ; i++ ) {
          if (emailArray[i] === "."){
              emailArray.splice(i, 1, "B");
          }
        }
        var email = emailArray.join("");
          var userRef = snapshot.child(email);
          var pword = userRef.child('password');
         if (userRef.exists() && password === pword.val()) {  
            $(".container").html(userPage);
            localStorage.setItem("ParkPlaceEmail", email);
            var query = firebase.database().ref("/users/" + email + "/locations").orderByKey();
            query.once("value")
              .then(function(snap) {
                snap.forEach(function(childSnap) {
                  var newTableRow = $('<tr>')  
                  var newTableCell = $('<td>').text(childSnap.val().location).appendTo(newTableRow); 
                  newTableRow.appendTo($('#new-data'));
                });
              });              
          }
          else {
            $(".logIn-error").html("Oops...password and/or email does not match. Please enter your email/password again.")
          } 
    });
  });

  $(".addData").on("click", function() {
      event.preventDefault();
      var name = $(".name").val().trim();
      var emailInput = $(".eMail").val().trim();
      var password = $(".password-registration").val().trim();      
      var confirmPassword = $(".confirm-password").val().trim();
      if (password.length < 6) {
          $(".new-email").html("Password must be at least six characters.")
          return;
      }
      
      if (password === confirmPassword) {
        database.ref("/users").once('value', function(snapshot){
          if (snapshot.child(email).exists()){
            $(".new-email").html("Email address already exists.");
            return;
          } else {
            database.ref("/users/" + email).set({
                name: name,
                email: emailInput,
                password: password,
            });
            $(".container").html(userPage);
          }
        });

      } 
      else {
          $(".new-email").html("Oops...passwords do not match. Please re-enter your passwords.")
      }
    
   }); 

  $("body").on( "keyup", "#new-location", function (event){
    event.preventDefault();
    if(event.keyCode == 13){
      var location = $("#new-location").val().trim();
      var currentDate = firebase.database.ServerValue.TIMESTAMP;
      database.ref("/users/" + email + "/locations").push({
        location: location,
        currentDate: currentDate,
      });
    };
  });

  
  
 
  /*$(".logIn").on("click", function() {
        event.preventDefault();
        $(".eMail-logIn").val("bob@thing.com")
        $(".password-logIn").val("hello");
        var email = $(".eMail-logIn").val().trim();
        var passwordLogIn = $(".password-logIn").val().trim();

    database.ref("/users").once('value', function(snapshot){
        if (snapshot.child(passwordLogIn).exists() || email === snapshot.child(passwordLogIn).email) {        
            $(".container").html(""); 
            var user = snapshot.child(passwordLogIn);
            var newRow = $('<div class = "row">');
            var jumbotron = $('<div class = "jumbotron">').appendTo(newRow);
            var newColumnLeft = $('<div class = "col-md-4">').appendTo(newRow);
            var newColumnMiddle = $('<div class = "col-md-4">').appendTo(newRow);
//When I try to append a jumbotron here. It works.
            var newPanelDiv = $('<div class = "panel panel-primary>').appendTo(newColumnMiddle);
//When I try it here, the screen goes blank. Can't seem to append anything to the panel.             
            var headingDiv = $('<div class = "panel-heading>').appendTo(newPanelDiv);
            var h4 = $('<h4>').text(user.val().name).appendTo(headingDiv);
            var newTable = $('<table class = "table">').appendTo(newPanelDiv);
            var newTableHead = $('<thead>').appendTo(newTable);
            var newHeaderRow = $('<tr>').appendTo(newTableHead); 
            var newHeaderCell = $('<th>').text("Your Locations").appendTo(newHeaderRow);
            var newTableBody = $('<tbody>').appendTo(newTable);
            var query = firebase.database().ref("/users/" + passwordLogIn + "/locations").orderByKey();
            query.once("value")
                .then(function(snap) {
                  snap.forEach(function(childSnap) {
                    var newTableRow = $('<tr>').text(childSnap.val().location).appendTo(newColumnMiddle); 
                  });
                });
            var newColumnRight = $('<div class = "col-md-4">').appendTo(newRow);
            newRow.appendTo($('.container'));
          } 

          else {
            $(".logIn-error").html("Oops...password and/or email does not match. Please enter your email/password again.")
        }
    }); 
  }); */

  /*var query = firebase.database().ref("/users").orderByKey();
            var emailsChecked = 0;
            query.once("value")
              .then(function(snap) {
                snap.forEach(function(childSnap) {
                  if (childSnap.val().email === email) {
                    $(".new-email").html("Email address already exists.");
                    return;
                  } else if (childSnap.val().email !== email) {
                    emailsChecked++;
                    console.log('hi');
                    if (emailsChecked === snapshot.numChildren()) {
                      database.ref("/users/" + password).push({
                        name: name,
                        email: email,
                      });

                      location.replace("indexUserPage.html");
                    }
                  }
                });
              }); */