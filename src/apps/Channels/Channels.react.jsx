import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionStore     from '../Session/SessionStore';
import ChannelsActions from './ChannelsActions';
import ChannelsStore   from './ChannelsStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import ChannelsList from './ChannelsList.react';
import ChannelDialog from './ChannelDialog.react';

export default React.createClass({

  displayName: 'Channels',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(ChannelsStore),
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentWillUpdate: function(nextProps, nextState) {
    console.info('Channels::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  componentDidMount: function() {
    console.info('Channels::componentDidMount');
    ChannelsActions.fetch();
    if (this.getParams().action == 'add') {
      // Show Add modal
      this.showChannelDialog();
    }
    ChannelsActions.fetch();
  },

  // Dialogs config
  initDialogs: function() {
    var checkedChannels = ChannelsStore.getCheckedItems();

    return [{
      dialog: Common.Dialog,
      params: {
        ref     : 'deleteChannelDialog',
        title   : 'Delete Channel',
        actions : [
          {
            text    : 'Cancel',
            onClick : this.handleCancel
          },
          {
            text    : 'Yes, I\'m sure',
            onClick : this.handleDelete
          }
        ],
        modal: true,
        children: [
          'Do you really want to delete ' + this.getDialogListLength(checkedChannels) + ' Channel(s)?',
          this.getDialogList(checkedChannels),
          <Common.Loading
            type     = "linear"
            position = "bottom"
            show     = {this.state.isLoading}
          />
        ]
      }
    }]
  },

  handleDelete: function() {
    console.info('Channels::handleDelete');
    ChannelsActions.removeChannels(ChannelsStore.getCheckedItems());
  },

  showChannelDialog: function() {
    ChannelsActions.showDialog();
  },

  showChannelEditDialog: function() {
    ChannelsActions.showDialog(ChannelsStore.getCheckedItem());
  },

  render: function() {
    var checkedItems         = ChannelsStore.getNumberOfChecked(),
        isAnyChannelSelected = checkedItems >= 1 && checkedItems < (this.state.items.length),
        markedIcon           = 'synicon-checkbox-multiple-marked-outline',
        blankIcon            = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container>
        <ChannelDialog />
        {this.getDialogs()}

        <Common.Show if={checkedItems > 0}>

          <Common.Fab position="top">
            <Common.Fab.Item
              label         = {isAnyChannelSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini          = {true}
              onClick       = {isAnyChannelSelected ? ChannelsActions.selectAll : ChannelsActions.uncheckAll}
              iconClassName = {isAnyChannelSelected ? markedIcon : blankIcon}
            />
            <Common.Fab.Item
              label         = "Click here to delete Channels"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'deleteChannelDialog')}
              iconClassName = "synicon-delete"
            />
            <Common.Fab.Item
              label         = "Click here to edit Channel"
              mini          = {true}
              disabled      = {checkedItems > 1}
              onClick       = {this.showChannelEditDialog}
              iconClassName = "synicon-pencil"
            />
          </Common.Fab>
        </Common.Show>

        <Common.Fab>
          <Common.Fab.Item
            label         = "Click here to add Channel"
            onClick       = {this.showChannelDialog}
            iconClassName = "synicon-plus"
          />
        </Common.Fab>
        <ChannelsList
          name                 = "Channels"
          items                = {this.state.items}
          emptyItemHandleClick = {this.showChannelDialog}
          emptyItemContent     = "Create a Channel"
        />
      </Container>
    );
  }
});
