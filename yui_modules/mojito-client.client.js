YUI.add('mojito-client', function (Y, NAME) {

    Y.mojito.Client = function (config) {
        console.log(config);
        /*
        Config in a form of:
        {
            "context": {
                // the context object based on dimensions
            },
            "binderMap": {
                // the whole map for the page rendered at the server side.
            },
            "appConfig": {
                "specs": {
                    // mojits definition from application.json
                },
                // anything else you put in application.json
            },
            "routes": {
                // routes from routes.json
            }
        }
        */
    };

    Y.mojito.Client.prototype = {};

    // the original implementation of mojito client is on:
    // node_modules/lib/app/autoload/mojito-client.client.js

}, '', {
    // NOTE: mojito module just set up the full mojito namespace
    requires: ['mojito']
});
