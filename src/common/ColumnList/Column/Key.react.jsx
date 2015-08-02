import React from 'react';
import Radium from 'radium';
import ReactZeroClipboard from 'react-zeroclipboard';
import ColumnListConstans from '../ColumnListConstans';

import MUI from 'material-ui';

let Header = React.createClass({

  getDefaultProps() {
    return {
      className : ColumnListConstans.DEFAULT_CLASSNAME.KEY
    }
  },

  render() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
});

export default Radium(React.createClass({

  displayName: 'ColumnID',

  propTypes: {
    id          : React.PropTypes.string,
    handleClick : React.PropTypes.func
  },

  statics :{
    Header : Header
  },

  getDefaultProps() {
    return {
      className  : ColumnListConstans.DEFAULT_CLASSNAME.KEY
    };
  },

  getStyles() {
    return {
      key: {
        display       : '-webkit-flex; display: flex',
        flexDirection : 'row',
        alignItems    : 'center',
        fontSize      : 14,
        lineHeight    : '16px',
        padding       : '16px 8px'
      }
    }
  },

  handleClick() {
    this.refs.snackbar.show();
  },

  render() {
    var styles = this.getStyles();

    return (
      <div
        className   = {this.props.className}
        style       = {styles.key}>
        <div
          ref       = "key"
          className = "col-xs-25">
          {this.props.children}
        </div>

        <ReactZeroClipboard text={this.props.children}>
          <MUI.FlatButton
            label       = "COPY"
            primary     = {true}
            onClick     = {this.handleClick} />
        </ReactZeroClipboard>

        <MUI.Snackbar
          ref="snackbar"
          message="API key copied to the clipboard" />
      </div>
    );
  }
}));
