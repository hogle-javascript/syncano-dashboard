import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';
import _ from 'lodash';

// Utils
import {DialogsMixin, InstanceTabsMixin} from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Components
import {Loading} from 'syncano-components';
import {InnerToolbar, Socket, Container} from '../../common';

// Apps
import Data from '../Data';
import Channels from '../Channels';
import Classes from '../Classes';
import Snippets from '../Snippets';
import Schedules from '../Schedules';
import Triggers from '../Triggers';
import CodeBoxes from '../CodeBoxes';
import EmptyView from './EmptyView';

export default React.createClass({

  displayName: 'Data',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Channels.Store, 'channels'),
    Reflux.connect(Data.Store, 'dataviews'),
    Reflux.connect(Schedules.Store, 'schedules'),
    Reflux.connect(Triggers.Store, 'triggers'),
    Reflux.connect(CodeBoxes.Store, 'codeboxes'),

    DialogsMixin,
    InstanceTabsMixin,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('Data::componentDidMount');
    this.fetch();
  },

  isViewLoading() {
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

  fetch() {
    Data.Actions.fetch();
    Snippets.Actions.fetch();
    Channels.Actions.fetch();
    Classes.Actions.fetch();
    Schedules.Actions.fetch();
    Triggers.Actions.fetch();
    CodeBoxes.Actions.fetch();
  },

  renderToolbar() {
    if (!this.hasAnyItem() || this.isViewLoading()) {
      return <InnerToolbar title="Sockets"/>;
    }

    return (
      <InnerToolbar title="Sockets">
        <div style={{paddingTop: 4}}>
          <Socket.Data onTouchTap={Data.Actions.showDialog}/>
          <Socket.CodeBox onTouchTap={CodeBoxes.Actions.showDialog}/>
          <Socket.Channel onTouchTap={Channels.Actions.showDialog}/>
          <Socket.Trigger onTouchTap={Triggers.Actions.showDialog}/>
          <Socket.Schedule
            onTouchTap={Schedules.Actions.showDialog}
            tooltipPosition="bottom-left"/>
        </div>
      </InnerToolbar>
    );
  },

  renderLists() {
    if (!this.hasAnyItem()) {
      return (
        <Loading show={this.isViewLoading()}>
          <EmptyView />
        </Loading>
      );
    }

    return (
      <div style={{clear: 'both', height: '100%'}}>
        <Loading show={this.isViewLoading()}>
          <Data.List
            name="Data Sockets"
            isLoading={this.state.dataviews.isLoading}
            items={this.state.dataviews.items}
            handleTitleClick={this.handleListTitleClick.bind(null, 'data')}
            emptyItemHandleClick={this.showDataViewAddDialog}
            emptyItemContent="Create a Data Socket"/>

          <CodeBoxes.List
            name="CodeBox Sockets"
            isLoading={this.state.codeboxes.isLoading}
            items={this.state.codeboxes.items}
            handleTitleClick={this.handleListTitleClick.bind(null, 'codeBoxes')}
            emptyItemHandleClick={this.showCodeBoxAddDialog}
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
            emptyItemContent="Create a Schedule Socket"/>
        </Loading>
      </div>
    );
  },

  render() {
    return (
      <div>
        <CodeBoxes.Dialog />
        <Data.Dialog />
        <Schedules.Dialog />
        <Triggers.Dialog />
        <Channels.Dialog />

        {this.renderToolbar()}
        <Container>
          {this.renderLists()}
        </Container>
      </div>
    );
  }
});


