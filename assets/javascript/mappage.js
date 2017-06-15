 /*var config = {
    apiKey: "AIzaSyDWDRxPYpZijnzqD2U5xSJaSwn69Ki-sfg",
    authDomain: "park-place-ca2a7.firebaseapp.com",
    databaseURL: "https://park-place-ca2a7.firebaseio.com",
    projectId: "park-place-ca2a7",
    storageBucket: "park-place-ca2a7.appspot.com",
    messagingSenderId: "29054600010"
  };
  firebase.initializeApp(config);

  var database = firebase.database(); */

window.onload = function(){
	database.ref("/users").once('value', mapApp.onloadFillIn);
	mapApp.initialize();
	$(".park-now").on("click", mapApp.parkNow);
  	//$(document).on("click", ".modal-submit", mapApp.report);
  	$(document).on("click", ".modal-cancel", mapApp.closeModal);
	$(".report-space").on("click", mapApp.reportSpace);
	$(".close").on("click", mapApp.closeModal)

}


var mapApp = {

	parkNow : function () {
		  var user = firebase.auth().currentUser;
		  var uid = user.uid;
		  database.ref("/users/" + uid).update({
		     parkNow: true,
		  });
		  map.onloadFillIn();		
	},

	search : function() {
		  event.preventDefault();
		  console.log("search");
		  var newLoc = $("#new-search").val().trim();
		  var user = firebase.auth().currentUser;
		  var uid = user.uid;

		if (newLoc === "") {
		    console.log('blocked')
		    return;
		} 
		else {	
			mapApp.codeAddress();
		}
	},

	onloadFillIn : function() {
		var user = firebase.auth().currentUser;
			console.log(firebase.auth().currentUser);
		var uid = user.uid;
				console.log(uid);
		var query = database.ref("/users/" + uid);
		        query.once("value")
		            .then(function(snap) {
		            	var fillIn = snap.val().newSearch;
		            	var parkNow = snap.val().parkNow;
		            	var reportSpace = snap.val().reportSpace;
		            	if (parkNow) {
		            		database.ref("/users/" + uid).update({
		            			parkNow: false,
		            		})
		            		mapApp.getLocation();
		            	}
		            	else if (reportSpace) {
		            		mapApp.getLocation()
		        		}
		        		else {
							$("#new-search").val(fillIn);
							mapApp.search()	
							database.ref("/users/" + uid + "/newSearch").set({});	        			
		        		}
		        	});

	},

	getLocation : function () {
		      if (navigator.geolocation) {
		          navigator.geolocation.getCurrentPosition(getParkingData);
		          console.log("worked");
		      } else {
		          coordinateReport.innerHTML = "Geolocation is not supported by this browser.";
		      }
	},

	getParkingData : function(position) {
			var map;
			var lat = position.coords.latitude;
			var lng = position.coords.longitude;
			var latLng = new google.maps.LatLng(lat, lng);
			var marker = new google.maps.Marker({
					position: latLng,
					map: map
				});
			//might not give me the map.
			if (reportSpace) {
				mapApp.reportSpace();
			}
			else {
				mapApp.initMap();
				mapApp.eqfeed_callback();
			}
	},

	initMap : function () {
			console.log("init ran")
			map = new google.maps.Map(document.getElementById('map'), {
			  zoom: 16,
			  center: {lat: lat, lng: lng},
			  mapTypeId: 'terrain'
			});
	},

    eqfeed_callback : function(results) {
		    var query = database.ref("/parkingLocations").orderByKey();
		        query.once("value")
		            .then(function(snap) {
		              snap.forEach(function(childSnap) {
		                    var lat = childSnap.val().lat;
		                    var lng = childSnap.val().lng; 
		                    var latLng = new google.maps.LatLng(lat, lng);
							var marker = new google.maps.Marker({
								position: latLng,
								map: map
							});	
							console.log('it worked!')	              
		              	});
		            }); 	
    },

	initialize : function () {
		    geocoder = new google.maps.Geocoder();
		    var latlng = new google.maps.LatLng(-34.397, 150.644);
		    var mapOptions = {
		      zoom: 32,
		      center: latlng
		    }
		    map = new google.maps.Map(document.getElementById('map'), mapOptions);
  	},

	codeAddress : function () {
			var address = $('#new-search').val();
			geocoder.geocode( { 'address': address}, function(results, status) {
			  if (status == 'OK') {
			    map.setCenter(results[0].geometry.location);
			    var marker = new google.maps.Marker({
			        map: map,
			        position: results[0].geometry.location
			    });
			    var query = database.ref("/parkingLocations").orderByKey();
			        query.once("value")
			            .then(function(snap) {
			              snap.forEach(function(childSnap) {
			                    var lat = childSnap.val().lat;
			                    var lng = childSnap.val().lng; 
			                    var latLng = new google.maps.LatLng(lat, lng);
								var marker = new google.maps.Marker({
									position: latLng,
									map: map
								});	
								console.log('it worked!')	              
			              	});
			            }); 
			  } else {
			    alert('Geocode was not successful for the following reason: ' + status);
			  }
			});
	},

	reportSpaceClick : function () {
      database.ref("/parkingLocations").push({
          lat: lat,
          lng: lng,
      });	
      setTimeOut(mapApp.closeModal, 1500);
      $('.modal').style.display = "block";
      $('.modal-content').text("Thank you for reporting a space!");     
  	},

  	reportSpaceInput : function () {
  		$('.modal').style.display = "block";
  		var label =  $('<label>').text("Post Space");
  			label.appendTo($('.modal-content'));
  		var newInput = $('<input type="text" class="form-control report-address" id = "report-address" placeholder="New search" />');
		  	newInput.appendTo($('.modal-content'));
		var newIcon = $('<i class="glyphicon glyphicon-map-marker form-control-feedback">'); 
           	newIcon.appendTo(newInput);
        var newSubmitButton = $('<button class= "modal-submit">').text("Post");
        	newSubmitButton.appendTo($('.modal-content'));
        var cancelButton = $('<button class= "modal-cancel">').text("Cancel");
        	cancelButton.appendTo($('.modal-content'));

  	},

  	reportSpaceFinish : function() {

  	},


  	flagSpace : function() {
      	setTimeOut(mapApp.closeModal, 1500);
  		$('.modal').style.display = "block";
      	$('.modal-content').text("Thank you for flagging this post!");

  	},

  	closeModal : function() {
  		$('modal').style.display = "none";
  	}
}