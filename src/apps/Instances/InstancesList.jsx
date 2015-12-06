import React from 'react';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './InstancesActions';
import Store from './InstancesStore';

import ListItem from './InstancesListItem';
import {IconMenu} from 'syncano-material-ui';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'InstancesList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.IsLoading({attr: 'state.items'}),
    Mixins.Dialogs,
    Mixins.List
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

  handleChangePalette(color, icon) {
    console.info('Instances::handleChangePalette', color, icon);
    let metadata = JSON.stringify({color, icon});

    Actions.updateInstance(Store.getClickedItem().name, {metadata});
    Actions.uncheckAll();
  },

  initDialogs() {
    let clickedItem = Store.getClickedItemIconColor();

    return [
      {
        dialog: Common.ColorIconPicker.Dialog,
        params: {
          key: 'pickColorIconDialog',
          ref: 'pickColorIconDialog',
          mode: 'add',
          initialColor: clickedItem.color,
          initialIcon: clickedItem.icon,
          handleClick: this.handleChangePalette
        }
      }
    ];
  },

  renderItem(item) {
    return <ListItem onIconClick={this.handleItemIconClick} item={item}/>;
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
          <Column.ColumnHeader columnName="MENU">
            <IconMenu iconButtonElement={this.renderListIconMenuButton()}>
              <MenuItem
                primaryText="Delete Selected"
                onTouchTap={this.showDialog.bind(null, 'deleteChannelDialog')}/>
              <MenuItem
                primaryText="Unselect All"
                onTouchTap={Actions.uncheckAll}/>
              <MenuItem
                primaryText="Select All"
                onTouchTap={Actions.selectAll}/>
            </IconMenu>
          </Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Lists.List style={styles.list}>
          {this.renderList()}
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
});
