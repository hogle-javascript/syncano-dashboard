var React              = require('react'),
    Reflux             = require('reflux'),
    Router             = require('react-router'),

    // Utils
    HeaderMixin        = require('../Header/HeaderMixin'),
    ButtonActionMixin  = require('../../mixins/ButtonActionMixin'),
    DialogsMixin       = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin  = require('../../mixins/InstanceTabsMixin'),
    Show               = require('../../common/Show/Show.react'),

    ClassesActions     = require('../Classes/ClassesActions'),
    SessionStore       = require('../Session/SessionStore'),
    ClassesStore       = require('../Classes/ClassesStore'),
    DataObjectsActions = require('./DataObjectsActions'),
    DataObjectsStore   = require('./DataObjectsStore'),

    mui                = require('material-ui'),
    Transitions        = mui.Styles.Transitions,
    Colors             = mui.Styles.Colors,
    Dialog             = mui.Dialog,
    Menu               = mui.Menu,
    Paper              = mui.Paper,
    Avatar             = mui.Avatar,
    FontIcon           = mui.FontIcon,
    IconButton         = mui.IconButton,
    List               = mui.List,
    ListDivider        = mui.ListDivider,
    ListItem           = mui.ListItem,
    Table              = mui.Table,
    Toolbar            = mui.Toolbar,
    ToolbarGroup       = mui.ToolbarGroup,
    ToolbarSeparator   = mui.ToolbarSeparator,
    ToolbarTitle       = mui.ToolbarTitle,
    DropDownIcon       = mui.DropDownIcon,
    DropDownMenu       = mui.DropDownMenu,
    RaisedButton       = mui.RaisedButton,

    Loading            = require('../../common/Loading/Loading.react'),
    ColumnsFilterMenu  = require('./ColumnsFilterMenu.react'),
    CheckAvatar        = require('./CheckAvatar.react'),
    DataObjectDialog   = require('./DataObjectDialog.react');

module.exports = React.createClass({

  displayName: 'DataObjects',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(DataObjectsStore),
    HeaderMixin,
    DialogsMixin,
    InstanceTabsMixin
  ],

  componentWillUpdate: function(nextProps, nextState) {
    console.info('DataObjects::componentWillUpdate');
    // Merging "hideDialogs
    this.hideDialogs(nextState.hideDialogs);

    if (!nextState.selectedRows) {
      if (this.refs.table) {
        this.refs.table.setState({ selectedRows: [] });
      }
    }
  },

  componentWillMount: function() {
    console.info('DataObjects::componentWillMount');
    DataObjectsActions.fetch();
  },

  //Dialogs config
  initDialogs: function() {
    return [{
      dialog: Dialog,
      params: {
        key:    'deleteDataObjectDialog',
        ref:    'deleteDataObjectDialog',
        title:  'Delete an DataObject',
        actions: [
          {text: 'Cancel', onClick: this.handleCancel},
          {text: 'Confirm', onClick: this.handleDelete}
        ],
        modal: true,
        children: 'Do you really want to delete ' + DataObjectsStore.getSelectedRowsLength() + ' DataObject(s)?'
      }
    }]
  },

  showDataObjectDialog: function() {
    DataObjectsActions.showDialog();
  },

  showDataObjectEditDialog: function(cellNumber) {
    DataObjectsActions.showDialog(DataObjectsStore.getSelectedRowObj(cellNumber));
  },

  handleDelete: function() {
    console.info('DataObjects::handleDelete');
    DataObjectsActions.removeDataObjects(this.state.classObj.name, DataObjectsStore.getIDsFromTable());
  },

  handleRowSelection: function(selectedRow) {
    console.info('DataObjects::handleRowSelection');
    var rowsSelection = [selectedRow[0]];

    // It there is more than one arg it means that it is multiple selection
    if (selectedRow.length > 1) {
      var start = selectedRow[1].start,
          end   = selectedRow[1].end;

      // What is start and what is end depends on the direction of checking rows
      if (end < start) {
        end   = selectedRow[1].start;
        start = selectedRow[1].end;
      }
      rowsSelection = Array.apply(null, Array(end)).map(function(_, i) {return i;}).slice(start);
    }

    // Writing to the store
    DataObjectsActions.setSelectedRows(rowsSelection);
  },

  handleCellClick: function(cellNumber, cellName) {
    console.info('DataObjects::handleCellClick', arguments);
    if (cellName != undefined) {
      this.showDataObjectEditDialog(cellNumber);
    }
  },

  renderTable: function() {
    console.info('DataObjects::renderTable');
    var tableData   = DataObjectsStore.renderTableData(),
        tableHeader = DataObjectsStore.renderTableHeader(),
        colOrder    = DataObjectsStore.getCheckedColumnsIDs();

    return (
      <div>
        <Table
          ref                 = "table"
          headerColumns       = {tableHeader}
          columnOrder         = {colOrder}
          rowData             = {tableData}
          multiSelectable     = {true}
          deselectOnClickAway = {false}
          showRowHover        = {true}
          onCellClick         = {this.handleCellClick}
          onRowSelection      = {this.handleRowSelection}
          />

        <div
          className = "row align-center"
          style     = {{margin: 50}} >
          <div>Loaded {tableData.length} Data Objects</div>
        </div>
        <Show if={this.state.hasNextPage}>
          <div
            className = "row align-center"
            style     = {{margin: 50}} >
            <RaisedButton
              label   = "Load more"
              onClick = {this.handleMoreRows}/>
          </div>
        </Show>
      </div>
    )
  },

  handleMoreRows: function() {
    DataObjectsActions.subFetchDataObjects({
      className : this.state.classObj.name,
      params    : this.state.nextParams
    });
  },

  handleBackClick: function() {
    SessionStore.getRouter().transitionTo(
      'classes',
      {
        instanceName : SessionStore.getInstance().name
      }
    );
  },

  render: function() {

    var table = null;
    if (this.state.items) {
      table = this.renderTable();
    } else {
      table = <Loading visible={true} />;
    }

    var selecteMessageText = null;

    if (this.state.selectedRows) {
      selecteMessageText = 'selected: ' + this.state.selectedRows.length;
    }

    return (

      <div className="row" style={{'height': '100%'}}>
        {this.getDialogs()}

        <DataObjectDialog />

        <div className="col-flex-1" style={{padding: 0}}>

          <Toolbar style={{background: 'transparent', padding: '0px'}}>

            <ToolbarGroup float="left" style={{padding: '0px'}}>

              <FontIcon
                style     = {{paddingLeft: '0px'}}
                className = "synicon-arrow-left"
                onClick   = {this.handleBackClick} />

              <ToolbarTitle text={'Class: ' + this.getParams().className} />
              <ToolbarTitle text={selecteMessageText} />
            </ToolbarGroup>

            <ToolbarGroup float="right">

              <IconButton
                style         = {{fontSize: 25, marginTop: 5}}
                iconClassName = "synicon-plus"
                tooltip       = "Add Data Objects"
                onClick       = {this.showDataObjectDialog} />

              <IconButton
                style         = {{fontSize: 25, marginTop: 5}}
                iconClassName = "synicon-delete"
                tooltip       = "Delete Data Objects"
                disabled      = {!(this.state.selectedRows)}
                onClick       = {this.showDialog('deleteDataObjectDialog')} />

              <ColumnsFilterMenu
                columns           = {DataObjectsStore.getTableColumns()}
                checkToggleColumn = {DataObjectsActions.checkToggleColumn} />

            </ToolbarGroup>

          </Toolbar>

          <div style={{clear: 'both', height: '100%'}}>
            <Show if={this.state.isLoading}>
              <Loading type='linear' />
            </Show>
            {table}
          </div>

        </div>
      </div>
    );
  }

});
