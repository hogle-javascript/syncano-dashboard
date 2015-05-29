var React = require('react');

require('./Field.css');

module.exports = React.createClass({

  displayName: 'FieldSelectOption',

  propTypes: {
    option: React.PropTypes.object,
  },

  handleClick: function() {
    this.props.handleClick(this.props.option.name);
  },

  render: function() {
    return (
      <div className="field-select-option" onClick={this.handleClick}>{this.props.option.displayName}</div>
    );
  }

});