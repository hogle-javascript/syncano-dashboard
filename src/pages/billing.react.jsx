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
      label: 'Billing Plan',
      route: 'profile-billing-plan'
    },
    {
      label: 'Payment methods',
      route: 'profile-billing-payment'
    },
    {
      label: 'Invoices',
      route: 'profile-billing-invoices'
    },
    {
      label: 'Billing address',
      route: 'profile-billing-address'
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
      <div className="container">
        <h4>Billing</h4>
        <Tabs initialSelectedIndex={this.getActiveSubTabIndex()}>
          <Tab
            label    = "Billing plan"
            route    = "profile-billing-plan"
            onActive = {this.handleTabActive}
          />
          <Tab
            label    = "Payment methods"
            route    = "profile-billing-payment"
            onActive = {this.handleTabActive}
          />
          <Tab
            label    = "Invoices"
            route    = "profile-billing-invoices"
            onActive = {this.handleTabActive}
          />
          <Tab
            label    = "Billing address"
            route    = "profile-billing-address"
            onActive = {this.handleTabActive}
          />
        </Tabs>
        <RouteHandler />
      </div>
    );
  }

});