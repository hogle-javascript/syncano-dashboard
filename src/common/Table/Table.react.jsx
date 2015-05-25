var React       = require('react');
var classNames  = require('classnames');

var TableHeader = require('./TableHeader.react');
var TableBody   = require('./TableBody.react');


module.exports = React.createClass({

  displayName: 'Table',

  getDefaultProps: function() {
    return {
      items: [],
    }
  },

  render: function() {
    var cssClasses = classNames({
      'table': true,
      'table-read-only': this.props.readOnly,
    });
    return (
      <div className="table-wrapper">
        <div className={cssClasses}>
          <TableHeader {...this.props} />
          <TableBody {...this.props} />
        </div>
      </div>
    );
  }
});