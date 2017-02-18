import { controllers } from "controllers";

(function() {

    var sammyApp = Sammy("#content", function() {

        this.get('#/', function(context) {
            context.redirect('#/home');
        });

        this.get('#/home', controllers.home.all);

        this.get("#/browse", controllers.browse.all);

    });


    sammyApp.run('#/');

}());