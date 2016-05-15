import React from 'react';
import {State, Navigation} from 'react-router';
import ListItem from './ListItem';
import {Styles, Utils} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'LinkListItem',

  mixins: [
    State,
    Navigation
  ],

  getStyles() {
    return {
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
    const styles = this.getStyles();
    const {routeName, style, ...other} = this.props;
    const isActive = this.isActive(routeName, this.getParams());

    return (
      <ListItem
        style={Utils.Styles.mergeStyles(style, isActive && styles.active)}
        onTouchTap={this.handleTouchTap.bind(null, routeName)}
        href={this.getMenuItemHref(routeName)}
        iconColor={isActive ? styles.active.color : null}
        {...other} />
    );
  }
});
