var React       = require('react'),
    Radium      = require('radium'),
    Moment      = require('moment'),
    classNames  = require('classnames'),

    mui         = require('material-ui'),
    Paper       = mui.Paper,
    Colors      = mui.Styles.Colors;


// Same classes for column and it's header
var cssClasses = classNames('col-xs-2');

var Header = React.createClass({
  render: function () {
    return (
        <div className={cssClasses}>
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
      display        : 'flex',
      flexDirection  : 'column',
      fontSize       : '12px',
      lineHeight     : '16px',
      justifyContent : 'center',
      paddingTop     : 16,
      paddingBottom  : 16,
      color          : this.props.color
    };
  },

  handleClick: function () {
    this.props.handleClick(this.props.id);
  },

  render: function () {

    return (
      <div
        className = {cssClasses}
        style     = {this.getStyles()}>
        <span>{this.props.children}</span>
      </div>
    );

  }
}));
