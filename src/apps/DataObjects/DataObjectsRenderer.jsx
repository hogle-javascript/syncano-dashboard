import React from 'react';
import Moment from 'moment';
import _ from 'lodash';

import MUI from 'syncano-material-ui';

export default {

  columnsRenderers() {
    return {
      created_at: this.renderColumnDate,
      updated_at: this.renderColumnDate
    };
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
    );
  },

  renderReference(obj) {
    return (
      <div>{obj.target + ': ' + obj.value}</div>
    );
  },

  handleFileOnClick(value, event) {
    event.stopPropagation();
    window.open(value, '_blank');
  },

  renderFile(obj) {
    return (
      <MUI.IconButton
        iconClassName="synicon-download"
        onClick={this.handleFileOnClick.bind(this, obj.value)}/>
    );
  },

  // Header
  renderTableHeader(classObj, columns) {
    console.debug('ClassesStore::getTableHeader');

    // Initial columns
    let columnsComponents = columns.map((item, index) => {
      if (item.checked) {
        return (
          <MUI.TableHeaderColumn
            key={'header-column-' + index}
            style={{
              width: item.width ? item.width : 100,
              whiteSpace: 'normal',
              wordWrap: 'normal'
            }}
            tooltip={item.tooltip}>
            {item.name}
          </MUI.TableHeaderColumn>
        );
      }
    });

    return (
      <MUI.TableHeader key='header'>
        <MUI.TableRow key='header-row'>
          {columnsComponents}
        </MUI.TableRow>
      </MUI.TableHeader>
    );
  },

  // Table Body
  renderTableData(items, columns, selectedRows) {
    return items.map((item, index) => {
      let selected = (selectedRows || []).indexOf(index) > -1;
      let columnsComponents = columns.map((column, i) => {
        if (!column.checked) {
          return false;
        }

        let value = item[column.id];
        let valueIsObject = _.isObject(value);
        let renderer = this.getColumnRenderer(column.id);

        if (valueIsObject && value.type === 'reference') {
          value = this.renderReference(value);
        }

        if (valueIsObject && value.type === 'file') {
          value = this.renderFile(value);
        }

        if (valueIsObject && value.type === 'datetime') {
          value = this.renderColumnDate(value.value);
        }

        if (renderer) {
          // Simple string or renderer
          value = renderer(item[column.id]);
        }

        if (_.isBoolean(value) || _.isNumber(value)) {
          value = value !== null ? value.toString() : value;
        }

        return (
          <MUI.TableRowColumn
            key={`${column.id}-${i}`}
            style={{width: column.width ? column.width : 100}}>
            {value}
          </MUI.TableRowColumn>
        );
      });

      return (
        <MUI.TableRow key={'row-' + index} selected={selected}>
          {columnsComponents}
        </MUI.TableRow>
      );
    });
  }
};
