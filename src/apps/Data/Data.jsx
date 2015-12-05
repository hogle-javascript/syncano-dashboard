/* eslint-disable no-unused-vars, no-inline-comments */

import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';
import MUI from 'syncano-material-ui';

// Stores and Actions
import Actions from './DataViewsActions';
import Store from './DataViewsStore';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container';

// Local components
import List from './DataViewsList';
import Dialog from './DataViewDialog';

export default React.createClass({

  displayName: 'Data',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store, 'dataviews'),

    Mixins.Dialog,
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
    this.hideDialogs(nextState.dataviews.hideDialogs);
  },

  handleRemoveDataViews() {
    console.info('Data::handleRemoveDataViews');
    Actions.removeDataViews(Store.getCheckedItems());
  },

  uncheckAll() {
    console.info('Data::uncheckAll');
    Actions.uncheckAll();
  },

  showDataViewDialog() {
    Actions.showDialog();
  },

  showDataViewEditDialog() {
    Actions.showDialog(Store.getCheckedItem());
  },

  checkDataViewItem(id, state) {
    console.info('Data::checkDataViewItem');
    Actions.checkItem(id, state);
  },

  fetch() {
    Actions.fetch();
  },

  // Dialogs config
  initDialogs() {
    return [
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
          children: 'Do you really want to delete ' + Store.getCheckedItems().length + ' Data endpoints?'
        }
      }
    ];
  },

  render() {
    return (
      <Container>

        <Dialog />

        {this.getDialogs()}

        <Common.InnerToolbar title="Sockets">
          <MUI.IconButton
            iconClassName="synicon-socket-data"
            iconStyle={{color: 'green', fontSize: 30}}
            tooltip="Create Data Socket"
            onClick={Actions.showDialog}/>
        </Common.InnerToolbar>

        <div style={{clear: 'both', height: '100%', marginTop: 130}}>

          <List
            name="Data Socket"
            checkItem={this.checkDataViewItem}
            isLoading={this.state.dataviews.isLoading}
            items={this.state.dataviews.items}
            emptyItemHandleClick={this.showDataViewDialog}
            emptyItemContent="Create a Data Socket"/>

        </div>
      </Container>
    );
  }
});
