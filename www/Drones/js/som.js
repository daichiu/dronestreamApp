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
    //attach the info text per drone strike
    for (var i = 0; i < markers.length; i++) {
        attachText(markers[i], somalia, i, map);
    }
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: "../clusters_images/marker"});
    //console.log("hi");
}

function attachText(marker, data, num, nameMap) {
    //var string = toString(data[num]);
    //console.log(Object.getOwnPropertyNames(data[num]));
    var string = "";
    string += "Number: "+data[num].number;
    string += "<br>";
    string += data[num].narrative;
    string += "<br>";
    string += "Date: "+data[num].date;
    string += "<br>";
    string += "Deaths: "+data[num].deaths;
    string += "<br>";
    string += "Injuries: "+data[num].injuries;
    string += "<br>";
    string += "Town: "+data[num].town;
    string += "<br>";
    string += "Location: "+data[num].location;
    string += "<br>";

    var infoWindow = new google.maps.InfoWindow({
        content: string
    });

    marker.addListener("click", function() {
        infoWindow.open(marker.get(nameMap), marker);
    });
}

//console.log(coordinates);
//console.log("coordinates array");
