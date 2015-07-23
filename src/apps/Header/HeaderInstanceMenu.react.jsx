var React         = require('react'),
    Router        = require('react-router'),

    mui           = require('material-ui'),
    IconMenu      = mui.IconMenu,
    IconButton    = mui.IconButton,
    MenuItem      = require('material-ui/lib/menus/menu-item');

module.exports = React.createClass({

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
      <IconButton
        iconStyle     = {styles}
        iconClassName = "synicon-cog"
      />
    )
  },

  render: function() {
    return (
      <IconMenu iconButtonElement={this.renderMenuIcon()}>
        <MenuItem onClick={this.handleAdminsClick}>Admins</MenuItem>
        <MenuItem onClick={this.handleApiKeysClick}>API Keys</MenuItem>
      </IconMenu>
    )
  }
});
