var React                 = require('react'),
    Reflux                = require('reflux'),
    Router                = require('react-router'),

    // Utils
    HeaderMixin           = require('../Header/HeaderMixin'),
    ButtonActionMixin     = require('../../mixins/ButtonActionMixin'),
    DialogsMixin          = require('../../mixins/DialogsMixin'),
    InstanceTabsMixin     = require('../../mixins/InstanceTabsMixin'),
    Show                  = require('../../common/Show/Show.react'),

    // Stores and Actions
    SessionActions        = require('../Session/SessionActions'),
    SessionStore          = require('../Session/SessionStore'),
    DataViewsActions      = require('./DataViewsActions'),
    DataViewsStore        = require('./DataViewsStore'),
    WebhooksActions       = require('./WebhooksActions'),
    WebhooksStore         = require('./WebhooksStore'),

    // Components
    mui                   = require('material-ui'),
    Dialog                = mui.Dialog,
    Container             = require('../../common/Container/Container.react'),
    FabList               = require('../../common/Fab/FabList.react'),
    FabListItem           = require('../../common/Fab/FabListItem.react'),
    ColorIconPickerDialog = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),

    // Local components
    DataViewsList         = require('./DataViewsList.react'),
    WebhooksList          = require('./WebhooksList.react'),
    DataViewDialog        = require('./DataViewDialog.react'),
    WebhookDialog         = require('./WebhookDialog.react');

module.exports = React.createClass({

  displayName: 'Data',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(DataViewsStore),
    Reflux.connect(WebhooksStore, 'webhooks'),
    HeaderMixin,
    DialogsMixin,
    InstanceTabsMixin
  ],

  componentWillUpdate: function(nextProps, nextState) {
    console.info('Data::componentWillUpdate');
  },

  componentDidMount: function() {
    console.info('Data::componentDidMount');
    DataViewsActions.fetch();
    WebhooksActions.fetch();
  },

  // Dialogs config
  initDialogs: function() {

    return [
      {
        dialog: Dialog,
        params: {
          ref:    'removeWebhookDialog',
          title:  'Delete Webhook',
          actions: [
            {
              text    : 'Cancel',
              onClick : this.handleCancel},
            {
              text    : 'Yes, I\'m sure',
              onClick : this.handleRemoveWebhooks}
          ],
          modal: true,
          children: 'Do you really want to delete ' + WebhooksStore.getCheckedItems().length + ' webhooks?'
        }
      },
      {
        dialog: Dialog,
        params: {
          ref:    'removeDataViewDialog',
          title:  'Delete DataView',
          actions: [
            {text: 'Cancel', onClick: this.handleCancel},
            {text: 'Yes, I\'m sure', onClick: this.handleRemoveDataViews}
          ],
          modal: true,
          children: 'Do you really want to delete ' + DataViewsStore.getCheckedItems().length + ' schedule?'
        }
      }
    ]
  },

  handleRemoveWebhooks: function() {
    console.info('Data::handleDelete');
    WebhooksActions.removeWebhooks(WebhooksStore.getCheckedItems());
  },

  handleRemoveDataViews: function() {
    console.info('Data::handleRemoveDataViews');
    DataViewsActions.removeDataViews(DataViewsStore.getCheckedItems());
  },

  uncheckAll: function() {
    console.info('Data::uncheckAll');
    DataViewsActions.uncheckAll();
    WebhooksActions.uncheckAll();
  },

  showDataViewDialog: function() {
    DataViewsActions.showDialog();
  },

  showDataViewEditDialog: function() {
    DataViewsActions.showDialog(DataViewsStore.getCheckedItem());
  },

  showWebhookDialog: function() {
    WebhooksActions.showDialog();
  },

  showWebhookEditDialog: function() {
    WebhooksActions.showDialog(WebhooksStore.getCheckedItem());
  },

  render: function() {
    var checkedDataViews = DataViewsStore.getNumberOfChecked(),
        checkedWebhooks  = WebhooksStore.getNumberOfChecked();

    return (
      <Container>
        <WebhookDialog />
        <DataViewDialog />
        {this.getDialogs()}

        <Show if={checkedDataViews > 0}>
          <FabList position="top">

            <FabListItem
              label         = "Click here to unselect all"
              mini          = {true}
              onClick       = {this.uncheckAll}
              iconClassName = "synicon-checkbox-multiple-marked-outline" />

            <FabListItem
              label         = "Click here to delete DataViews"
              mini          = {true}
              onClick       = {this.showDialog('removeDataViewDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to edit DataView"
              mini          = {true}
              disabled      = {checkedDataViews > 1}
              onClick       = {this.showDataViewEditDialog}
              iconClassName = "synicon-pencil" />

          </FabList>
        </Show>

        <Show if={checkedWebhooks > 0}>

          <FabList position="top">

            <FabListItem
              label         = "Click here to unselect all"
              mini          = {true}
              onClick       = {this.uncheckAll}
              iconClassName = "synicon-checkbox-multiple-marked-outline" />

            <FabListItem
              label         = "Click here to delete DataViews"
              mini          = {true}
              onClick       = {this.showDialog('removeWebhookDialog')}
              iconClassName = "synicon-delete" />

            <FabListItem
              label         = "Click here to edit Webhook"
              mini          = {true}
              disabled      = {checkedDataViews > 1}
              onClick       = {this.showWebhookEditDialog}
              iconClassName = "synicon-pencil" />

          </FabList>
        </Show>

        <FabList>

          <FabListItem
            label         = "Click here to create Data View"
            onClick       = {this.showDataViewDialog}
            iconClassName = "synicon-table" />

          <FabListItem
            label         = "Click here to create Webhook"
            onClick       = {this.showWebhookDialog}
            iconClassName = "synicon-arrow-up-bold" />

        </FabList>

        <DataViewsList
          name                 = "DataViews"
          checkItem            = {DataViewsActions.checkItem}
          isLoading            = {this.state.isLoading}
          items                = {this.state.items}
          emptyItemHandleClick = {this.showDataViewDialog}
          emptyItemContent     = "Create a DataView" />

        <WebhooksList
          name                 = "Webhooks"
          checkItem            = {WebhooksActions.checkItem}
          isLoading            = {this.state.webhooks.isLoading}
          items                = {this.state.webhooks.items}
          emptyItemHandleClick = {this.showWebhookDialog}
          emptyItemContent     = "Create a Webhook" />

      </Container>
    );
  }

});