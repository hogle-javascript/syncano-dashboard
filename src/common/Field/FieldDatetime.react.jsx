var React      = require('react'),
    classNames = require('classnames'),
    mui        = require('material-ui'),

    FontIcon   = mui.FontIcon,
    Field      = mui.TextField,
    Calendar   = require('../Calendar/Calendar.react');

//require('./Field.css');

module.exports = React.createClass({

  displayName: 'FieldDatetime',

  propTypes: {
    labelText  : React.PropTypes.string,
    dateFormat : React.PropTypes.string,
    fieldStyle : React.PropTypes.object
  },

  getDefaultProps: function () {
    return {
      labelText  : "Date",
      dateFormat : "YYYY-MM-DDThh:mm:ss.uuuuuuZ",
      iconColor  : "#0091EA",
      fieldStyle : {width: "100%"}
    };
  },

  getInitialState: function () {
    return {
      hidden: true
    };
  },

  handleClick: function (e) {
    this.setState({
      hidden: !this.state.hidden
    })
  },

  getIconStyle: function() {
    return {
      fill   : this.props.iconColor,
      width  : "16px",
      height : "16px",
      cursor : "pointer"
    }
  },

  render: function () {
    /*var field = this.props.field;
    var cssClasses = classNames("field-group-" + field.name.split('_').join('-'), {
      'field-group': false,
      'field-group-large-text': this.props.field.largeText,
    });*/
    var calendarClasses = classNames({
      "calendar-field-visible" : true,
      "calendar-field-hidden"  : this.state.hidden
    })
    return (
      <div> 
        <Field
          className         = "abc"
          ref               = "input"
          hintText          = {this.props.dateFormat}
          floatingLabelText = {this.props.labelText}
          style             = {this.props.fieldStyle} />
        <div className={calendarClasses} ref="calendar">
          <Calendar inputField={this.refs.input}/>
        </div>
        <FontIcon
          ref       = "icon"
          className = "synicon-arrow-down"
          onClick   = {this.handleClick} />
      </div>
    );
  }
});