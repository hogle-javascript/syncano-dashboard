import React from 'react';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import Actions from './InstancesActions';
import Store from './InstancesStore';
import InstanceDialogActions from './InstanceDialogActions';
import InstancesActions from './InstancesActions';

import MenuItem from 'material-ui/lib/menus/menu-item';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'InstancesList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.IsLoading({attr: 'state.items'}),
    Mixins.Dialogs
  ],

  getInitialState() {
    return {
      listType: this.props.listType,
      items: this.props.items
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({items: nextProps.items});
  },

  getList() {
    if (this.state.items.length === 0) {
      return (
        <Common.ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
          {this.props.emptyItemContent}
        </Common.ColumnList.EmptyItem>
      );
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
    };
  },

  // List
  handleItemIconClick(id, state) {
    console.info('InstancesList::handleItemIconClick', id, state);
    Actions.checkItem(id, state);
  },

  handleItemClick(instanceName) {
    SessionActions.fetchInstance(instanceName);
    this.transitionTo('instance', {instanceName});
  },

  handleChangePalette(color, icon) {
    console.info('Instances::handleChangePalette', color, icon);
    let metadata = JSON.stringify({color, icon});

    Actions.updateInstance(Store.getClickedItem().name, {metadata});
    Actions.uncheckAll();
  },

  handleClickItemDropdown(item) {
    Actions.setClickedInstance(item);
  },

  showInstanceEditDialog(instance) {
    InstanceDialogActions.showDialog(instance);
  },

  showMenuDialog(listItem, handleConfirm, event) {
    this.refs.menuDialog.show(listItem.name, handleConfirm, event.target.innerHTML);
  },

  initDialogs() {
    let checkedItemIconColor = Store.getCheckedItemIconColor();

    return [
      {
        dialog: Common.ColorIconPicker.Dialog,
        params: {
          key: 'pickColorIconDialog',
          ref: 'pickColorIconDialog',
          mode: 'add',
          initialColor: checkedItemIconColor.color,
          initialIcon: checkedItemIconColor.icon,
          handleClick: this.handleChangePalette
        }
      }
    ];
  },

  renderItem(item) {
    let removeText = Store.amIOwner(item) ? 'Delete an Instance' : 'Leave an Instance';
    let handleRemoveUserInstance = InstancesActions.removeInstances.bind(null, [item]);
    let handleRemoveShared = InstancesActions.removeSharedInstance.bind(null, [item], SessionStore.getUser().id);
    let handleRemoveInstance = Store.amIOwner(item) ? handleRemoveUserInstance : handleRemoveShared;

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
        <Column.Menu handleClick={this.handleClickItemDropdown.bind(null, item)}>
          <MenuItem
            className="dropdown-item-instance-edit"
            onTouchTap={this.showInstanceEditDialog.bind(null, item)}
            primaryText="Edit an Instance" />
          <MenuItem
            className="dropdown-item-customize"
            onTouchTap={this.showDialog.bind(null, 'pickColorIconDialog')}
            primaryText="Customize an Instance" />
          <MenuItem
            className="dropdown-item-instance-delete"
            onTouchTap={this.showMenuDialog.bind(null, item, handleRemoveInstance)}
            primaryText={removeText} />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  },

  renderLoaded() {
    let styles = this.getStyles();

    return (
      <Common.Lists.Container className='instances-list-container'>
        <Column.MenuDialog ref="menuDialog"/>
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
