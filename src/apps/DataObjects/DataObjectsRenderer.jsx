var React  = require('react'),
    Moment = require('moment');


var DataObjectsRenderer = {

  builtInColumnsConfig: function() {
    return {
      id: {
        width: 20
      },
      revision : {
        width: 20
      },
      group: {
        width : 30
      },
      'created_at' : {
        width    : 100,
        renderer : this.renderColumnDate
      }
    }
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

  // Header
  renderTableHeader: function (classObj) {
    console.debug('ClassesStore::getTableHeader');
    //// TODO: default columns, it should be controled somehow

    var builtInColumnsConfig = this.builtInColumnsConfig();
    var header = {
      id: {
        content : 'ID',
        tooltip : 'Built-in property: ID'
      },
      revision: {
        content : 'Rev',
        tooltip : 'Built-in property: Revision'
      },
      group: {
        content : 'Group',
        tooltip : 'Built-in property: Group'
      },
      created_at: {
        content : 'Created',
        tooltip : 'Built-in property: Created At'
      }
    };

    classObj.schema.map(function (item) {
      if (!header[item.name]) {
        header[item.name] = {
          content: item.name,
          tooltip: 'Custom property: ' + item.name + ' (type: ' + item.type + ')'
        }
      }
    });

    Object.keys(header).map(function(key){
      var config = builtInColumnsConfig[key];
      header[key].style = {width: config ? config.width : null}
    }.bind(this));

    return header;
  },

  // Table Body
  renderTableData: function(items) {

    var tableItems           = [],
        builtInColumnsConfig = this.builtInColumnsConfig();

    items.map(function(item) {
      var row = {};

      Object.keys(item).map(function(key) {

        var value  = item[key] ? item[key] : '',
            config = builtInColumnsConfig[key];

        if (typeof value === 'object') {

          if (value.type === 'reference') {
            value = this.renderReference(item[key]);

          }
        } else if (typeof value === 'string' || typeof item[key] === 'number') {

          // Simple string or renderer
          if (config && config.renderer) {
            value = config.renderer(item[key])
          }
        }

        // Actual value of the cell and it's properties
        row[key] = {
          content: value,
          style: {
            width: config ? config.width : null
          }
        }

      }.bind(this));
      tableItems.push(row);
    }.bind(this));

    return tableItems;
  }

};

module.exports = DataObjectsRenderer;