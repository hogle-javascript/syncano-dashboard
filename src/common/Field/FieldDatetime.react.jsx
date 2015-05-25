var React = require('react');
var classNames = require('classnames');

var Calendar = require('../Calendar/Calendar.react');
var Icon = require('../Icon/Icon.react');

require('./Field.css');

module.exports = React.createClass({

  displayName: 'FieldDatetime',

  getInitialState: function () {
    return {
      visible: true,
    };
  },

  handleOnClick: function () {
    this.setState({
      visible: !this.state.visible,
    })
  },

  render: function () {
    var iconStyle = {fill: "#000000", width: "16px", height: "16px"};
    var field = this.props.field;
    var cssClasses = classNames("field-group-" + field.name.split('_').join('-'), {
      'field-group': true,
      'field-group-large-text': this.props.field.largeText,
    });
    var calendarClasses = classNames({
      "calendar-field-visible": true,
      "calendar-field-hidden": this.state.visible,
    })
    return (
      <div className={cssClasses}>
        <div className="field-label">{field.displayName}</div>
        <div className="field-input" ref="input" contentEditable>{field.value}</div>
        <div className={calendarClasses} ref="calendar">
          <Calendar inputField={this.refs.input}/>
        </div>
        <Icon style={iconStyle} icon="arrow_down" handleClick={this.handleOnClick}/>
      </div>
    );
  }
});