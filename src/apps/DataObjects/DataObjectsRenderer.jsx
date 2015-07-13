var React      = require('react'),
    Moment = require('moment'),

    mui        = require('material-ui'),
    IconButton = mui.IconButton,
    FlatButton = mui.FlatButton;

var DataObjectsRenderer = {

  columnsRenderers: function() {
    return {
      'created_at' : this.renderColumnDate
    }
  },

  getColumnRenderer: function(column) {
    return this.columnsRenderers()[column];
  },

  // Columns renderers
  renderColumnDate: function(value) {
    if (!value) {
      return '';
    }
    return (
      <div>
        <div>{Moment(value).format('DD/MM/YYYY')}</div>
        <div>{Moment(value).format('LTS')}</div>
      </div>
    )
  },

  renderReference: function(obj) {
    return (
        <div>{obj.target + ': ' + obj.value}</div>
    )
  },

  handleFileOnClick: function(value, event) {
    event.stopPropagation();
    window.open(value, '_blank')
  },

  renderFile: function(obj) {
    return (
        <IconButton
          iconClassName = "synicon-download"
          onClick       = {this.handleFileOnClick.bind(this, obj.value)} />
    )
  },

  // Header
  renderTableHeader: function(classObj, columns) {
    console.debug('ClassesStore::getTableHeader');

    var header = {};

    // Initial columns
    columns.map(function(item) {
      header[item.id] = {
        content : item.name,
        tooltip : item.tooltip,
        style   : {width: item.width ? item.width : null}
      }
    });

    return header;
  },

  // Table Body
  renderTableData: function(items, columns) {

    var tableItems = [];

    items.map(function(item) {
      var row = {};

      columns.map(function(column) {

        var value    = item[column.id] ? item[column.id] : '',
            renderer = this.getColumnRenderer(column.id);

        if (typeof value === 'object') {

          if (value.type === 'reference') {
            value = this.renderReference(item[column.id]);
          }
          if (value.type === 'file') {
            value = this.renderFile(item[column.id]);
          }

        } else if (typeof value === 'string' || typeof item[column.id] === 'number') {

          // Simple string or renderer
          if (renderer) {
            value = renderer(item[column.id])
          }
        }

        row[column.id] = {
          content: value,
          style: { width: column.width }
        }
      }.bind(this));

      tableItems.push(row);

    }.bind(this));

    return tableItems;
  }

};

module.exports = DataObjectsRenderer;