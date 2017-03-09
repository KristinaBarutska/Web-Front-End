import { templates } from "templates";
import { requester } from "requester";

let browse = (function() {
    console.log("here");

    function getBrowsing(context) {
        var data;
        var templateListFunc;
        requester.getAllRestaurants()
            .then((result) => {
                data = result;
                return templates.get("browse");
            })
            .catch(() => {
                return templates.get("not-logged-in");
            })
            .then((templateFunc) => {
                context.$element().html(templateFunc());

                templates.get("restaurants-list")
                    .then((listFunc) => {
                        templateListFunc = listFunc;
                        $("#restaurants-list").html(templateListFunc({ data }));
                    });

                if (data) {
                    $("#search-restaurants").on("click", function(ev) {
                        const city = $("#city").val().toLowerCase();
                        const type = $("#type").val().toLowerCase();
                        const cuisine = $("#cuisine").val().toLowerCase();
                        const name = $("#place-name").val().toLowerCase();

                        $("#city").val("");
                        $("#type").val("");
                        $("#cuisine").val("");
                        $("#place-name").val("");

                        const options = { city, type, cuisine, name };

                        requester.getAllRestaurants()
                            .then((restaurants) => {
                                var sortedRestaurants = [];
                                restaurants.forEach((restaurant) => {
                                    var answersConditions = true;
                                    for (var property in options) {
                                        if (options[property] === "") {
                                            continue;
                                        }

                                        if (Array.isArray(restaurant[property])) {
                                            var hasMatch = restaurant[property].some((element) => element.toLowerCase() === options[property]);
                                            if (hasMatch) {
                                                continue;
                                            } else {
                                                answersConditions = false;
                                                break;
                                            }
                                        }

                                        if (options[property] !== restaurant[property].toLowerCase()) {
                                            answersConditions = false;
                                            break;
                                        }
                                    }

                                    if (answersConditions) {
                                        sortedRestaurants.push(restaurant);
                                    }
                                });

                                $("#restaurants-list").html(templateListFunc({ data: sortedRestaurants }));

                            });

                        ev.preventDefault();
                        return false;
                    });
                }
            });
    }
    return {
        all: getBrowsing
    };
}());

export { browse };