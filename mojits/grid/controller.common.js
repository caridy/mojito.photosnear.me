/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('grid', function(Y, NAME) {

/**
 * The grid module.
 *
 * @module grid
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
            var place = ac.models.get('place'),
                photos = ac.models.get('photos');

            ac.done({

                place: {
                    id  : place.get('id'),
                    text: place.toString()
                },

                photos: photos.map(function (photo) {
                    return photo.getAttrs(['id', 'title', 'thumbUrl']);
                })

            });
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-models-addon']});
