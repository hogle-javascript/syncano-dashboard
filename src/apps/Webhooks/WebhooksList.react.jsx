import React from 'react';
import Router from 'react-router';
import ReactZeroClipboard from 'react-zeroclipboard';

// Stores and Actions
import Actions from './WebhooksActions';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import {Dialogs} from '../../mixins';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import MenuItem from 'material-ui/lib/menus/menu-item';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'WebhooksList',

  mixins: [
    Dialogs,
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  // List
  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
  },

  handleURLClick(event) {
    event.stopPropagation();
    this.refs.snackbar.show();
    setTimeout(() => {
      this.refs.snackbar.dismiss();
    }, 1200);
  },

  handleItemClick(itemName) {
    // Redirect to traces screen
    this.transitionTo('webhook-traces', {
      instanceName: this.getParams().instanceName,
      webhookName: itemName
    });
  },

  renderCopyLinkIcon(item) {
    let webhookLink = SYNCANO_BASE_URL.slice(0, -1) + item.links.self;

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
    let publicString = item.public.toString();
    let copyLinkIcon = this.renderCopyLinkIcon(item);

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        id={item.name}
        key={item.name}>

        <Column.CheckIcon
          className="col-xs-12"
          id={item.name.toString()}
          icon='arrow-up-bold'
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.handleItemIconClick}>
          <div onClick={this.handleURLClick}>{item.name}</div>
          <div style={{display: 'flex', flexWrap: 'wrap', cursor: 'copy'}}>
            <div style={{fontSize: '0.8em', color: '#9B9B9B'}} onClick={this.handleURLClick}>
              {item.links.self}
            </div>
            <div>{copyLinkIcon}</div>
          </div>
        </Column.CheckIcon>
        <Column.Desc className="col-flex-1">{item.description}</Column.Desc>
        <Column.Desc className="col-xs-4">{item.codebox}</Column.Desc>
        <Column.Desc className="col-xs-3">{publicString}</Column.Desc>
        <Column.Date date={item.created_at} />
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a Webhook" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.showMenuDialog.bind(null, item.name, Actions.removeWebhooks.bind(null, [item]))}
            primaryText="Delete a Webhook" />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  },

  renderList() {
    let items = this.props.items.map((item) => this.renderItem(item));

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
        <Common.ColumnList.Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-12"
            primary={true}
            columnName="CHECK_ICON">
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
            Snippet ID
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="KEY"
            className="col-xs-3">
            Public
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

