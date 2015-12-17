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
import {FlatButton} from 'syncano-material-ui';
import ListItem from './SnippetsListItem';
import Common from '../../common';

let Column = Common.ColumnList.Column;

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
      dialog: Common.Dialog,
      params: {
        key: 'deleteSnippetDialog',
        ref: 'deleteSnippetDialog',
        title: 'Delete a Snippet',
        actions: [
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.handleCancel.bind(null, 'deleteSnippetDialog')}/>,
          <FlatButton
            label="Confirm"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.handleDelete}/>
        ],
        modal: true,
        avoidResetState: true,
        children: [
          `Do you really want to delete ${Store.getDeleteItemsPhrase('Snippet')}?`,
          this.getDialogList(checkedSnippets, 'label'),
          <Common.Loading
            type="linear"
            position="bottom"
            show={this.state.isLoading}/>
        ]
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
        <Common.Loading
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
      <Common.Lists.Container>
        {this.getDialogs()}
        <Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Common.Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Common.Lists.MenuItem
                singleItemText="Delete a Snippet"
                multipleItemsText="Delete Snippets"
                onTouchTap={this.showDialog.bind(null, 'deleteSnippetDialog')}/>
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
