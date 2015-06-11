var React       = require('react'),
    State       = require('react-router').State,
    
    HeaderMixin = require('../Header/HeaderMixin');

module.exports = React.createClass({

  displayName: 'ProfileAuthentication',

  mixins: [
    HeaderMixin,
    State,
  ],

  headerBreadcrumbs: function () {
   return [{
      route: 'instances',
      label: 'Home',
    }, {
      route: 'account',
      label: 'Account',
    }, {
      route: 'authentication',
      label: 'Authentication',
    }]
  },

  render: function () {
    return (
      <div>Authentication</div>
    );
  }

});