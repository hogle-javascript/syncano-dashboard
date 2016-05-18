import React from 'react';
import {State, Navigation} from 'react-router';

// Utils
import {DialogsMixin} from '../../mixins';

import Actions from './ScriptEndpointsActions';
import Store from './ScriptEndpointsStore';

// Components
import ListItem from './ScriptEndpointsListItem';
import {ColumnList, Dialog, Lists} from '../../common/';

const Column = ColumnList.Column;

export default React.createClass({
  displayName: 'ScriptEndpointsList',

  mixins: [
    State,
    Navigation,
    DialogsMixin
  ],

  getDefaultProps() {
    return {
      emptyItemContent: 'Add a Script Endpoint',
      emptyItemHandleClick: Actions.showDialog,
      getCheckedItems: Store.getCheckedItems,
      checkItem: Actions.checkItem,
      handleSelectAll: Actions.selectAll,
      handleUnselectAll: Actions.uncheckAll
    };
  },

  componentWillUpdate(nextProps) {
    console.info('Admins::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    const {isLoading, getCheckedItems} = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeScriptEndpointDialog',
        ref: 'removeScriptEndpointDialog',
        title: 'Delete a Script Endpoint',
        handleConfirm: Actions.removeScriptEndpoints,
        items: getCheckedItems(),
        groupName: 'Script Endpoint',
        isLoading
      }
    }];
  },

  renderItem(item) {
    const {checkItem} = this.props;

    return (
      <ListItem
        key={`script-endpoints-list-item-${item.name}`}
        onIconClick={checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeScriptEndpointDialog', item)} />
    );
  },

  render() {
    const {handleTitleClick, handleSelectAll, handleUnselectAll, getCheckedItems, ...other} = this.props;

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
              checkedItemsCount={getCheckedItems().length}
              handleSelectAll={handleSelectAll}
              handleUnselectAll={handleUnselectAll}>
              <Lists.MenuItem onTouchTap={() => this.showDialog('removeScriptEndpointDialog')} />
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...other}
          key="script-endpoints-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
