YUI.add('pnm-photos', function (Y) {

var Lang  = Y.Lang,
    Photo = Y.PNM.Photo,
    Photos;

Photos = Y.Base.create('photos', Y.ModelList, [Y.ModelSync.YQL], {

    model: Photo,
    cache: new Y.CacheOffline(),
    query: 'SELECT {attrs} FROM flickr.photos.search({start},{num}) ' +
                'WHERE api_key={api_key} ' +
                'AND safe_search=1 ' +
                'AND woe_id={woeid} ' +
                'AND sort="interestingness-desc" ' +
                'AND extras="path_alias,url_sq,url_z"',

    buildQuery: function (options) {
        options || (options = {});

        return Lang.sub(this.query, {
            api_key: options.api_key || '',
            start  : options.start || 0,
            num    : options.num || 30,
            woeid  : options.place.get('id'),
            attrs  : Photo.YQL_ATTRS
        });
    },

    parse: function (results) {
        if (Lang.isArray(results)) {
            return results;
        }

        var photos = results ? results.photo : [];
        return Lang.isArray(photos) ? photos : [photos];
    },

    getPrev: function (photo) {
        // Check that the photo is in the list first.
        if (photo && this.getByClientId(photo.get('clientId'))) {
            return this.item(this.indexOf(photo) - 1);
        }
    },

    getNext: function (photo) {
        // Check that the photo is in the list first.
        if (photo && this.getByClientId(photo.get('clientId'))) {
            return this.item(this.indexOf(photo) + 1);
        }
    }

});

Y.namespace('PNM').Photos = Photos;

}, '0.5.3', {
    requires: [
        'cache-offline',
        'gallery-model-sync-yql',
        'model-list',
        'pnm-photo',
        'yql'
    ]
});
