import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import _ from 'lodash';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './SnippetsActions';
import Store from './SnippetsStore';

// Components
import ListItem from './SnippetsListItem';
import {Dialog, ColumnList, Lists, Loading} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({

  displayName: 'SnippetsList',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    HeaderMixin,
    Mixins.Dialog,
    Mixins.Dialogs
  ],

  componentWillUpdate(nextProps, nextState) {
    console.info('Snippets::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  getAssociatedSnippets(associatedWith) {
    let checkedSnippets = Store.getCheckedItems();

    let associatedSnippets = _.filter(checkedSnippets, (snippet) => {
      snippet[associatedWith] = _.pluck(_.filter(this.state[associatedWith], 'snippet', snippet.id), 'label');
      return snippet[associatedWith].length > 0;
    });

    return associatedSnippets;
  },

  getAssociationsList(associationsFor, associatedItems) {
    let hasItems = associatedItems.length > 0;
    let list = {
      schedules: null,
      triggers: null,
      notAssociated: null
    };

    if (hasItems) {
      list.schedules = (
        <div>
          Associated with Schedules: {this.getDialogList(associatedItems, 'label', associationsFor)}
        </div>
      );
      list.triggers = (
        <div>
          Associated with Triggers: {this.getDialogList(associatedItems, 'label', associationsFor)}
        </div>
      );
      list.notAssociated = (
        <div>
          Not associated: {this.getDialogList(associatedItems, 'label')}
        </div>
      );
    }

    return list[associationsFor];
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  handleDelete() {
    console.info('Snippets::handleDelete');
    Actions.removeSnippets(Store.getCheckedItems());
  },

  initDialogs() {
    let checkedSnippets = Store.getCheckedItems();
    let snippetsAssociatedWithTriggers = this.getAssociatedSnippets('triggers');
    let snippetsAssociatedWithSchedules = this.getAssociatedSnippets('schedules');
    let snippetsNotAssociated = _.difference(_.difference(checkedSnippets, snippetsAssociatedWithSchedules),
      snippetsAssociatedWithTriggers);

    let deleteDialog = {
      dialog: Dialog.Delete,
      params: {
        key: 'deleteSnippetDialog',
        ref: 'deleteSnippetDialog',
        title: 'Delete a Snippet',
        handleConfirm: this.handleDelete,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        itemLabelName: 'label',
        groupName: 'Snippet'
      }
    };

    if (snippetsAssociatedWithSchedules.length > 0 || snippetsAssociatedWithTriggers.length > 0) {
      let associatedWithSchedulesList = this.getAssociationsList('schedules', snippetsAssociatedWithSchedules);
      let associatedWithTriggersList = this.getAssociationsList('triggers', snippetsAssociatedWithTriggers);
      let notAssociatedList = this.getAssociationsList('notAssociated', snippetsNotAssociated);

      deleteDialog.params.children = [
        `Some of checked Snippets are associated with Schedules or Triggers. Do you really want to delete
        ${Store.getDeleteItemsPhrase('Snippet')}?`,
        notAssociatedList,
        associatedWithSchedulesList,
        associatedWithTriggersList,
        <Loading
          type="linear"
          position="bottom"
          show={this.state.isLoading}/>
      ];
    }

    return [deleteDialog];
  },

  renderItem(item) {
    return (
      <ListItem
        onIconClick={this.handleItemIconClick}
        item={item}
        showDeleteDialog={this.showMenuDialog.bind(null, item.label, Actions.removeSnippets.bind(null, [item]))}
      />);
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container>
        {this.getDialogs()}
        <Column.MenuDialog ref="menuDialog"/>
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete a Snippet"
                multipleItemsText="Delete Snippets"
                onTouchTap={this.showDialog.bind(null, 'deleteSnippetDialog')}/>
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
