import React from 'react';
import Router from 'react-router';
import _ from 'lodash';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './ClassesActions';
import Store from './ClassesStore';

import ListItem from './ClassesListItem';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'ClassesList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.Dialog,
    Mixins.Dialogs
  ],

  getInitialState() {
    return {};
  },

  componentWillUpdate(nextProps) {
    console.info('ApiKeysList::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  getStyles() {
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
    };
  },

  getAssociatedClasses() {
    let checkedClasses = Store.getCheckedItems();

    let associatedClasses = _.filter(checkedClasses, (checkedClass) => {
      checkedClass.triggers = _.pluck(_.filter(this.props.triggers, 'class', checkedClass.name), 'label');
      return checkedClass.triggers.length > 0;
    });

    return associatedClasses;
  },

  getAssociationsList(associationsFor, associatedItems) {
    let hasItems = associatedItems.length > 0;
    let list = {
      triggers: null,
      notAssociated: null
    };

    if (hasItems) {
      list.triggers = (
        <div>
          Associated with Triggers: {this.getDialogList(associatedItems, 'name', associationsFor)}
        </div>
      );
      list.notAssociated = (
        <div>
          Not associated: {this.getDialogList(associatedItems, 'name')}
        </div>
      );
    }

    return list[associationsFor];
  },

  isProtectedFromDelete(item) {
    return item.protectedFromDelete;
  },

  handleChangePalette(color, icon) {
    console.info('Classes::handleChangePalette', color, icon);
    let metadata = JSON.stringify({color, icon});

    Actions.updateClass(Store.getClickedItem().name, {metadata});
    Actions.uncheckAll();
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  handleDelete() {
    console.info('Classes::handleDelete');
    Actions.removeClasses(Store.getCheckedItems());
  },

  handleReset() {
    console.info('Classes::handleReset');
    Actions.resetClass(Store.getCheckedItem().id);
  },

  initDialogs() {
    let clickedItem = Store.getClickedItemIconColor();
    let checkedClasses = Store.getCheckedItems();
    let classesAssociatedWithTriggers = this.getAssociatedClasses();
    let classesNotAssociated = _.difference(checkedClasses, classesAssociatedWithTriggers);
    let deleteDialog = {
      dialog: Common.Dialog,
      params: {
        key: 'deleteClassDialog',
        ref: 'deleteClassDialog',
        title: 'Delete a Class',
        actions: [
          {
            text: 'Cancel',
            onClick: this.handleCancel.bind(null, 'deleteClassDialog')
          },
          {
            text: 'Confirm',
            onClick: this.handleDelete
          }
        ],
        modal: true,
        children: [
          'Do you really want to delete ' + this.getDialogListLength(checkedClasses) + ' Class(es)?',
          this.getDialogList(checkedClasses),
          <Common.Loading
            type="linear"
            position="bottom"
            show={this.props.isLoading}
          />
        ]
      }
    };

    if (classesAssociatedWithTriggers) {
      let associatedWithTriggersList = this.getAssociationsList('triggers', classesAssociatedWithTriggers);
      let notAssociatedList = this.getAssociationsList('notAssociated', classesNotAssociated);

      deleteDialog.params.children = [
        `Some of checked Classes are associated with Triggers. Do you really want to delete ${checkedClasses.length}
        Class(es)?`,
        notAssociatedList,
        associatedWithTriggersList,
        <Common.Loading
          type="linear"
          position="bottom"
          show={this.props.isLoading}/>
      ];
    }

    return [
      deleteDialog,
      {
        dialog: Common.ColorIconPicker.Dialog,
        params: {
          key: 'pickColorIconDialog',
          ref: 'pickColorIconDialog',
          mode: 'add',
          initialColor: clickedItem.color,
          initialIcon: clickedItem.icon,
          handleClick: this.handleChangePalette
        }
      }
    ];
  },

  renderItem(item) {
    return (
      <ListItem
        onIconClick={this.handleItemIconClick}
        item={item}
        showCustomizeDialog={this.showDialog.bind(null, 'pickColorIconDialog')}
        showDeleteDialog={this.showMenuDialog.bind(null, item.name, Actions.removeClasses.bind(null, [item]))}/>
    );
  },

  render() {
    let checkedItems = Store.getCheckedItems();
    let checkedItemsCount = Store.getNumberOfChecked();
    let someClassIsProtectedFromDelete = checkedItems.some(this.isProtectedFromDelete);

    return (
      <Common.Lists.Container className="classes-list">
        <Common.ColumnList.Column.MenuDialog ref="menuDialog"/>
        {this.getDialogs()}
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="ID"
            className="col-xs-3">
            Group
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-6">
            Permissions
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="ID"
            className="col-xs-4">
            Objects
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Common.Lists.Menu
              checkedItemsCount={checkedItemsCount}
              actions={Actions}>
              <Common.Lists.MenuItem
                primaryText="Delete Class"
                disabled={someClassIsProtectedFromDelete}
                onTouchTap={this.showDialog.bind(null, 'deleteClassDialog')}/>
            </Common.Lists.Menu>
          </Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Lists.List
          {...this.props}
          renderItem={this.renderItem}/>
      </Common.Lists.Container>
    );
  }
});

