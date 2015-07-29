import React from 'react';
import Router from 'react-router';

import MUI from 'material-ui';
import Common from '../';

require('./AccountContainer.sass');

export default React.createClass({

  displayName: 'AccountContainer',

  mixins: [MUI.Mixins.StylePropable],

  propTypes: {
    style: React.PropTypes.object
  },

  getStyles() {
    var styles = {
      marginBottom: 50
    };
    return this.mergeStyles(styles, this.props.style);
  },

  render() {
    var styles = this.getStyles();

    return (
      <div
        className = "account-container"
        id        = {this.props.id}
        style     = {styles}
        ref       = {this.props.ref}>
        <div className="account-logo">
          <Router.Link to="login"><Common.Logo className="logo-blue" /></Router.Link>
        </div>
        <MUI.Paper
          className = "account-container__content"
          rounded    = {false}>
          {this.props.children}
        </MUI.Paper>
        {this.props.bottomContent}
      </div>
    )
  }
});
