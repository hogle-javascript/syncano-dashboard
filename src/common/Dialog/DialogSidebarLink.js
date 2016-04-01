import React from 'react';
import {Link, State, Navigation} from 'react-router';

export default React.createClass({
  displayName: 'DialogSidebarLink',

  mixins: [
    State,
    Navigation
  ],

  getStyles() {
    return {
      root: {
        fontWeight: 'bold',
        textDecoration: 'underline',
        color: 'rgba(68,68,68,.5)'
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const {to, children} = this.props;

    if (to.indexOf('http') >= 0) {
      return (
        <a
          href={to}
          style={styles.root}
          target="_blank">
          {children}
        </a>
    );}

    return (
      <Link
        to={to}
        params={this.getParams()}
        style={styles.root}>
          {children}
      </Link>
    );
  }
});
