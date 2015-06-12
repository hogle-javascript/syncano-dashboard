var React       = require('react'),
    Moment      = require('moment'),
    classNames  = require('classnames'),
    Paper       = require('material-ui/lib/paper');

// Same classes for column and it's header
var cssClasses = classNames('col-xs-3');

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

  displayName: 'ColumnDate',

  propTypes: {
    id: React.PropTypes.string,
    color: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func
  },

  statics :{
    Header: Header
  },

  getDefaultProps: function() {
    return {
      color: 'rgba(0,0,0,.54)',
      hoverColor: '#0091EA'
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
    var now = Moment().format();

    var style = {
      display        : 'flex',
      flexDirection  : 'column',
      fontSize       : '12px',
      lineHeight     : '16px',
      paddingTop     : 16,
      paddingBottom  : 16,
      color          : this.props.color
    };

    return (
      <div
        className = {cssClasses}
        style     = {style}
        onClick   = {this.handleClick}>
        {Moment(this.props.children).format('DD/MM/YYYY LTS')}
      </div>

    );

  }
});