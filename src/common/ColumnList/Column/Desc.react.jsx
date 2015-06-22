var React       = require('react'),
    Radium      = require('radium'),
    Moment      = require('moment'),
    classNames  = require('classnames'),

    mui         = require('material-ui'),
    Paper       = mui.Paper,
    Colors      = mui.Styles.Colors;


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

module.exports = Radium(React.createClass({

  displayName: 'ColumnDesc',

  propTypes: {
    id: React.PropTypes.string,
    color: React.PropTypes.string.isRequired,
    hoverColor: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func
  },

  statics :{
    Header: Header
  },


  getDefaultProps: function() {
    return {
      color: 'rgba(0,0,0,.54)',
      hoverColor: Colors.blue600
    };
  },

  getInitialState: function () {
    return {
      color: this.props.color,
      hoverColor: this.props.hoverColor
    }
  },

  handleClick: function () {
    this.props.handleClick(this.props.id);
  },

  render: function () {
    var style = {
      display        : 'flex',
      flexDirection  : 'row',
      alignItems     : 'center',
      fontSize       : 12,
      lineHeight     : '16px',
      paddingTop     : 16,
      paddingBottom  : 16,
      wordBreak      : 'break-all',
      color          : this.props.color
    };

    return (
      <div
        className={cssClasses}
        style={style}>
        {this.props.children}
      </div>
    );

  }
}));
