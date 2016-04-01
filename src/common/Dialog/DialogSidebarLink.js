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

    return (
      <Link
        to={this.props.to}
        params={this.getParams()}
        style={styles.root}/>
    );
  }
});
