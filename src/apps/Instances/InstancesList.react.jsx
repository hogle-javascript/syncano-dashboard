import React from 'react';
import Router from 'react-router';
import Reflux from 'reflux';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Actions from './InstancesActions';
import Store from './InstancesStore';
import InstanceDialogActions from './InstanceDialogActions';
import ColumnMenuStore from '../../common/ColumnList/Column/MenuStore';

import MenuItem from 'material-ui/lib/menus/menu-item';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'InstancesList',

  mixins: [
    Reflux.connect(ColumnMenuStore, 'columnMenu'),
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.Dialogs,
    Mixins.IsLoading({attr: 'state.items'})
  ],

  getInitialState() {
    return {
      listType: this.props.listType,
      items: this.props.items
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({items: nextProps.items})
  },

  // List
  handleItemIconClick(id, state) {
    console.info('InstancesList::handleItemIconClick', id, state);
    Actions.checkItem(id, state);
  },

  handleItemClick(instanceName) {
    SessionActions.fetchInstance(instanceName).then(() => this.transitionTo('instance', {instanceName}));
  },

  showInstanceEditDialog(instance) {
    InstanceDialogActions.showDialog(instance);
  },

  handleDeleteInstance(instanceName) {
    console.info('InstancesList::handleDeleteInstance');
    Actions.removeInstances(instanceName);
    this.hideDialogs('deleteInstanceDialog');
  },

  handleDeleteSharedInstance(instanceName) {
    console.info('InstancesList::handleDeleteSharedInstance');
    Actions.removeSharedInstance(instanceName, SessionStore.getUser().id);
    this.hideDialogs('deleteSharedInstanceDialog');
  },

  initDialogs() {
    let clickedInstanceName = this.state.columnMenu.item ? this.state.columnMenu.item.name : null;

    return [
      {
        dialog: Common.Dialog,
        params: {
          key: 'deleteInstanceDialog',
          ref: 'deleteInstanceDialog',
          title: 'Delete an Instance',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Confirm', onClick: this.handleDeleteInstance.bind(null, clickedInstanceName)}
          ],
          modal: true,
          children: [
            'Do you really want to delete Instance ' + clickedInstanceName + '?',
            <Common.Loading
              type="linear"
              position="bottom"
              show={this.state.isLoading} />
          ]
        }
      },
      {
        dialog: Common.Dialog,
        params: {
          key: 'deleteSharedInstanceDialog',
          ref: 'deleteSharedInstanceDialog',
          title: 'Leave a shared Instance',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Confirm', onClick: this.handleDeleteSharedInstance.bind(null, clickedInstanceName)}
          ],
          modal: true,
          children: [
            'Do you really want to leave Instance ' + clickedInstanceName + '?',
            <Common.Loading
            type="linear"
            position="bottom"
            show={this.state.isLoading} />
          ]
        }
      }]
  },

  renderItem(item) {
    let dialogRef = Store.amIOwner(item) ? 'deleteInstanceDialog' : 'deleteSharedInstanceDialog';

    item.metadata = item.metadata || {};

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        id={item.name}
        key={item.name}
        handleClick={this.handleItemClick.bind(null, item.name)}>
        <Column.CheckIcon
          id={item.name}
          icon={item.metadata.icon}
          background={Common.Color.getColorByName(item.metadata.color)}
          checked={item.checked}
          handleIconClick={this.handleItemIconClick}
          handleNameClick={this.handleItemClick}>
          {item.name}
        </Column.CheckIcon>
        <Column.Desc>{item.description}</Column.Desc>
        <Column.Date date={item.created_at}/>
        <Column.Menu item={item}>
          <MenuItem onTouchTap={this.showInstanceEditDialog.bind(this, item)}>
            Edit an Instance
          </MenuItem>
          <MenuItem onTouchTap={this.showDialog.bind(null, dialogRef)}>
            Delete an Instance
          </MenuItem>
        </Column.Menu>
      </Common.ColumnList.Item>
    )
  },

  getList() {
    if (this.state.items.length === 0) {
      return (
        <Common.ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
          {this.props.emptyItemContent}
        </Common.ColumnList.EmptyItem>
      )
    }

    let items = this.state.items.map((item) => this.renderItem(item));

    items.reverse();
    return items;
  },

  getStyles() {
    return {
      list: {
        padding: 0,
        background: 'none'
      }
    }
  },

  renderLoaded() {
    let styles = this.getStyles();

    return (
      <Common.Lists.Container className='instances-list-container'>
        {this.getDialogs()}
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU"></Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Lists.List style={styles.list}>
          {this.getList()}
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
});
