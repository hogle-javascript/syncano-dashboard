var React       = require('react'),
    State       = require('react-router').State,
    
    HeaderMixin = require('../Header/HeaderMixin');

module.exports = React.createClass({

  displayName: 'ProfileInvitations',

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
      route: 'invitations',
      label: 'Invitations',
    }]
  },

  render: function () {
    return (
      <div>Invitations</div>
    );
  }

});