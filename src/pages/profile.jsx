import React from 'react';
import {State, Navigation, RouteHandler} from 'react-router';

import {LeftNavMixin} from '../mixins';

import {Divider, LeftNav, List} from 'syncano-material-ui';
import Container from '../common/Container';
import {Lists} from '../common';

export default React.createClass({

  displayName: 'ProfileBilling',

  mixins: [
    LeftNavMixin,
    Navigation,
    State
  ],

  getStyles() {
    return {
      leftNav: {
        paddingTop: 50,
        zIndex: 7,
        overflow: 'visible',
        boxShadow: ''
      },
      menuItemStyleSubheader: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 12,
        paddingTop: 4,
        fontWeight: 800
      },
      content: {
        margin: '96px 24px 48px 284px'
      }
    };
  },

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <LeftNav
          className="left-nav"
          ref="leftNav"
          style={styles.leftNav}>
          <List subheader="Main Settings">
            <Lists.LinkListItem routeName="profile-settings" primaryText="Profile"/>
            <Lists.LinkListItem routeName="profile-authentication" primaryText="Authentication"/>
            <Lists.LinkListItem routeName="profile-invitations" primaryText="Invitations"/>
          </List>
          <Divider/>
          <List subheader="Billing">
            <Lists.LinkListItem routeName="profile-billing-plan" primaryText="Billing plan"/>
            <Lists.LinkListItem routeName="profile-billing-payment" primaryText="Payment methods"/>
            <Lists.LinkListItem routeName="profile-billing-invoices" primaryText="Invoices"/>
            <Lists.LinkListItem routeName="profile-billing-address" primaryText="Billing address"/>
          </List>
        </LeftNav>
        <Container style={styles.content}>
          <RouteHandler />
        </Container>
      </div>
    );
  }
});
