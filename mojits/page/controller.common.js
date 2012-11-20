/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('page', function(Y, NAME) {

/**
 * The page module.
 *
 * @module page
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        /**
         * Method corresponding to the 'index' action, and it is
         * responsible for adding metadata into the header of the
         * page and set up the basic style and orientation fix.
         * Finally, it is responsible for calling "main" action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
            var metas  = ac.config.getAppConfig('metas') || [],
                params = (ac.params.params || {}), // yeah, nasty
                route  = params.route || {},
                templateData;

            // adding basic meta-data on each page
            Y.each(metas, function (m) {
                ac.assets.addBlob('<meta name="'+m.name+'" content="'+m.content+'" />', 'top');
            });
            ac.assets.addCss('/static/pnm/assets/common/style.css');
            ac.assets.addJs('/static/pnm/assets/ios-orientationchange-fix.js');

            // executing the main logic for the page
            this.main(ac);
        },

        /**
         * Method corresponding to the 'main' action, and it is
         * responsible for register the global models that will
         * be used by other mojits, and to dispatch the composite
         * execution.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        main: function (ac) {
            var requests = new Y.Parallel(),
                api_key = ac.config.getAppConfig().flickr.api_key,
                place = new Y.PNM.Place({
                    id: ac.params.getFromRoute('place')
                }),
                photo = new Y.PNM.Photo({
                    location: place,
                    id: ac.params.getFromRoute('photo')
                }),
                photos = new Y.PNM.Photos({
                    place: place
                });

            // TODO: ericf, are you sure we want to do
            // parellel here? I sounds more like an async queue

            photo.load({
                api_key: api_key
            }, requests.add());

            place.load({
                api_key: api_key,
                text: ac.params.getFromRoute('placeText')
            }, requests.add());

            photos.load({
                api_key: api_key,
                place: place
            }, requests.add());

            requests.done(function () {

                // register global models
                ac.models.registerGlobal('photo',  photo);
                ac.models.registerGlobal('photos', photos);
                ac.models.registerGlobal('place',  place);

                // passing data to the client to re-hydrate
                // the models when needed.
                ac.instance.config.data = {
                    place : Y.JSON.stringify(place),
                    photo : Y.JSON.stringify(photo),
                    photos: Y.JSON.stringify(photos)
                };
                ac.instance.config.initialView =
                    (photo.get('id') ? 'lightbox' : 'grid');

                // we are now ready to dispatch
                ac.composite.done({
                    template: {
                        place: {
                            id: place.get('id'),
                            text: place.toString()
                        },
                        // TODO: ericf, how do we know if "located" should be true?
                        located: !!place.get('id')
                    }
                });

            });
        }

    };

}, '0.0.1', {requires: [
        'mojito',
        'mojito-composite-addon',
        'mojito-config-addon',
        'mojito-assets-addon',
        'mojito-params-addon',
        'mojito-models-addon',
        'parallel',
        'json'
    ]});
