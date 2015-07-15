var React         = require('react'),
    Router        = require('react-router'),
    RouteHandler  = Router.RouteHandler,

    HeaderMixin   = require('../apps/Header/HeaderMixin'),

    mui           = require('material-ui'),
    Common        = require('../common');

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
      <Common.Container.Profile headerText='Billing'>
        <mui.Tabs>
          <mui.Tab
            label="Current usage"
            route="profile-billing-usage"
            onActive={this.handleTabActive}
          />

          <mui.Tab
            label="Payment methods"
            route="profile-billing-payment"
            onActive={this.handleTabActive}
          />

          <mui.Tab
            label="Invoices"
            route="profile-billing-invoices"
            onActive={this.handleTabActive}
          />

          <mui.Tab
            label="Billing address"
            route="profile-billing-address"
            onActive={this.handleTabActive}
          />
        </mui.Tabs>
        <RouteHandler />
      </Common.Container.Profile>
    );
  }
});
