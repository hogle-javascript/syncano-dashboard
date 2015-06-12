var React       = require('react'),
    Moment      = require('moment'),
    classNames  = require('classnames'),

    Paper       = require('material-ui/lib/paper'),
    Colors      = require('material-ui/lib/styles/colors');


var cssClasses = classNames('col-xs-12');

var Header = React.createClass({
  render: function () {
    var styles = {
      fontSize    : 20,
      fontWeight  : 500
    };

    return (
      <div style={styles} className={cssClasses}>
        {this.props.children}
      </div>
    )
  }
});

module.exports = React.createClass({

  displayName: 'ColumnName',

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

  handleMouseOver: function () {
    this.setState({'color': this.props.hoverColor})
  },

  handleMouseLeave: function () {
    this.setState({'color': this.props.color})
  },

  handleClick: function () {
    this.props.handleClick(this.props.id);
  },

  render: function () {
    var style = {
      display         : 'flex',
      flexDirection   : 'row',
      fontSize        : 12,
      paddingTop      : 16,
      paddingBottom   : 16,
      alignSelf       : 'center',
      cursor          : 'pointer',
      color           : this.state.color
    };

    return (
      <div
        className   = {cssClasses}
        style       = {style}
        onMouseOver = {this.handleMouseOver}
        onMouseOut  = {this.handleMouseLeave}>
        {this.props.children}
      </div>
    );

  }
});