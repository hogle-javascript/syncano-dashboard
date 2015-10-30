/* eslint-disable no-unused-vars, no-inline-comments */

import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router-old';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';
import MUI from 'syncano-material-ui';

// Stores and Actions
import DataViewsActions from './DataViewsActions';
import DataViewsStore from './DataViewsStore';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import DataViewsList from './DataViewsList.react';
import DataViewDialog from './DataViewDialog.react';

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

    Reflux.connect(DataViewsStore, 'dataviews'),
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
    DataViewsActions.removeDataViews(DataViewsStore.getCheckedItems());
  },

  uncheckAll() {
    console.info('Data::uncheckAll');
    DataViewsActions.uncheckAll();
    Webhooks.Actions.uncheckAll();
  },

  showDataViewDialog() {
    DataViewsActions.showDialog();
  },

  showDataViewEditDialog() {
    DataViewsActions.showDialog(DataViewsStore.getCheckedItem());
  },

  showWebhookDialog() {
    Webhooks.Actions.showDialog();
  },

  showWebhookEditDialog() {
    Webhooks.Actions.showDialog(Webhooks.Store.getCheckedItem());
  },

  checkDataViewItem(id, state) {
    console.info('Data::checkDataViewItem');
    DataViewsActions.checkItem(id, state);
    Webhooks.Actions.uncheckAll();
  },

  checkWebhook(id, state) {
    console.info('Data::checkWebhook');
    Webhooks.Actions.checkItem(id, state);
    DataViewsActions.uncheckAll();
  },

  checkChannel(id, state) {
    console.info('Data::checkChannel');
    Channels.Actions.checkItem(id, state);
    DataViewsActions.uncheckAll();
  },

  fetch() {
    DataViewsActions.fetch();
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
          children: 'Do you really want to delete ' + DataViewsStore.getCheckedItems().length + ' Data endpoints?'
        }
      }
    ];
  },

  render() {
    let checkedDataViews = DataViewsStore.getNumberOfChecked();
    let checkedWebhooks = Webhooks.Store.getNumberOfChecked();
    let isAnyDataViewSelected = checkedDataViews >= 1 && checkedDataViews < this.state.dataviews.items.length;
    let isAnyWebhookSelected = checkedWebhooks >= 1 && checkedWebhooks < this.state.webhooks.items.length;
    let markedIcon = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container>
        <Webhooks.Dialog />
        <DataViewDialog />
        {this.getDialogs()}

        <Common.Show if={checkedDataViews > 0}>
          <Common.Fab position="top">
            <Common.Fab.TooltipItem
              tooltip={isAnyDataViewSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyDataViewSelected ? DataViewsActions.selectAll : DataViewsActions.uncheckAll}
              iconClassName={isAnyDataViewSelected ? markedIcon : blankIcon}/>
            <Common.Fab.TooltipItem
              tooltip="Click here to delete a Data Endpoint"
              mini={true}
              onClick={this.showDialog.bind(null, 'removeDataViewDialog')}
              iconClassName="synicon-delete"/>
          </Common.Fab>
        </Common.Show>

        <Common.Show if={checkedWebhooks > 0}>
          <Common.Fab position="top">
            <Common.Fab.TooltipItem
              tooltip={isAnyWebhookSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyWebhookSelected ? Webhooks.Actions.selectAll : Webhooks.Actions.uncheckAll}
              iconClassName={isAnyWebhookSelected ? markedIcon : blankIcon}/>
            <Common.Fab.TooltipItem
              tooltip="Click here to delete a Webhook"
              mini={true}
              onClick={this.showDialog.bind(null, 'removeWebhookDialog')}
              iconClassName="synicon-delete"/>
          </Common.Fab>
        </Common.Show>

        <Common.InnerToolbar>

            <MUI.ToolbarGroup style={{paddingLeft: 36}}>
              <MUI.ToolbarTitle text={'Sockets'}/>
            </MUI.ToolbarGroup>

            <MUI.ToolbarGroup float="right">

              <MUI.IconButton
                style={{fontSize: 25, marginTop: 5}}
                iconClassName="synicon-delete"
                tooltip="Delete Data Objects"
              />

            </MUI.ToolbarGroup>

        </Common.InnerToolbar>

        <div style={{clear: 'both', height: '100%', marginTop: 130}}>

          <DataViewsList
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
            emptyItemContent="Create a Trigger Socket"
            />

        </div>

        </Container>
    );
  }
});


