var React      = require('react'),
    Moment     = require('moment'),
    classNames = require('classnames'),

    // Components
    Paper     = require('material-ui/lib/paper'),
    Colors    = require('material-ui/lib/styles/colors'),
    CheckIcon = require('../../../common/CheckIcon/CheckIcon.react');

// Move it later to some theme? Constants?
var DEFAULT_BACKGROUND = 'green',
    DEFAULT_ICON       = 'folder';

var cssClasses = classNames('col-xs-12');

var Header = React.createClass({
  render: function () {
    var styles = {
      fontSize    : 20,
      fontWeight  : 500,
    };

    return (
      <div style={styles} className={cssClasses}>
        {this.props.children}
      </div>
    )
  }
});

module.exports = React.createClass({

  displayName: 'ColumnCheckIcon',

  propTypes: {
    id: React.PropTypes.string,
    color: React.PropTypes.string,
    hoverColor: React.PropTypes.string,
    handleIconClick: React.PropTypes.func,
    handleNameClick: React.PropTypes.func
  },

  statics :{
    Header: Header
  },

  getDefaultProps: function () {
    return {
      color      : 'black',
      hoverColor : '#0091EA',
    }
  },

  getInitialState: function () {
    return {
      checked    : this.props.checked
    }
  },

  getStyles: function() {
    return {
      container: {
        display         : 'flex',
        flexDirection   : 'row',
        fontSize        : 12,
        padding         : '16px 8px',
      },
      name: {
        marginLeft     : 16,
        fontSize       : 16,
        display        : 'flex',
        flexDirection  : 'column',
        justifyContent : 'center',
        color          : this.state.color
      }
    };
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({checked: newProps.checked})
  },

  handleIconClick: function (id, state) {
    console.info('ColumnCheckIcon:handleClick');
    this.props.handleIconClick(id, state);
  },

  handleNameClick: function() {
    console.info('ColumnCheckIcon:handleClick');
    this.props.handleNameClick(this.props.id);
  },

  handleMouseOver: function () {
    console.info('ColumnCheckIcon::handleMouseOver')
    this.setState({'color': this.props.hoverColor})
  },

  handleMouseLeave: function () {
    console.info('ColumnCheckIcon::handleMouseLeave');
    this.setState({'color': this.props.color})
  },


  render: function () {

    var styles = this.getStyles();

    return (
      <div className={cssClasses} style={styles.container}>
        <CheckIcon
            id          = {this.props.id}
            icon        = {this.props.icon || DEFAULT_ICON}
            background  = {this.props.background || DEFAULT_BACKGROUND}
            checked     = {this.state.checked}
            handleClick = {this.handleIconClick}
            />
        <div
          style       = {styles.name}
          onClick     = {this.handleNameClick}
          onMouseOver = {this.handleMouseOver}
          onMouseOut  = {this.handleMouseLeave}>
          {this.props.children}
        </div>
      </div>
    );
  }
});