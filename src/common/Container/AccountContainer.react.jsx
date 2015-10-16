import React from 'react';
import Router from 'react-router';

import MUI from 'material-ui';
import Common from '../';

import './AccountContainer.sass';

export default React.createClass({

  displayName: 'AccountContainer',

  propTypes: {
    style: React.PropTypes.object
  },

  mixins: [MUI.Mixins.StylePropable],

  getStyles() {
    let styles = {
      marginBottom: 50
    };

    return this.mergeStyles(styles, this.props.style);
  },

  render() {
    let styles = this.getStyles();

    return (
      <div
        className="account-container"
        id={this.props.id}
        style={styles}
        ref={this.props.ref}>
        <div className="account-logo">
          <Router.Link to="login"><Common.Logo className="logo-blue"/></Router.Link>
        </div>
        <MUI.Paper
          className="account-container__content"
          rounded={false}>
          {this.props.children}
        </MUI.Paper>
        {this.props.bottomContent}
      </div>
    );
  }
});
