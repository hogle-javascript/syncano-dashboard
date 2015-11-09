import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import ReactZeroClipboard from 'react-zeroclipboard';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import {Dialogs} from '../../mixins';

// Stores and Actions
import Actions from './ChannelsActions';
import Store from './ChannelsStore';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'ChannelsList',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    HeaderMixin,
    Dialogs
  ],

  componentWillReceiveProps(nextProps) {
    this.setState({items: nextProps.items});
  },

  // List
  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  handleURLClick(event) {
    event.stopPropagation();
    this.refs.snackbar.show();
    setTimeout(() => {
      this.refs.snackbar.dismiss();
    }, 1200);
  },

  renderCopyLinkIcon(item) {
    let webhookLink = SYNCANO_BASE_URL.slice(0, -1) + item.links.poll;

    return (
      <div>
        <ReactZeroClipboard text={webhookLink}>
          <MUI.IconButton
            style={{height: 20, width: 20, padding: '0 50', cursor: 'copy'}}
            iconStyle={{fontSize: 15, color: '#9B9B9B'}}
            iconClassName="synicon-link-variant"
            tooltip="Copy Webhook URL"
            onClick={this.handleURLClick}/>
        </ReactZeroClipboard>
      </div>
    );
  },

  renderItem(item) {
    let copyLinkIcon = this.renderCopyLinkIcon(item);

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.name}>
        <Column.CheckIcon
          className="col-xs-12"
          id = {item.name}
          icon = {'bullhorn'}
          background = {Common.Color.getColorByName('blue', 'xlight')}
          checked = {item.checked}
          handleIconClick = {this.handleItemIconClick}
          handleNameClick = {this.handleItemClick} >
          <div onClick={this.handleURLClick}>{item.name}</div>
          <div style={{display: 'flex', flexWrap: 'wrap', cursor: 'copy'}}>
            <div style={{fontSize: '0.8em', color: '#9B9B9B'}} onClick={this.handleURLClick}>
              {item.links.poll}
            </div>
            <div>{copyLinkIcon}</div>
          </div>
        </Column.CheckIcon>
        <Column.Desc>{item.description}</Column.Desc>
        <Column.Desc className="col-xs-5 col-md-5">
          <div>
            <div>group: {item.group_permissions}</div>
            <div>other: {item.other_permissions}</div>
          </div>
        </Column.Desc>
        <Column.Desc className="col-xs-5 col-md-5">{item.type}</Column.Desc>
        <Column.Desc className="col-xs-5 col-md-5">
          {item.custom_publish ? 'Yes' : 'No'}
        </Column.Desc>
        <Column.Date date={item.created_at}/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-channel-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a Channel" />
          <MenuItem
            className="dropdown-item-channel-delete"
            onTouchTap={this.showMenuDialog.bind(null, item.name, Actions.removeChannels.bind(null, [item]))}
            primaryText="Delete a Channel" />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  },

  renderList() {
    let items = this.state.items.map((item) => this.renderItem(item));

    if (items.length > 0) {
      items.reverse();
      return items;
    }

    return (
      <Common.ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </Common.ColumnList.EmptyItem>
    );
  },

  render() {
    return (
      <Common.Lists.Container>
        <Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-12"
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-5">
            Permissions
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-5">
            Type
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-5">
            Custom publish
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU"/>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.props.isLoading}>
            {this.renderList()}
          </Common.Loading>
        </Common.Lists.List>
        <MUI.Snackbar
          ref="snackbar"
          message="URL copied to the clipboard"/>
      </Common.Lists.Container>
    );
  }
});
