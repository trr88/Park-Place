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
 
 window.onload= function(){
 	
 	signIn.authorize();
	$(".eMail-logIn").keyup(signIn.existUserKey);
	$(".password-logIn").keyup(signIn.existUserKey);
	$(".password-registration").keyup(signIn.newUserKey);

	$(".confirm-password").keyup(signIn.newUser); 	
 };



var signIn = {

	existingUser: function () {
        event.preventDefault();
        var emailInput = $(".eMail-logIn").val().trim();
        var password = $(".password-logIn").val().trim();
        firebase.auth().signInWithEmailAndPassword(emailInput, password).catch(function(error) {
    		console.log("error signing-in");
    		$(".new-email").html("There was an error signing you in. Re-type your email and/or password and try again.");
			return;
		});
  
	},

	newUser : function () {
	      event.preventDefault();
			var name = $(".name").val().trim();
			var emailInput = $(".eMail").val().trim();
			var password = $(".password-registration").val().trim();      
			var confirmPassword = $(".confirm-password").val().trim();
			var character='';
			var numNumbers = 0;
			var numCaps = 0;
			var numLowerCase = 0;
			var numAmp = 0;
			var numPeriods = 0;
			var i=0;

			while (i <= emailInput.length){
		    	character = emailInput.charAt(i);
		    	console.log(character);
		        	if (character === "@") {
		            numAmp++
		        	}

		        	if (character === ".") {
		            numPeriods++;
		        	}
		    	i++;
			}
			i=0;
			while (i <= password.length){
		    	character = password.charAt(i);
		    	console.log(character);
		    	if (!isNaN(character * 1)){
		        	numNumbers++;

		    	}else{

		        	if (character === character.toUpperCase()) {
		            numCaps++;
		        	}

		        	if (character === character.toLowerCase()){
		            numLowerCase++;
		        	}
		    	}
		    	
		    	i++;
			}
			console.log(numAmp);
			console.log(numPeriods);


				if (numAmp === 0 || numPeriods === 0) {
			          $(".new-email").html("Invalid e-mail address.")
			          return;
			    }

			    else if (password.length < 6 || numCaps === 0 || numLowerCase === 0 || numNumbers === 0 ) {
			          $(".new-email").html("Password must be at least six characters and must contain at least one lower case letter, one upper case letter, and one number.")
			          return;
			    }
			    
			    else if (password !== confirmPassword) {
			      	$(".new-email").html("Passwords do not match.")
			      	return;
			    } 
			    
			    else {
			    	firebase.auth().createUserWithEmailAndPassword(emailInput, password).catch(function(error) {
			    		console.log("error signing-in");
			    		$(".new-email").html("There was an error signing you in.");

					});
					var user = firebase.auth().currentUser;
					user.updateProfile({
					  displayName:name,
					}).then(function() {
				      	window.location.replace("indexUserPage.html");
					}, function(error) {
					});
				}

	},

	authorize : function() {
		firebase.auth().onAuthStateChanged(function(user) {
			  if (user) {
			    window.location.replace("indexUserPage.html"); 
			  } else {
			      $(".new-email").html("There was an error signing you in.");
			  		return;
			  }
		});		
	},

	existUserKey : function () {
	    if(event.keyCode == 13){
	        signIn.existingUser();
	    }		
	},

	newUserKey : function () {
		if(event.keyCode == 13){
	        signIn.newUser();
	    }		
	},
}

$(".logIn").on("click", function() {

    });

  $(".addData").on("click", function() {

    });	