
var database = firebase.database();

window.onload = function() {
    $(".new-location").html("");
    $(".dropdown-toggle").on("click", userPage.createDropdown);
    $(".new-location").on("click", userPage.submit);
    $(".park-now").on("click", userPage.submit);
    //$(".post-now").on("click", userPage.{
    //});,
    $("body").on("keyup","#new-location", userPage.submit);
    $(document).on("click", ".go-to-location", userPage.switchToMap);

}

 database.ref("/users").once('value', function(snapshot){

      var posts = $('<div class="panel-heading events">')
      var postsHeading = $('<h4>').text("Your Events");
          postsHeading.appendTo(posts)

      var user = firebase.auth().currentUser;
      console.log(firebase.auth().currentUser);
          var uid = user.uid;
          console.log(uid);
          var query = firebase.database().ref("/users/" + uid + "/searches").orderByKey();
          query.once("value")
              .then(function(snap) {
                var numEntries = 0;
                snap.forEach(function(childSnap) {
                  if (numEntries > 9) {
                    return;
                  }
                  else {
                      numEntries++;
                      var newTableRow = $('<tr>')  
                      var newTableCell = $('<td class = "go-to-location">').text(childSnap.val().location).appendTo(newTableRow); 
                      newTableRow.appendTo($('#new-data'));
                  }
                });
              });

          var events = $('<div class="panel-heading events">')
          var eventsHeading = $('<h4>').text("Your Events");
              eventsHeading.appendTo(events);
              events.appendTo($('#new-data'));
          var query = firebase.database().ref("/users/" + uid + "/events").orderByKey();
          query.once("value")
              .then(function(snap) {
                var numEntries = 0;
                    snap.forEach(function(childSnap) {
                      if (numEntries > 9) {
                        return;
                      }
                      else {
                          numEntries++;
                          var newTableRow = $('<tr>')  
                          var newTableCell = $('<td class = "go-to-location">').text(childSnap.val().location).appendTo(newTableRow); 
                          newTableRow.appendTo($('#new-data'));
                      }
                    });
              });
          var events = $('<div class="panel-heading events">')
          var eventsHeading = $('<h4>').text("Your Posts");
              eventsHeading.appendTo(events);
              events.appendTo($('#new-data'));
          var query = firebase.database().ref("/users/" + uid +"/posts").orderByKey();
          query.once("value")
              .then(function(snap) {
                var numEntries = 0;
                snap.forEach(function(childSnap) {
                  if (numEntries > 9) {
                    return;
                  }
                  else {
                      numEntries++;
                      var newTableRow = $('<tr>')  
                      var newTableCell = $('<td class = "go-to-coordinates">').text(childSnap.val().location).appendTo(newTableRow); 
                      newTableRow.appendTo($('#new-data'));
                  }
                });
              });
  });  

/*database.ref("/users/" + uid).on('child_added', function(snapshot){
        var newTableRow = $('<tr>')  
        var newTableCell = $('<td class = "go-to-location">').text(snapshot.val().location).appendTo(newTableRow); 
        newTableRow.appendTo($('#new-data'));
      });  */  

var userPage = {

    submit : function() {
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
             database.ref("/users/" + uid).update({
                  newSearch: location,
              });
              userPage.switchToMap();
          }
    },

    keyPressed : function() {
          if(event.keyCode == 13){
              submit();
          };             
    },

    createDropdown: function () {
        $(".dropdown-toggle").dropdown();
    },

    switchToMap: function () {
        window.location.assign("geocoding.html");
    }
    /* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
    
// Close the dropdown menu if the user clicks outside of it

}
 

  