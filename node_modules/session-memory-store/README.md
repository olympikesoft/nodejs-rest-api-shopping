# session-memory-store

A session store implementation for Express using [node-cache](https://www.npmjs.com/package/node-cache).

Because the default store for `express-session` -- memory-cache will lead to a memory leak due to it havn't a suitable way to make them expire.

And this is why I make this project, for those who want to use in-memory session, also want them to auto expire.

BTW, as the session is still storing in memory, you can't share the session with the others, process or other service.

## USAGE

    var express = require('express'),
      session = require('express-session'),
      cookieParser = require('cookie-parser');

    // for express 4.0+
    var MemoryStore = require('session-memory-store')(session);

    // for express 4.0-
    // var MemoryStore = require('session-memory-store')(express);

    var app = module.exports = express();

    app.use(cookieParser());

    app.use(session({
      name: 'JSESSION',
      secret: 'my secret',
      store: new MemoryStore(options)
    }));

## OPTIONS

#### options.expires

(Number) Defined how long each session will be expired. In second. Default: half a day, 60 * 60 * 12

#### options.checkperiod

(Number) Defined how long MemoryStore will check for expired. In second. Default: 10 minutes, 10 * 60