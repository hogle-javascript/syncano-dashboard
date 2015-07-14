var React         = require('react'),
    Router        = require('react-router'),
    RouteHandler  = Router.RouteHandler,

    HeaderMixin   = require('../apps/Header/HeaderMixin'),

    mui           = require('material-ui'),
    Tabs          = mui.Tabs,
    Tab           = mui.Tab;

module.exports = React.createClass({

  displayName: 'ProfileBilling',

  mixins: [
    Router.Navigation,
    HeaderMixin
  ],

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

  handleTabActive: function(tab) {
    this.transitionTo(tab.props.route, tab.props.params);
  },

  render: function() {
    return (
      <div className="container">
        <h4>Billing</h4>
        <Tabs>
          <Tab
            label="Current usage"
            route="profile-billing_usage"
            onActive={this.handleTabActive} />

          <Tab
            label="Payment methods"
            route="profile-billing_payment"
            onActive={this.handleTabActive} />

          <Tab
            label="Invoices"
            route="profile-billing_invoices"
            onActive={this.handleTabActive} />

          <Tab
            label="Billing address"
            route="profile-billing_address"
            onActive={this.handleTabActive} />

        </Tabs>
        <RouteHandler />
      </div>
    );
  }

});