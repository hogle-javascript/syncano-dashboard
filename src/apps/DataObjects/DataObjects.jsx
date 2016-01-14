import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';
import _ from 'lodash';

// Utils
import {DialogMixin, DialogsMixin, InstanceTabsMixin} from '../../mixins';

// Stores and Actions
import SessionStore from '../Session/SessionStore';
import Actions from './DataObjectsActions';
import Store from './DataObjectsStore';

// Components
import {IconButton, RaisedButton, Table, TableBody} from 'syncano-material-ui';
import {Show, Loading} from 'syncano-components';
import {Dialog, InnerToolbar, Container} from '../../common';

// Local components
import ColumnsFilterMenu from './ColumnsFilterMenu';
import DataObjectDialog from './DataObjectDialog';

export default React.createClass({

  displayName: 'DataObjects',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store),
    DialogMixin,
    DialogsMixin,
    InstanceTabsMixin
  ],

  componentDidMount() {
    console.info('DataObjects::componentDidMount');
    Actions.fetch();
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('DataObjects::componentWillUpdate');
    // Merging "hideDialogs
    this.hideDialogs(nextState.hideDialogs);

    if (!nextState.selectedRows && this.refs.table) {
      this.refs.table.setState({selectedRows: []});
    }
  },

  componentWillUnmount() {
    Actions.clearStore();
  },

  handleDelete() {
    console.info('DataObjects::handleDelete');
    Actions.removeDataObjects(this.state.classObj.name, Store.getIDsFromTable());
  },

  handleRowSelection(selectedRows) {
    console.info('DataObjects::handleRowSelection', arguments);
    let rowsSelection = selectedRows;

    // Writing to the store
    if (selectedRows === 'all') {
      rowsSelection = Store.getItems().map((item, index) => {
        return index;
      });
    }

    Actions.setSelectedRows(rowsSelection);
  },

  handleSelectAll(selectAll) {
    console.info('DataObjects::handleSelectAll', selectAll);
  },

  handleCellClick(cellNumber, cellName) {
    console.info('DataObjects::handleCellClick', arguments);
    if (typeof cellName !== 'undefined' && cellName !== 0) {
      this.showDataObjectEditDialog(cellNumber);
    }
  },

  handleMoreRows() {
    Actions.subFetchDataObjects({
      className: this.state.classObj.name,
      params: this.state.nextParams
    });
  },

  handleBackClick() {
    SessionStore.getRouter().transitionTo(
      'classes',
      {
        instanceName: SessionStore.getInstance().name
      }
    );
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'deleteDataObjectDialog',
        ref: 'deleteDataObjectDialog',
        title: 'Delete a Data Object',
        handleConfirm: this.handleDelete,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        groupName: 'Channel',
        children: 'Do you really want to delete ' + Store.getSelectedRowsLength() + ' Data Object(s)?'
      }
    }];
  },

  showDataObjectDialog() {
    Actions.showDialog();
  },

  showDataObjectEditDialog(cellNumber) {
    let dataObject = Store.getSelectedRowObj(cellNumber);

    dataObject = _.reduce(dataObject, (result, val, key) => {
      let value = val;

      if (_.isObject(value) && value.type === 'reference') {
        value = value.value;
      }
      if (_.isBoolean(value)) {
        value = value.toString();
      }

      result[key] = value;
      return result;
    }, {});
    Actions.showDialog(dataObject);
  },

  renderTable() {
    console.info('DataObjects::renderTable');
    let tableData = Store.renderTableData();
    let tableHeader = Store.renderTableHeader(this.handleSelectAll);

    return (
    <div>
      <Table
        ref="table"
        multiSelectable={true}
        showRowHover={true}
        onCellClick={this.handleCellClick}
        onRowSelection={this.handleRowSelection}
        wrapperStyle={{minHeight: '120px'}}
        bodyStyle={{overflowX: 'visible', overflowY: 'initial'}}>
        {tableHeader}
        <TableBody
          className="mui-table-body"
          deselectOnClickaway={false}
          showRowHover={true}
          stripedRows={false}>
          {tableData}
        </TableBody>
      </Table>

      <div
        className="row align-center"
        style={{margin: 50}}>
        <div>Loaded {tableData.length} Data Objects</div>
      </div>
      <Show if={this.state.hasNextPage}>
        <div
          className="row align-center"
          style={{margin: 50}}>
          <RaisedButton
            label="Load more"
            onClick={this.handleMoreRows}/>
        </div>
      </Show>
    </div>
    );
  },

  render() {
    let table = this.state.items ? this.renderTable() : <Loading visible={true}/>;
    let selectedMessageText = !_.isEmpty(this.state.selectedRows) ? 'selected: ' + this.state.selectedRows.length : '';

    return (
      <div>
        {this.getDialogs()}
        <DataObjectDialog />

        <InnerToolbar
          title={`Class: ${this.getParams().className} ${selectedMessageText}`}
          backFallback={this.handleBackClick}>

          <IconButton
            style={{fontSize: 25, marginTop: 5}}
            iconClassName="synicon-plus"
            tooltip="Add Data Objects"
            onClick={this.showDataObjectDialog}/>

          <IconButton
            style={{fontSize: 25, marginTop: 5}}
            iconClassName="synicon-delete"
            tooltip="Delete Data Objects"
            disabled={this.state.selectedRows && this.state.selectedRows.length < 1}
            onTouchTap={this.showDialog.bind(null, 'deleteDataObjectDialog')}/>

          <ColumnsFilterMenu
            columns={Store.getTableColumns()}
            checkToggleColumn={Actions.checkToggleColumn}/>

        </InnerToolbar>
        <Container>
          <Show if={this.state.isLoading}>
            <Loading type='linear'/>
          </Show>
          {table}
        </Container>
      </div>
    );
  }
});
