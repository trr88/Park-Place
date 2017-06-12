 window.onload = function() {

     // var options = {
     //     enableHighAccuracy: true,
     //     timeout: 5000,
     //     maximumAge: 0
     // };

     // function success(pos) {
     //     var crd = pos.coords;

     //     console.log('Your current position is:');
     //     console.log(`Latitude : ${crd.latitude}`);
     //     console.log(`Longitude: ${crd.longitude}`);
     //     console.log(`More or less ${crd.accuracy} meters.`);
     //     $("#location").val(crd);
     // };

     // function error(err) {
     //     console.warn(`ERROR(${err.code}): ${err.message}`);
     // };

     // navigator.geolocation.getCurrentPosition(success, error, options);


     function displayEvent() {

         var location = $("#location").val().trim();
         var keyword = $("#keyword").val().trim();
         var event = $("#event").val().trim();

         var oArgs = {

             app_key: "N78vd3fpJCDPZCB7",

             q: event,

             where: location,

             category: keyword,

             page_size: 10,

             sort_order: "popularity",

         };

         EVDB.API.call("/events/search", oArgs, function(oData) {

             // Note: this relies on the custom toString() methods below
             console.log(oData);
             Object.prototype.toString = function() {
                 var s = "{\n";
                 for (var x in this) {
                     s += "\t" + x + ": " + this[x].toString() + "\n";
                 }
                 s += "}";
                 return s;
             }
             var results = oData.events.event;
             for (var i = 0; i < results.length; i++) {
                 var eventDiv = $("<div class = 'eventList panel-body'>");
                 // var thumb = $("<img>")
                 // thumb.attr("src", results[i].image.thumb.url);
                 var title = results[i].title;
                 var time = results[i].start_time;
                 var venue = results[i].venue_name;
                 var address = results[i].venue_address;

                 var titleP = $("<div class = 'row title'>").text("Event: " + title);
                 var venueP = $("<div class = 'row venue'>").text("Venue: " + venue);
                 var addressP = $("<div class = 'row address'>").text("Address: " + title);
                 var timeP = $("<div class = 'row time'>").text("Time: " + time);

                 // eventDiv.append(thumb);
                 eventDiv.append(titleP);
                 eventDiv.append(venueP);
                 eventDiv.append(addressP);
                 eventDiv.append(timeP);

                 $("#eventInfo").append(eventDiv);
             }

         });


     }

     $("#addInfo").on("click", function(event) {
         event.preventDefault();
         displayEvent();
     });
 }
