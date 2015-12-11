import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import _ from 'lodash';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container';

// Apps
import Data from '../Data';
import Channels from '../Channels';
import Classes from '../Classes';
import Snippets from '../Snippets';
import Schedules from '../Schedules';
import Triggers from '../Triggers';
import Webhooks from '../Webhooks';
import EmptyView from './EmptyView';

export default React.createClass({

  displayName: 'Data',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Channels.Store, 'channels'),
    Reflux.connect(Data.Store, 'dataviews'),
    Reflux.connect(Schedules.Store, 'schedules'),
    Reflux.connect(Triggers.Store, 'triggers'),
    Reflux.connect(Webhooks.Store, 'webhooks'),

    Mixins.Dialog,
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('Data::componentDidMount');
    this.fetch();
  },

  isLoaded() {
    let loadingStates = Object.keys(this.state).map((key) => {
      if (this.state[key].hasOwnProperty('isLoading')) {
        return this.state[key].isLoading;
      }
    });

    return _.includes(loadingStates, true);
  },

  hasAnyItem() {
    return _.keys(this.state)
      .filter((socketName) => _.has(this.state[socketName], 'items'))
      .some((socketName) => this.state[socketName].items.length > 0);
  },

  handleListTitleClick(routeName) {
    let instanceName = this.getParams().instanceName;

    this.transitionTo(routeName, {instanceName});
  },

  showTriggerAddDialog() {
    Triggers.Actions.showDialog();
  },

  showScheduleAddDialog() {
    Schedules.Actions.showDialog();
  },

  showChannelAddDialog() {
    Channels.Actions.showDialog();
  },

  showDataViewAddDialog() {
    Data.Actions.showDialog();
  },

  showWebhookAddDialog() {
    Webhooks.Actions.showDialog();
  },

  fetch() {
    Data.Actions.fetch();
    Snippets.Actions.fetch();
    Channels.Actions.fetch();
    Classes.Actions.fetch();
    Schedules.Actions.fetch();
    Triggers.Actions.fetch();
    Webhooks.Actions.fetch();
  },

  renderLists() {
    if (!this.hasAnyItem()) {
      return <EmptyView />;
    }

    return (
      <div style={{clear: 'both', height: '100%'}}>
        <Common.Loading show={this.isLoaded()}>
          <Data.List
            name="Data Sockets"
            isLoading={this.state.dataviews.isLoading}
            items={this.state.dataviews.items}
            handleTitleClick={this.handleListTitleClick.bind(null, 'data')}
            emptyItemHandleClick={this.showDataViewAddDialog}
            emptyItemContent="Create a Data Socket"/>

          <Webhooks.List
            name="CodeBox Sockets"
            isLoading={this.state.webhooks.isLoading}
            items={this.state.webhooks.items}
            handleTitleClick={this.handleListTitleClick.bind(null, 'webhooks')}
            emptyItemHandleClick={this.showWebhookAddDialog}
            emptyItemContent="Create a CodeBox Socket"/>

          <Channels.List
            name="Channel Sockets"
            isLoading={this.state.channels.isLoading}
            items={this.state.channels.items}
            handleTitleClick={this.handleListTitleClick.bind(null, 'channels')}
            emptyItemHandleClick={this.showChannelAddDialog}
            emptyItemContent="Create a Channel Socket"/>

          <Triggers.List
            name="Trigger Sockets"
            isLoading={this.state.triggers.isLoading}
            items={this.state.triggers.items}
            handleTitleClick={this.handleListTitleClick.bind(null, 'triggers')}
            emptyItemHandleClick={this.showTriggerAddDialog}
            emptyItemContent="Create a Trigger Socket"/>

          <Schedules.List
            name="Schedule Sockets"
            isLoading={this.state.schedules.isLoading}
            items={this.state.schedules.items}
            handleTitleClick={this.handleListTitleClick.bind(null, 'schedules')}
            emptyItemHandleClick={this.showScheduleAddDialog}
            emptyItemContent="Create a Trigger Socket"/>
        </Common.Loading>
      </div>
    );
  },

  render() {
    return (
      <Container>
        <Webhooks.Dialog />
        <Data.Dialog />
        <Schedules.Dialog />
        <Triggers.Dialog />
        <Channels.Dialog />

        <Common.InnerToolbar title="Sockets">
          <Common.Socket.Data onTouchTap={this.showDataViewAddDialog}/>
          <Common.Socket.Webhook onTouchTap={this.showWebhookAddDialog}/>
          <Common.Socket.Channel onTouchTap={this.showChannelAddDialog}/>
          <Common.Socket.Trigger onTouchTap={this.showTriggerAddDialog}/>
          <Common.Socket.Schedule
            onTouchTap={this.showScheduleAddDialog}
            tooltipPosition="bottom-left"/>
        </Common.InnerToolbar>

        {this.renderLists()}
      </Container>
    );
  }
});


