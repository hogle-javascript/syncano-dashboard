var React              = require('react'),
    Radium             = require('radium'),
    ReactZeroClipboard = require('react-zeroclipboard'),
    ColumnListConstans = require('../ColumnListConstans'),

    mui                = require('material-ui'),
    Colors             = mui.Styles.Colors,
    Snackbar           = mui.Snackbar,
    Paper              = mui.Paper,
    FlatButton         = mui.FlatButton;

var Header = React.createClass({

  getDefaultProps: function() {
    return {
      className : ColumnListConstans.DEFAULT_CLASSNAME.KEY
    }
  },

  render: function() {
    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    )
  }
});

module.exports = Radium(React.createClass({

  displayName: 'ColumnID',

  propTypes: {
    id          : React.PropTypes.string,
    handleClick : React.PropTypes.func
  },

  statics :{
    Header : Header
  },

  getDefaultProps: function() {
    return {
      className  : ColumnListConstans.DEFAULT_CLASSNAME.KEY
    };
  },

  getStyles: function() {
    return {
      key: {
        display       : 'flex',
        flexDirection : 'row',
        alignItems    : 'center',
        fontSize      : 14,
        lineHeight    : '16px',
        padding       : '16px 8px'
      }
    }
  },

  handleClick: function() {
    this.refs.snackbar.show();
  },

  render: function() {
    var styles = this.getStyles();

    return (

      <div
        className   = {this.props.className}
        style       = {styles.key}>
          <div
            ref = "key"
            className = "col-xs-25">
            {this.props.children}
          </div>

        <ReactZeroClipboard text={this.props.children}>
            <FlatButton
              label       = "COPY"
              primary     = {true}
              onClick     = {this.handleClick} />
        </ReactZeroClipboard>

        <Snackbar
          ref="snackbar"
          message="API key copied to the clipboard" />
      </div>

    );
  }

}));
