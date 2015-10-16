import React from 'react';
import Router from 'react-router';

import {LeftNav} from '../mixins';

import MUI from 'material-ui';
import Container from '../common/Container';

export default React.createClass({

  displayName: 'ProfileBilling',

  mixins: [
    LeftNav,
    Router.Navigation,
    Router.State
  ],

  getStyles() {
    return {
      leftNav: {
        paddingTop: 64,
        zIndex: 7
      },
      menuItemStyleSubheader: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 12,
        paddingTop: 4,
        fontWeight: 800
      },
      content: {
        marginLeft: 304
      }
    };
  },

  getMenuItems() {
    return [
      {
        type: MUI.MenuItem.Types.SUBHEADER,
        text: 'Main Settings'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'profile-settings',
        payload: this.getMenuItemHref('profile-settings'),
        text: 'Profile'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'profile-authentication',
        payload: this.getMenuItemHref('profile-authentication'),
        text: 'Authentication'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'profile-invitations',
        payload: this.getMenuItemHref('profile-invitations'),
        text: 'Invitations'
      },
      {
        type: MUI.MenuItem.Types.SUBHEADER,
        text: 'Billing'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'profile-billing-plan',
        payload: this.getMenuItemHref('profile-billing-plan'),
        text: 'Billing plan'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'profile-billing-payment',
        payload: this.getMenuItemHref('profile-billing-payment'),
        text: 'Payment methods'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'profile-billing-invoices',
        payload: this.getMenuItemHref('profile-billing-invoices'),
        text: 'Invoices'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'profile-billing-address',
        payload: this.getMenuItemHref('profile-billing-address'),
        text: 'Billing address'
      }
    ];
  },

  render() {
    const styles = this.getStyles();
    let menuItems = this.getMenuItems();
    let activeTab = this.getActiveTab(menuItems, ['text']);

    return (
      <div>
        <MUI.LeftNav
          className="left-nav"
          ref="leftNav"
          menuItemStyleSubheader={styles.menuItemStyleSubheader}
          selectedIndex={activeTab.index}
          style={styles.leftNav}
          menuItems={menuItems}/>
        <Container.Profile
          headerText={activeTab.text}
          style={styles.content}>
          <Router.RouteHandler />
        </Container.Profile>
      </div>
    );
  }
});
