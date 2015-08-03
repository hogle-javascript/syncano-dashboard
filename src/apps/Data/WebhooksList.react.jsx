import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import ReactZeroClipboard from 'react-zeroclipboard';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import CodeBoxesStore from '../CodeBoxes/CodeBoxesStore';
import Actions from './WebhooksActions';
import Store from './WebhooksStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'WebhooksList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  getInitialState() {
    return {
      items     : this.props.items,
      isLoading : this.props.isLoading
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      items     : nextProps.items,
      isLoading : nextProps.isLoading
    })
  },

  // List
  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
  },

  handleURLClick() {
    this.refs.snackbar.show();
    setTimeout(() => {
      this.refs.snackbar.dismiss()
    }, 1200)
  },

  renderItem(item) {
    let publicString = item.public.toString(),
        publicCell   = publicString;

    if (item.public) {
      publicCell = (
        <div style={{marginLeft: '-14px'}}>
          <ReactZeroClipboard text={SYNCANO_BASE_URL + item.links['public-link']}>
            <MUI.IconButton
              iconClassName = "synicon-link-variant"
              tooltip       = "Copy Webhook URL"
              onClick       = {this.handleURLClick} />
          </ReactZeroClipboard>
        </div>
      )
    }

    return (
      <Common.ColumnList.Item
        checked = {item.checked}
        key     = {item.name}>
        <Column.CheckIcon
          id              = {item.name.toString()}
          icon            = 'arrow-up-bold'
          background      = {Common.Color.getColorByName('blue', 'xlight')}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}>
          {item.name}
        </Column.CheckIcon>
        <Column.Desc className="col-flex-1">{item.description}</Column.Desc>
        <Column.Desc className="col-xs-5">{item.codebox}</Column.Desc>
        <Column.Desc className="col-xs-4">{publicCell}</Column.Desc>
        <Column.Date date={item.created_at} />
      </Common.ColumnList.Item>
    )
  },

  getList() {
    let items = this.state.items.map(item => this.renderItem(item));

    if (items.length > 0) {
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }

    return (
      <Common.ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </Common.ColumnList.EmptyItem>
    )
  },

  render() {
    return (
      <Common.Lists.Container>
        <Common.ColumnList.Header>
          <Column.CheckIcon.Header>{this.props.name}</Column.CheckIcon.Header>
          <Column.Desc.Header className="col-flex-1">Description</Column.Desc.Header>
          <Column.Desc.Header className="col-xs-5">CodeBox ID</Column.Desc.Header>
          <Column.Key.Header className="col-xs-4">Public</Column.Key.Header>
          <Column.Date.Header>Created</Column.Date.Header>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.state.isLoading}>
            {this.getList()}
          </Common.Loading>
        </Common.Lists.List>
        <MUI.Snackbar
          ref     = "snackbar"
          message = "URL copied to the clipboard" />
      </Common.Lists.Container>
    );
  }
});

