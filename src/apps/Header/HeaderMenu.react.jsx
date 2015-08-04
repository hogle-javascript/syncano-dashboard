import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';

import HeaderActions from './HeaderActions';
import HeaderStore from './HeaderStore';

import MUI from 'material-ui';

export default React.createClass({

  displayName: 'HeaderMenu',

  mixins: [
    Reflux.connect(HeaderStore),
    Router.State
  ],

  contextTypes: {
    router: React.PropTypes.func.isRequired,
    muiTheme: React.PropTypes.object
  },

  getActiveMenuItemIndex() {
    let index = 0;

    this.state.menuItems.some((item, i) => {
      if (this.isActive(item.route, item.params, item.query)) {
        index = i;
        return true;
      }
    });
    return index;
  },

  handleTabActive(tab) {
    this.context.router.transitionTo(tab.props.route, tab.props.params);
  },

  getStyles() {
    return {
      menuContainer: {
        display: '-webki-inline-flex; display: inline-flex',
        alignSelf: 'flex-end'
      },
      menu: {
        backgroundColor: 'transparent',
        height: 56
      },
      menuItemStyles: {
        color: this.context.muiTheme.palette.primary3Color,
        fontWeight: 400,
        fontSize: 17,
        paddingLeft: 10,
        paddingRight: 10
      }
    }
  },

  renderMenuItem(tab, index) {
    let styles = this.getStyles();

    return (
      <MUI.Tab
        key={'menuItem-' + tab.route + '-' + index}
        label={tab.label}
        route={tab.route}
        params={tab.params}
        style={styles.menuItemStyles}
        onActive={this.handleTabActive}/>
    )
  },

  render() {
    let styles = this.getStyles();

    if (this.state.menuItems.length === 0) {
      return null
    }

    return (
      <div style={styles.menuContainer}>
        <MUI.Tabs
          tabItemContainerStyle={styles.menu}
          initialSelectedIndex={this.getActiveMenuItemIndex()}>
          {this.state.menuItems.map(this.renderMenuItem)}
        </MUI.Tabs>
      </div>
    );
  }
});
