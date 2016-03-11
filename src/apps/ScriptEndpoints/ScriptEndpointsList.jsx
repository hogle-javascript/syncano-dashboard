import React from 'react';
import Router from 'react-router';

// Utils
import {DialogsMixin} from '../../mixins';

import Actions from './ScriptEndpointsActions';
import Store from './ScriptEndpointsStore';

// Components
import ListItem from './ScriptEndpointsListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ScriptEndpointsList',

  mixins: [
    Router.State,
    Router.Navigation,
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
        key: 'removeScriptEndpointDialog',
        ref: 'removeScriptEndpointDialog',
        title: 'Delete a Script Endpoint',
        handleConfirm: Actions.removeScriptEndpoints,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        groupName: 'Script Endpoint'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`script-endpoints-list-item-${item.name}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeScriptEndpointDialog', item)} />
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
            className="col-flex-1">
            Script
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
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete a Script Endpoint"
                multipleItemsText="Delete Script Endpoint"
                onTouchTap={() => this.showDialog('removeScriptEndpointDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          key="script-endpoints-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});

