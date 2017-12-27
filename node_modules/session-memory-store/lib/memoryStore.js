'use strict';

var util = require('util'),
  _ = require('lodash'),
  NodeCache = require('node-cache');

// One day in second
var ONE_DAY = 60 * 60 * 24;

var DEFAULT_OPTION = {
  expires: ONE_DAY / 2,
  checkperiod: 10 * 60,
};

var DEFAULT_FUNC = function () {};

module.exports = function (express) {

  var Store = express.Store || express.session.Store;

  /**
   * Create a new session store
   * @param {Object} options
   * @param {Number} options.expires           Defined how long each session will be expired. In second.
   *                                             Default: half a day, 60 * 60 * 12
   * @param {Number} options.checkperiod       Defined how long MemoryStore will check for expired. In second.
   *                                             Default: 10 minutes, 10 * 60
   * @constructor
   */
  function MemoryStore(options) {
    if (!(this instanceof MemoryStore)) return new MemoryStore(options);

    Store.call(this, options);

    this.options = _.extend({}, DEFAULT_OPTION, options);

    this.store = new NodeCache({stdTTL: this.options.expires, checkperiod: this.checkperiod});
  }

  util.inherits(MemoryStore, Store);

  /**
   * Get all session data
   *
   * @param callback(err, {Array}sessions)
   */
  MemoryStore.prototype.all = function (callback) {
    callback = _checkCBisFunc(callback);

    var allKeys = this.store.keys();

    this.store.mget(allKeys, function (err, values) {
      if (err) {
        callback(err);
        return;
      }

      var sessions = [];

      for (var i in values) {
        if (values.hasOwnProperty((i))) {
          sessions.push(values[i]);
        }
      }

      return callback(null, sessions);
    });
  };

  /**
   * Destroy a session by sessionId
   *
   * @param sessionId
   * @param callback(err)
   */
  MemoryStore.prototype.destroy = function (sessionId, callback) {
    callback = _checkCBisFunc(callback, true);

    this.store.del(sessionId, function (err, count) {
      callback(err);
    });
  };

  /**
   * Clear all sessions.
   *
   * @param callback
   * @returns {*}
   */
  MemoryStore.prototype.clear = function (callback) {
    callback = _checkCBisFunc(callback, true);

    this.store.flushAll();
    return callback(null);
  };

  /**
   * Get the count of all sessions in the store
   * @param callback(err, {Number}length)
   */
  MemoryStore.prototype.length = function (callback) {
    callback = _checkCBisFunc(callback);

    callback(null, this.store.keys.length);
  };

  /**
   * Get a session from the store given a session ID (sid).
   *
   * @param sessionId
   * @param callback
   */
  MemoryStore.prototype.get = function (sessionId, callback) {
    callback = _checkCBisFunc(callback, true);

    this.store.get(sessionId, function (err, session) {
      if (err) {
        return callback(err);
      }

      callback(null, session);
    });
  };

  MemoryStore.prototype.set = function (sessionId, session, callback) {
    callback = _checkCBisFunc(callback, true);

    callback = typeof callback === 'function' ? callback : function () {};

    this.store.set(sessionId, session, function (err, success) {
      if (err) {
        return callback(err);
      }

      if (!success) {
        return callback(new Error('Insert to store not succeed!'));
      }

      callback(null);
    })
  };

  /**
   * Reset this session's expire time
   *
   * @param sessionId
   * @param session
   * @param callback(err)
   */
  MemoryStore.prototype.touch = function (sessionId, session, callback) {
    callback = _checkCBisFunc(callback, true);

    this.store.del(sessionId);

    this.set(sessionId, session, callback);
  };

  return MemoryStore;
};

/**
 * Check if callback is a function, if this can be ignored, return an empty function.
 *
 * @param {Function}   callback
 * @param {Boolean}    canThisIgnore
 * @returns {*}
 * @private
 */
function _checkCBisFunc(callback, canThisIgnore) {
  if (typeof callback !== 'function') {
    if (canThisIgnore) {
      return DEFAULT_FUNC;
    }
    else {
      throw new Error('Callback is not a function!');
    }
  }
  else {
    return callback;
  }
}

