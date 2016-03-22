import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import _ from 'lodash';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './ScriptsActions';
import Store from './ScriptsStore';

// Components
import ListItem from './ScriptsListItem';
import {ColumnList, Loading} from 'syncano-components';
import {Dialog, Lists} from '../../common';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ScriptsList',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    DialogsMixin
  ],

  componentWillUpdate(nextProps) {
    console.info('Scripts::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  getAssociatedScripts(associatedWith) {
    const checkedScripts = Store.getCheckedItems();

    const associatedScripts = _.filter(checkedScripts, (script) => {
      script[associatedWith] = _.pluck(_.filter(this.state[associatedWith], 'script', script.id), 'label');
      return script[associatedWith].length > 0;
    });

    return associatedScripts;
  },

  getAssociationsList(associationsFor, associatedItems) {
    const hasItems = associatedItems.length > 0;
    const list = {
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

  initDialogs() {
    const checkedScripts = Store.getCheckedItems();
    const scriptsAssociatedWithTriggers = this.getAssociatedScripts('triggers');
    const scriptsAssociatedWithSchedules = this.getAssociatedScripts('schedules');
    const scriptsNotAssociated = _.difference(_.difference(checkedScripts, scriptsAssociatedWithSchedules),
      scriptsAssociatedWithTriggers);

    const deleteDialog = {
      dialog: Dialog.Delete,
      params: {
        key: 'deleteScriptDialog',
        ref: 'deleteScriptDialog',
        title: 'Delete a Script',
        handleConfirm: Actions.removeScripts,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        itemLabelName: 'label',
        groupName: 'Script'
      }
    };

    if (scriptsAssociatedWithSchedules.length > 0 || scriptsAssociatedWithTriggers.length > 0) {
      const associatedWithSchedulesList = this.getAssociationsList('schedules', scriptsAssociatedWithSchedules);
      const associatedWithTriggersList = this.getAssociationsList('triggers', scriptsAssociatedWithTriggers);
      const notAssociatedList = this.getAssociationsList('notAssociated', scriptsNotAssociated);

      deleteDialog.params.children = [
        `Some of checked Scripts are associated with Schedules or Triggers. Do you really want to delete
        ${Store.getDeleteItemsPhrase('Script')}?`,
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
        key={`scripts-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('deleteScriptDialog', item)} />
    );
  },

  render() {
    const checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container>
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            Scripts
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              handleSelectAll={Actions.selectAll}
              handleUnselectAll={Actions.uncheckAll}>
              <Lists.MenuItem
                singleItemText="Delete a Script Endpoint"
                multipleItemsText="Delete Script Endpoints"
                onTouchTap={() => this.showDialog('deleteScriptDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          emptyItemContent="Add a Script"
          emptyItemHandleClick={Actions.showDialog}
          key="scripts-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
