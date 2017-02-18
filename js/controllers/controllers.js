"use strict";

import { Home } from "home";
import { users } from "users";
import { browse } from "browse";

class Controllers {
    constructor(home, browse) {
        this.home = home;
        this.browse = browse;
    }
}

const home = new Home();
const controllers = new Controllers(home, browse);

export { controllers };