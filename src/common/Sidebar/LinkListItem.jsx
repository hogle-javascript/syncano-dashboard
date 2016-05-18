import React from 'react';
import {withRouter} from 'react-router';
import ListItem from './ListItem';
import {Styles, Utils} from 'syncano-material-ui';

const LinkListItem = React.createClass({
  displayName: 'LinkListItem',

  contextTypes: {
    location: React.PropTypes.object,
    params: React.PropTypes.object
  },

  getStyles() {
    return {
      active: {
        color: Styles.Colors.blue400
      }
    };
  },

  getMenuItemHref(pathName) {
    const {params} = this.context;
    const {router} = this.props;

    return router.createHref({name: pathName, params});
  },

  handleTouchTap(pathName, event) {
    const {params} = this.context;
    const {router} = this.props;

    event.preventDefault();
    router.push({name: pathName, params});
  },

  render() {
    const styles = this.getStyles();
    const {routeName, style, router, ...other} = this.props;
    const {params} = this.context;
    const isActive = router.isActive({name: routeName, params}, true);

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

export default withRouter(LinkListItem);
