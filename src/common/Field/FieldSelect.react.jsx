var React = require('react');
var classNames = require('classnames');

//var ModalStore = require('../stores/ModalStore');
//var ViewActions = require('../actions/ViewActions');

var FieldSelectOption = require('./FieldSelectOption.react');
var Icon = require('../Icon/Icon.react');

require('./Field.css');

module.exports = React.createClass({

  displayName: 'FieldSelect',

  propTypes: {
    field: React.PropTypes.object.isRequired,
    //handleKeyUp: React.PropTypes.func.isRequired,
  },


  getInitialState: function () {
    return {
      selectedOptionName: this.props.field.value,
      errorText: null
    }
  },

  componentWillReceiveProps: function (nextProps) {
    if (nextProps.errorText !== this.state.errorText) {
      this.setState({errorText: nextProps.errorText})
    }
  },

  componentWillUpdate: function (nextProps, nextState) {
    if (nextState.selectedOptionName !== this.state.selectedOptionName) {
      ViewActions.clearError(this.props.field.name);
    }
  },

  onOptionClick: function (selectedOptionName) {
    this.setState({selectedOptionName: selectedOptionName})
  },

  toggleOptions: function () {
    ViewActions.updateVisibleOptions(this.props.field.name);
  },

  onClick: function (e) {
    e.stopPropagation();
    ViewActions.updateVisibleOptions(this.props.field.name);
  },

  onFocus: function () {
    ViewActions.updateVisibleOptions(this.props.field.name);
  },

  render: function () {
    var selectedOptionDisplayName;
    var fieldWithVisibleOptions = ModalStore.getModal().fieldWithVisibleOptions;
    var cssClasses = classNames('field-group', 'field-group-select', {
      'field-group-error': this.state.errorText,
      'field-options-visible': fieldWithVisibleOptions === this.props.field.name,
    });
    var options = this.props.field.options.map(function (option) {
      if (option.name === this.state.selectedOptionName) {
        selectedOptionDisplayName = option.displayName;
      }
      return <FieldSelectOption key={option.name} option={option} handleClick={this.onOptionClick}/>
    }.bind(this));
    return (
      <div className={cssClasses} onClick={this.toggleOptions}>
        <div className="field-label">{this.props.field.displayName}</div>
        <div className="field-input-group" onClick={this.onClick}>
          <div className="field-input" ref="input" onFocus={this.onFocus}>{selectedOptionDisplayName}</div>
          <Icon icon="menu-down"/>
        </div>
        <div className="field-error-text">{this.state.errorText}</div>
        <div className="field-options-group">
          {options}
        </div>
      </div>
    );
  }
});