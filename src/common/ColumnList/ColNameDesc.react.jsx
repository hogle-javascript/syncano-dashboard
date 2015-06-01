var React = require('react');


module.exports = React.createClass({

  displayName: 'ColNameDesc',

  propTypes: {
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string.isRequired,
    color: React.PropTypes.string.isRequired,
    hoverColor: React.PropTypes.string.isRequired,
    handleOnClick: React.PropTypes.func,
  },

  getDefaultProps: function() {
    return {
      color: '#999',
      hoverColor: '#0091EA',
    };
  },

  getInitialState: function () {
    return {
      color: this.props.color,
      hoverColor: this.props.hoverColor,
    }
  },

  onOver: function () {
    this.setState({'color': this.props.hoverColor})
  },

  onOut: function () {
    this.setState({'color': this.props.color})
  },

  render: function () {

    return (
      <div style={{color: this.state.color}} onMouseOver={this.onOver} onMouseOut={this.onOut} onClick={this.props.handleOnClick}>
        <div style={{fontSize: '16px'}}>{this.props.name}</div>
        <div style={{fontSize: '13px', opacity: '0.7'}}>{this.props.description}</div>
      </div>
    )
  }
});