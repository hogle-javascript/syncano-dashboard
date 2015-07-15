var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),

    // Utils
    DialogsMixin      = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin = require('../../mixins/InstanceTabsMixin'),
    HeaderMixin       = require('../Header/HeaderMixin'),
    Show              = require('../../common/Show/Show.react'),

    // Stores and Actions
    SessionStore     = require('../Session/SessionStore'),
    ChannelsActions = require('./ChannelsActions'),
    ChannelsStore   = require('./ChannelsStore'),

    // Components
    mui              = require('material-ui'),
    Dialog           = mui.Dialog,
    Loading          = require('../../common/Loading/Loading.react.jsx'),
    Container        = require('../../common/Container/Container.react'),
    FabList          = require('../../common/Fab/FabList.react'),
    FabListItem      = require('../../common/Fab/FabListItem.react'),

    // Local components
    ChannelsList    = require('./ChannelsList.react'),
    ChannelDialog    = require('./ChannelDialog.react');

module.exports = React.createClass({

  displayName: 'Channels',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(ChannelsStore),
    DialogsMixin,
    HeaderMixin,
    InstanceTabsMixin
  ],

  componentWillMount: function() {
    ChannelsActions.fetch();
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.info('Channels::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  componentDidMount: function() {
    if (this.getParams().action == 'add') {
      // Show Add modal
      this.showChannelDialog();
    }
  },

  // Dialogs config
  initDialogs: function() {
    var checkedChannels = ChannelsStore.getCheckedItems();

    return [{
      dialog: Dialog,
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
          <Loading
            type     = "linear"
            position = "bottom"
            show     = {this.state.isLoading} />
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

        <Show if={checkedItems > 0}>

          <FabList position="top">

            <FabListItem
              label         = {isAnyChannelSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini          = {true}
              onClick       = {isAnyChannelSelected ? ChannelsActions.selectAll : ChannelsActions.uncheckAll}
              iconClassName = {isAnyChannelSelected ? markedIcon : blankIcon} />

            <FabListItem
              label         = "Click here to delete Channels"
              mini          = {true}
              onClick       = {this.showDialog.bind(null, 'deleteChannelDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to edit Channel"
              mini          = {true}
              disabled      = {checkedItems > 1}
              onClick       = {this.showChannelEditDialog}
              iconClassName = "synicon-pencil" />

          </FabList>
        </Show>

        <FabList>
          <FabListItem
            label         = "Click here to add Channel"
            onClick       = {this.showChannelDialog}
            iconClassName = "synicon-plus" />
        </FabList>

        <ChannelsList
          name                 = "Channels"
          items                = {this.state.items}
          emptyItemHandleClick = {this.showChannelDialog}
          emptyItemContent     = "Create a Channel" />
      </Container>
    );
  }

});
