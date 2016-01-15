import React from 'react';
import Router from 'react-router';

import Actions from './TriggersActions';
import Store from './TriggersStore';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import {DialogsMixin} from '../../mixins';

// Components
import ListItem from './TriggersListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'TriggersList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    DialogsMixin
  ],

  componentWillUpdate(nextProps) {
    console.info('Triggers::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleItemClick(itemId) {
    this.transitionTo('trigger-traces', {
      instanceName: this.getParams().instanceName,
      triggerId: itemId
    });
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeTriggerDialog',
        ref: 'removeTriggerDialog',
        title: 'Delete a Trigger',
        handleConfirm: Actions.removeTriggers,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        itemLabelName: 'label',
        groupName: 'Trigger'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`triggers-list-item-${item.id}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={this.showDialog.bind(null, 'removeTriggerDialog', item)}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container className="triggers-list">
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON"
            handleClick={this.props.handleTitleClick}>
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Class
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-sm-4">
            Snippet
          </Column.ColumnHeader>
          <Column.ColumnHeader className="col-sm-7" columnName="DESC">Signal</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete a Trigger Socket"
                multipleItemsText="Delete Trigger Sockets"
                onTouchTap={this.showDialog.bind(null, 'removeTriggerDialog')}/>
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          key="triggers-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});

