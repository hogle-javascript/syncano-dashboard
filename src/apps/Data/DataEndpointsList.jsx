import React from 'react';
import Router from 'react-router';

// Utils
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './DataEndpointsActions';
import Store from './DataEndpointsStore';

// Components
import ListItem from './DataEndpointsListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'DataEndpointsList',

  mixins: [
    Router.State,
    Router.Navigation,
    DialogsMixin
  ],

  componentWillUpdate(nextProps) {
    console.info('Data::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleTitleClick() {
    const instanceName = this.getParams().instanceName;

    if (this.props.handleTitleClick) {
      this.props.handleTitleClick();
      return;
    }

    this.transitionTo('data', {instanceName});
  },

  initDialogs() {
    const {checkedItems} = this.props;
    const checkedDataSockets = checkedItems ? checkedItems : Store.getCheckedItems();

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeDataEndpointDialog',
        ref: 'removeDataEndpointDialog',
        title: 'Delete a Data Endpoint',
        handleConfirm: Actions.removeDataEndpoints,
        isLoading: this.props.isLoading,
        items: checkedDataSockets,
        groupName: 'Data Endpoint'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`data-views-list-item-${item.name}`}
        onIconClick={this.props.checkItem ? this.props.checkItem : Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeDataEndpointDialog', item)} />
    );
  },

  render() {
    const {handleSelectAll, handleUnselectAll, checkedItems} = this.props;
    const checkedItemsCount = checkedItems ? checkedItems.length : Store.getNumberOfChecked();

    return (
      <Lists.Container>
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-12"
            primary={true}
            columnName="CHECK_ICON"
            handleClick={this.handleTitleClick}>
            Data Sockets
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Description
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-3">
            Class
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItemsCount}
              handleSelectAll={handleSelectAll ? handleSelectAll : Actions.selectAll}
              handleUnselectAll={handleUnselectAll ? handleUnselectAll : Actions.uncheckAll}>
              <Lists.MenuItem
                singleItemText="Delete a Data Endpoint"
                multipleItemsText="Delete Data Endpoints"
                onTouchTap={() => this.showDialog('removeDataEndpointDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          emptyItemContent="Create a Data Socket"
          emptyItemHandleClick={Actions.showDialog}
          key="dataendpoints-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
