var React = require('react'),

    MaterialIcon = require('../Icon/MaterialIcon.react');


module.exports = React.createClass({

  displayName: 'CheckIcon',

  propTypes: {
    id: React.PropTypes.string,
    icon: React.PropTypes.string,
    handleClick: React.PropTypes.func,
  },

  getInitialState: function () {
    return {
      hovered: false,
      checked: false,
      background: this.props.background,
    }
  },

  handleClick: function () {
    if (this.props.handleClick) {
      this.props.handleClick(this.props.id, !this.state.checked);
    }

    this.setState({
      checked: !this.state.checked,
    });
  },

  handleMouseOver: function () {
    this.setState({
      hovered: true,
    });
  },
  handleMouseLeave: function () {
    this.setState({
      hovered: false,
    });
  },

  getIconState: function () {

    var GREY = 'rgba(0,0,0,0.2)';

    // If icon is checked - background is grey and icon is 'check'
    if (this.state.checked) {
      return {icon: 'check', color: GREY};
    }

    // If icon is hovered background is grey and icon is 'check_box_outline_blank'
    if (this.state.hovered ) {
      return {icon: 'check_box_outline_blank', color: GREY};
    }

    // Otherwise we have original colorful icon
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
      <div
        style={style}
        onMouseOver={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}>
        <MaterialIcon name={iconState.icon} style={iconStyle}/>
      </div>
    )

  }
});