var React  = require('react'),
    Router = require('react-router'),

    mui    = require('material-ui'),
    Tabs   = mui.Tabs,
    Tab    = mui.Tab,
    Colors = mui.Styles.Colors;


module.exports = React.createClass({

  displayName: 'HeaderMenu',

  mixins: [
    Router.State
  ],

  getDefaultProps: function () {
    return {
      menuItems: []
    }
  },

  getActiveMenuItemIndex: function () {
    var index = 0;
    this.props.menuItems.some(function (item, i) {
      if (this.isActive(item.route, item.params, item.query)) {
        index = i;
        return true;
      }
    }.bind(this));

    return index;
  },

  handleTabActive: function (tab) {
    this.context.router.transitionTo(tab.props.route, tab.props.params);
  },

  getStyles: function() {
    return {
      menuContainer: {
        display         : '-webki-inline-flex; display: inline-flex',
        alignSelf       : 'flex-end'
      },
      menu: {
        backgroundColor : 'transparent',
        height          : 60
      },
      menuItemStyles: {
        color           : Colors.indigo500,
        fontWeight      : 400,
        fontSize        : 17,
        paddingLeft     : 10,
        paddingRight    : 10
      }
    }
  },

  renderMenuItem: function(tab, index) {
    var styles = this.getStyles();

    return (
      <Tab
        key      = {'menuItem-' + tab.route + '-' + index}
        label    = {tab.label}
        route    = {tab.route}
        params   = {tab.params}
        style    = {styles.menuItemStyles}
        onActive = {this.handleTabActive} />
    )
  },

  render: function () {
    var styles = this.getStyles();

    if (!this.props.menuItems.length === 0) {
      return null
    }

    return (
      <div style={styles.menuContainer}>
        <Tabs
          tabItemContainerStyle = {styles.menu}
          initialSelectedIndex  = {this.getActiveMenuItemIndex()}>
          {this.props.menuItems.map(this.renderMenuItem)}
        </Tabs>
      </div>
    );
  }

});
