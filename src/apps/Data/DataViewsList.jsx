import React from 'react';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './DataViewsActions';
import Store from './DataViewsStore';

// Components
import ListItem from './DataViewsListItem';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'DataViewsList',

  mixins: [
    Mixins.Dialog,
    Mixins.Dialogs,
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  getInitialState() {
    return {};
  },

  componentWillUpdate(nextProps) {
    console.info('Data::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  handleRemoveDataViews() {
    console.info('Data::handleRemoveDataViews');
    Actions.removeDataViews(Store.getCheckedItems());
  },

  initDialogs() {
    let checkedItems = Store.getCheckedItems();

    return [
      {
        dialog: Common.Dialog,
        params: {
          key: 'removeDataViewDialog',
          ref: 'removeDataViewDialog',
          title: 'Delete a DataView',
          actions: [
            {
              text: 'Cancel',
              onClick: this.handleCancel.bind(null, 'removeDataViewDialog')
            },
            {
              text: 'Confrim',
              onClick: this.handleRemoveDataViews
            }
          ],
          modal: true,
          children: [
            `Do you really want to delete ${Store.getDeleteItemsPhrase('Data Socket')}?`,
            this.getDialogList(checkedItems),
            <Common.Loading
              type="linear"
              position="bottom"
              show={this.props.isLoading}/>
          ]
        }
      }
    ];
  },

  renderItem(item) {
    return (
      <ListItem
        onIconClick={this.handleItemIconClick}
        item={item}
        showDeleteDialog={this.showMenuDialog.bind(null, item.name, Actions.removeDataViews.bind(null, [item]))}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Common.Lists.Container>
        {this.getDialogs()}
        <Common.ColumnList.Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
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
            className="col-xs-5">
            Class
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Common.Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Common.Lists.MenuItem
                singleItemText="Delete a Data Socket"
                multipleItemsText="Delete Data Sockets"
                onTouchTap={this.showDialog.bind(null, 'removeDataViewDialog')}/>
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

