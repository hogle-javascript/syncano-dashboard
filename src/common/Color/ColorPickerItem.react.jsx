var React = require('react');

var Icon = require('../Icon/Icon.react');

require('./ColorPicker.css');

module.exports = React.createClass({

  displayName: 'ColorPickerItem',

  propTypes: {
    color: React.PropTypes.string,
    selected: React.PropTypes.bool,
    handleClick: React.PropTypes.func,
  },

  render: function () {
    var icon = this.props.selected ? <Icon icon="done" style={{width: '40px', height: '40px'}} /> : null;
    return (
      <div className="color-picker-list-item" style={{backgroundColor: this.props.color}} onClick={this.props.handleClick}>
        {icon}
      </div>
    );
  }

});