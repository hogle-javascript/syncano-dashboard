var React       = require('react');
var classNames  = require('classnames');

//var ViewActions = require('../actions/ViewActions');

require('./Field.css');

module.exports = React.createClass({

  displayName: 'Field',

  getInitialState: function() {
    return {
      value: this.props.field.value,
      errorText: null
    }
  },

  componentWillReceiveProps: function(nextProps) {
    if (nextProps.errorText !== this.state.errorText) {
      this.setState({
        errorText: nextProps.errorText
      })
    }
  },

  shouldComponentUpdate: function(nextProps, nextState) {
    return nextProps.value !== this.props.value || nextState.errorText !== this.state.errorText;
  },

  handleKeyUp: function() {
    ViewActions.clearError(this.props.field.name);
  },

  resizeHeight: function(e) {
    e.target.style.height = 'auto';
    e.target.style.height = e.target.scrollHeight + 'px';
    e.target.scrollTop = e.target.scrollHeight;
  },

  render: function() {
    var input;
    if (this.props.field.name === "schema" || this.props.field.name === "source") {
      input = <textarea onChange={this.resizeHeight} className="field-input" ref="input" onKeyUp={this.handleKeyUp}>{this.props.field.value}</textarea>
    } else {
      input = <div className="field-input" ref="input" contentEditable onKeyUp={this.handleKeyUp}>{this.props.field.value}</div>
    };
    var field = this.props.field;
    var cssClasses = classNames("field-group-" + field.name.split('_').join('-'), {
      'field-group': true,
      'field-group-large-text': this.props.field.largeText,
      'field-group-error': this.state.errorText,
    });
    return (
      <div className={cssClasses}>
        <div className="field-label">{field.displayName}</div>
        {input}
        <div className="field-error-text">{this.state.errorText}</div>
      </div>
    );
  }
});