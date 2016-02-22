import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';
import _ from 'lodash';

// Utils
import {DialogsMixin, InstanceTabsMixin} from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Components
import {Container, Loading, Socket} from 'syncano-components';
import {InnerToolbar, Dialog} from '../../common';
import {FlatButton} from 'syncano-material-ui';

// Apps
import Data from '../Data';
import Channels from '../Channels';
import Classes from '../Classes';
import Scripts from '../Scripts';
import Schedules from '../Schedules';
import Triggers from '../Triggers';
import CodeBoxes from '../CodeBoxes';
import PushDevices from '../PushDevices';
import PushNotifications from '../PushNotifications';
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

  statics: {
    willTransitionFrom(transition, component) {
      if (_.includes(transition.path, 'prolong')) {
        component.refs.prolongDialog.show();
      }
    }
  },

  componentDidMount() {
    console.info('Data::componentDidMount');
    this.fetch();
  },

  getPushNotificationsItems() {
    return [PushNotifications.APNSListItem, PushNotifications.GCMListItem];
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
    Scripts.Actions.fetch();
    Channels.Actions.fetch();
    Classes.Actions.fetch();
    Schedules.Actions.fetch();
    Triggers.Actions.fetch();
    CodeBoxes.Actions.fetch();
    PushDevices.APNSActions.fetch();
    PushDevices.GCMActions.fetch();
  },

  initDialogs() {
    let params = this.getParams();

    return [
      {
        dialog: Dialog,
        params: {
          key: 'prolongDialog',
          ref: 'prolongDialog',
          avoidResetState: true,
          title: 'Prolong instance lifetime',
          children: `You've canceled the archiving of your instance ${params.instanceName}.
          Close this dialog to continue working with your instance.`,
          actions: (
            <FlatButton
              key="cancel"
              onTouchTap={() => this.handleCancel('prolongDialog')}
              primary={true}
              label="Close"
              ref="cancel"/>
          )
        }
      }
    ];
  },

  renderToolbar() {
    if (!this.hasAnyItem() || this.isViewLoading()) {
      return <InnerToolbar title="Sockets"/>;
    }

    return (
      <InnerToolbar title="Sockets">
        <div>
          <Socket.Data onTouchTap={Data.Actions.showDialog}/>
          <Socket.CodeBox onTouchTap={CodeBoxes.Actions.showDialog}/>
          <Socket.Channel onTouchTap={Channels.Actions.showDialog}/>
          <Socket.Push onTouchTap={() => this.transitionTo('apns-devices', this.getParams())}/>
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
            handleTitleClick={() => this.handleListTitleClick('data')}
            emptyItemHandleClick={Data.Actions.showDialog}
            emptyItemContent="Create a Data Socket"/>

          <CodeBoxes.List
            name="Script Sockets"
            isLoading={this.state.codeboxes.isLoading}
            items={this.state.codeboxes.items}
            handleTitleClick={() => this.handleListTitleClick('codeBoxes')}
            emptyItemHandleClick={CodeBoxes.Actions.showDialog}
            emptyItemContent="Create a Script Socket"/>

          <Triggers.List
            name="Trigger Sockets"
            isLoading={this.state.triggers.isLoading}
            items={this.state.triggers.items}
            handleTitleClick={() => this.handleListTitleClick('triggers')}
            emptyItemHandleClick={Triggers.Actions.showDialog}
            emptyItemContent="Create a Trigger Socket"/>

          <Schedules.List
            name="Schedule Sockets"
            isLoading={this.state.schedules.isLoading}
            items={this.state.schedules.items}
            handleTitleClick={() => this.handleListTitleClick('schedules')}
            emptyItemHandleClick={Schedules.Actions.showDialog}
            emptyItemContent="Create a Schedule Socket"/>

          <Channels.List
            name="Channel Sockets"
            isLoading={this.state.channels.isLoading}
            items={this.state.channels.items}
            handleTitleClick={() => this.handleListTitleClick('channels')}
            emptyItemHandleClick={Channels.Actions.showDialog}
            emptyItemContent="Create a Channel Socket"/>

          <PushNotifications.List
            name="Push Notification Sockets"
            handleTitleClick={() => this.handleListTitleClick('apns-devices')}
            items={this.getPushNotificationsItems()}/>
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
        <PushNotifications.APNSConfigDialog />
        <PushNotifications.GCMConfigDialog />

        {this.getDialogs()}
        {this.renderToolbar()}
        <Container>
          {this.renderLists()}
        </Container>
      </div>
    );
  }
});


