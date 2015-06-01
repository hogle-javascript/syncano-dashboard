var React         = require('react'),

    MaterialIcon  = require('../Icon/MaterialIcon.react');

require('./List.css');

module.exports = React.createClass({

  displayName: 'Header',

  propTypes: {
    topic: React.PropTypes.string,
    options: React.PropTypes.object,
    columns: React.PropTypes.array,
  },

  render: function () {

    var headerStyle = {
      root: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginBottom: '5px',
        fontSize: '16px',
        lineHeight: '35px',
        color: '#929292',
      }
    };

    var columns = this.props.columns.map(function (column) {
        return <div key={this.props.columns.indexOf(column)} style={column.style} className={"col s" + column.space}>{column.name}</div>
      }.bind(this)
    );

    if (this.props.checkedItemsNumber > 0) {
      return (
        <div style={headerStyle.root}>
          {columns[0]}
          <div className="tableIcons right-align col s11">
            {this.props.children}
          </div>
        </div>
      )
    }

    return (
      <div style={headerStyle.root}>
        {columns}
      </div>
    )
  }

});