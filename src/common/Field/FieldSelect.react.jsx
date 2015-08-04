let React = require('react'),
  classNames = require('classnames'),
  mui = require('material-ui'),

  FieldSelectOption = require('./FieldSelectOption.react'),
  FontIcon = mui.FontIcon;

require('./Field.css');

module.exports = React.createClass({

  displayName: 'FieldSelect',

  propTypes: {
    field: React.PropTypes.shape({
      displayName: React.PropTypes.string,
      name: React.PropTypes.string,
      options: React.PropTypes.arrayOf(React.PropTypes.object),
      type: React.PropTypes.string,
    }),
    //handleKeyUp: React.PropTypes.func.isRequired,
  },


  getInitialState() {
    return {
      optionsVisible: false,
      selectedOptionName: this.props.field.value
    }
  },

  onOptionClick(selectedOptionName) {
    this.setState({
      selectedOptionName: selectedOptionName,
      optionsVisible: !this.state.optionsVisible
    })
  },

  toggleOptions() {
    //ViewActions.updateVisibleOptions(this.props.field.name);
  },

  onClick(e) {
    e.stopPropagation();
    //ViewActions.updateVisibleOptions(this.props.field.name);
    this.setState({
      optionsVisible: !this.state.optionsVisible
    })
  },

  onFocus() {
    //ViewActions.updateVisibleOptions(this.props.field.name);
    this.setState({
      optionsVisible: !this.state.optionsVisible
    })
  },

  render() {
    let selectedOptionDisplayName;
    //let fieldWithVisibleOptions = ModalStore.getModal().fieldWithVisibleOptions;
    let cssClasses = classNames('field-group', 'field-group-select', {
      'field-options-visible': this.state.optionsVisible, //fieldWithVisibleOptions === this.props.field.name,
    });
    let options = this.props.field.options.map(function(option) {
      if (option.name === this.state.selectedOptionName) {
        selectedOptionDisplayName = option.displayName;
      }
      return <FieldSelectOption
        key={option.name}
        option={option}
        handleClick={this.onOptionClick}/>
    }.bind(this));
    return (
      <div
        className={cssClasses}
        onClick={this.toggleOptions}>
        <div className="field-label">{this.props.field.displayName}</div>
        <div
          className="field-input-group"
          onClick={this.onClick}>
          <div
            className="field-input"
            ref="input"
            onFocus={this.onFocus}>{selectedOptionDisplayName}</div>
          <FontIcon className="synicon-menu-down"/>
        </div>
        <div className="field-options-group">
          {options}
        </div>
      </div>
    );
  }
});