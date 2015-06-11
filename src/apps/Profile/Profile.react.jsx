var React       = require('react'),
    State       = require('react-router').State,
    
    HeaderMixin = require('../Header/HeaderMixin');

module.exports = React.createClass({

  displayName: 'Profile',

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
      route: 'profile',
      label: 'Profile',
    }]
  },

  render: function () {
    return (
      <div>Profile</div>
    );
  }

});