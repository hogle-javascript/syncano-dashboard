import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import {IconButton, FlatButton, FontIcon} from 'material-ui';
import Tooltip from '../Tooltip';
import Truncate from '../Truncate';

export default React.createClass({
  displayName: 'Clipboard',

  renderIcon() {
    const {style, iconStyle, tooltip} = this.props;

    return (
      <IconButton
        iconClassName="synicon-link-variant"
        style={style}
        iconStyle={iconStyle}
        tooltip={tooltip} />
    );
  },

  renderButton() {
    const {label} = this.props;

    return (
      <FlatButton
        label={label}
        primary={true} />
    );
  },

  renderLink() {
    const {text, copyText, tooltip} = this.props;

    return (
      <div>
        <Tooltip label={tooltip}>
          <div style={{display: 'flex'}}>
            <Truncate text={text ? text : copyText} />
            <FontIcon
              color="#b8c0c9"
              style={{fontSize: '1.3em', paddingLeft: 10}}
              className="synicon-link-variant" />
          </div>
        </Tooltip>
      </div>
    );
  },

  renderContent() {
    const {type, children} = this.props;

    if (type === 'icon') {
      return this.renderIcon();
    }

    if (type === 'button') {
      return this.renderButton();
    }

    if (type === 'link') {
      return this.renderLink();
    }

    return <div>{children}</div>;
  },

  render() {
    const {copyText, onCopy} = this.props;

    return (
      <CopyToClipboard
        text={copyText}
        onCopy={onCopy}>
        {this.renderContent()}
      </CopyToClipboard>
    );
  }
});
