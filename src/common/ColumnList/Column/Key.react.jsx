import React from 'react';
import Radium from 'radium';
import ReactZeroClipboard from 'react-zeroclipboard';
import ColumnListConstans from '../ColumnListConstans';

import MUI from 'syncano-material-ui';
import SnackbarNotificationMixin from '../../SnackbarNotification/SnackbarNotificationMixin';

export default Radium(React.createClass({

  displayName: 'ColumnKey',

  propTypes: {
    id: React.PropTypes.string,
    handleClick: React.PropTypes.func
  },

  mixins: [SnackbarNotificationMixin],

  getDefaultProps() {
    return {
      className: ColumnListConstans.DEFAULT_CLASSNAME.KEY
    };
  },

  getStyles() {
    return {
      key: {
        display: '-webkit-flex; display: flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 14,
        lineHeight: '16px',
        padding: ColumnListConstans.DEFAULT_CELL_PADDING
      }
    };
  },

  handleClick() {
    this.setSnackbarNotification({
      message: 'API key copied to the clipboard',
      autoHideDuration: 1200
    });
  },

  render() {
    let styles = this.getStyles();

    return (
      <div
        className={this.props.className}
        style={styles.key}>

        <div
          ref="key"
          className="col-xs-25">
          {this.props.children}
        </div>

        <ReactZeroClipboard text={this.props.children}>
          <MUI.FlatButton
            label="COPY"
            primary={true}
            onClick={this.handleClick}/>
        </ReactZeroClipboard>
      </div>
    );
  }
}));
