import { requester } from "requester";

let attachEvents = function() {

    requester.isLoggedIn()
        .then((username) => {
            $("#login-form").addClass("hidden");
            $("#login-div").addClass("hidden");
            $("#user-links").removeClass("hidden");
            $("#user-profile-link").html(`Hello, ${username}`);
        });

    $("#login").on("click", function(ev) {
        const username = $("#username").val();
        const password = $("#password").val();
        requester.loginUser(username, password)
            .then(() => {
                $("#username").val("");
                $("#password").val("");
                $("#login-form").addClass("hidden");
                $("#user-links").removeClass("hidden");
                $("#user-profile-link").html(`Hello, ${username}`);
            })
            .catch(() => {
                console.log("error");
                toastr.error("Invalid username or password");
            });

        ev.preventDefault();
        return false;
    });

    $("#logout").on("click", function(ev) {
        console.log("logout");
        requester.logoutUser()
            .then(() => {
                $("#login-form").removeClass("hidden");
                $("#user-links").addClass("hidden");
            });

        ev.preventDefault();
        return false;
    });
};

export { attachEvents };