var React       = require('react'),
    Radium      = require('radium'),

    mui         = require('material-ui'),
    Paper       = mui.Paper,
    Colors      = mui.Styles.Colors;


var defaultClassName = 'col-flex-1';

var Header = React.createClass({

  getDefaultProps: function () {
    return {
      className : defaultClassName
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

  displayName: 'ColumnDesc',

  propTypes: {
    id          : React.PropTypes.string,
    color       : React.PropTypes.string.isRequired,
    hoverColor  : React.PropTypes.string.isRequired,
    handleClick : React.PropTypes.func
  },

  statics :{
    Header: Header
  },

  getDefaultProps: function() {
    return {
      color      : 'rgba(0,0,0,.54)',
      hoverColor : Colors.blue600,
      className  : defaultClassName
    };
  },

  getInitialState: function () {
    return {
      color      : this.props.color,
      hoverColor : this.props.hoverColor
    }
  },

  getStyles: function () {
    return {
      display        : 'flex',
      flexDirection  : 'row',
      alignItems     : 'center',
      fontSize       : 12,
      lineHeight     : '16px',
      paddingTop     : 16,
      paddingBottom  : 16,
      wordBreak      : 'break-all',
      color          : this.props.color
    }
  },

  handleClick: function () {
    this.props.handleClick(this.props.id);
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <div
        className = {this.props.className}
        style     = {styles}>
        {this.props.children}
      </div>
    );

  }
}));
