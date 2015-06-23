var React              = require('react'),
    Radium             = require('radium'),
    ReactZeroClipboard = require('react-zeroclipboard'),
    ColumnListConstans = require('../ColumnListConstans'),

    mui                = require('material-ui'),
    Colors             = mui.Styles.Colors,
    Snackbar           = mui.Snackbar,
    Paper              = mui.Paper,
    FontIcon           = mui.FontIcon;


var Header = React.createClass({

  getDefaultProps: function () {
    return {
      className : ColumnListConstans.DEFAULT_CLASSNAME.KEY
    }
  },

  render: function () {
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
    color       : React.PropTypes.string.isRequired,
    handleClick : React.PropTypes.func
  },

  statics :{
    Header : Header
  },

  getDefaultProps: function() {
    return {
      color      : 'rgba(0,0,0,.54)',
      hoverColor : Colors.blue600,
      className  : ColumnListConstans.DEFAULT_CLASSNAME.KEY
    };
  },

  getInitialState: function () {
    return {
      color      : this.props.color,
      hoverColor : this.props.hoverColor
    }
  },

  getStyles: function() {
    return {
      key: {
        display       : 'flex',
        flexDirection : 'row',
        alignItems    : 'center',
        fontSize      : 14,
        lineHeight    : '16px',
        paddingTop    : 16,
        paddingBottom : 16
      },
      icon: {
        color: this.state.color
      }
    }
  },

  handleMouseOver: function (event) {
    this.setState({'color': this.props.hoverColor});
  },

  handleMouseLeave: function (event) {
    this.setState({'color': this.props.color});
  },

  handleClick: function (event) {
    this.setState({'color': this.props.color});
    this.refs.snackbar.show();
  },

  render: function () {
    var styles = this.getStyles();

    return (

      <div
        className   = {this.props.className}
        style       = {styles.key}>
          <div
            ref       = "key"
            className = "col-xs-28">
            {this.props.children}
          </div>

        <ReactZeroClipboard text={this.props.children}>
          <FontIcon
            onClick     = {this.handleClick}
            onMouseOver = {this.handleMouseOver}
            onMouseOut  = {this.handleMouseLeave}
            style       = {styles.icon}
            className   = "synicon-content-copy col-xs-4" />
        </ReactZeroClipboard>

        <Snackbar
          ref="snackbar"
          message="API key copied to the clipboard" />
      </div>

    );
  }

}));
