import React        from 'react';
import Router       from 'react-router';

import HeaderMixin  from '../apps/Header/HeaderMixin';

import MUI          from 'material-ui';
import Container    from '../common/Container';

let RouteHandler = Router.RouteHandler;

export default React.createClass({

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

  getStyles() {
    return {
      subTabsHeader: {
        backgroundColor: 'transparent'
      },
      tabs: {
        padding: '0 150px',
        borderBottom: '1px solid #DDDDDD'
      },
      tab: {
        color: '#444'
      },
    }
  },

  componentWillReceiveProps(nextProps, nextState) {
    this.refs.tabs.setState({selectedIndex: this.getActiveSubTabIndex()})
  },

  getActiveSubTabIndex() {
    let index = 0;
    this.subTabsItems.some((item, i) => {
      if (this.isActive(item.route, item.params, item.query)) {
        index = i;
        return true;
      }
    });

    return index;
  },

  handleTabActive(tab) {
    this.transitionTo(tab.props.route, tab.props.params);
  },

  render() {
    let styles = this.getStyles();
    return (
      <Container.Profile headerText='Billing'>
        <MUI.Tabs
          ref="tabs"
          style={styles.tabs}
          initialSelectedIndex={this.getActiveSubTabIndex()}
          tabItemContainerStyle={styles.subTabsHeader}>
          <MUI.Tab
            style={styles.tab}
            label="Billing plan"
            route="profile-billing-plan"
            onActive={this.handleTabActive}/>
          <MUI.Tab
            style={styles.tab}
            label="Payment methods"
            route="profile-billing-payment"
            onActive={this.handleTabActive}/>
          <MUI.Tab
            style={styles.tab}
            label="Invoices"
            route="profile-billing-invoices"
            onActive={this.handleTabActive}/>
          <MUI.Tab
            style={styles.tab}
            label="Billing address"
            route="profile-billing-address"
            onActive={this.handleTabActive}
            />
        </MUI.Tabs>
        <RouteHandler />
      </Container.Profile>
    );
  }
});
