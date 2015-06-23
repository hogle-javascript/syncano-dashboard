var React              = require('react'),
    Reflux             = require('reflux'),
    Router             = require('react-router'),

    // Utils
    HeaderMixin        = require('../Header/HeaderMixin'),
    ButtonActionMixin  = require('../../mixins/ButtonActionMixin'),
    DialogsMixin       = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin  = require('../../mixins/InstanceTabsMixin'),


    ClassesActions     = require("./ClassesActions"),
    ClassesStore       = require("./ClassesStore"),
    DataObjectsActions = require("./DataObjectsActions"),
    DataObjectsStore   = require("./DataObjectsStore"),

    mui                = require('material-ui'),
    Colors             = mui.Styles.Colors,
    Menu               = mui.Menu,
    Paper              = mui.Paper,
    Avatar             = mui.Avatar,
    FontIcon           = mui.FontIcon,
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

    CheckAvatar        = require("./CheckAvatar.react");


module.exports = React.createClass({

  displayName: 'DataObjects',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(DataObjectsStore, 'dataobjects'),
    Reflux.connect(ClassesStore, 'classes'),
    HeaderMixin,
    DialogsMixin,
    InstanceTabsMixin
  ],

  componentWillUpdate: function(nextProps, nextState) {
    console.info('Users::componentWillUpdate');
    // Merging "hideDialogs
    this.hideDialogs(nextState.hideDialogs || nextState.classes.hideDialogs || nextState.dataobjects.hideDialogs);
  },

  componentWillMount: function() {
    console.info('Users::componentWillMount');
    ClassesStore.refreshData();
    DataObjectsStore.refreshData();
  },

  getInitialState: function(){
    return {pages: 1}
  },

  handleClassIconClick: function (id, state) {
    ClassesActions.checkItem(id, state);
  },

  renderClasses: function() {
    return this.state.classes.items.map(function(item) {
      var avatar = (
        <CheckAvatar
          id              = {item.name}
          checked         = {item.checked}
          background      = "blue"
          icon            = "account"
          handleIconClick = {this.handleClassIconClick} />);
      return (
        <div style={{background: item.checked ? Colors.grey300: null}}>
          <ListItem
            leftAvatar={avatar}
            onClick={this.handleClassIconClick}>
            {item.name}
          </ListItem>
        </div>
      )
    }.bind(this))
  },

  handleMoreRows: function() {
    this.setState({pages: this.state.pages + 1})
  },

  render: function () {

    var colOrder = null;
    var tableData = DataObjectsStore.renderTableData();
    var tableHeader = ClassesStore.getTableHeader();
    if (tableHeader) {
        colOrder = Object.keys(tableHeader);
    }

    return (
      <div className="row">
        <div className="col-lg-8" style={{width:250, padding: 0}}>
          <Toolbar>
            <ToolbarGroup float="left">
              <ToolbarTitle text="Classes" />
            </ToolbarGroup>

            <ToolbarGroup float="right">
             <FontIcon className="synicon-plus"/>
            <FontIcon className="synicon-delete"/>
            </ToolbarGroup>
          </Toolbar>

          <List subheader="">
            {this.renderClasses()}
          </List>

        </div>
        <div className="col-flex-1" style={{padding: 0}}>

          <Toolbar>
            <ToolbarGroup float="left">
              <ToolbarTitle text="Data Objects" />
            </ToolbarGroup>
            <ToolbarGroup float="right">
             <FontIcon className="synicon-delete"/>
            <FontIcon className="synicon-delete"/>
            </ToolbarGroup>
          </Toolbar>

          <div style={{clear: 'both', height: '100%', position: 'absolute'}}>
          <Table
            defaultColumnWidth = {20}
            headerColumns = {tableHeader}
            columnOrder   = {colOrder}
            rowData       = {tableData}
            fixedHeader   = {true}
            fixedFooter   = {true}/>

            <div className="row align-center" style={{margin: 50}}>
              <div>Loaded {tableData.length} data objects</div>
            </div>
            <div className="row align-center" style={{margin: 50}}>
              <RaisedButton
                label="Load more"
                onClick={this.handleMoreRows}/>
            </div>
          </div>

        </div>
      </div>
    );
  }

});