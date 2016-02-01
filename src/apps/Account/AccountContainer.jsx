import React from 'react';
import {Link} from 'react-router';

import {Utils, Paper} from 'syncano-material-ui';
import {Logo} from '../../common/';

import './AccountContainer.sass';

export default React.createClass({
  displayName: 'AccountContainer',

  propTypes: {
    style: React.PropTypes.object
  },

  mixins: [Utils.Styles],

  getStyles() {
    let styles = {
      marginBottom: 50
    };

    return this.mergeStyles(styles, this.props.style);
  },

  render() {
    const styles = this.getStyles();
    const {id, bottomContent, children} = this.props;

    return (
      <div
        className="col-lg-15 account-container"
        id={id}
        style={styles}>
        <div className="account-logo">
          <Link to="login"><Logo className="logo-blue"/></Link>
        </div>
        <Paper
          className="account-container__content"
          rounded={false}>
          {children}
        </Paper>
        {bottomContent}
      </div>
    );
  }
});
