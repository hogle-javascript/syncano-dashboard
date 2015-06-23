var React  = require('react'),

    mui    = require('material-ui'),
    Colors = mui.Styles.Colors;


module.exports = React.createClass({

  displayName: 'ColNameDesc',

  propTypes: {
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    description: React.PropTypes.string,
    color: React.PropTypes.string.isRequired,
    hoverColor: React.PropTypes.string.isRequired,
    handleClick: React.PropTypes.func
  },

  getDefaultProps: function() {
    return {
      color: '#999',
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

    return (
      <div
        style={{color: this.state.color}}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseLeave}
        onClick={this.handleClick}>
        <div style={{fontSize: '16px'}}>{this.props.name}</div>
        <div style={{fontSize: '13px', opacity: '0.7'}}>{this.props.description}</div>
      </div>
    )
  }
});