import React from 'react';
import Moment from 'moment';
import MUI from 'material-ui';

export default {

  columnsRenderers() {
    return {
      'created_at': this.renderColumnDate
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
        iconClassName="synicon-download"
        onClick={this.handleFileOnClick.bind(this, obj.value)}/>
    )
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
            style={{width: item.width ? item.width : null, whiteSpace: 'normal', wordWrap: 'normal'}}
            tooltip={item.tooltip}>
            {item.name}
          </MUI.TableHeaderColumn>
        );
      }
    });

    // TODO: select all doesn't work properly in material-ui
    return (
      <MUI.TableHeader
        key='header'
        enableSelectAll={false}
        displaySelectAll={false}>
        <MUI.TableRow key='header-row'>
          {columnsComponents}
        </MUI.TableRow>
      </MUI.TableHeader>
    );
  },

  // Table Body
  renderTableData(items, columns) {

    return items.map((item, index) => {
      let row = {};

      let columnsComponents = columns.map((column, i) => {

        if (!column.checked) {
          return;
        }

        let value = item[column.id];
        let renderer = this.getColumnRenderer(column.id);

        if (value && typeof value === 'object') {

          if (value.type === 'reference') {
            value = this.renderReference(value);
          }
          if (value.type === 'file') {
            value = this.renderFile(value);
          }
          if (value.type === 'datetime') {
            value = this.renderColumnDate(value.value);
          }

        } else if (renderer)  {
          // Simple string or renderer
          value = renderer(item[column.id]);
        }

        if (typeof value === 'boolean' || typeof value === 'number') {
          value = value !== null ? value.toString() : value;
        }

        row[column.id] = {
          content: <div>{value}</div>,
          style: {width: column.width}
        };

        return (
          <MUI.TableRowColumn
            key={`${column.id}-${i}`}
            style={{width: column.width}}>
            {value}
          </MUI.TableRowColumn>
        );
      });

      return (
        <MUI.TableRow key={'row-' + index}>
          {columnsComponents}
        </MUI.TableRow>
      );

    });
  }

};
