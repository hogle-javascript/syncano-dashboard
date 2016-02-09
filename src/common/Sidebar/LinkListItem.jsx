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
    Navigation
  ],

  getStyles() {
    return {
      base: {
        fontSize: 14,
        lineHeight: '18px',
        color: '#4a4a4a'
      },
      active: {
        color: Styles.Colors.blue400
      },
      innerDivStyle: {
        padding: '10px 20px'
      },
      nestedListStyle: {
        paddingTop: 0,
        paddingBottom: 0,
        background: 'transparent'
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
    let {routeName, style, ...other} = this.props;
    let isActive = this.isActive(routeName, this.getParams());

    return (
      <ListItem
        style={Utils.Styles.mergeStyles(styles.base, style, isActive && styles.active)}
        innerDivStyle={styles.innerDivStyle}
        onTouchTap={this.handleTouchTap.bind(null, routeName)}
        href={this.getMenuItemHref(routeName)}
        nestedListStyle={styles.nestedListStyle}
        {...other}/>
    );
  }
});
