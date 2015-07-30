import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import SolutionEditActions from './SolutionEditActions';
import SolutionEditStore from './SolutionEditStore';
import SolutionInstallDialogActions from './SolutionInstallDialogActions';

// Components
import MUI from 'material-ui';
import Common from '../../common';


// Shortcut
let Column =  Common.ColumnList.Column;

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

  handleInstallClick(versionId) {
    SolutionInstallDialogActions.showDialogWithPreFetch(this.getParams().solutionId, versionId);
  },

  renderItem(item) {
    return (
      <Common.ColumnList.Item
        key          = {item.id}
        id           = {item.id}
        handleClick  = {this.handleItemClick} >
        <Column.Desc className="col-xs-5 col-md-5">
          <div style={{marginLeft: 10}}>
            <MUI.Avatar style={{fontSize: '1rem'}}>
              {item.number}
            </MUI.Avatar>
          </div>
        </Column.Desc>

        <Column.Date date={item.created_at} />

        <Column.Desc>
          {item.type}
        </Column.Desc>

        <Column.ID className="col-xs-5 col-md-5">
          {item.installations_count}
        </Column.ID>

        <Column.ID className="col-xs-4 col-md-4">
          <MUI.IconButton
            iconClassName = "synicon-cloud-download"
            tooltip       = "Download this Solution version file"
            onClick       = {this.handleDownloadVersion.bind(this, item.data.url)}
          />
        </Column.ID>

        <Column.ID className="col-xs-4 col-md-4">
          <MUI.IconButton
            iconClassName = "synicon-download"
            tooltip       = "Install this Solution version"
            onClick       = {this.handleInstallClick.bind(null, item.id)}
          />
        </Column.ID>

      </Common.ColumnList.Item>
    )
  },

  getList() {
    if (this.state.versions === null) {
      return;
    }

    let items = this.state.versions.map(item => {
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
          <Column.Desc.Header className="col-xs-5 col-md-5">
            <span style={{fontSize: '1.2rem'}}>{this.props.name}</span>
          </Column.Desc.Header>

          <Column.Date.Header>
            Created
          </Column.Date.Header>

          <Column.Desc.Header>
            Type
          </Column.Desc.Header>

          <Column.ID.Header className="col-xs-5 col-md-5">
            Installations
          </Column.ID.Header>

          <Column.ID.Header className="col-xs-4 col-md-4">
            Download
          </Column.ID.Header>

          <Column.ID.Header className="col-xs-4 col-md-4">
            Install
          </Column.ID.Header>


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

