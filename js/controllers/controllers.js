"use strict";

import { Home } from "home";
import { users } from "users";
import { browse } from "browse";
import { registerController } from "register-controller";

class Controllers {
    constructor(home, browse, register) {
        this.home = home;
        this.browse = browse;
        this.register = register;
    }
}

const home = new Home();
const controllers = new Controllers(home, browse, registerController);

export { controllers };