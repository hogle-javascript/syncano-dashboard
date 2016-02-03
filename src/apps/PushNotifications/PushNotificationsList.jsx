import React from 'react';

import {ColumnList} from 'syncano-components';
import {Container, Lists} from '../../common';
import ListItem from './PushNotificationsListItem';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'DevicesList',

  getInitialState() {
    return {};
  },

  test() {
    console.error('click');
  },

  renderItem(item) {
    return (
      <ListItem
        key={`push-notification-list-item-${item.label}`}
        onIconClick={this.test}
        icon={item.icon}
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
