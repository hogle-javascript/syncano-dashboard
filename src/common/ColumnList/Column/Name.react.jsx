var React              = require('react'),
    Radium             = require('radium'),
    ColumnListConstans = require('../ColumnListConstans'),

    mui                = require('material-ui'),
    Paper              = mui.Paper,
    Colors             = mui.Styles.Colors;

var Header = React.createClass({
  getDefaultProps: function() {
    return {
      className : ColumnListConstans.DEFAULT_CLASSNAME.NAME
    }
  },

  getStyles: function() {
    return {
      fontSize    : 20,
      fontWeight  : 500
    }
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <div
        className = {this.props.className}
        style     = {styles}>
        {this.props.children}
      </div>
    )
  }
});

module.exports = Radium(React.createClass({

  displayName: 'ColumnName',

  propTypes: {
    id: React.PropTypes.string,
    color: React.PropTypes.string.isRequired,
    hoverColor: React.PropTypes.string.isRequired
  },

  statics :{
    Header: Header
  },

  getDefaultProps: function() {
    return {
      color      : 'rgba(0,0,0,.54)',
      hoverColor : Colors.blue600,
      className  : ColumnListConstans.DEFAULT_CLASSNAME.NAME
    };
  },

  getStyles: function() {
    return {
      display         : 'flex',
      flexDirection   : 'row',
      fontSize        : 12,
      padding         : '16px 8px',
      alignSelf       : 'center',
      cursor          : 'pointer',
      color           : this.state.color,
      ':hover' : {
        color : this.state.hoverColor
      }
    }
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <div
        className   = {this.props.className}
        style       = {styles}
      >
        {this.props.children}
      </div>
    );

  }
}));
