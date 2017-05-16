/**
 * Created by h205p2 on 5/16/17.
 */
$(document).ready(function() {
    var array;
    $("button").click(function () {
        var toAdd = $('input[name=stateItem]').val();
        var toAddArray = toAdd.split("");
        for (var i = 0; i < toAddArray.length; i++) {
            if (toAddArray[i] === ",") {
                if (toAddArray[i + 1] === " ") {
                    array = toAdd.split(", ");
                }
            }
        }
        var firstName = array[0];
        var lastName = array[1];
    });
});
function api(firstName,lastName) {
    $.ajax({
        url: "https://itunes.apple.com/search?term="+firstName+"+"+ lastName,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (result) {
            console.log(result);
        },
        error: function () {
            alert('Failed!');
        }
    });

}