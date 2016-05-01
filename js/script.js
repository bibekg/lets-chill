// Date Picker Crap -----------------------------

var datesList = [];
var peopleList = [];

// DOM Manipulation --------------------------------------
var grabEvent = function () {
    var who = $("#who").val();

    var what = $("#what").val();
    var where = $("#where").val();

    var e = {};
    e.who = who
    e.what = what;
    e.where = where;
    return e;
};

var determineEmpty = function (e) {
    
    // WHO
    if (e.who == "") {
        //CALL FACEBOOK
        var rand = Math.round(Math.random() * 5);
        switch (rand){
            case 0:
                e.who = "Richard, Jan, Kyle";
            break;
            case 1:
                e.who = "Sahil, Sai, Eunju";
            break;
            case 2:
                e.who = "Vivian, Mounika, Kristin";
            break;
            case 3:
                e.who = "Elaine, Davis, Emma, Vivian";
            break;
            case 4:
                e.who = "George, Sam, Emmanuel, Eunju, Jan";
            break;
            case 5:
                e.who = "Max, Aditya, Rachel";
            break;
            case 6:
                e.who = "Robin, Cindy, Eunju, Sam";
            break;
            default:
                e.who = "Erin, Vivek, Ansh"
            break;
        }
    } else {
        e.who = peopleList.join(", ")
    }
    
    // WHERE
    if (e.where === "") {
        // If "where" wasn't specified, initialize based on current location.
        if (e.what == "Catch a movie.") {
            initializeMovie();
            $("#mychill-wheretext p").html("Fox Bruin Theater");
            e.where = "Fox Bruin Theater";
        } else {
            initialize();
        }
//        e.where = curr_place;
    }
    
    // WHEN
    if (datesList.length === 0) {
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        e.when = tomorrow;
        datesList = [];
    } else {
        var i = Math.round(Math.random() * datesList.length);
        var dayofchoice = datesList[i];
        e.when = dayofchoice;
        datesList = [];
    }

    return e;
}

var determineEvent = function (eventArray) {
    var whenCount = {};
    var whereCount = {};
    for (k = 0; k < eventArray.length; k++) {
        if (eventArray[i].when in whenCount)
            whenCount.eventArray[i].when += 1;
        else
            whenCount.eventArray[i].when = 1;

        if (eventArray[i].where in whereCount)
            whereCount.eventArray[i].where += 1;
        else
            whereCount.eventArray[i].where = 1;
    }

    var result = Math.round(Math.random() * eventArray.length);
    var pos1 = 0;
    var pos2 = 0;
    while (result != 0) {
        if (whenCount[pos1] == 0)
            pos1 += 1;
        whenCount[pos] -= 1;
        if (whereCount[pos2] == 0)
            pos2 += 1;
        whereCount[pos] -= 1;
    }

    var e = {};
    e.when = whenCount[pos1];
    e.where = whereCount[pos2];
    e.who = eventArray[0].who;
    e.what = eventArray[0].what;
    return e;
}

var beautifyDate = function(date) {
    var newdate = (date.getMonth() + 1) + '/' + date.getDate() + '/' +  date.getFullYear()
    var newtime = (date.getHours() + ":" + date.getMinutes())
    return newdate;
}

var populateChill = function (who, what, where, when) {
    $("#mychill-who p").html(who);
    $("#mychill-when p").html(beautifyDate(when));
    $("#mychill-wheretext p").html(where);
}

var createChill = function () {
    var e = grabEvent();
    e = determineEmpty(e);
    populateChill(e.who, e.what, e.where, e.when);
    $("#dates-chosen p").html("");
}

// Google Maps/Places API ---------------------------

var map;
var service;
var infowindow;
var curr_place;

function initialize() {
    var pyrmont = {
        lat: 34.0704,
        lng: -118.4469
    };

    map = new google.maps.Map(document.getElementById('mychill-where'), {
        center: pyrmont,
        zoom: 15
    });

    var request = {
        location: pyrmont,
        radius: '5000',
        type: 'food'
    };

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch(request, callback);
}

function initializeMovie() {
    var pyrmont = {
        lat: 34.0704,
        lng: -118.4469
    };

    map = new google.maps.Map(document.getElementById('mychill-where'), {
        center: pyrmont,
        zoom: 15
    });
    
    var movieposition = {lat: 34.0628, lng: -118.4470}
    var marker = new google.maps.Marker({
        position: movieposition,
        map: map,
        title: "Fox Bruin Theater",
        animation: google.maps.Animation.DROP
    });
    map.setCenter({lat: 34.0628, lng: -118.4470});

    var place = {}
    place.openNow = true;
    place.name = "Fox Bruin Theater";
    place.vicinity = "948 Broxton Ave, Los Angeles, CA 90024";
    
    createInfoWindow(place);

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}


function initMap() {
    // Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('mychill-where'), {
        center: {
            lat: 34.0704,
            lng: -118.4469
        },
        scrollwheel: false,
        zoom: 15
    });
}

function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
        var i = Math.round(Math.random() * results.length);
        createMarker(results[i]);
        $("#mychill-wheretext p").html(results[i].name);
    }
}

var infowindow;

var createInfoWindow = function (place) {
    var openstat;
    if (place.openNow) {
        openstat = "Open now!";
    } else {
        openstat = "Closed right now.";
    }

    infowindow = new google.maps.InfoWindow({
        content: '<div class="place-name">' +
            '<p>' + place.name + '</p>' +
            '</div>' +
            '<div class="place-address">' +
            '<p>' + place.vicinity + '</p>' +
            '</div>' +
            '<div class="place-open-status">' +
            '<p>' + openstat + '</p>' +
            '</div>'
    });
}

function createMarker(place) {
    var marker = new google.maps.Marker({
        position: place.geometry.location,
        map: map,
        title: place.name,
        animation: google.maps.Animation.DROP
    });
    map.setCenter(place.geometry.location);

    createInfoWindow(place);

    marker.addListener('click', function () {
        infowindow.open(map, marker);
    });
}

// Document-load functions ------------------------

$(document).ready(function () {

    $('#datepicker').datepicker({
        inline: true,
        multiSelect: 999,
        numberOfMonths: 2,
        showTrigger: '#calImg',
        dateFormat: 'yyyy-mm-dd',
        onSelect: function(date, inst){
            datesList.push($("#datepicker").datepicker('getDate'));
            
            console.log(datesList)
            var datesString;
            for (var i = 0; i < datesList.length; i++) {
                if (i === 0) {
                    if (datesList.length != 1) {
                        datesString = beautifyDate(datesList[i]) + ", ";
                    } else {
                        datesString = beautifyDate(datesList[i]);
                    }
                }
                else if (i != datesList.length - 1) {
                    datesString = datesString + beautifyDate(datesList[i]) + ", ";    
                }
                else if (i === datesList.length - 1) {
                    datesString += beautifyDate(datesList[i]);
                }
                
            }
            $("#dates-chosen p").html(datesString);
        }
    });

    initMap();

    
});

window.onload = function() {
    // short timeout
    setTimeout(function() {
        $(document.body).scrollTop(0);
    }, 15);
};