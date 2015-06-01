var React = require('react'),

    MaterialIcon = require('../Icon/MaterialIcon.react');


module.exports = React.createClass({

  displayName: 'CheckIcon',

  propTypes: {
    icon: React.PropTypes.string,
    handleClick: React.PropTypes.func,
  },

  getInitialState: function () {
    return {
      'hovered': false,
      'checked': false,
      'background': this.props.background,
      'checkingState': this.props.checkingState || false,
    }
  },

  handleClick: function () {
    this.props.handleClick();
  },

  onCheck: function () {
    this.setState({
      checked: !this.state.checked,
    });
  },

  onOver: function () {
    this.setState({
      hovered: true,
    });
  },
  onOut: function () {
    this.setState({
      'hovered': false,
    });
  },

  getIconState: function () {

    var GREY = 'rgba(0,0,0,0.3)';

    if (this.state.checked) {
      return {icon: 'check', color: GREY};
    }

    if (this.state.checkingState || this.state.hovered ) {
      return {icon: 'check_box_outline_blank', color: GREY};
    }

    return {icon: this.props.icon, color: this.props.background};
  },

  render: function () {

    var style = {
      'width': '50px',
      'height': '50px',
    };

    var iconState = this.getIconState();

    var iconStyle = {
      backgroundColor: iconState.color,
      color: 'white',
      margin: '0 auto',
      borderRadius: '100%',
      padding: '12px',
    };

    return (
      <div style={style} onMouseOver={this.onOver} onMouseLeave={this.onOut} onClick={this.onCheck}>
        <MaterialIcon name={iconState.icon} style={iconStyle}/>
      </div>
    )

  }
});