var React       = require('react'),
    State       = require('react-router').State,

    HeaderMixin = require('../Header/HeaderMixin');

module.exports = React.createClass({

  displayName: 'ProfileInvitations',

  mixins: [
    HeaderMixin,
    State,
  ],

  headerBreadcrumbs: [
    {
      route: 'dashboard',
      label: 'Home',
    },
    {
      route: 'profile-settings',
      label: 'Account',
    },
    {
      route: 'profile-invitations',
      label: 'Invitations',
    }
  ],

  render: function () {
    return (
      <div>Invitations</div>
    );
  }

});