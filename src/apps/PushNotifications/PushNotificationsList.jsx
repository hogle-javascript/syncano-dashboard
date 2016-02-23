import React from 'react';

import {ColumnList, Loading} from 'syncano-components';
import {Container, Lists} from '../../common';
import APNSListItem from './APNS/APNSPushNotificationsListItem';
import GCMListItem from './GCM/GCMPushNotificationsListItem';

let Column = ColumnList.Column;

export default (props) => {
  const renderItem = (item) => {
    const listItem = {
      APNS: <APNSListItem
        key={`${item.name}pushNotificationListItem`}
        item={item}/>,
      GCM: <GCMListItem
        key={`${item.name}pushNotificationListItem`}
        item={item}/>
    };

    return listItem[item.name];
  };

  return (
    <Lists.Container>
      <ColumnList.Header>
        <Column.ColumnHeader
          handleClick={props.handleTitleClick}
          primary={true}
          columnName="DESC"
          className="col-sm-20">
          {props.name}
        </Column.ColumnHeader>
        <Column.ColumnHeader
          className="col-sm-8"
          columnName="DESC">
          Configured
        </Column.ColumnHeader>
        <Column.ColumnHeader
          className="col-flex-1"
          columnName="DESC">
          Devices
        </Column.ColumnHeader>
      </ColumnList.Header>
      <Loading show={props.isLoading}>
        <Lists.List
          {...props}
          renderItem={renderItem}/>
      </Loading>
    </Lists.Container>
  );
};
