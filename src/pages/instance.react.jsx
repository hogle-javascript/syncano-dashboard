import React from 'react';
import Router from 'react-router';

// Stores and Action
import SessionActions from '../apps/Session/SessionActions';

import MUI from 'material-ui';
import HeaderInstancesDropdown from '../apps/Header/HeaderInstancesDropdown.react';

export default React.createClass({

  displayName: 'Instance',

  contextTypes: {
    router: React.PropTypes.func
  },

  mixins: [
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

  getActiveTabIndex() {
    let index = 1;

    this.menuItems().some((item, i) => {
      if (item.route && this.isActive(item.route, item.params, item.query)) {
        index = i;
        return true;
      }
    });

    return index;
  },

  getStyles() {
    return {
      leftNav: {
        paddingTop: 64,
        zIndex: 7,
        overflow: 'visible'
      },
      menuItemStyleSubheader: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 12,
        paddingTop: 4,
        fontWeight: 800
      },
      content: {
        margin: '96px 104px 48px 304px'
      }
    }
  },

  getMenuItemHref(route) {
    return this.makeHref(route, this.getParams());
  },

  menuItems() {
    return [
      {
        type: MUI.MenuItem.Types.SUBHEADER, text: 'Modules'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'webhooks',
        payload: this.getMenuItemHref('webhooks'),
        text: 'Webhooks'
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
        text: 'CodeBoxes'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'users',
        payload: this.getMenuItemHref('users'),
        text: 'Users'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'channels',
        payload: this.getMenuItemHref('channels'),
        text: 'Channels'
      },
      {
        type: MUI.MenuItem.Types.LINK,
        route: 'tasks',
        payload: this.getMenuItemHref('tasks'),
        text: 'Tasks'
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

  renderInstanceDropdown() {
    return (
      <div style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 24}}>
        <HeaderInstancesDropdown />
      </div>
    )
  },

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <MUI.LeftNav
          className="left-nav"
          ref="leftNav"
          header={this.renderInstanceDropdown()}
          menuItemStyleSubheader={styles.menuItemStyleSubheader}
          selectedIndex={this.getActiveTabIndex()}
          style={styles.leftNav}
          menuItems={this.menuItems()}/>
        <div style={styles.content}>
          <Router.RouteHandler />
        </div>
      </div>
    );
  }
});
