import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import ChannelsActions from './ChannelsActions';
import ChannelsStore   from './ChannelsStore';

// Components
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

  componentWillUpdate(nextProps, nextState) {
    console.info('Channels::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  componentDidMount() {
    console.info('Channels::componentDidMount');
    ChannelsActions.fetch();
    if (this.getParams().action === 'add') {
      // Show Add modal
      this.showChannelDialog();
    }
    ChannelsActions.fetch();
  },

  // Dialogs config
  initDialogs() {
    let checkedChannels = ChannelsStore.getCheckedItems();

    return [{
      dialog: Common.Dialog,
      params: {
        ref: 'deleteChannelDialog',
        title: 'Delete a Channel',
        actions: [
          {
            text: 'Cancel',
            onClick: this.handleCancel
          },
          {
            text: 'Confirm',
            onClick: this.handleDelete
          }
        ],
        modal: true,
        children: [
          'Do you really want to delete ' + this.getDialogListLength(checkedChannels) + ' Channel(s)?',
          this.getDialogList(checkedChannels),
          <Common.Loading
            type="linear"
            position="bottom"
            show={this.state.isLoading}
            />
        ]
      }
    }]
  },

  handleDelete() {
    console.info('Channels::handleDelete');
    ChannelsActions.removeChannels(ChannelsStore.getCheckedItems());
  },

  showChannelDialog() {
    ChannelsActions.showDialog();
  },

  showChannelEditDialog() {
    ChannelsActions.showDialog(ChannelsStore.getCheckedItem());
  },

  render() {
    let checkedItems = ChannelsStore.getNumberOfChecked();
    let isAnyChannelSelected = checkedItems >= 1 && checkedItems < (this.state.items.length);
    let markedIcon = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container>
        <ChannelDialog />
        {this.getDialogs()}

        <Common.Show if={checkedItems > 0}>

          <Common.Fab position="top">
            <Common.Fab.TooltipItem
              tooltip={isAnyChannelSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyChannelSelected ? ChannelsActions.selectAll : ChannelsActions.uncheckAll}
              iconClassName={isAnyChannelSelected ? markedIcon : blankIcon}
              />
            <Common.Fab.TooltipItem
              tooltip="Click here to delete Channels"
              mini={true}
              onClick={this.showDialog.bind(null, 'deleteChannelDialog')}
              iconClassName="synicon-delete"
              />
            <Common.Fab.TooltipItem
              tooltip="Click here to edit a Channel"
              mini={true}
              disabled={checkedItems > 1}
              onClick={this.showChannelEditDialog}
              iconClassName="synicon-pencil"
              />
          </Common.Fab>
        </Common.Show>

        <Common.Fab>
          <Common.Fab.TooltipItem
            tooltip="Click here to add a Channel"
            onClick={this.showChannelDialog}
            iconClassName="synicon-plus"
            />
        </Common.Fab>
        <ChannelsList
          name="Channels"
          items={this.state.items}
          emptyItemHandleClick={this.showChannelDialog}
          emptyItemContent="Create a Channel"
          />
      </Container>
    );
  }
});
