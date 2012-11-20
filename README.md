1. start server

$ node dev.js

2. urls:

  - Photo:
    http://127.0.0.1:8666/photos/2724594182/

  - Place:
    http://127.0.0.1:8666/places/55862032/

Notes:

- Files under "yui_modules" could be automatically accessible from client side.

- yui_modules/mojito-client.client.js is what needs to be rewritten, that will override the client implementation bundle with mojito itself. All the details are in the file already.

- Each of the 3 mojits we have today are fully functional in the client side, including their controllers and binders.

TODO:

- when hitting a photo url, photos are not rendered based on the photos location. Is this an issue? Maybe it is related with the async queue vs parallel.

- the loading <p> as part of the grid should be triggered/displayed from a client side logic only.