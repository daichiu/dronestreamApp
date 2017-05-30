/**
 * Created by h205p2 on 5/19/17.
 */

/*$(document).ready(function() {
 $.ajax({
 url: ["https://maps.googleapis.com/maps/api/js?key=AIzaSyAFtlrU91318DZ8cBgzgxlo4G4RhCG_6xY&callback=myMap"],
 type: 'GET',
 crossDomain: true,
 dataType: 'jsonp',
 success: function(result) {
 console.log(result)
 },
 error: function() {
 alert('Failed!');
 }
 });
 })*/

//default map, Berkeley
function myMap() {
    var mapProp = {
        center:new google.maps.LatLng(37.8716, -122.2727),
        zoom: 15,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

//take address from HTML textbox and center map and place marker at that location
function getMapAddress() {
    var geocoder = new google.maps.Geocoder();
    var address = document.getElementById("address").value;
    geocoder.geocode({"address": address},function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                console.log(results);

                var resultsMap = {
                    center: new google.maps.LatLng(0,0),
                    zoom: 15,
                };

                var map = new google.maps.Map(document.getElementById("googleMap"), resultsMap);
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                        map: map,
                        position: results[0].geometry.location,
                    }
                )
            }
        }
    );
}
