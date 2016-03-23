import React from 'react';
import Reflux from 'reflux';
import {State, Navigation} from 'react-router';
import _ from 'lodash';

// Stores & Actions
import Actions from './SocketsActions';
import Store from './SocketsStore';

// Utils
import {DialogsMixin} from '../../mixins';

// Components
import {Container, Loading} from 'syncano-components';
import {InnerToolbar, Dialog, SocketsDropdown} from '../../common';
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

export default React.createClass({
  displayName: 'Sockets',

  mixins: [
    State,
    Navigation,

    Reflux.connect(Store, 'sockets'),
    DialogsMixin
  ],

  statics: {
    willTransitionFrom(transition, component) {
      if (_.includes(transition.path, 'prolong')) {
        component.refs.prolongDialog.show();
      }
    }
  },

  componentDidMount() {
    console.info('Sockets::componentDidMount');
    Actions.addSocketsListeners();
    _.debounce(Actions.fetch, 1000)();
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
      dialog: Dialog,
      params: {
        key: 'prolongDialog',
        ref: 'prolongDialog',
        title: 'Prolong instance lifetime',
        children: `You've canceled the archiving of your instance ${params.instanceName}.
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

  renderToolbar() {
    const {sockets} = this.state;

    if (!sockets.hasAnyItem || sockets.isLoading) {
      return <InnerToolbar title="Sockets"/>;
    }

    return (
      <InnerToolbar menu={<SocketsDropdown/>}>
        <RaisedButton
          label="Add"
          primary={true}
          style={{marginRight: 0}}
          onTouchTap={Actions.showDialog} />
      </InnerToolbar>
    );
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

          {

            /*
             <Show if={this.getPushNotificationItems().length}>
             <PushNotifications.List
             name="Push Notification Sockets"
             handleTitleClick={() => this.transitionTo('push-notification-config', this.getParams())}
             items={this.getPushNotificationItems()}/>
             </Show>
             */

          }

        </Loading>
      </div>
    );
  },

  render() {
    return (
      <div>
        <SocketsDialog />
        <ScriptEndpoints.Dialog />
        <DataEndpoints.Dialog />
        <Schedules.Dialog />
        <Triggers.Dialog />
        <Channels.Dialog />

        {

          /*
          <PushNotifications.APNSConfigDialog />
          <PushNotifications.GCMConfigDialog />
          */

        }

        {this.getDialogs()}
        {this.renderToolbar()}
        <Container>
          {this.renderLists()}
        </Container>
      </div>
    );
  }
});
