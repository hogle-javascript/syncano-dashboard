import React from 'react';
import {RouteHandler} from 'react-router';

import Header from '../apps/Header';
import {Sidebar} from '../common';

export default React.createClass({
  displayName: 'ProfileBilling',

  render() {
    return (
      <div className="row">
        <Sidebar>
          <Sidebar.List
            key="Main Settings"
            subheader="Main Settings">
            <Sidebar.LinkListItem
              key="Profile"
              routeName="profile-settings"
              primaryText="Profile"/>
            <Sidebar.LinkListItem
              key="Authentication"
              routeName="profile-authentication"
              primaryText="Authentication"/>
            <Sidebar.LinkListItem
              key="Invitations"
              routeName="profile-invitations"
              primaryText="Invitations"/>
          </Sidebar.List>
          <Sidebar.List
            key="Billing"
            subheader="Billing">
            <Sidebar.LinkListItem
              key="Billing plan"
              routeName="profile-billing-plan"
              primaryText="Billing plan"/>
            <Sidebar.LinkListItem
              key="Payment methods"
              routeName="profile-billing-payment"
              primaryText="Payment methods"/>
            <Sidebar.LinkListItem
              key="Invoices"
              routeName="profile-billing-invoices"
              primaryText="Invoices"/>
            <Sidebar.LinkListItem
              key="Billing address"
              routeName="profile-billing-address"
              primaryText="Billing address"/>
          </Sidebar.List>
        </Sidebar>
        <div className="col-flex-1">
          <Header />
          <RouteHandler />
        </div>
      </div>
    );
  }
});
