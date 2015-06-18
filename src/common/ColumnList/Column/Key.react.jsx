var React              = require('react'),
    Moment             = require('moment'),
    classNames         = require('classnames'),
    ReactZeroClipboard = require('react-zeroclipboard'),

    mui         = require('material-ui'),
    Colors      = require('material-ui/lib/styles/colors'),
    Snackbar    = mui.Snackbar,
    Paper       = mui.Paper,
    FontIcon    = mui.FontIcon;


// Same classes for column and it's header
var cssClasses = classNames('col-flex-1');

var Header = React.createClass({
  render: function () {
    return (
        <div className={cssClasses}>
          {this.props.children}
        </div>
    )
  }
});

module.exports = React.createClass({

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
      hoverColor : Colors.blue600
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: '14px',
        lineHeight: '16px',
        paddingTop: 16,
        paddingBottom: 16,
      },
      icon: {
        color: this.state.color
      }
    }
  },

  handleMouseOver: function (e) {
    this.setState({'color': this.props.hoverColor})
  },

  handleMouseLeave: function (e) {
    this.setState({'color': this.props.color})
  },

  handleClick: function (event) {
    this.setState({'color': this.props.color})
    this.refs.snackbar.show();
  },

  render: function () {

    return (

      <div
        className   = {cssClasses}
        style       = {this.getStyles().key}>
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
            style       = {this.getStyles().icon}
            className   = "synicon-content-copy col-xs-4" />
        </ReactZeroClipboard>

        <Snackbar ref="snackbar" message="API key copied to the clipboard" />
      </div>

    );

  }
});