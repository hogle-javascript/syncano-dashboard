import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';
import _ from 'lodash';
import Helmet from 'react-helmet';

// Stores & Actions
import Actions from './SocketsActions';
import Store from './SocketsStore';

// Utils
import {DialogsMixin} from '../../mixins';

// Components
import {Container, Loading, Show} from 'syncano-components';
import {Dialog} from '../../common';
import {FlatButton, RaisedButton} from 'syncano-material-ui';

// Apps
import DataEndpoints from '../DataEndpoints';
import Channels from '../Channels';
import Schedules from '../Schedules';
import Triggers from '../Triggers';
import ScriptEndpoints from '../ScriptEndpoints';
import EmptyView from './EmptyView';
import SocketsDialog from './SocketsDialog';
import SocketsList from './SocketsList';
import SocketsInnerToolbar from './SocketsInnerToolbar';
import PushNotifications from '../PushNotifications';

export default React.createClass({
  displayName: 'Sockets',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store, 'sockets'),
    DialogsMixin
  ],

  componentDidMount() {
    console.info('Sockets::componentDidMount');
    Actions.addSocketsListeners();
    _.debounce(Actions.fetch, 1000)();

    if (this.refs.prolongDialog && this.getQuery().showProlongDialog) {
      this.refs.prolongDialog.show();
    }
  },

  componentWillUnmount() {
    Actions.clearSockets();
    Actions.removeSocketsListeners();
  },

  getPushNotificationItems() {
    const {sockets} = this.state;
    const APNSItems = _.filter(sockets.gcmPushNotifications, 'hasConfig');
    const GCMItems = _.filter(sockets.apnsPushNotifications, 'hasConfig');

    return APNSItems.concat(GCMItems);
  },

  initDialogs() {
    const params = this.getParams();

    return [{
      dialog: Dialog.Delete,
      params: {
        icon: 'synicon-information-outline',
        key: 'prolongDialog',
        ref: 'prolongDialog',
        title: 'Prolong instance lifetime',
        children: `You've canceled the deletion of your instance ${params.instanceName}.
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
    }];
  },

  renderLists() {
    const {sockets} = this.state;

    if (!sockets.hasAnyItem && !sockets.isLoading) {
      return (
        <EmptyView />
      );
    }

    return (
      <div style={{clear: 'both', height: '100%'}}>
        <Loading show={sockets.isLoading}>
          <SocketsList sockets={sockets}/>

          <Show if={this.getPushNotificationItems().length}>
            <PushNotifications.List
              name="Push Notification Sockets (BETA)"
              handleTitleClick={() => this.transitionTo('push-notification-config', this.getParams())}
              items={this.getPushNotificationItems()}/>
          </Show>
        </Loading>
      </div>
    );
  },

  render() {
    const {sockets} = this.state;

    return (
      <div>
        <Helmet title="Sockets"/>
        <SocketsDialog />
        <ScriptEndpoints.Dialog />
        <DataEndpoints.Dialog />
        <DataEndpoints.SummaryDialog />
        <Schedules.Dialog />
        <Triggers.Dialog />
        <Channels.Dialog />
        <PushNotifications.APNSConfigDialog />
        <PushNotifications.GCMConfigDialog />

        {this.getDialogs()}
        <SocketsInnerToolbar empty={!sockets.hasAnyItem || sockets.isLoading}>
          <RaisedButton
            label="Add"
            primary={true}
            style={{marginRight: 0}}
            onTouchTap={Actions.showDialog} />
        </SocketsInnerToolbar>
        <Container>
          {this.renderLists()}
        </Container>
      </div>
    );
  }
});
