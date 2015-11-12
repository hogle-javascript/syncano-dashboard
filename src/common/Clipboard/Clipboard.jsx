import React from 'react';
import ReactZeroClipboard from 'react-zeroclipboard';
import SnackbarNotification from '../SnackbarNotification';
import {IconButton, FlatButton} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'Clipboard',

  mixins: [SnackbarNotification.Mixin],

  getDefaultProps() {
    return {
      snackbarAutoHideDuration: 1200
    };
  },

  handleClick(event) {
    event.preventDefault();
    event.stopPropagation();

    this.setSnackbarNotification({
      message: this.props.snackbarText,
      autoHideDuration: this.props.snackbarAutoHideDuration
    });
  },

  renderIcon() {
    return (
      <IconButton
        iconClassName="synicon-link-variant"
        style={this.props.style}
        iconStyle={this.props.iconStyle}
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
