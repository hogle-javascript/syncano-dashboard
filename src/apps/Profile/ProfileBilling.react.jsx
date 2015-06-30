var React       = require('react'),
    HeaderMixin = require('../Header/HeaderMixin');


module.exports = React.createClass({

  displayName: 'ProfileBilling',

  mixins: [HeaderMixin],

  headerMenuItems: [
    {
      route: 'profile-settings',
      label: 'Profile'
    },
    {
      route: 'profile-authentication',
      label: 'Authentication'
    },
    {
      route: 'profile-billing',
      label: 'Billing'
    },
    {
      route: 'profile-invitations',
      label: 'Invitations'
    }
  ],

  render: function () {
    return (
      <div>Billing</div>
    );
  }

});