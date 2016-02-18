import React from 'react';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import {DialogsMixin} from '../../mixins';

import Actions from './CodeBoxesActions';
import Store from './CodeBoxesStore';

// Components
import ListItem from './CodeBoxesListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ScriptSocketsList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    DialogsMixin
  ],

  componentWillUpdate(nextProps) {
    console.info('Admins::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeScriptSocketDialog',
        ref: 'removeScriptSocketDialog',
        title: 'Delete a Script Socket',
        handleConfirm: Actions.removeCodeBoxes,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        groupName: 'Script Socket'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`script-sockets-list-item-${item.name}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeScriptSocketDialog', item)} />
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
            Snippet
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Traces
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="KEY"
            className="col-flex-1">
            Public
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1"/>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete a Script Socket"
                multipleItemsText="Delete Script Sockets"
                onTouchTap={() => this.showDialog('removeScriptSocketDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          key="script-sockets-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});

