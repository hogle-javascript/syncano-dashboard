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

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ScriptEndpointsList',

  mixins: [
    Router.State,
    Router.Navigation,
    DialogsMixin
  ],

  getDefaultProps() {
    return {
      checkedItems: Store.getCheckedItems()
    };
  },

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
        items: this.props.checkedItems,
        groupName: 'Script Endpoint'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`script-endpoints-list-item-${item.name}`}
        onIconClick={this.props.checkItem ? this.props.checkItem : Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeScriptEndpointDialog', item)} />
    );
  },

  render() {
    const {handleTitleClick, handleSelectAll, handleUnselectAll, checkedItems} = this.props;

    return (
      <Lists.Container>
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-12"
            primary={true}
            columnName="CHECK_ICON"
            handleClick={handleTitleClick}>
            Script Endpoints
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
              checkedItemsCount={checkedItems.length}
              handleSelectAll={handleSelectAll ? handleSelectAll : Actions.selectAll}
              handleUnselectAll={handleUnselectAll ? handleUnselectAll : Actions.uncheckAll}>
              <Lists.MenuItem
                singleItemText="Delete a Script Endpoint"
                multipleItemsText="Delete Script Endpoint"
                onTouchTap={() => this.showDialog('removeScriptEndpointDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          emptyItemContent="Create a Script Endpoint"
          emptyItemHandleClick={Actions.showDialog}
          key="script-endpoints-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
