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

                $(".add-to-favourites").on("click", function(ev) {
                    const parent = $(ev.target).parents(".restaurant-profile");
                    const id = parent.attr("data-id");
                    console.log(id);
                    requester.addRestaurantToFavourites(id)
                        .then(() => {
                            toastr.success("Added to favourites!");
                        })
                        .catch((ex) => {
                            if (ex.message.indexOf("is already added to favourites") >= 0) {
                                toastr.success("The place is already added to favourites.");
                            } else {
                                toastr.error("An error occured and the place is not added to favourites.");
                            }
                        });

                    ev.preventDefault();
                    return false;
                });
            });
    }

    return {
        all: getProfile
    };

}());

export { restaurantProfile };