var React       = require('react');

var TableRow    = require('./TableRow.react');

module.exports = React.createClass({

  displayName: 'TableBody',

  render: function() {
    var rows = this.props.items.map(function(item, i) {
      return <TableRow {...this.props} key={i} item={item} />
    }.bind(this));
    return (
      <div className="table-body">
        {rows}
      </div>
    );
  }
});