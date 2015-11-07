import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import _ from 'lodash';

// Utils
import Mixins from '../../mixins';

// Stores and Actions
import SessionStore from '../Session/SessionStore';
import Actions from './DataObjectsActions';
import Store from './DataObjectsStore';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';

// Local components
import ColumnsFilterMenu from './ColumnsFilterMenu.react';
import DataObjectDialog from './DataObjectDialog.react';

export default React.createClass({

  displayName: 'DataObjects',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    Mixins.Header,
    Mixins.Dialogs,
    Mixins.InstanceTabs
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

  // Dialogs config
  initDialogs() {
    return [{
      dialog: Common.Dialog,
      params: {
        key: 'deleteDataObjectDialog',
        ref: 'deleteDataObjectDialog',
        title: 'Delete a Data Object',
        actions: [
          {text: 'Cancel', onClick: this.handleCancel},
          {text: 'Confirm', onClick: this.handleDelete}
        ],
        modal: true,
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
      <MUI.Table
        ref="table"
        multiSelectable={true}
        deselectOnClickaway={false}
        showRowHover={true}
        onCellClick={this.handleCellClick}
        onRowSelection={this.handleRowSelection}
        tableWrapperStyle={{minHeight: '120px'}}
        bodyTableStyle={{overflowX: 'visible', overflowY: 'initial'}}>
        {tableHeader}
        <MUI.TableBody
          deselectOnClickaway={this.state.deselectOnClickaway}
          showRowHover={true}
          stripedRows={false}>
          {tableData}
        </MUI.TableBody>
      </MUI.Table>

      <div
        className="row align-center"
        style={{margin: 50}}>
        <div>Loaded {tableData.length} Data Objects</div>
      </div>
      <Common.Show if={this.state.hasNextPage}>
        <div
          className="row align-center"
          style={{margin: 50}}>
          <MUI.RaisedButton
            label="Load more"
            onClick={this.handleMoreRows}/>
        </div>
      </Common.Show>
    </div>
    );
  },

  render() {
    let table = this.state.items ? this.renderTable() : <Common.Loading visible={true}/>;
    let selectedMessageText = !_.isEmpty(this.state.selectedRows) ? 'selected: ' + this.state.selectedRows.length : '';

    return (
      <div className="row" style={{paddingTop: 48, height: '100%'}}>
        {this.getDialogs()}
        <DataObjectDialog />

        <div className="col-flex-1">
          <Common.InnerToolbar>
            <MUI.ToolbarGroup>
              <MUI.IconButton
                iconClassName="synicon-arrow-left"
                onClick={this.handleBackClick}
                touch={true}
                style={{marginTop: 4}}
                iconStyle={{color: 'rgba(0,0,0,.4)'}}/>
            </MUI.ToolbarGroup>

            <MUI.ToolbarGroup>
              <MUI.ToolbarTitle text={'Class: ' + this.getParams().className}/>
              <MUI.ToolbarTitle text={selectedMessageText}/>
            </MUI.ToolbarGroup>

            <MUI.ToolbarGroup float="right">

              <MUI.IconButton
                style={{fontSize: 25, marginTop: 5}}
                iconClassName="synicon-plus"
                tooltip="Add Data Objects"
                onClick={this.showDataObjectDialog}/>

              <MUI.IconButton
                style={{fontSize: 25, marginTop: 5}}
                iconClassName="synicon-delete"
                tooltip="Delete Data Objects"
                disabled={this.state.selectedRows && this.state.selectedRows.length < 1}
                onClick={this.showDialog.bind(null, 'deleteDataObjectDialog')}/>

              <ColumnsFilterMenu
                columns={Store.getTableColumns()}
                checkToggleColumn={Actions.checkToggleColumn}/>

            </MUI.ToolbarGroup>

          </Common.InnerToolbar>

          <div style={{clear: 'both', height: '100%'}}>
            <Common.Show if={this.state.isLoading}>
              <Common.Loading type='linear'/>
            </Common.Show>
            {table}
          </div>
        </div>
      </div>
    );
  }
});
