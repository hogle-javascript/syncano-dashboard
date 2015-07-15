/**
 * Function.prototype.bind polyfill used by PhantomJS
 */
if (typeof Function.prototype.bind != 'function') {
  Function.prototype.bind = function bind(obj) {
    var args = Array.prototype.slice.call(arguments, 1),
      self = this,
      nop = function() {
      },
      bound = function() {
        return self.apply(
          this instanceof nop ? this : (obj || {}), args.concat(
            Array.prototype.slice.call(arguments)
          )
        );
      };
    nop.prototype = this.prototype || {};
    bound.prototype = new nop();
    return bound;
  };
}

var analytics = {};
analytics.methods = [
  "trackSubmit",
  "trackClick",
  "trackLink",
  "trackForm",
  "pageview",
  "identify",
  "group",
  "track",
  "ready",
  "alias",
  "page",
  "once",
  "off",
  "on",
  "load"
];

analytics.methods.forEach(function(method) {
  analytics[method] = function() {};
});

var Stripe = {
  setPublishableKey: function () {},
  card: {
    createToken: function () {}
  }
};