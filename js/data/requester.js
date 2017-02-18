import { jqueryRequester } from "jquery-requester";

var requester = (function() {
    const CURRENT_USER_KEY = "current-user";
    const AUTH_TOKEN = "auth-token";
    const appId = "kid_rJWkfzw6";
    const appSecret = "9861c3e41b4a41e4976d17e5c48f8e26";
    const masterSecret = "039e3c57e4474187aa9c5b6d540c13e1";
    var authorizationString = `${appId}:${appSecret}`;
    authorizationString = btoa(authorizationString);


    const url = "https://baas.kinvey.com";
    const getUrl = url + appId;
    const userUrl = url + `/user/${appId}/`;
    const loginUserUrl = userUrl + "login";
    const logoutUserUrl = userUrl + "_logout";
    const getRestaurantsUrl = url + `/appdata/${appId}/restaurants`;

    function registerUserRequest(username, password) {
        const data = { username, password };
        const headers = { Authorization: `Basic ${authorizationString}` };
        jqueryRequester.post(userUrl, headers, data);
    }

    function loginUserRequest(username, password) {
        const data = { username, password };
        const headers = { Authorization: `Basic ${authorizationString}` };
        jqueryRequester.post(loginUserUrl, headers, data)
            .then((res) => {
                console.log(res);
                localStorage.setItem(CURRENT_USER_KEY, res._id);
                localStorage.setItem(AUTH_TOKEN, res._kmd.authtoken);
            });
    }

    function logoutUserRequest(username, password) {
        const data = { username, password };
        var authtoken = localStorage.getItem(AUTH_TOKEN);
        const headers = { Authorization: `Kinvey ${authtoken}` };
        jqueryRequester.post(logoutUserUrl, headers, data)
            .then(() => {
                localStorage.removeItem(CURRENT_USER_KEY);
                localStorage.removeItem(AUTH_TOKEN);
            });
    }

    function getAllRestaurants() {
        var authtoken = localStorage.getItem(AUTH_TOKEN);
        const headers = { Authorization: `Kinvey ${authtoken}` };
        return jqueryRequester.get(getRestaurantsUrl, headers);
    }

    return {
        registerUser: registerUserRequest,
        loginUser: loginUserRequest,
        logoutUser: logoutUserRequest,
        getAllRestaurants: getAllRestaurants
    };
}());

export { requester };