"use strict";

import { Home } from "home";
import { users } from "users";
import { browse } from "browse";
import { registerController } from "register-controller";
import { restaurantProfile } from "restaurant-profile";

class Controllers {
    constructor(home, browse, register, restaurantProfile) {
        this.home = home;
        this.browse = browse;
        this.register = register;
        this.restaurantProfile = restaurantProfile;
    }
}

const home = new Home();
const controllers = new Controllers(home, browse, registerController, restaurantProfile);

export { controllers };