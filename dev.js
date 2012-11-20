/*
 * Copyright (c) 2011-2012, Yahoo! Inc.  All rights reserved.
 * Copyrights licensed under the New BSD License.
 * See the accompanying LICENSE file for terms.
 */


/*jslint anon:true, sloppy:true, nomen:true*/

process.chdir(__dirname);

Error.stackTraceLimit=100;

/*
 * Create the MojitoServer instance we'll interact with. Options can be passed
 * using an object with the desired key/value pairs.
 */
var Mojito = require('mojito');
var app = Mojito.createServer({
    context: {
        environment: 'development'
    }
});

// ---------------------------------------------------------------------------
// Different hosting environments require different approaches to starting the
// server. Adjust below to match the requirements of your hosting environment.
// ---------------------------------------------------------------------------

module.exports = app.listen();
