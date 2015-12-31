import React from 'react';
import {State, Navigation, RouteHandler} from 'react-router';

import Header from '../apps/Header';
import {Divider, List} from 'syncano-material-ui';
import {Lists, Sidebar} from '../common';

export default React.createClass({

  displayName: 'ProfileBilling',

  mixins: [
    Navigation,
    State
  ],

  getStyles() {
    return {
      menuStyle: {
        backgroundColor: 'rgba(245,245,245,0.30)'
      },
      listSubheader: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 12,
        paddingTop: 4,
        fontWeight: 800,
        paddingLeft: 16
      },
      content: {
        margin: '96px 24px 48px 284px'
      }
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div className="row">
        <Sidebar>
          <List
            style={styles.menuStyle}
            subheader="Main Settings"
            subheaderStyle={styles.listSubheader}>
            <Lists.LinkListItem routeName="profile-settings" primaryText="Profile"/>
            <Lists.LinkListItem routeName="profile-authentication" primaryText="Authentication"/>
            <Lists.LinkListItem routeName="profile-invitations" primaryText="Invitations"/>
          </List>
          <Divider/>
          <List
            style={styles.menuStyle}
            subheader="Billing"
            subheaderStyle={styles.listSubheader}>
            <Lists.LinkListItem routeName="profile-billing-plan" primaryText="Billing plan"/>
            <Lists.LinkListItem routeName="profile-billing-payment" primaryText="Payment methods"/>
            <Lists.LinkListItem routeName="profile-billing-invoices" primaryText="Invoices"/>
            <Lists.LinkListItem routeName="profile-billing-address" primaryText="Billing address"/>
          </List>
        </Sidebar>
        <div className="col-flex-1">
          <Header />
          <RouteHandler />
        </div>
      </div>
    );
  }
});
