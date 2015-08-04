let React = require('react');
let classNames = require('classnames');

//let ViewActions = require('../actions/ViewActions');

require('./Field.css');

module.exports = React.createClass({

  displayName: 'FieldPassword',

  propTypes: {
    field: React.PropTypes.object.isRequired,
    handleKeyUp: React.PropTypes.func.isRequired,
  },

  getInitialState() {
    return {
      errorText: null
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.errorText !== this.state.errorText) {
      this.setState({errorText: nextProps.errorText})
    }
  },

  handleKeyUp() {
    ViewActions.clearError(this.props.field.name);
  },

  render() {
    let field = this.props.field;
    // TODO
    let cssClasses = classNames("field-group-" + field.name.split('_').join('-'), {
      'field-group': true,
      'field-group-large-text': field.largeText,
      'field-group-error': this.state.errorText,
    });
    return (
      <div className={cssClasses}>
        <div className="field-label">{field.displayName}</div>
        <input className="field-input" type="password" ref="input" onKeyUp={this.handleKeyUp}/>

        <div className="field-error-text">{this.state.errorText}</div>
      </div>
    );
  }
});