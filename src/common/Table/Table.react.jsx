let React = require('react');
let classNames = require('classnames');

let TableHeader = require('./TableHeader.react');
let TableBody = require('./TableBody.react');


module.exports = React.createClass({

  displayName: 'Table',

  getDefaultProps: function() {
    return {
      items: [],
    }
  },

  render: function() {
    let cssClasses = classNames({
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