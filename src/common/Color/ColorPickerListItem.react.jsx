var React = require('react');

//var ViewActions = require('../actions/ViewActions');

var Icon = require('../Icon/Icon.react');


module.exports = React.createClass({

  displayName: 'ColorPickerListItem',

  handleClick: function (e) {
    e.stopPropagation();
    ViewActions.selectModalColor(this.props.color);
  },

  render: function () {
    var icon = this.props.selected ? <Icon icon="done"/> : null;
    return (
      <div className="color-picker-list-item" style={{backgroundColor: this.props.color}} onClick={this.handleClick}>
        {icon}
      </div>
    );
  }

});