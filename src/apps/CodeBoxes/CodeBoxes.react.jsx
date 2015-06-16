var React  = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),

    // Utils
    DialogsMixin      = require('../../mixins/DialogsMixin'),
    HeaderMixin       = require('../Header/HeaderMixin'),

    // Stores and Actions
    SessionStore     = require('../Session/SessionStore'),
    CodeBoxesActions = require('./CodeBoxesActions'),
    CodeBoxesStore   = require('./CodeBoxesStore'),

    // Components
    mui                  = require('material-ui'),
    Dialog               = mui.Dialog,
    Container            = require('../../common/Container/Container.react'),
    List                 = require('../../common/Lists/List.react'),
    ListContainer        = require('../../common/Lists/ListContainer.react'),
    Item                 = require('../../common/ColumnList/Item.react'),
    Column               = require('../../common/ColumnList/ItemColumn.react'),
    Header               = require('../../common/ColumnList/Header.react'),
    ColNameDesc          = require('../../common/ColumnList/ColNameDesc.react'),
    FloatingActionButton = require('../../common/Fab/Fab.react'),
    FabList              = require('../../common/Fab/FabList.react'),

    CodeBoxesList        = require('./CodeBoxesList.react'),

    AddDialog            = require('./CodeBoxesAddDialog.react');


module.exports = React.createClass({

  displayName: 'CodeBoxes',

  mixins: [
    Reflux.connect(CodeBoxesStore),
    DialogsMixin,
    HeaderMixin,
    Router.State,
    Router.Navigation,
  ],

  componentWillMount: function() {
    CodeBoxesStore.refreshData();
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.info('CodeBoxes::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  componentDidMount: function() {
    if (this.getParams().action == 'add'){
      // Show Add modal
      this.refs.addCodeBoxDialog.show();
    }
  },

  // Dialogs config
  initDialogs: function () {

    return [{
      dialog: AddDialog,
      params: {
        ref  : "addCodeBoxDialog",
        mode : "add",
      },
    },{
      dialog: AddDialog,
      params: {
        ref  : "editCodeBoxDialog",
        mode : "edit",
      },
    },{
      dialog: Dialog,
      params: {
        ref:    "deleteCodeBoxDialog",
        title:  "Delete CodeBox key",
        actions: [
          {text: 'Cancel', onClick: this.handleCancel},
          {text: "Yes, I'm sure", onClick: this.handleDelete}
        ],
        modal: true,
        children: 'Do you really want to delete ' + CodeBoxesStore.getCheckedItems().length +' CodeBox(es)?',
      }
    }]
  },

  handleDelete: function() {
    console.info('CodeBoxes::handleDelete');
    CodeBoxesActions.removeCodeBoxes(CodeBoxesStore.getCheckedItems());
  },



  headerMenuItems: function() {
    var params = {instanceName: this.getParams().instanceName};
    return [
      {
        label: 'Data Browser',
        route: 'data-objects',
        params: params,
      }, {
        label: 'Classes',
        route: 'classes',
        params: params},
      {
        label: 'API Keys',
        route: 'api-keys',
        params: params
      }, {
        label: 'Admins',
        route: 'admins',
        params: params
      }, {
        label: 'Users',
        route: 'users',
        params: params
      }, {
        label: 'CodeBoxes',
        route: 'codeboxes',
        params: params,
        active: true,
      }, {
        label: 'Webhooks',
        route: 'webhooks',
        params: params
      }, {
        label: 'Tasks',
        route: 'tasks',
        params: params
      }];
  },

  //handleItemIconClick: function (id, state) {
  //  var checkedItemNumber;
  //  if (state) {
  //    checkedItemNumber = ++this.state.checkedItemNumber;
  //  } else {
  //    checkedItemNumber = --this.state.checkedItemNumber;
  //  }
  //
  //  this.setState({
  //    checkingState: checkedItemNumber > 0,
  //    checkedItemNumber: checkedItemNumber,
  //  });
  //
  //  console.log('checked', checkedItemNumber)
  //},

  handleItemClick: function(itemId) {
    // Redirect to edit screen
    this.transitionTo('codeboxes-edit', {instanceName: SessionStore.instance.name, codeboxId: itemId});
  },

  //generateItem: function (item) {
  //  return (<Item key={item.id}>
  //    <Column grid="1">
  //      <CheckIcon
  //        id          = {item.name}
  //        icon        = "notifications"
  //        background  = {this.getColor(item.runtime_name)}
  //        width       = '40px'
  //        handleClick = {this.handleItemIconClick}
  //       />
  //    </Column>
  //    <Column grid="5">
  //      <ColNameDesc
  //        id          = {item.id.toString()}
  //        name        = {item.name}
  //        description = {item.description}
  //        handleClick = {this.handleItemClick}
  //       />
  //    </Column>
  //    <Column grid="2">
  //      <span><strong>{item.runtime_name}</strong></span>
  //    </Column>
  //    <Column grid="2">
  //      <span><strong>{item.id}</strong></span>
  //    </Column>
  //    <Column grid="2">
  //      <span><strong>{item.created_at}</strong></span>
  //    </Column>
  //  </Item>)
  //
  //},

  //// Buttons
  //handlePlusButton: function (action) {
  //    console.info('CodeBoxes::handlePlusButton');
  //    this.refs.addCodeBoxDialog.show();
  //},

  //getItems: function () {
  //  var items = [];
  //  if (this.state.CodeBoxList){
  //    items = Object.keys(this.state.CodeBoxList).map(function(key){
  //      return this.generateItem(this.state.CodeBoxList[key])
  //    }.bind(this));
  //    // TODO: Fix this dirty hack, that should be done in store by sorting!
  //    items.reverse();
  //  }
  //  if (items.length > 0) {
  //    return items;
  //  }
  //  return [<Item key="empty">Empty Item</Item>];
  //},

  render: function () {

    var checkedItems = CodeBoxesStore.getNumberOfChecked();

    return (
      <Container>
        {this.getDialogs()}

        <FabList
          style={{top: 200, display: checkedItems ? 'block': 'none'}}>

          <FloatingActionButton
            label         = "Click here to unselect Api Keys" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {CodeBoxesActions.uncheckAll}
            iconClassName = "synicon-checkbox-multiple-marked-outline" />

          <FloatingActionButton
            label         = "Click here to delete CodeBoxes" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.showDialog('deleteCodeBoxDialog')}
            iconClassName = "synicon-delete" />

          <FloatingActionButton
            label         = "Click here to edit CodeBox" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            disabled      = {checkedItems > 1}
            onClick       = {this.showDialog('editCodeBoxDialog')}
            iconClassName = "synicon-backup-restore" />

        </FabList>

        <FabList
          style={{bottom: 100}}>
          <FloatingActionButton
            label         = "Click here to add CodeBox" // TODO: extend component
            color         = "" // TODO: extend component
            onClick       = {this.showDialog('addCodeBoxDialog')}
            iconClassName = "synicon-plus" />
        </FabList>

        <AddDialog ref="addCodeBoxDialog" />

        <CodeBoxesList
          name  = "CodeBoxes"
          items = {this.state.items} />
      </Container>
    );
  }

});