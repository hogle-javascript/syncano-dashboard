import React from 'react';
import { withRouter } from 'react-router';
import ListItem from './ListItem';
import { colors as Colors } from 'material-ui/styles/';

const LinkListItem = React.createClass({
  displayName: 'LinkListItem',

  contextTypes: {
    location: React.PropTypes.object,
    params: React.PropTypes.object
  },

  getStyles() {
    return {
      active: {
        color: Colors.blue400
      }
    };
  },

  getMenuItemHref(routeName) {
    const { params } = this.context;
    const { router } = this.props;

    return router.createHref({ name: routeName, params });
  },

  handleTouchTap(routeName) {
    const { params } = this.context;
    const { router } = this.props;
    const isActive = router.isActive({ name: routeName, params }, true);

    if (isActive) {
      return;
    }

    router.push({ name: routeName, params });
  },

  render() {
    const styles = this.getStyles();
    const { routeName, style, router, ...other } = this.props;
    const { params } = this.context;
    const isActive = router.isActive({ name: routeName, params }, true);

    return (
      <ListItem
        style={{ ...style, ...(isActive && styles.active) }}
        onTouchTap={() => this.handleTouchTap(routeName)}
        onClick={(event) => event.preventDefault()}
        href={this.getMenuItemHref(routeName)}
        iconColor={isActive ? styles.active.color : null}
        {...other}
      />
    );
  }
});

export default withRouter(LinkListItem);
