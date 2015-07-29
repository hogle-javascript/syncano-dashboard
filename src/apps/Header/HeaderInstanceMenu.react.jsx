import React from 'react';
import Router from 'react-router';

import MUI from 'material-ui';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default React.createClass({

  displayName: 'HeaderInstanceMenu',

  mixins: [
    Router.Navigation,
    Router.State
  ],

  contextTypes: {
    router   : React.PropTypes.func.isRequired
  },

  getStyles: function() {
    return {
      color: '#fff',
      fill: '#fff'
    }
  },

  handleApiKeysClick: function() {
    this.transitionTo('api-keys', {instanceName: this.context.router.getCurrentParams().instanceName});
  },

  handleAdminsClick: function() {
    this.transitionTo('admins', {instanceName: this.context.router.getCurrentParams().instanceName});
  },

  renderMenuIcon: function() {
    var styles = this.getStyles();

    return (
      <MUI.IconButton
        iconStyle     = {styles}
        iconClassName = "synicon-cog" />
    )
  },

  render: function() {
    return (
      <MUI.IconMenu iconButtonElement={this.renderMenuIcon()}>
        <MenuItem onClick={this.handleAdminsClick}>Admins</MenuItem>
        <MenuItem onClick={this.handleApiKeysClick}>API Keys</MenuItem>
      </MUI.IconMenu>
    )
  }
});
