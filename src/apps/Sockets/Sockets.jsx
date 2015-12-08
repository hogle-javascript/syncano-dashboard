import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import _ from 'lodash';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';
import MUI from 'syncano-material-ui';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container';

// Apps
import Data from '../Data';
import Channels from '../Channels';
import Classes from '../Classes';
import CodeBoxes from '../CodeBoxes';
import Schedules from '../Schedules';
import Triggers from '../Triggers';
import Webhooks from '../Webhooks';

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

  handleRemoveWebhooks() {
    console.info('Data::handleDelete');
    Webhooks.Actions.removeWebhooks(Webhooks.Store.getCheckedItems());
  },

  handleRemoveDataViews() {
    console.info('Data::handleRemoveDataViews');
    Data.Actions.removeDataViews(Data.Store.getCheckedItems());
  },

  handleListTitleClick(routeName) {
    let instanceName = this.getParams().instanceName;

    this.transitionTo(routeName, {instanceName});
  },

  uncheckAll() {
    console.info('Data::uncheckAll');
    Data.Actions.uncheckAll();
    Webhooks.Actions.uncheckAll();
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

  showDataViewEditDialog() {
    Data.Actions.showDialog(Data.Store.getCheckedItem());
  },

  showWebhookAddDialog() {
    Webhooks.Actions.showDialog();
  },

  showWebhookEditDialog() {
    Webhooks.Actions.showDialog(Webhooks.Store.getCheckedItem());
  },

  checkDataViewItem(id, state) {
    console.info('Data::checkDataViewItem');
    Data.Actions.checkItem(id, state);
    Webhooks.Actions.uncheckAll();
  },

  checkWebhook(id, state) {
    console.info('Data::checkWebhook');
    Webhooks.Actions.checkItem(id, state);
    Data.Actions.uncheckAll();
  },

  checkChannel(id, state) {
    console.info('Data::checkChannel');
    Channels.Actions.checkItem(id, state);
    Data.Actions.uncheckAll();
  },

  fetch() {
    Data.Actions.fetch();
    CodeBoxes.Actions.fetch();
    Channels.Actions.fetch();
    Classes.Actions.fetch();
    Schedules.Actions.fetch();
    Triggers.Actions.fetch();
    Webhooks.Actions.fetch();
  },

  // Dialogs config
  initDialogs() {
    return [
      {
        dialog: Common.Dialog,
        params: {
          key: 'removeWebhookDialog',
          ref: 'removeWebhookDialog',
          title: 'Delete a Webhook',
          actions: [
            {
              text: 'Cancel',
              onClick: this.handleCancel.bind(null, 'removeWebhookDialog')
            },
            {
              text: 'Confirm',
              onClick: this.handleRemoveWebhooks
            }
          ],
          modal: true,
          children: 'Do you really want to delete ' + Webhooks.Store.getCheckedItems().length + ' Webhooks?'
        }
      },
      {
        dialog: Common.Dialog,
        params: {
          key: 'removeDataViewDialog',
          ref: 'removeDataViewDialog',
          title: 'Delete a DataView',
          actions: [
            {
              text: 'Cancel',
              onClick: this.handleCancel.bind(null, 'removeDataViewDialog')
            },
            {
              text: 'Confrim',
              onClick: this.handleRemoveDataViews
            }
          ],
          modal: true,
          children: 'Do you really want to delete ' + Data.Store.getCheckedItems().length + ' Data endpoints?'
        }
      }
    ];
  },

  render() {
    return (
      <Container>
        <Webhooks.Dialog />
        <Data.Dialog />
        <Schedules.Dialog />
        <Triggers.Dialog />
        <Channels.Dialog />

        {this.getDialogs()}

        <Common.InnerToolbar title="Sockets">

          <MUI.IconButton
            iconClassName="synicon-socket-data"
            iconStyle={{color: MUI.Styles.Colors.green300, fontSize: 35}}
            tooltip="Create Data Socket"
            onTouchTap={this.showDataViewAddDialog}/>

          <MUI.IconButton
            iconClassName="synicon-socket-codebox"
            iconStyle={{color: MUI.Styles.Colors.red300, fontSize: 35}}
            tooltip="Create CodeBox Socket"
            onTouchTap={this.showWebhookAddDialog}/>

          <MUI.IconButton
            iconClassName="synicon-socket-channel"
            iconStyle={{color: MUI.Styles.Colors.blue300, fontSize: 35}}
            tooltip="Create Channel Socket"
            onTouchTap={this.showChannelAddDialog}/>

          <MUI.IconButton
            iconClassName="synicon-socket-trigger"
            iconStyle={{color: MUI.Styles.Colors.amberA200, fontSize: 35}}
            tooltip="Create Trigger Socket"
            onTouchTap={this.showTriggerAddDialog}/>

          <MUI.IconButton
            iconClassName="synicon-socket-schedule"
            iconStyle={{color: MUI.Styles.Colors.lime400, fontSize: 35}}
            tooltip="Create Schedule Socket"
            tooltipPosition="bottom-left"
            onTouchTap={this.showScheduleAddDialog}/>
        </Common.InnerToolbar>

        <div style={{clear: 'both', height: '100%'}}>
          <Common.Loading show={this.isLoaded()}>
            <Data.List
              name="Data Sockets"
              checkItem={this.checkDataViewItem}
              isLoading={this.state.dataviews.isLoading}
              items={this.state.dataviews.items}
              handleTitleClick={this.handleListTitleClick.bind(null, 'data')}
              emptyItemHandleClick={this.showDataViewAddDialog}
              emptyItemContent="Create a Data Socket"/>

            <Webhooks.List
              name="CodeBox Sockets"
              checkItem={this.checkWebhook}
              isLoading={this.state.webhooks.isLoading}
              items={this.state.webhooks.items}
              handleTitleClick={this.handleListTitleClick.bind(null, 'webhooks')}
              emptyItemHandleClick={this.showWebhookAddDialog}
              emptyItemContent="Create a CodeBox Socket"/>

            <Channels.List
              name="Channel Sockets"
              checkItem={this.checkChannel}
              isLoading={this.state.channels.isLoading}
              items={this.state.channels.items}
              handleTitleClick={this.handleListTitleClick.bind(null, 'channels')}
              emptyItemHandleClick={this.showChannelAddDialog}
              emptyItemContent="Create a Channel Socket"/>

            <Triggers.List
              name="Trigger Sockets"
              checkItem={this.checkDataViewItem}
              isLoading={this.state.triggers.isLoading}
              items={this.state.triggers.items}
              handleTitleClick={this.handleListTitleClick.bind(null, 'triggers')}
              emptyItemHandleClick={this.showTriggerAddDialog}
              emptyItemContent="Create a Trigger Socket"/>

            <Schedules.List
              name="Schedule Sockets"
              checkItem={this.checkDataViewItem}
              isLoading={this.state.schedules.isLoading}
              items={this.state.schedules.items}
              handleTitleClick={this.handleListTitleClick.bind(null, 'schedules')}
              emptyItemHandleClick={this.showScheduleAddDialog}
              emptyItemContent="Create a Trigger Socket"/>
          </Common.Loading>
        </div>
      </Container>
    );
  }
});


