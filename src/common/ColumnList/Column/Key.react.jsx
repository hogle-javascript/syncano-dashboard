import React from 'react';
import Radium from 'radium';
import ColumnListConstans from '../ColumnListConstans';

import Clipboard from '../../Clipboard';

export default Radium(React.createClass({

  displayName: 'ColumnKey',

  propTypes: {
    id: React.PropTypes.string,
    handleClick: React.PropTypes.func
  },

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
        padding: '16px 8px'
      }
    };
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

        <Clipboard
          type="button"
          text="COPY"
          copyText={this.props.children}
          snackbarText="API key copied to the clipboard"/>
      </div>
    );
  }
}));
