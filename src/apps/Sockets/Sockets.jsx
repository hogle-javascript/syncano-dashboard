import React from 'react';
import Reflux from 'reflux';
import _ from 'lodash';
import Helmet from 'react-helmet';

// Stores & Actions
import ScriptsActions from '../Scripts/ScriptsActions';
import Actions from './SocketsActions';
import Store from './SocketsStore';

// Utils
import {DialogsMixin} from '../../mixins';

// Components
import {FlatButton, RaisedButton} from 'material-ui';
import {Container, Loading, Show, Dialog} from '../../common/';

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
    Reflux.connect(Store, 'sockets'),
    DialogsMixin
  ],

  componentDidMount() {
    console.info('Sockets::componentDidMount');
    ScriptsActions.fetch();
    Actions.addSocketsListeners();
    _.debounce(Actions.fetch, 1000)();

    const {prolongDialog} = this.refs;
    const {showProlongDialog} = this.props.location.query;

    if (prolongDialog && showProlongDialog) {
      prolongDialog.show();
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
    const {instanceName} = this.props.params;

    return [{
      dialog: Dialog.Delete,
      params: {
        icon: 'synicon-information-outline',
        key: 'prolongDialog',
        ref: 'prolongDialog',
        title: 'Prolong instance lifetime',
        children: `You've canceled the deletion of your instance ${instanceName}.
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
    const {params} = this.props;

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
              handleTitleClick={() => this.props.history.push({pathName: 'push-notification-config', params})}
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
