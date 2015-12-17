import React from 'react';
import Router from 'react-router';

import {LeftNavMixin} from '../mixins';

// Stores and Action
import SessionActions from '../apps/Session/SessionActions';

import {LeftNav, List, ListItem, Divider} from 'syncano-material-ui';
import HeaderInstancesDropdown from '../apps/Header/HeaderInstancesDropdown';
import InstanceDialog from '../apps/Instances/InstanceDialog';

export default React.createClass({

  displayName: 'Instance',

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [
    LeftNavMixin,
    Router.State,
    Router.Navigation
  ],

  componentWillMount() {
    console.debug('Instance::componentWillMount');
    const params = this.getParams();

    if (params.instanceName) {
      SessionActions.fetchInstance(params.instanceName);
    }
  },

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
        fontWeight: 800,
        paddingLeft: 24
      },
      menuStyle: {
        backgroundColor: 'rgba(245,245,245,0.30)'
      },
      content: {
        margin: '96px 24px 48px 284px'
      },
      addInstanceItem: {
        fontSize: 14,
        display: 'flex; display: -ms-flexbox; display: -webkit-flex; display: flex;',
        alignItems: '-ms-flex-align: center; -webkit-align-items: center; align-items: center;'
      },
      plusIcon: {
        marginTop: '4px',
        color: 'rgba(0, 0, 0, 0.54)'
      },
      instanceDropdown: {
        height: 56,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 24,
        backgroundColor: '#F2F2F2'
      }
    };
  },

  redirectToNewInstance() {
    let instanceName = this.refs.addInstanceDialog.refs.name.getValue();

    SessionActions.fetchInstance(instanceName);
    this.transitionTo('instance', {instanceName});
  },

  renderInstanceDropdown() {
    return (
      <div style={this.getStyles().instanceDropdown}>
        <HeaderInstancesDropdown />
      </div>
    );
  },

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <InstanceDialog
          ref="addInstanceDialog"
          handleSubmit={this.redirectToNewInstance}/>
        <LeftNav
          open={true}
          className="left-nav"
          ref="leftNav"
          style={styles.leftNav}>
          <List>
            <ListItem desktop={true} route="sockets" payload={this.getMenuItemHref('sockets')} primaryText="Sockets"/>
          </List>
          <Divider/>
          <List subheader="Modules">
            <ListItem
              desktop={true} route="users" payload={this.getMenuItemHref('users')} primaryText="Users & Groups"/>
            <ListItem desktop={true} route="classes" payload={this.getMenuItemHref('classes')} primaryText="Classes"/>
            <ListItem
              desktop={true} route="snippets" payload={this.getMenuItemHref('snippets')} primaryText="Snippets"/>
          </List>
          <Divider/>
          <List subheader="Settings">
            <ListItem
              desktop={true}
              route="instance-edit" payload={this.getMenuItemHref('instance-edit')} primaryText="General"/>
            <ListItem
              desktop={true} route="admins" payload={this.getMenuItemHref('admins')} primaryText="Administrators"/>
            <ListItem
              desktop={true} route="api-keys" payload={this.getMenuItemHref('api-keys')} primaryText="API keys"/>
          </List>
        </LeftNav>
        <div style={styles.content}>
          <Router.RouteHandler />
        </div>
      </div>
    );
  }
});
