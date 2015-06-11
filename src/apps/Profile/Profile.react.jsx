var React       = require('react'),
    State       = require('react-router').State,

    HeaderMixin = require('../Header/HeaderMixin');

module.exports = React.createClass({

  displayName: 'Profile',

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
      route: 'profile-settings',
      label: 'Profile',
    }
  ],

  render: function () {
    return (
      <div>Profile</div>
    );
  }

});