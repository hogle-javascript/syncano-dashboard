import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';
import MUI from 'syncano-material-ui';

// Stores and Actions
import Actions from './DataViewsActions';
import Store from './DataViewsStore';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import List from './DataViewsList.react';
import Dialog from './DataViewDialog.react';

export default Radium(React.createClass({

  displayName: 'Data',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store, 'dataviews'),

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

  getStyles() {
    return {
      listSockets: {
        marginTop: 130
      },
      listBase: {
        clear: 'both',
        height: '100%'
      },
      icon: {
        color: 'green',
        fontSize: 30
      }
    };
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
          onRequestClose: this.handleCancel,
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
          children: 'Do you really want to delete ' + Store.getCheckedItems().length + ' Data endpoints?'
        }
      }
    ];
  },

  render() {
    let styles = this.getStyles();
    let routeName = this.getRoutes()[this.getRoutes().length - 1];
    let isSocketView = routeName === 'sockets';

    return (
      <Container>

        <Dialog />

        {this.getDialogs()}

        <Common.InnerToolbar title="Sockets">
          <MUI.IconButton
            iconClassName="synicon-socket-data"
            iconStyle={styles.icon}
            tooltip="Create Data Socket"
            onClick={Actions.showDialog}/>
        </Common.InnerToolbar>

        <div style={[styles.listBase, isSocketView && styles.listSockets]}>

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
}));
