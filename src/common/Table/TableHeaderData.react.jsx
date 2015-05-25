var React       = require('react');
var classNames  = require('classnames');

module.exports = React.createClass({

  displayName: 'TableHeaderData',

  render: function() {
    var content = this.props.children || this.props.data || (<em>undefined</em>);
    var cssClasses = classNames({
      'table-data': true,
      'table-header-data': true,
      'table-data-id': this.props.column.name === "id",
      'table-data-type': this.props.column.name === "type",
      'table-data-usage': this.props.column.name === "usage",
      'table-data-cost': this.props.column.name === "cost",
      'table-data-date': this.props.column.type === "date",
      'table-data-string': this.props.column.type === "string",
      'table-data-integer': this.props.column.type === "integer",
      'table-data-options': this.props.column.type === "options",
    });
    return (
      <div className={cssClasses}>
        <span>{content}</span>
      </div>
    );
  }
});