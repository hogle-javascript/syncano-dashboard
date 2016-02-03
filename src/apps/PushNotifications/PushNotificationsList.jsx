import React from 'react';

import {DialogsMixin} from '../../mixins';

import {ColumnList} from 'syncano-components';
import {Container, Lists} from '../../common';
import APNSDialog from '../PushDevices/APNSDevices/APNSDeviceDialog';
import GCMDialog from '../PushDevices/GCMDevices/GCMDeviceDialog';
import ListItem from './PushNotificationsListItem';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'DevicesList',

  mixins: [DialogsMixin],

  getInitialState() {
    return {};
  },

  componentWillUpdate(nextProps) {
    console.info('Channels::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  test() {
    console.error('click');
  },

  renderItem(item) {
    let dialogs = {
      android: <GCMDialog />,
      apple: <APNSDialog />
    };

    return (
      <ListItem
        dialog={dialogs[item.icon]}
        key={`push-notification-list-item-${item.label}`}
        item={item}/>
    );
  },

  render() {
    return (
      <div>
        <Lists.Container>
          <ColumnList.Header>
            <Column.ColumnHeader
              primary={true}
              columnName="DESC"
              className="col-xs-18">
              Push Notification Sockets
            </Column.ColumnHeader>
            <Column.ColumnHeader
              className="col-xs-18"
              columnName="DESC">
              Devices
            </Column.ColumnHeader>
          </ColumnList.Header>
          <Lists.List
            {...this.props}
            renderItem={this.renderItem}/>
        </Lists.Container>
      </div>
    );
  }
});
