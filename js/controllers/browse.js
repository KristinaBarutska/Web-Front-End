import { templates } from "templates";
import { requester } from "requester";

let browse = (function() {
    console.log("here");

    function getBrowsing(context) {
        var data;
        requester.getAllRestaurants()
            .then((result) => {
                data = result;
                return templates.get("browse");
            })
            .catch(() => {
                return templates.get("not-logged-in");
            })
            .then((templateFunc) => {
                context.$element().html(templateFunc({ data }));
            });
    }
    return {
        all: getBrowsing
    };
}());

export { browse };