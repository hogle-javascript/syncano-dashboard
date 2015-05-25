var React = require('react');

var AuthStore = require('./store');

module.exports = {

  checkAuth: function (component, params) {
    if (AuthStore.getToken()) {
      React.render(component, params);
    } else {
      window.location.href = '#login';
    }
  }
};

