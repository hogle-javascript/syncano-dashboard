var React         = require('react'),
    Router        = require('react-router'),
    RouteHandler  = Router.RouteHandler,

    HeaderMixin   = require('../apps/Header/HeaderMixin'),

    MUI           = require('material-ui'),
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

  getStyles: function() {
    return {
      subTabsHeader: {
        backgroundColor: 'transparent'
      },
      tabs: {
        paddingLeft: 150,
        paddingRight: 150,
        borderBottom: '1px solid #DDDDDD'
      },
      tab: {
        color: '#444'
      },
    }
  },

  getActiveSubTabIndex: function() {
    var index = 0;
    this.subTabsItems.some(function(item, i) {
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
    let styles = this.getStyles();
    return (
      <Container.Profile headerText='Billing'>
        <MUI.Tabs
          style={styles.tabs}
          initialSelectedIndex = {this.getActiveSubTabIndex()}
          tabItemContainerStyle = {styles.subTabsHeader}>
          <MUI.Tab
            style    = {styles.tab}
            label    = "Billing plan"
            route    = "profile-billing-plan"
            onActive = {this.handleTabActive} />
          <MUI.Tab
            style    = {styles.tab}
            label    = "Payment methods"
            route    = "profile-billing-payment"
            onActive = {this.handleTabActive} />
          <MUI.Tab
            style    = {styles.tab}
            label    = "Invoices"
            route    = "profile-billing-invoices"
            onActive = {this.handleTabActive} />
          <MUI.Tab
            style    = {styles.tab}
            label    = "Billing address"
            route    = "profile-billing-address"
            onActive = {this.handleTabActive}
          />
        </MUI.Tabs>
        <RouteHandler />
      </Container.Profile>
    );
  }
});
