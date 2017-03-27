"use strict";
import { requester } from "requester";
import { templates } from "templates";

let map = (function() {
    function getMap(context) {
        templates.get("map")
            .then((templateFunc) => {
                context.$element().html(templateFunc());
                var map;
                var infowindow;

                function initMap() {
                    var pyrmont = { lat: 42.6492994, lng: 23.3723664 };
                    map = new google.maps.Map(document.getElementById('map'), {
                        center: pyrmont,
                        zoom: 16
                    });

                    infowindow = new google.maps.InfoWindow();
                    var service = new google.maps.places.PlacesService(map);
                    service.nearbySearch({
                        location: pyrmont,
                        radius: 500,
                        type: ['restaurant']
                    }, callback);
                }

                function callback(results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        for (var i = 0; i < results.length; i++) {
                            createMarker(results[i]);
                        }
                    }
                }

                function createMarker(place) {
                    var placeLoc = place.geometry.location;
                    var marker = new google.maps.Marker({
                        map: map,
                        position: place.geometry.location
                    });

                    google.maps.event.addListener(marker, 'click', function() {
                        infowindow.setContent(place.name);
                        infowindow.open(map, this);
                    });
                }

                initMap()
            });

    }

    return {
        all: getMap
    };
}());

export { map };