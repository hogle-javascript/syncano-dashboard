var React = require('react');

//HeaderColumn = require('./ColumnListHeaderColumn.react'),
  MaterialIcon = require('../Icon/MaterialIcon.react');

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
        'display': 'flex',
        'justify-content': 'flex-end',
        'margin-bottom': '5px',
        'font-size': '16px',
        'line-height': '35px',
        'color': '#929292',
      }
    };

    var columns = this.props.columns.map(function (column) {
        return <div style={column.style} className={"col s" + column.space}>{column.name}</div>
      }
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