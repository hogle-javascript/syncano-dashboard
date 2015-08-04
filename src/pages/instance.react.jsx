import React from 'react';
import Router from 'react-router';

// Stores and Action
import SessionActions from '../apps/Session/SessionActions';

import MUI from 'material-ui';
import HeaderInstancesDropdown from '../apps/Header/HeaderInstancesDropdown.react';

module.exports = React.createClass({

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
    var params = this.getParams();
    if (params.instanceName) {
      SessionActions.fetchInstance(params.instanceName);
    }
  },

  getInitialState() {
    return {
      selectedIndex: 0,
      headerText: 'Profile',
    };
  },

  menuItems() {
    return [
      {type: MUI.MenuItem.Types.SUBHEADER, text: 'Modules'},
      {route: 'data', text: 'Data'},
      {route: 'classes', text: 'Classes'},
      {route: 'codeboxes', text: 'CodeBoxes'},
      {route: 'users', text: 'Users'},
      {route: 'channels', text: 'Channels'},
      {route: 'tasks', text: 'Tasks'},

      {type: MUI.MenuItem.Types.SUBHEADER, text: 'Settings'},
      {route: 'admins', text: 'Administrators'},
      {route: 'api-keys', text: 'API keys'},
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

  render: function() {
    return (
      <div>
        <MUI.LeftNav
          ref="leftNav"
          header={this.renderInstanceDropdown()}
          selectedIndex={this.state.selectedIndex || 0}
          style={{marginTop: 64, overflow: 'normal'}} menuItems={this.menuItems()}
          onChange={this.handleTabActive}/>

        <div style={{marginTop: 96, marginLeft: 204}}>
          <Router.RouteHandler />
        </div>
      </div>
    );
  }

});