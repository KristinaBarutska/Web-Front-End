SystemJS.config({
    // tell SystemJS which transpiler to use
    transpiler: 'plugin-babel',
    // tell SystemJS where to look for the dependencies
    map: {
        'plugin-babel': '../node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': '../node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        // app start script
        'app': './js/app.js',
        'home': './js/controllers/home.js',
        'browse': './js/controllers/browse.js',
        'users': './js/controllers/users.js',
        'controllers': './js/controllers/controllers.js',
        'templates': './js/data/templates.js',
        'jquery-requester': './js/data/jquery-requester.js',
        'requester': './js/data/requester.js',
        'events': './js/controllers/events.js',
    }
});