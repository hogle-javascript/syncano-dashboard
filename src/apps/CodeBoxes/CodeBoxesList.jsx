import React from 'react';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

import Actions from './CodeBoxesActions';
import Store from './CodeBoxesStore';

// Components
import ListItem from './CodeBoxesListItem';
import {Dialog, ColumnList, Lists} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({

  displayName: 'CodeBoxesList',

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
    console.info('Admins::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeCodeBoxDialog',
        ref: 'removeCodeBoxDialog',
        title: 'Delete a CodeBox Socket',
        handleConfirm: Actions.removeCodeBoxes,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        groupName: 'CodeBox Socket'
      }
    }];
  },

  renderItem(item, index) {
    return (
      <ListItem
        key={`codeBoxeslist-${index}`}
        onIconClick={this.handleItemIconClick}
        item={item}
        showDeleteDialog={this.showDialog.bind(null, 'removeCodeBoxDialog', item)}/>
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
            className="col-xs-4">
            Traces
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-4">
            Snippet ID
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="KEY"
            className="col-xs-3">
            Public
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete a CodeBox Socket"
                multipleItemsText="Delete CodeBox Sockets"
                onTouchTap={this.showDialog.bind(null, 'removeCodeBoxDialog')}/>
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

