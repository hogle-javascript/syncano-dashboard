import React from 'react';
import Router from 'react-router';

// Stores and Action
import SessionActions from '../apps/Session/SessionActions';

import MUI from 'material-ui';
import HeaderInstancesDropdown from '../apps/Header/HeaderInstancesDropdown.react';

export default React.createClass({

  displayName: 'Instance',

  mixins: [
    Router.State,
    Router.Navigation
  ],

  contextTypes: {
    router: React.PropTypes.func
  },

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

  menuItems() {
    return [
      {type: MUI.MenuItem.Types.SUBHEADER, text: 'Modules'},
      {route: 'webhooks', text: 'Webhooks'},
      {route: 'classes', text: 'Classes'},
      {route: 'codeboxes', text: 'CodeBoxes'},
      {route: 'users', text: 'Users'},
      {route: 'channels', text: 'Channels'},
      {route: 'tasks', text: 'Tasks'},

      {type: MUI.MenuItem.Types.SUBHEADER, text: 'Settings'},
      {route: 'admins', text: 'Administrators'},
      {route: 'api-keys', text: 'API keys'}
    ];
  },

  renderInstanceDropdown() {
    return (
      <div style={{paddingTop: 10, paddingBottom: 10, paddingLeft: 24}}>
        <HeaderInstancesDropdown />
      </div>
    )
  },

  handleTabActive(event, index, obj) {
    this.transitionTo(obj.route, this.getParams());
    this.setState({headerText: obj.text, selectedIndex: index});
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
          menuItems={this.menuItems()}
          onChange={this.handleTabActive}/>

        <div style={styles.content}>
          <Router.RouteHandler />
        </div>
      </div>
    );
  }
});
