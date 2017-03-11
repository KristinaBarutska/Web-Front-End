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

                return templates.get("comments");
            })
            .then((commentsFunc) => {
                $("#comment-section").html(commentsFunc({ comments: data.comments }));

                $(".add-to-favourites").on("click", function(ev) {
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

                $(".add-comment-btn").on("click", function(ev) {
                    var content = $("#new-comment").val();

                    if (content === "") {
                        toastr.error("You have not written a comment!");
                        ev.preventDefault();
                        return false;
                    }

                    requester.addCommentToRestaurant(id, content)
                        .then((data) => {
                            toastr.success("Your comment was added!");
                            $("#comment-section").html(commentsFunc({ comments: data.comments }));
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