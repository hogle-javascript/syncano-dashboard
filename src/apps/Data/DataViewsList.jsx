import React from 'react';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import {DialogsMixin} from '../../mixins';

// Stores and Actions
import Actions from './DataViewsActions';
import Store from './DataViewsStore';

// Components
import ListItem from './DataViewsListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'DataViewsList',

  mixins: [
    DialogsMixin,
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  componentWillUpdate(nextProps) {
    console.info('Data::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeDataViewDialog',
        ref: 'removeDataViewDialog',
        title: 'Delete a DataView',
        handleConfirm: Actions.removeDataViews,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        groupName: 'Data Socket'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`data-views-list-item-${item.name}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeDataViewDialog', item)} />
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container>
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-12"
            primary={true}
            columnName="CHECK_ICON"
            handleClick={this.props.handleTitleClick}>
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Description
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-11">
            Class
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete a Data Socket"
                multipleItemsText="Delete Data Sockets"
                onTouchTap={() => this.showDialog('removeDataViewDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          key="dataviews-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});

