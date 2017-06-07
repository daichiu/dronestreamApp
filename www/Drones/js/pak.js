
/**
 * Created by h205p2 on 5/24/17.
 */
var pakistan = [];
var coordinates = [];


$(document).ready(function(){
    $.ajax({
        url: 'http://api.dronestre.am/data',
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (result) {
            //console.log(result);
            pak(result);
            myMap(result)
        },
        error: function () {
            alert('Failed!');
        }
    });
});


function pak(result){
    for(var i = 0; i<result.strike.length; i++){
        if(result.strike[i].country==="Pakistan"){
            pakistan.push(result.strike[i])
        }
    }
}

console.log("Pakistan strikes:");
console.log(pakistan);

//drone api returns a string, but google api must take number, so must parse
function latLng(lat, lng) {
    this.lat = parseFloat(lat);
    this.lng = parseFloat(lng);
}


function myMap(result) {
    var mapProp = {
        //lat and long of pakistan
        center:new google.maps.LatLng(30.3753, 69.3451),
        zoom: 5
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    //get all the lat and lon coordinates into coordinates array
    for (var i = 0; i < pakistan.length; i++) {
        var location = new latLng(pakistan[i].lat, pakistan[i].lon);
        //console.log(location);
        coordinates.push(location);
    }
    var markers = coordinates.map(function(location) {
        return new google.maps.Marker({
            map: map,
            position: location,
        });
    });

    //attach the info text per drone strike
    for (var i = 0; i < markers.length; i++) {
        attachText(markers[i], pakistan, i, map);
    }

    //create marker clusters
    var markerCluster = new MarkerClusterer(map, markers,
        {imagePath: "../clusters_images/marker"});
    //console.log("hi");
}

function attachText(marker, data, num, nameMap) {
    //var string = toString(data[num]);
    //console.log(Object.getOwnPropertyNames(data[num]));

    var string = "";
    for (var key in data[num]) {
        if (Array.isArray(data[num][key])) {
            for (var i = 0; i < data[num][key].length; i++) {
                string += key + ": "+ data[num][key][i];
                string += "<br>";
            }
        } else {
            string += key + ": " + data[num][key];
            string += "<br>";
        }
    }

    var infoWindow = new google.maps.InfoWindow({
       content: string
    });

    marker.addListener("click", function() {
        infoWindow.open(marker.get(nameMap), marker);
    });
}

/*function toString(hold) {
    var string = "";
    for (var key in hold) {
        string += hold[key];
        string += "<br>"
    }

}*/

//console.log(coordinates);
//console.log("coordinates array");
