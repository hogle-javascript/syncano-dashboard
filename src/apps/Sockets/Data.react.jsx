import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';
import MUI from 'syncano-material-ui';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Apps
import Data from '../Data';
import Webhooks from '../Webhooks';
import Tasks from '../Tasks';
import Channels from '../Channels';
import CodeBoxes from '../CodeBoxes';
import Classes from '../Classes';

export default React.createClass({

  displayName: 'Data',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Data.Store, 'dataviews'),
    Reflux.connect(Webhooks.Store, 'webhooks'),
    Reflux.connect(Channels.Store, 'channels'),
    Reflux.connect(Tasks.SchedulesStore, 'schedules'),
    Reflux.connect(Tasks.TriggersStore, 'triggers'),

    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('Data::componentDidMount');
    this.fetch();
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('Data::componentWillUpdate');
    this.hideDialogs(nextState.dataviews.hideDialogs || nextState.webhooks.hideDialogs);
  },

  handleRemoveWebhooks() {
    console.info('Data::handleDelete');
    Webhooks.Actions.removeWebhooks(Webhooks.Store.getCheckedItems());
  },

  handleRemoveDataViews() {
    console.info('Data::handleRemoveDataViews');
    Data.Actions.removeDataViews(Data.Store.getCheckedItems());
  },

  uncheckAll() {
    console.info('Data::uncheckAll');
    Data.Actions.uncheckAll();
    Webhooks.Actions.uncheckAll();
  },

  showDataViewDialog() {
    Data.Actions.showDialog();
  },

  showDataViewEditDialog() {
    Data.Actions.showDialog(Data.Store.getCheckedItem());
  },

  showWebhookDialog() {
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
    Webhooks.Actions.fetch();
    Channels.Actions.fetch();
    Classes.Actions.fetch();
    CodeBoxes.Actions.fetch();
    Tasks.TriggersActions.fetch();
    Tasks.SchedulesActions.fetch();
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
              onClick: this.handleCancel
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
              onClick: this.handleCancel
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
        <Tasks.ScheduleDialog />
        <Tasks.TriggerDialog />
        <Channels.Dialog />

        {this.getDialogs()}

        <Common.InnerToolbar title="Sockets">

          <MUI.IconButton
            iconClassName="synicon-socket-data"
            iconStyle={{color: 'green', fontSize: 30}}
            tooltip="Create Data Socket"
            onClick={Data.Actions.showDialog}/>

          <MUI.IconButton
            iconClassName="synicon-socket-codebox"
            iconStyle={{color: 'red', fontSize: 30}}
            tooltip="Create CodeBox Socket"
            onClick={Webhooks.Actions.showDialog}/>

          <MUI.IconButton
            iconClassName="synicon-socket-channel"
            iconStyle={{color: 'blue', fontSize: 30}}
            tooltip="Create Channel Socket"
            onClick={Channels.Actions.showDialog}/>

          <MUI.IconButton
            iconClassName="synicon-socket-trigger"
            iconStyle={{color: 'yellow', fontSize: 30}}
            tooltip="Create Trigger Socket"
            onClick={Tasks.TriggersActions.showDialog}/>

          <MUI.IconButton
            iconClassName="synicon-socket-schedule"
            iconStyle={{color: 'pink', fontSize: 30}}
            tooltip="Create Schedule Socket"
            tooltipPosition="bottom-left"
            onClick={Tasks.SchedulesActions.showDialog}/>
        </Common.InnerToolbar>

        <div style={{clear: 'both', height: '100%'}}>
          <Data.List
            name="Data Socket"
            checkItem={this.checkDataViewItem}
            isLoading={this.state.dataviews.isLoading}
            items={this.state.dataviews.items}
            emptyItemHandleClick={this.showDataViewDialog}
            emptyItemContent="Create a Data Socket"/>

          <Webhooks.List
            name="CodeBox Sockets"
            checkItem={this.checkWebhook}
            isLoading={this.state.webhooks.isLoading}
            items={this.state.webhooks.items}
            emptyItemHandleClick={this.showWebhookDialog}
            emptyItemContent="Create a CodeBox Socket"/>

          <Channels.List
            name="Channel Sockets"
            checkItem={this.checkChannel}
            isLoading={this.state.channels.isLoading}
            items={this.state.channels.items}
            emptyItemHandleClick={this.showChannelDialog}
            emptyItemContent="Create a Channel Socket"/>

          <Tasks.TriggersList
            name="Trigger Sockets"
            checkItem={this.checkDataViewItem}
            isLoading={this.state.triggers.isLoading}
            items={this.state.triggers.items}
            emptyItemHandleClick={this.showDataViewDialog}
            emptyItemContent="Create a Trigger Socket"/>

          <Tasks.SchedulesList
            name="Schedule Sockets"
            checkItem={this.checkDataViewItem}
            isLoading={this.state.schedules.isLoading}
            items={this.state.schedules.items}
            emptyItemHandleClick={this.showDataViewDialog}
            emptyItemContent="Create a Trigger Socket"/>

        </div>

      </Container>
    );
  }
});


