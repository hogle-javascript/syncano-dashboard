import React        from 'react';
import Router       from 'react-router';

import HeaderMixin  from '../apps/Header/HeaderMixin';

import MUI          from 'material-ui';
import Container    from '../common/Container';

export default React.createClass({

  displayName: 'ProfileBilling',

  mixins: [
    Router.Navigation,
    Router.State,
  ],

  getStyles() {
    return {
      subTabsHeader: {
        backgroundColor: 'transparent'
      },
      tabs: {
        width: 600,
        textAlign: 'left'
      },
      tab: {
        color: '#444',
        fontSize: '1.1rem'
      }
    }
  },

  getInitialState() {
    return {
      selectedIndex: 0,
      headerText: 'Profile',
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

    return {index: index, text: text};
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

    return (
      <div>
        <MUI.LeftNav
          ref="leftNav"
          selectedIndex={this.state.selectedIndex || 0}
          style={{marginTop: 64}} menuItems={this.menuItems()}
          onChange={this.handleTabActive}/>

        <Container.Profile headerText={this.state.headerText} style={{marginLeft: 304}}>
          <Router.RouteHandler />
        </Container.Profile>
      </div>
    );
  }
});
