var React       = require('react'),
    State       = require('react-router').State,

    HeaderMixin = require('../Header/HeaderMixin');

module.exports = React.createClass({

  displayName: 'ProfileAuthentication',

  mixins: [
    HeaderMixin,
    State,
  ],

  headerBreadcrumbs: [
    {
      route: 'dashboard',
      label: 'Home',
    }, {
      route: 'profile-settings',
      label: 'Account',
    }, {
      route: 'profile-authentication',
      label: 'Authentication',
    }
  ],

  render: function () {
    return (
      <div>Authentication</div>
    );
  }

});