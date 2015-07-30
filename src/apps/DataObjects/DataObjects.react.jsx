import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import _ from 'lodash';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

import SessionStore from '../Session/SessionStore';
import DataObjectsActions from './DataObjectsActions';
import DataObjectsStore from './DataObjectsStore';

import MUI from 'material-ui';
import Common from '../../common';

import ColumnsFilterMenu from './ColumnsFilterMenu.react';
import DataObjectDialog from './DataObjectDialog.react';

export default React.createClass({

  displayName: 'DataObjects',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(DataObjectsStore),
    Mixins.Header,
    Mixins.Dialogs,
    Mixins.InstanceTabs
  ],

  componentWillUpdate(nextProps, nextState) {
    console.info('DataObjects::componentWillUpdate');
    // Merging "hideDialogs
    this.hideDialogs(nextState.hideDialogs);

    if (!nextState.selectedRows) {
      if (this.refs.table) {
        this.refs.table.setState({ selectedRows: [] });
      }
    }
  },

  componentDidMount() {
    console.info('DataObjects::componentDidMount');
    DataObjectsActions.fetch();
  },

  //Dialogs config
  initDialogs() {
    return [{
      dialog: MUI.Dialog,
      params: {
        key:    'deleteDataObjectDialog',
        ref:    'deleteDataObjectDialog',
        title:  'Delete a Data Object',
        actions: [
          {text: 'Cancel', onClick: this.handleCancel},
          {text: 'Confirm', onClick: this.handleDelete}
        ],
        modal: true,
        children: 'Do you really want to delete ' + DataObjectsStore.getSelectedRowsLength() + ' Data Object(s)?'
      }
    }]
  },

  showDataObjectDialog() {
    DataObjectsActions.showDialog();
  },

  showDataObjectEditDialog(cellNumber) {
    let dataObject = DataObjectsStore.getSelectedRowObj(cellNumber);
    dataObject = _.reduce(dataObject, (r, v, k) => {
      if (_.isObject(v) && v.type === 'reference') {
        v = v.value;
      }
      r[k] = v;
      return r;
    }, {});
    DataObjectsActions.showDialog(dataObject);
  },

  handleDelete() {
    console.info('DataObjects::handleDelete');
    DataObjectsActions.removeDataObjects(this.state.classObj.name, DataObjectsStore.getIDsFromTable());
  },

  handleRowSelection(selectedRow) {
    console.info('DataObjects::handleRowSelection');
    let rowsSelection = [selectedRow[0]];

    // It there is more than one arg it means that it is multiple selection
    if (selectedRow.length > 1) {
      let start = selectedRow[1].start,
          end   = selectedRow[1].end;

      // What is start and what is end depends on the direction of checking rows
      if (end < start) {
        end   = selectedRow[1].start;
        start = selectedRow[1].end;
      }
      rowsSelection = Array.apply(null, Array(end)).map(function(_, i) {return i;}).slice(start);
    } else if (selectedRow.length === 0) {
      rowsSelection = [];
    }

    // Writing to the store
    DataObjectsActions.setSelectedRows(rowsSelection);
  },

  handleCellClick(cellNumber, cellName) {
    console.info('DataObjects::handleCellClick', arguments);
    if (cellName != undefined) {
      this.showDataObjectEditDialog(cellNumber);
    }
  },

  renderTable() {
    console.info('DataObjects::renderTable');
    let tableData   = DataObjectsStore.renderTableData(),
        tableHeader = DataObjectsStore.renderTableHeader(),
        colOrder    = DataObjectsStore.getCheckedColumnsIDs();

    return (
      <div>
        <MUI.Table
          ref                 = "table"
          headerColumns       = {tableHeader}
          columnOrder         = {colOrder}
          rowData             = {tableData}
          multiSelectable     = {true}
          deselectOnClickaway = {false}
          showRowHover        = {true}
          onCellClick         = {this.handleCellClick}
          onRowSelection      = {this.handleRowSelection}
          />

        <div
          className = "row align-center"
          style     = {{margin: 50}} >
          <div>Loaded {tableData.length} Data Objects</div>
        </div>
        <Common.Show if={this.state.hasNextPage}>
          <div
            className = "row align-center"
            style     = {{margin: 50}} >
            <MUI.RaisedButton
              label   = "Load more"
              onClick = {this.handleMoreRows}/>
          </div>
        </Common.Show>
      </div>
    )
  },

  handleMoreRows() {
    DataObjectsActions.subFetchDataObjects({
      className : this.state.classObj.name,
      params    : this.state.nextParams
    });
  },

  handleBackClick() {
    SessionStore.getRouter().transitionTo(
      'classes',
      {
        instanceName : SessionStore.getInstance().name
      }
    );
  },

  render() {
    let table = null;

    if (this.state.items) {
      table = this.renderTable();
    } else {
      table = <Common.Loading visible={true} />;
    }

    let selectedMessageText = null;

    if (this.state.selectedRows && this.state.selectedRows.length > 0) {
      selectedMessageText = 'selected: ' + this.state.selectedRows.length;
    }

    return (

      <div className="row" style={{'height': '100%'}}>
        {this.getDialogs()}
        <DataObjectDialog />

        <div className="col-flex-1">
          <MUI.Toolbar style={{background: 'transparent', padding: '0px 32px 0 24px'}}>
            <MUI.ToolbarGroup>
              <MUI.IconButton
                iconClassName = "synicon-arrow-left"
                onClick       = {this.handleBackClick}
                touch         = {true}
                style         = {{marginTop: 4}}
                iconStyle     = {{color: 'rgba(0,0,0,.4)'}} />
            </MUI.ToolbarGroup>

            <MUI.ToolbarGroup>
              <MUI.ToolbarTitle text={'Class: ' + this.getParams().className} />
              <MUI.ToolbarTitle text={selectedMessageText} />
            </MUI.ToolbarGroup>

            <MUI.ToolbarGroup float="right">

              <MUI.IconButton
                style         = {{fontSize: 25, marginTop: 5}}
                iconClassName = "synicon-plus"
                tooltip       = "Add Data Objects"
                onClick       = {this.showDataObjectDialog} />

              <MUI.IconButton
                style         = {{fontSize: 25, marginTop: 5}}
                iconClassName = "synicon-delete"
                tooltip       = "Delete Data Objects"
                disabled      = {!(this.state.selectedRows)}
                onClick       = {this.showDialog.bind(null, 'deleteDataObjectDialog')} />

              <ColumnsFilterMenu
                columns           = {DataObjectsStore.getTableColumns()}
                checkToggleColumn = {DataObjectsActions.checkToggleColumn} />

            </MUI.ToolbarGroup>

          </MUI.Toolbar>

          <div style={{clear: 'both', height: '100%'}}>
            <Common.Show if={this.state.isLoading}>
              <Common.Loading type='linear' />
            </Common.Show>
            {table}
          </div>
        </div>
      </div>
    );
  }
});
