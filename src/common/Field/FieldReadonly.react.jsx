var React = require('react');
var classNames = require('classnames');

require('./Field.css');

module.exports = React.createClass({

  displayName: 'FieldReadonly',

  propTypes: {
    field: React.PropTypes.object.isRequired,
  },

  render: function () {
    var field = this.props.field;
    var cssClasses = classNames("field-group-" + field.name.split('_').join('-'), {
      'field-group': true,
      'field-group-large-text': this.props.field.largeText,
    });
    return (
      <div className={cssClasses}>
        <div className="field-label">{field.displayName}</div>
        <div className="field-input" ref="readonly">{field.value}</div>
      </div>
    );
  }
});
