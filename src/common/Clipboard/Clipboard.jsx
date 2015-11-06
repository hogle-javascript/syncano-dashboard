import React from 'react';
import ReactZeroClipboard from 'react-zeroclipboard';

import SnackbarNotification from '../SnackbarNotification';

import {IconButton, FlatButton} from 'syncano-material-ui';


export default React.createClass({
  displayName: 'Clipboard',

  mixins: [SnackbarNotification.Mixin],

  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setSnackbarNotification({
      message: this.props.snackbarText,
      autoHideDuration: 1200
    });
  },

  renderIcon() {
    return (
      <IconButton
        iconClassName="synicon-link-variant"
        tooltip={this.props.tooltipText}
        onClick={this.handleClick}/>
    );
  },

  renderButton() {
    return (
      <FlatButton
        label={this.props.text}
        primary={true}
        onClick={this.handleClick}/>
    );
  },

  renderContent() {
    let type = this.props.type;

    if (type === 'icon') {
      return this.renderIcon();
    }

    if (type === 'button') {
      return this.renderButton();
    }

    return (
      <div onClick={this.handleClick}>
        {this.props.children}
      </div>
    );
  },

  render() {
    return (
      <ReactZeroClipboard text={this.props.copyText}>
        {this.renderContent()}
      </ReactZeroClipboard>
    );
  }
});
