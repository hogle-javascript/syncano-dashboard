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
    Loading               = require('../../common/Loading/Loading.react'),
    Show                  = require('../../common/Show/Show.react'),

    // Local components
    ClassesList           = require('./ClassesList.react'),
    ClassDialog           = require('./ClassDialog.react');

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

  componentDidMount: function() {
    console.info('Classes::componentDidMount');
    ClassesActions.fetch();
  },

  // Dialogs config
  initDialogs: function() {
    var checkedItemIconColor = ClassesStore.getCheckedItemIconColor(),
        checkedClasses       = ClassesStore.getCheckedItems();

    return [{
      dialog: ColorIconPickerDialog,
      params: {
        ref          : 'pickColorIconDialog',
        mode         : 'add',
        initialColor : checkedItemIconColor.color,
        initialIcon  : checkedItemIconColor.icon,
        handleClick  : this.handleChangePalette
      }
    },
    {
      dialog: Dialog,
      params: {
        ref   : 'deleteClassDialog',
        title : 'Delete an API Key',
        actions: [
          {
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            text    : 'Confirm',
            onClick : this.handleDelete
          }
        ],
        modal: true,
        children: [
          'Do you really want to delete ' + this.getDialogListLength(checkedClasses) + ' Class(es)?',
          this.getDialogList(checkedClasses),
          <Loading
            type     = "linear"
            position = "bottom"
            show     = {this.state.isLoading} />
        ]
      }
    }]
  },

  handleChangePalette: function(color, icon) {
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

  showClassDialog: function() {
    ClassesActions.showDialog();
  },

  showClassEditDialog: function() {
    ClassesActions.showDialog(ClassesStore.getCheckedItem());
  },

  render: function() {

    var checkedClasses     = ClassesStore.getNumberOfChecked(),
        styles             = this.getStyles(),
        isAnyClassSelected = checkedClasses >= 1 && checkedClasses < (this.state.items.length);

    return (
      <Container>
        <ClassDialog />
        {this.getDialogs()}

        <Show if={checkedClasses > 0}>
          <FabList position="top">

            <FabListItem
              label         = {isAnyClassSelected ? "Click here to select all" : "Click here to unselect all"} // TODO: extend component
              color         = "" // TODO: extend component
              mini          = {true}
              onClick       = {isAnyClassSelected ? ClassesActions.selectAll : ClassesActions.uncheckAll}
              iconClassName = {isAnyClassSelected ? "synicon-checkbox-multiple-marked-outline" : "synicon-checkbox-multiple-blank-outline"} />

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
              onClick       = {this.showClassEditDialog}
              iconClassName = "synicon-pencil" />

            <FabListItem
              style         = {styles.fabListTopButton}
              label         = "Click here to customize Class" // TODO: extend component
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
            onClick       = {this.showClassDialog}
            iconClassName = "synicon-plus" />
        </FabList>

        <ClassesList
          name                 = "Classes"
          items                = {this.state.items}
          emptyItemHandleClick = {this.showClassDialog}
          emptyItemContent     = "Create a Class" />

      </Container>
    );
  }

});
