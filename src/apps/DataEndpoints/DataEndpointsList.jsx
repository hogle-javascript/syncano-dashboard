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

  getDefaultProps() {
    return {
      emptyItemContent: 'Create a Data Endpoint',
      emptyItemHandleClick: Actions.showDialog,
      checkedItems: Store.getCheckedItems(),
      checkItem: Actions.checkItem,
      handleSelectAll: Actions.selectAll,
      handleUnselectAll: Actions.uncheckAll
    };
  },

  componentWillUpdate(nextProps) {
    console.info('Data::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    const {checkedItems, isLoading} = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeDataEndpointDialog',
        ref: 'removeDataEndpointDialog',
        title: 'Delete a Data Endpoint',
        handleConfirm: Actions.removeDataEndpoints,
        items: checkedItems,
        groupName: 'Data Endpoint',
        isLoading
      }
    }];
  },

  renderItem(item) {
    const {checkItem} = this.props;

    return (
      <ListItem
        key={`data-views-list-item-${item.name}`}
        onIconClick={checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeDataEndpointDialog', item)} />
    );
  },

  render() {
    const {handleTitleClick, handleSelectAll, handleUnselectAll, checkedItems, ...other} = this.props;

    return (
      <Lists.Container>
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-12"
            primary={true}
            columnName="CHECK_ICON"
            handleClick={handleTitleClick}>
            Data Endpoints
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
              checkedItemsCount={checkedItems.length}
              handleSelectAll={handleSelectAll}
              handleUnselectAll={handleUnselectAll}>
              <Lists.MenuItem
                singleItemText="Delete a Data Endpoint"
                multipleItemsText="Delete Data Endpoints"
                onTouchTap={() => this.showDialog('removeDataEndpointDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...other}
          key="dataendpoints-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
