import React from 'react';
import Moment from 'moment';
import MUI from 'material-ui';

var DataObjectsRenderer = {

  columnsRenderers() {
    return {
      'created_at' : this.renderColumnDate
    }
  },

  getColumnRenderer(column) {
    return this.columnsRenderers()[column];
  },

  // Columns renderers
  renderColumnDate(value) {
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

  renderReference(obj) {
    return (
        <div>{obj.target + ': ' + obj.value}</div>
    )
  },

  handleFileOnClick(value, event) {
    event.stopPropagation();
    window.open(value, '_blank')
  },

  renderFile(obj) {
    return (
        <MUI.IconButton
          iconClassName = "synicon-download"
          onClick       = {this.handleFileOnClick.bind(this, obj.value)} />
    )
  },

  // Header
  renderTableHeader(classObj, columns) {
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
  renderTableData(items, columns) {

    var tableItems = [];

    items.map(function(item) {
      var row = {};

      columns.map(function(column) {

        var value    = item[column.id],
            renderer = this.getColumnRenderer(column.id);

        if (value && typeof value === 'object') {

          if (value.type === 'reference') {
            value = this.renderReference(item[column.id]);
          }
          if (value.type === 'file') {
            value = this.renderFile(item[column.id]);
          }

        } else {
          // Simple string or renderer
          if (renderer) {
            value = renderer(item[column.id])
          }
        }

        if (typeof value === 'boolean' || typeof value === 'number') {
          value = value !== null ? value.toString() : value;
        }

        row[column.id] = {
          content: <div>{value}</div>,
          style: { width: column.width }
        }
      }.bind(this));

      tableItems.push(row);

    }.bind(this));

    return tableItems;
  }

};

module.exports = DataObjectsRenderer;