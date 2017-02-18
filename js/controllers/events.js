import { requester } from "requester";

let attachEvents = function() {
    $("#register").on("click", function() {
        const username = $("#username").val();
        const password = $("#password").val();
        requester.registerUser(username, password);
    });

    $("#login").on("click", function() {
        const username = $("#username").val();
        const password = $("#password").val();
        requester.loginUser(username, password);
    });

    $("#logout").on("click", function() {
        console.log("logout");
        requester.logoutUser();
    });
};

export { attachEvents };