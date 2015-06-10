var React      = require('react'),
    Moment     = require('moment'),
    classNames = require('classnames'),

    // Components
    Paper     = require('material-ui/lib/paper'),
    CheckIcon = require('../../../common/CheckIcon/CheckIcon.react');


// Same classes for column and it's header
var cssClasses = classNames('col', 's1'),

    // Move it later to some theme? Constants?
    DEFAULT_BACKGROUND = 'green',
    DEFAULT_ICON       = 'adjust';

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

  displayName: 'ColumnCheckIcon',

  propTypes: {
    id: React.PropTypes.string,
    color: React.PropTypes.string.isRequired,
    hoverColor: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func,
  },

  statics :{
    Header: Header,
  },

  getInitialState: function () {
    return {
      color: this.props.color,
      hoverColor: this.props.hoverColor,
    }
  },

  handleClick: function () {
    this.props.handleClick(this.props.id);
  },

  render: function () {
    var style = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      fontSize: 16,
      color: this.props.color,
    };

    return (
      <div
        className={cssClasses}
        style={style}
        onClick={this.handleClick}>
        <CheckIcon
            id          = {this.props.id}
            icon        = {this.props.icon || DEFAULT_ICON}
            background  = {this.props.background || DEFAULT_BACKGROUND}
            width       = {40}
            handleClick = {this.handleClick} />
      </div>
    );

  }
});