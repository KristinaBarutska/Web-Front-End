import { jqueryRequester } from "jquery-requester";

var requester = (function() {
    const CURRENT_USER_KEY = "current-user";
    const AUTH_TOKEN = "auth-token";
    const appId = "kid_ryOQxnRFl";
    const appSecret = "cadb39eed8ef4d86bcb230484ccf0b80";
    const masterSecret = "41da989e3d204611aa8411e752e50420";
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
        return jqueryRequester.post(userUrl, headers, data);
    }

    function loginUserRequest(username, password) {
        const data = { username, password };
        const headers = { Authorization: `Basic ${authorizationString}` };
        return jqueryRequester.post(loginUserUrl, headers, data)
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
        return jqueryRequester.post(logoutUserUrl, headers, data)
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