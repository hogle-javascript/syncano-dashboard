import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import ClassesActions from './ClassesActions';
import ClassesStore from './ClassesStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import ClassesList from './ClassesList.react';
import ClassDialog from './ClassDialog.react';

export default React.createClass({

  displayName: 'Classes',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(ClassesStore),
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
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
      dialog: Common.ColorIconPicker.Dialog,
      params: {
        key          : 'pickColorIconDialog',
        ref          : 'pickColorIconDialog',
        mode         : 'add',
        initialColor : checkedItemIconColor.color,
        initialIcon  : checkedItemIconColor.icon,
        handleClick  : this.handleChangePalette
      }
    },
    {
      dialog: Common.Dialog,
      params: {
        key   : 'deleteClassDialog',
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
          <Common.Loading
            type     = "linear"
            position = "bottom"
            show     = {this.state.isLoading}
          />
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

  checkClassItem: function(id, state) {
    ClassesActions.checkItem(id, state);
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

  isProtectedFromDelete: function(item) {
    return item.protectedFromDelete;
  },

  render: function() {
    var styles                         = this.getStyles(),
        checkedClasses                 = ClassesStore.getCheckedItems(),
        checkedClassesCount            = ClassesStore.getNumberOfChecked(),
        isAnyAndNotAllClassSelected    = checkedClassesCount >= 1 && checkedClassesCount < (this.state.items.length),
        someClassIsProtectedFromDelete = checkedClasses.some(this.isProtectedFromDelete);

    return (
      <Container>
        <ClassDialog />
        {this.getDialogs()}

        <Common.Show if={checkedClassesCount > 0}>
          <Common.Fab position="top">
            <Common.Fab.Item
              label         = {isAnyAndNotAllClassSelected ? "Click here to select all" : "Click here to unselect all"}
              mini          = {true}
              onClick       = {isAnyAndNotAllClassSelected ? ClassesActions.selectAll : ClassesActions.uncheckAll}
              iconClassName = {isAnyAndNotAllClassSelected ? "synicon-checkbox-multiple-marked-outline" : "synicon-checkbox-multiple-blank-outline"}
            />
            <Common.Fab.Item
              label         = "Click here to delete Classes"
              mini          = {true}
              disabled      = {someClassIsProtectedFromDelete}
              onClick       = {this.showDialog.bind(null, 'deleteClassDialog')}
              iconClassName = "synicon-delete"
            />
            <Common.Fab.Item
              label         = "Click here to edit Class"
              mini          = {true}
              disabled      = {checkedClassesCount > 1}
              onClick       = {this.showClassEditDialog}
              iconClassName = "synicon-pencil"
            />
            <Common.Fab.Item
              style         = {styles.fabListTopButton}
              label         = "Click here to customize Class"
              secondary     = {true}
              mini          = {true}
              disabled      = {checkedClassesCount > 1}
              onClick       = {this.showDialog.bind(null, 'pickColorIconDialog')}
              iconClassName = "synicon-palette"
            />
          </Common.Fab>
        </Common.Show>

        <Common.Fab>
          <Common.Fab.Item
            label         = "Click here to add Class"
            onClick       = {this.showClassDialog}
            iconClassName = "synicon-plus"
          />
        </Common.Fab>

        <ClassesList
          name                 = "Classes"
          items                = {this.state.items}
          checkItem            = {this.checkClassItem}
          emptyItemHandleClick = {this.showClassDialog}
          emptyItemContent     = "Create a Class"
        />
      </Container>
    );
  }
});
