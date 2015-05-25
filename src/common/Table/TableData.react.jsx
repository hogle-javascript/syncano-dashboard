var React       = require('react');
var Moment      = require('moment');
var classNames  = require('classnames');

module.exports = React.createClass({

  displayName: 'TableData',

  render: function() {
    var content = this.props.children || this.props.data;
    var cssClasses = classNames({
      'table-data': true,
      'table-data-id': this.props.column.name === "id",
      'table-data-type': this.props.column.name === "type",
      'table-data-usage': this.props.column.name === "usage",
      'table-data-cost': this.props.column.name === "cost",
      'table-data-string': this.props.column.type === "string",
      'table-data-integer': this.props.column.type === "integer",
      'table-data-options': this.props.column.type === "options",
    });
    if (this.props.column.type === "date" && "format" in this.props.column) {
      content = Moment(this.props.data).format(this.props.column.format)
    }
    return (
      <div className={cssClasses}>
        <span>{content}</span>
      </div>
    );
  }
});