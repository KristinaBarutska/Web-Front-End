import { templates } from "templates";
import { requester } from "requester";

var userProfile = (function() {

    function getProfile(context) {
        var userInfo;


        //TODO: fix promise structure
        requester.getUserInfo()
            .then((user) => {
                userInfo = user;
                return templates.get("user-profile");
            })
            .then((templateFunc) => {
                context.$element().html(templateFunc(userInfo));
            })
            .then(() => {
                var allRestaurants = [];
                var length = userInfo.favourites.length;
                var itemsProcessed = 0;
                return new Promise((resolve, reject) => {
                    userInfo.favourites.forEach((id) => {
                        requester.getRestaurantById(id)
                            .then((restaurant) => {
                                allRestaurants.push(restaurant);
                                itemsProcessed++;
                                if (itemsProcessed === length) {
                                    resolve(allRestaurants);
                                }
                            });
                    });
                });

            })
            .then((allRestaurants) => {
                templates.get("restaurants-list")
                    .then((listTemplateFunc) => {
                        console.log(allRestaurants);
                        $("#restaurants-list").html(listTemplateFunc({ data: allRestaurants }));

                        $(".add-to-favourites").addClass("hidden");
                    });
            });
    }

    return {
        all: getProfile
    };
}());

export { userProfile }