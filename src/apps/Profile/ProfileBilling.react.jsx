var React       = require('react'),
    State       = require('react-router').State,

    HeaderMixin = require('../Header/HeaderMixin');

module.exports = React.createClass({

  displayName: 'ProfileBilling',

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
      route: 'profile-billing',
      label: 'Billing',
    }
  ],

  render: function () {
    return (
      <div>Billing</div>
    );
  }

});