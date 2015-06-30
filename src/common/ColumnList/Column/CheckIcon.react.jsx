var React              = require('react'),
    Radium             = require('radium'),
    ColumnListConstans = require('../ColumnListConstans'),

    mui                = require('material-ui'),
    Paper              = mui.Paper,
    Colors             = mui.Styles.Colors,

    CheckIcon          = require('../../../common/CheckIcon/CheckIcon.react'),
    NoCheckIcon        = require('../../../common/CheckIcon/NoCheckIcon.react');


var Header = React.createClass({

  getDefaultProps: function () {
    return {
      className : ColumnListConstans.DEFAULT_CLASSNAME.CHECK_ICON,
    }
  },

  getStyles: function() {
    return {
      fontSize    : 20,
      fontWeight  : 500,
      paddingLeft : 16
    }
  },

  render: function () {
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

  displayName: 'ColumnCheckIcon',

  propTypes: {
    id              : React.PropTypes.string,
    color           : React.PropTypes.string,
    hoverColor      : React.PropTypes.string,
    handleIconClick : React.PropTypes.func,
    handleNameClick : React.PropTypes.func
  },

  statics :{
    Header: Header
  },

  getDefaultProps: function () {
    return {
      color      : 'black',
      hoverColor : Colors.blue600,
      className  : ColumnListConstans.DEFAULT_CLASSNAME.CHECK_ICON,
      checkable  : true,
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
        display        : 'flex',
        flexDirection  : 'row',
        alignItems     : 'center',
        fontSize       : 12,
        padding        : '16px 8px'
      },
      name: {
        fontSize       : 16,
        lineHeight     : '20px',
        display        : 'flex',
        flexDirection  : 'column',
        justifyContent : 'center',
        wordBreak      : 'break-all',
        pointerEvents  : 'none',
        color          : this.state.color
      },
      link: {
        cursor         : 'pointer',
        pointerEvents  : 'auto',
        ':hover'       : {
          color        : this.props.hoverColor
        }
      }
    }
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({checked: newProps.checked});
  },

  handleIconClick: function (id, state) {
    console.info('ColumnCheckIcon:handleClick');
    this.props.handleIconClick(id, state);
  },

  handleNameClick: function() {
    console.info('ColumnCheckIcon:handleClick');
    if (typeof this.props.handleNameClick === 'function') {
      this.props.handleNameClick(this.props.id);
    }
  },

  getIcon: function() {
    if (this.props.checkable === true) {
      return <CheckIcon
               id          = {this.props.id}
               icon        = {this.props.icon || ColumnListConstans.DEFAULT_ICON}
               background  = {this.props.background || ColumnListConstans.DEFAULT_BACKGROUND}
               checked     = {this.state.checked}
               handleClick = {this.handleIconClick} />
    }
    return <NoCheckIcon
             id          = {this.props.id}
             icon        = {this.props.icon || ColumnListConstans.DEFAULT_ICON}
             background  = {this.props.background || ColumnListConstans.DEFAULT_BACKGROUND} />
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <div
        className = {this.props.className}
        style     = {styles.container}>
        {this.getIcon()}
        <div
          style       = {[styles.name, this.props.handleNameClick && styles.link]}
          onClick     = {this.handleNameClick}
          onMouseOver = {this.handleMouseOver}
          onMouseOut  = {this.handleMouseLeave}>
          {this.props.children}
        </div>
      </div>
    );
  }
}));
