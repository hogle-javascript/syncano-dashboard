var React       = require('react'),
    State       = require('react-router').State,
    
    HeaderMixin = require('../Header/HeaderMixin');

module.exports = React.createClass({

  displayName: 'ProfileBilling',

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
      route: 'billing',
      label: 'Billing',
    }]
  },

  render: function () {
    return (
      <div>Billing</div>
    );
  }

});