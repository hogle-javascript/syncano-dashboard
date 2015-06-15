var React       = require('react'),
    HeaderMixin = require('../Header/HeaderMixin');


module.exports = React.createClass({

  displayName: 'ProfileAuthentication',

  mixins: [HeaderMixin],

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
      route: 'profile-authentication',
      label: 'Authentication',
    }
  ],

  headerMenuItems: [
    {
      route: 'profile-settings',
      label: 'Profile',
    },
    {
      route: 'profile-authentication',
      label: 'Authentication',
    },
    {
      route: 'profile-billing',
      label: 'Billing',
    },
    {
      route: 'profile-invitations',
      label: 'Invitations',
    }
  ],

  render: function () {
    return (
      <div>Authentication</div>
    );
  }

});