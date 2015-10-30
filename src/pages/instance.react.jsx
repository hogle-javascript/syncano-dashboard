import React from 'react';
import Router from 'react-router';

import {LeftNav} from '../mixins';

// Stores and Action
import SessionActions from '../apps/Session/SessionActions';
import InstanceDialogActions from '../apps/Instances/InstanceDialogActions';

import MUI from 'material-ui';
import HeaderInstancesDropdown from '../apps/Header/HeaderInstancesDropdown.react';
import InstanceDialog from '../apps/Instances/InstanceDialog.react';

export default React.createClass({

  displayName: 'Instance',

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [
    LeftNav,
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
        fontWeight: 800
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
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 24,
        backgroundColor: '#F2F2F2'
      }
    };
  },

  getMenuItems() {
    return [
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'sockets',
        payload: this.getMenuItemHref('sockets'),
        text: 'Sockets'
      },
      {
        type: MUI.MenuItem.Types.SUBHEADER,
        text: 'Instances'
      },
      {
        text: this.renderAddInstanceItem()
      },
      {
        type: MUI.MenuItem.Types.SUBHEADER,
        text: 'Modules'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'users',
        payload: this.getMenuItemHref('users'),
        text: 'Users & Groups'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'classes',
        payload: this.getMenuItemHref('classes'),
        text: 'Classes'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'codeboxes',
        payload: this.getMenuItemHref('codeboxes'),
        text: 'Snippets'
      },
      {
        type: MUI.MenuItem.Types.SUBHEADER,
        text: 'Settings'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'admins',
        payload: this.getMenuItemHref('admins'),
        text: 'Administrators'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'api-keys',
        payload: this.getMenuItemHref('api-keys'),
        text: 'API keys'
      }
    ];
  },

  showAddInstanceDialog() {
    InstanceDialogActions.showDialog();
  },

  redirectToNewInstance() {
    let instanceName = this.refs.addInstanceDialog.refs.name.getValue();

    SessionActions.fetchInstance(instanceName);
    this.transitionTo('instance', {instanceName});
  },

  renderAddInstanceItem() {
    let styles = this.getStyles();

    return (
      <div
        style={styles.addInstanceItem}
        onClick={this.showAddInstanceDialog}>
        <MUI.FontIcon
          style={this.getStyles().plusIcon}
          className="synicon-plus"/>
        <span>Add an Instance</span>
      </div>
    );
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
        <MUI.LeftNav
          className="left-nav"
          ref="leftNav"
          header={this.renderInstanceDropdown()}
          menuStyle={styles.menuStyle}
          menuItemStyleSubheader={styles.menuItemStyleSubheader}
          selectedIndex={this.getActiveTab(this.getMenuItems()).index}
          style={styles.leftNav}
          menuItems={this.getMenuItems()}/>
        <div style={styles.content}>
          <Router.RouteHandler />
        </div>
      </div>
    );
  }
});
