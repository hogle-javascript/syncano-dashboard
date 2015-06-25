var React                 = require('react'),
    Reflux                = require('reflux'),
    Router                = require('react-router'),

    // Utils
    HeaderMixin           = require('../Header/HeaderMixin'),
    ButtonActionMixin     = require('../../mixins/ButtonActionMixin'),
    DialogsMixin          = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin     = require('../../mixins/InstanceTabsMixin'),

    // Stores and Actions
    SessionActions        = require('../Session/SessionActions'),
    SessionStore          = require('../Session/SessionStore'),
    ClassesActions        = require('./ClassesActions'),
    ClassesStore          = require('./ClassesStore'),

    // Components
    mui                   = require('material-ui'),
    FloatingActionButton  = mui.FloatingActionButton,
    Dialog                = mui.Dialog,
    FabListItem           = require('../../common/Fab/FabListItem.react'),
    Container             = require('../../common/Container/Container.react'),
    FabList               = require('../../common/Fab/FabList.react'),
    ColorIconPickerDialog = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),
    Show                  = require('../../common/Show/Show.react'),

    // Local components
    ClassesList           = require('./ClassesList.react'),
    AddDialog             = require('./ClassesAddDialog.react');


module.exports = React.createClass({

  displayName: 'Classes',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(ClassesStore),
    HeaderMixin,
    DialogsMixin,
    InstanceTabsMixin
  ],

  componentWillUpdate: function(nextProps, nextState) {
    console.info('Classes::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  componentWillMount: function() {
    console.info('Classes::componentWillMount');
    ClassesActions.fetch();
  },
    // Dialogs config
  initDialogs: function () {
    var checkedItemIconColor = ClassesStore.getCheckedItemIconColor();
    return [{
      dialog: AddDialog,
      params: {
        ref  : "addClassDialog",
        mode : "add"
      }
    },{
      dialog: AddDialog,
      params: {
        ref  : "editClassDialog",
        mode : "edit"
      }
    },{
      dialog: ColorIconPickerDialog,
      params: {
        ref          : "pickColorIconDialog",
        mode         : "add",
        initialColor : checkedItemIconColor.color,
        initialIcon  : checkedItemIconColor.icon,
        handleClick  : this.handleChangePalette
      }
    },{
      dialog: Dialog,
      params: {
        ref: "deleteClassDialog",
        title: "Delete API key",
        actions: [
          {
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            text    : "Yes, I'm sure.",
            onClick : this.handleDelete
          }
        ],
        modal: true,
        children: 'Do you really want to delete ' + ClassesStore.getCheckedItems().length +' Class(es)?',
      }
    }]
  },
  
  handleChangePalette: function (color, icon) {
    console.info('Classes::handleChangePalette', color, icon);

    ClassesActions.updateClass(
      ClassesStore.getCheckedItem().name, {
        metadata: JSON.stringify({
          color : color,
          icon  : icon
        })
      }
    );
    ClassesActions.uncheckAll()
  },

  handleDelete: function() {
    console.info('Classes::handleDelete');
    ClassesActions.removeClasses(ClassesStore.getCheckedItems());
  },

  handleReset: function() {
    console.info('Classes::handleReset');
    ClassesActions.resetClass(ClassesStore.getCheckedItem().id);
  },

  getStyles: function() {
    return {
      fabListTop: {
        top: 200
      },
      fabListTopButton: {
        margin: '5px 0'
      },
      fabListBottom: {
        bottom: 100
      }
    }
  },

  render: function () {

    var checkedClasses = ClassesStore.getNumberOfChecked(),
        styles         = this.getStyles();

    return (
      <Container>
        {this.getDialogs()}

        <Show if={checkedClasses > 0}>
          <FabList position="top">

            <FabListItem
              label         = "Click here to unselect Api Keys" // TODO: extend component
              color         = "" // TODO: extend component
              mini          = {true}
              onClick       = {ClassesActions.uncheckAll}
              iconClassName = "synicon-checkbox-multiple-marked-outline" />

            <FabListItem
              label         = "Click here to delete Classes" // TODO: extend component
              color         = "" // TODO: extend component
              mini          = {true}
              onClick       = {this.showDialog('deleteClassDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to edit Class" // TODO: extend component
              color         = "" // TODO: extend component
              mini          = {true}
              disabled      = {checkedClasses > 1}
              onClick       = {this.showDialog('editClassDialog')}
              iconClassName = "synicon-pencil" />

            <FabListItem
              style         = {styles.fabListTopButton}
              label         = "Click here to customize Instances" // TODO: extend component
              color         = "" // TODO: extend component
              secondary     = {true}
              mini          = {true}
              disabled      = {checkedClasses > 1}
              onClick       = {this.showDialog('pickColorIconDialog')}
              iconClassName = "synicon-palette" />

          </FabList>
        </Show>

        <FabList
          style={{bottom: 100}}>
          <FloatingActionButton
            label         = "Click here to add Class" // TODO: extend component
            color         = "" // TODO: extend component
            onClick       = {this.showDialog('addClassDialog')}
            iconClassName = "synicon-plus" />
        </FabList>

        <ClassesList
          name                 = "Classes"
          items                = {this.state.items}
          emptyItemHandleClick = {this.showDialog('addClassDialog')}
          emptyItemContent     = "Create a Class" />

      </Container>
    );
  }

});