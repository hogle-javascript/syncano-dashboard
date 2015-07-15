var React         = require('react'),
    Router        = require('react-router'),
    RouteHandler  = Router.RouteHandler,

    HeaderMixin   = require('../apps/Header/HeaderMixin'),

    mui           = require('material-ui'),
    Container     = require('../common/Container');

module.exports = React.createClass({

  displayName: 'ProfileBilling',

  mixins: [
    Router.Navigation,
    Router.State,
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

  subTabsItems: [
    {
      label: "Current usage",
      route: "profile-billing-usage"
    },
    {
      label: "Payment methods",
      route: "profile-billing-payment"
    },
    {
      label: "Invoices",
      route: "profile-billing-invoices"
    },
    {
      label: "Billing address",
      route: "profile-billing-address"
    }
  ],

  getActiveSubTabIndex: function() {
    var index = 0;
    this.subTabsItems.some(function (item, i) {
      if (this.isActive(item.route, item.params, item.query)) {
        index = i;
        return true;
      }
    }.bind(this));

    return index;
  },

  handleTabActive: function(tab) {
    this.transitionTo(tab.props.route, tab.props.params);
  },

  render: function() {
    return (
      <Container.Profile headerText='Billing'>
        <mui.Tabs initialSelectedIndex={this.getActiveSubTabIndex()}>
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
      </Container.Profile>
    );
  }
});
