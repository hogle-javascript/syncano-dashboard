var React              = require('react'),
    Radium             = require('radium'),
    Moment             = require('moment'),
    ColumnListConstans = require('../ColumnListConstans'),

    mui                = require('material-ui'),
    Paper              = mui.Paper,
    Colors             = mui.Styles.Colors;

var Header = React.createClass({

  getDefaultProps: function() {
    return {
      className : ColumnListConstans.DEFAULT_CLASSNAME.DATE
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

  displayName: 'ColumnDate',

  propTypes: {
    color : React.PropTypes.string,
    date  : React.PropTypes.string
  },

  statics :{
    Header : Header
  },

  getDefaultProps: function() {
    return {
      color      : 'rgba(0,0,0,.54)',
      className  : ColumnListConstans.DEFAULT_CLASSNAME.DATE
    };
  },

  getStyles: function() {
    return {
      display        : 'flex',
      flexDirection  : 'column',
      justifyContent : 'center',
      fontSize       : '12px',
      lineHeight     : '16px',
      padding        : '16px 8px',
      color          : this.props.color
    };
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <div
        className = {this.props.className}
        style     = {styles}>
        <span>{Moment(this.props.date).format('DD/MM/YYYY')}</span>
        <span>{Moment(this.props.date).format('LTS')}</span>
      </div>
    );

  }
}));
