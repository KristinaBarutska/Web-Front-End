"use strict";

import { templates } from "templates";

let home = (function() {
    function all(context) {
        templates.get("home")
            .then((template) => {
                context.$element().html(template());
            })

    }

    return {
        all
    };
}());

export { home };