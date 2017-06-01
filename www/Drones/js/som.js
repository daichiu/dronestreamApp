/**
 * Created by h205p2 on 5/24/17.
 */

var somalia = [];
var coordinates = [];

$(document).ready(function(){
    $.ajax({
        url: 'http://api.dronestre.am/data',
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (result) {
            console.log(result);
            som(result);
            myMap(result);
        },
        error: function () {
            alert('Failed!');
        }
    });
});

function som(result){
    for(var i = 0; i<result.strike.length; i++){
        if(result.strike[i].country==="Somalia"){
            somalia.push(result.strike[i])
        }
    }
}

console.log(somalia);
console.log("Somalia Strikes");

//drone api returns a string, but google api must take number, so must parse
function latLng(lat, lng) {
    this.lat = parseFloat(lat);
    this.lng = parseFloat(lng);
}


function myMap(result) {
    var mapProp = {
        //lat and long of somalia
        center:new google.maps.LatLng(5.1521, 46.1996),
        zoom: 5,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    //get all the lat and lon coordinates into coordinates array
    for (var i = 0; i < somalia.length; i++) {
        var location = new latLng(somalia[i].lat, somalia[i].lon);
        //console.log(location);
        coordinates.push(location);
    }
    var markers = coordinates.map(function(location) {
        return new google.maps.Marker({
            map: map,
            position: location
        });
    });
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: "../clusters_images/marker"});
    //console.log("hi");

}

//console.log(coordinates);
//console.log("coordinates array");
