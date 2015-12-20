import React from 'react';
import {State, Navigation} from 'react-router';
import {ListItem, Utils, Styles} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'LinkListItem',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [
    State,
    Navigation,
    Utils
  ],

  getStyles() {
    return {
      base: {
        fontSize: 14
      },
      active: {
        color: Styles.Colors.blue400
      }
    };
  },

  getMenuItemHref(route) {
    return this.makeHref(route, this.getParams());
  },

  handleTouchTap(routeName, event) {
    event.preventDefault();
    this.transitionTo(routeName, this.getParams());
  },

  render() {
    let styles = this.getStyles();
    let {routeName, ...other} = this.props;
    let isActive = this.isActive(routeName, this.getParams());

    return (
      <ListItem
        style={this.Styles.mergeAndPrefix(styles.base, isActive && styles.active)}
        onTouchTap={this.handleTouchTap.bind(null, routeName)}
        desktop={true}
        href={this.getMenuItemHref(routeName)}
        {...other}/>
    );
  }
});
