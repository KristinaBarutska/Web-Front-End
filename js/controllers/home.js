"use strict";


import { templates } from "templates";
import { attachEvents } from "events";

class Home {
    constructor() {}

    all(context) {
        templates.get("home")
            .then((template) => {
                context.$element().html(template());
            })

    }

}

export { Home };

// controllers.home = function getHome(context) {
//     templates.get("home")
//         .then((template) => {
//             context.$element().html(template());
//         })
//         .then(logData());
// };