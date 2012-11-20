/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('lightbox', function(Y, NAME) {

/**
 * The lightbox module.
 *
 * @module lightbox
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
                photo = ac.models.get('photo');

            ac.done({

                found: !!photo.get('id'),

                place: {
                    id  : place.get('id'),
                    text: place.toString()
                },

                photo: Y.merge({title: 'Photo'}, photo.getAttrs([
                    'title', 'largeUrl', 'pageUrl'
                ]))

            });

        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-models-addon']});
