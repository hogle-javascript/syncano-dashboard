var React      = require('react'),
    Moment     = require('moment'),
    classNames = require('classnames'),

    // Components
    Paper     = require('material-ui/lib/paper'),
    CheckIcon = require('../../../common/CheckIcon/CheckIcon.react');

// Move it later to some theme? Constants?
var DEFAULT_BACKGROUND = 'green',
    DEFAULT_ICON       = 'folder';

module.exports = React.createClass({

  displayName: 'ColumnCheckIcon',

  propTypes: {
    id: React.PropTypes.string,
    color: React.PropTypes.string.isRequired,
    hoverColor: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func
  },

  //statics :{
  //  Header: Header
  //},

  getInitialState: function () {
    return {
      color: this.props.color,
      hoverColor: this.props.hoverColor,
      checked: this.props.checked
    }
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({checked: newProps.checked})
  },

  handleClick: function (id, state) {
    console.info('ColumnCheckIcon:handleClick');
    this.props.handleClick(id, state);
  },

  render: function () {
    var styles = {
      display         : 'flex',
      flexDirection   : 'row',
      fontSize        : 12,
      padding         : '16px 8px',
      color           : this.props.color
    };

    return (
      <div style={styles}>
        <CheckIcon
            id          = {this.props.id}
            icon        = {this.props.icon || DEFAULT_ICON}
            background  = {this.props.background || DEFAULT_BACKGROUND}
            checked     = {this.state.checked}
            handleClick = {this.handleClick}
            />
      </div>
    );
  }
});