import React from 'react';
import Router from 'react-router';

import HeaderMixin from '../apps/Header/HeaderMixin';

import MUI from 'material-ui';
import Container from '../common/Container';

export default React.createClass({

  displayName: 'ProfileBilling',

  mixins: [
    Router.Navigation,
    Router.State
  ],

  getInitialState() {
    return {
      selectedIndex: 0,
      headerText: 'Profile'
    };
  },

  componentWillMount() {
    let activeView = this.getActiveView();

    this.setState({
      selectedIndex: activeView.index,
      headerText: activeView.text
    })
  },

  getActiveView() {
    let index = 0;
    let text = null;

    this.menuItems().some((item, i) => {
      if (item.route) {
        if (this.isActive(item.route, item.params, item.query)) {
          index = i;
          text = item.text;
          return true;
        }
      }
    });

    return {index, text};
  },

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
    }
  },

  handleTabActive(event, index, obj) {
    this.transitionTo(obj.route);
    this.setState({headerText: obj.text, selectedIndex: index});
  },

  menuItems() {
    return [
      {type: MUI.MenuItem.Types.SUBHEADER, text: 'Main Settings'},
      {route: 'profile-settings', text: 'Profile'},
      {route: 'profile-authentication', text: 'Authentication'},
      {route: 'profile-invitations', text: 'Invitations'},

      {type: MUI.MenuItem.Types.SUBHEADER, text: 'Billing'},
      {route: 'profile-billing-plan', text: 'Billing plan'},
      {route: 'profile-billing-payment', text: 'Payment methods'},
      {route: 'profile-billing-invoices', text: 'Invoices'},
      {route: 'profile-billing-address', text: 'Billing address'}
    ];
  },

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <MUI.LeftNav
          className="left-nav"
          ref="leftNav"
          menuItemStyleSubheader={styles.menuItemStyleSubheader}
          selectedIndex={this.state.selectedIndex || 0}
          style={styles.leftNav}
          menuItems={this.menuItems()}
          onChange={this.handleTabActive}/>

        <Container.Profile
          headerText={this.state.headerText}
          style={styles.content}>
          <Router.RouteHandler />
        </Container.Profile>
      </div>
    );
  }
});
