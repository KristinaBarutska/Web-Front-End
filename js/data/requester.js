import { jqueryRequester } from "jquery-requester";

var requester = (function() {

    const CURRENT_USER_ID = "current-user-id";
    const AUTH_TOKEN = "auth-token";
    const CURRENT_USER_NAME = "username";
    const appId = "kid_ryOQxnRFl";
    const appSecret = "cadb39eed8ef4d86bcb230484ccf0b80";
    const masterSecret = "41da989e3d204611aa8411e752e50420";
    var authorizationString = `${appId}:${appSecret}`;
    authorizationString = btoa(authorizationString);


    const url = "https://baas.kinvey.com";
    const getUrl = url + appId;
    const userUrl = url + `/user/${appId}`;
    const loginUserUrl = userUrl + "/login";
    const logoutUserUrl = userUrl + "/_logout";
    const getRestaurantsUrl = url + `/appdata/${appId}/restaurants`;

    function registerUserRequest(username, password) {
        let favourites = [];
        const data = { username, password, favourites };
        const headers = { Authorization: `Basic ${authorizationString}` };
        return jqueryRequester.post(userUrl, headers, data);
    }

    function loginUserRequest(username, password) {
        const data = { username, password };
        const headers = { Authorization: `Basic ${authorizationString}` };
        return jqueryRequester.post(loginUserUrl, headers, data)
            .then((res) => {
                console.log(res);

                localStorage.setItem(CURRENT_USER_ID, res._id);
                localStorage.setItem(AUTH_TOKEN, res._kmd.authtoken);
                localStorage.setItem(CURRENT_USER_NAME, res.username);
            });
    }

    function logoutUserRequest(username, password) {
        const data = { username, password };
        var authtoken = localStorage.getItem(AUTH_TOKEN);
        const headers = { Authorization: `Kinvey ${authtoken}` };
        return jqueryRequester.post(logoutUserUrl, headers)
            .then(() => {

                localStorage.removeItem(CURRENT_USER_ID);
                localStorage.removeItem(CURRENT_USER_NAME);
                localStorage.removeItem(AUTH_TOKEN);
            });
    }

    function isLoggedIn() {
        return new Promise((resolve, reject) => {
            const username = localStorage.getItem(CURRENT_USER_NAME);
            if (username) {
                resolve(username);
            }
            reject();
        });
    }

    function getUserInfo() {
        const id = localStorage.getItem(CURRENT_USER_ID);
        const url = userUrl + `/${id}`;
        const authtoken = localStorage.getItem(AUTH_TOKEN);
        const headers = { Authorization: `Kinvey ${authtoken}` };
        return jqueryRequester.get(url, headers);
    }

    function getAllRestaurants() {
        var authtoken = localStorage.getItem(AUTH_TOKEN);
        const headers = { Authorization: `Kinvey ${authtoken}` };
        return jqueryRequester.get(getRestaurantsUrl, headers);
    }

    function getRestaurantById(id) {
        const authtoken = localStorage.getItem(AUTH_TOKEN);
        const headers = { Authorization: `Kinvey ${authtoken}` };
        const url = getRestaurantsUrl + `/${id}`;
        return jqueryRequester.get(url, headers);
    }

    function addRestaurantToFavourites(restaurantId) {
        const userId = localStorage.getItem(CURRENT_USER_ID);
        const authtoken = localStorage.getItem(AUTH_TOKEN);
        const headers = { Authorization: `Kinvey ${authtoken}` };
        const url = userUrl + `/${userId}`;
        let newFavourites;
        return getUserInfo()
            .then((user) => {
                let favourites = user.favourites;
                newFavourites = favourites;
                if (newFavourites.indexOf(restaurantId) < 0) {
                    newFavourites.push(restaurantId);
                } else {
                    throw new Error("The place is already added to favourites.");
                }
            })
            .then(() => {
                let data = { favourites: newFavourites };
                return jqueryRequester.put(url, headers, data);
            });
    }

    function addCommentToRestaurant(id, content) {
        const authtoken = localStorage.getItem(AUTH_TOKEN);
        const headers = { Authorization: `Kinvey ${authtoken}` };
        const url = getRestaurantsUrl + `/${id}`;
        const username = localStorage.getItem(CURRENT_USER_NAME);
        var dateNow = new Date();
        var date = `${dateNow.getDate()}.${dateNow.getMonth()}.${dateNow.getFullYear()}`;

        return getRestaurantById(id)
            .then((restaurant) => {
                restaurant.comments.push({ content, date, username });
                return restaurant;
            })
            .then((restaurant) => {
                return jqueryRequester.put(url, headers, restaurant);
            });
    }


    return {
        registerUser: registerUserRequest,
        loginUser: loginUserRequest,
        logoutUser: logoutUserRequest,
        isLoggedIn: isLoggedIn,
        getUserInfo: getUserInfo,
        getAllRestaurants: getAllRestaurants,
        getRestaurantById: getRestaurantById,
        addRestaurantToFavourites: addRestaurantToFavourites,
        addCommentToRestaurant: addCommentToRestaurant
    };
}());

export { requester };