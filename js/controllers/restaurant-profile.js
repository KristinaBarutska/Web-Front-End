import { templates } from "templates";
import { requester } from "requester";

var restaurantProfile = (function() {

    function getProfile(context) {
        const id = this.params["id"];
        var data;

        requester.getRestaurantById(id)
            .then((result) => {
                data = result;
                return templates.get("restaurant-profile");
            })
            .then((templateFunc) => {
                context.$element().html(templateFunc(data));
            });
    }

    return {
        all: getProfile
    };
}());

export { restaurantProfile };