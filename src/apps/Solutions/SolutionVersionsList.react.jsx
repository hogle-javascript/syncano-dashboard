import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import ButtonActionMixin from '../../mixins/ButtonActionMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import SolutionEditActions from './SolutionEditActions';
import SolutionEditStore from './SolutionEditStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'SolutionVersionsList',

  mixins: [

    HeaderMixin,
    Router.State,
    Router.Navigation,

    Reflux.connect(SolutionEditStore)
  ],

  // List
  handleItemIconClick(id, state) {
    SolutionEditActions.checkItem(id, state);
  },

  handleItemClick(className) {
    //SessionStore.getRouter().transitionTo(
    //  'classes-data-objects',
    //  {
    //    instanceName : SessionStore.getInstance().name,
    //    className    : className
    //  }
    //);
    //console.info('SolutionVersionsList::handleItemClick');
  },

  handleDownloadVersion(url) {
    window.open(url, '_blank');
  },

  renderItem(item) {

    return (
      <Common.ColumnList.Item
        key          = {item.id}
        id           = {item.id}
        handleClick  = {this.handleItemClick}
      >
        <Common.ColumnList.Column.Desc><Avatar>{item.number}</Avatar></Common.ColumnList.Column.Desc>
        <Common.ColumnList.Column.Desc>{item.description}</Common.ColumnList.Column.Desc>
        <Common.ColumnList.Column.ID className="col-xs-5 col-md-5">
          <MUI.IconButton
            iconClassName = "synicon-cloud-download"
            tooltip       = "Download solution file of this version"
            onClick       = {this.handleDownloadVersion.bind(this, item.data.url)}
          />
        </Common.ColumnList.Column.ID>
        <Common.ColumnList.Column.ID className="col-xs-5 col-md-5">
          {item.installations_count}
        </Common.ColumnList.Column.ID>
        <Common.ColumnList.Column.Date date={item.created_at} />
      </Common.ColumnList.Item>
    )
  },

  getList() {
    if (this.state.versions === null) {
      return;
    }

    var items = this.state.versions.map(item => {
      return this.renderItem(item);
    });

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
          <Common.ColumnList.Column.CheckIcon.Header>{this.props.name}</Common.ColumnList.Column.CheckIcon.Header>
          <Common.ColumnList.Column.Desc.Header>Description</Common.ColumnList.Column.Desc.Header>
          <Common.ColumnList.Column.ID.Header className="col-xs-5 col-md-5">Download</Common.ColumnList.Column.ID.Header>
          <Common.ColumnList.Column.ID.Header className="col-xs-5 col-md-5">Installations</Common.ColumnList.Column.ID.Header>
          <Common.ColumnList.Column.Header>Created</Common.ColumnList.Column.Header>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.state.isLoading}>
            {this.getList()}
          </Common.Loading>
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
});

