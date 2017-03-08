"use strict";
import { requester } from "requester";
import { templates } from "templates";

var registerController = (function() {
    function getRegisterTemplate(context) {

        templates.get("register")
            .then((templateFunc) => {
                context.$element().html(templateFunc());

                $("#submit-register").on("click", function(ev) {
                    let username = $("#username-register").val();
                    let password = $("#password-register-1").val();
                    let repeatedPassword = $("#password-register-2").val();

                    if (password === "") {
                        $("#invalid-empty-password").removeClass("hidden");
                    } else {
                        $("#invalid-empty-password").addClass("hidden");
                    }

                    if (password !== repeatedPassword) {
                        $("#invalid-password-message").removeClass("hidden");
                        ev.preventDefault();
                        return false;
                    } else {
                        $("#invalid-password-message").addClass("hidden");
                    }

                    requester.registerUser(username, password)
                        .then(() => {
                            $("#invalid-username-message").addClass("hidden");
                            toastr.success("You have registered successfully!");
                            context.redirect("#/home");
                        })
                        .catch(() => {
                            $("#invalid-username-message").removeClass("hidden");
                        });

                    ev.preventDefault();
                    return false;
                });
            });

    }

    return {
        all: getRegisterTemplate
    };
}());

export { registerController };