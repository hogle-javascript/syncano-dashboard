import React from 'react';

import { ColumnList, Loading, Container, Lists } from '../../common/';
import APNSListItem from './APNS/APNSPushNotificationsListItem';
import GCMListItem from './GCM/GCMPushNotificationsListItem';

const Column = ColumnList.Column;

export default (props) => {
  const renderItem = (item) => {
    const listItem = {
      APNS: <APNSListItem
        key={`${item.name}pushNotificationListItem`}
        item={item}
      />,
      GCM: <GCMListItem
        key={`${item.name}pushNotificationListItem`}
        item={item}
      />
    };

    return listItem[item.name];
  };

  return (
    <Lists.Container>
      <ColumnList.Header>
        <Column.ColumnHeader
          handleClick={props.handleTitleClick}
          primary
          columnName="DESC"
          className="col-sm-12"
        >
          {props.name}
        </Column.ColumnHeader>
        <Column.ColumnHeader columnName="DESC" />
        <Column.ColumnHeader columnName="DESC">
          Configured
        </Column.ColumnHeader>
        <Column.ColumnHeader columnName="DESC">
          Devices
        </Column.ColumnHeader>
        <Column.ColumnHeader columnName="DESC" />
        <Column.ColumnHeader columnName="MENU" />
      </ColumnList.Header>
      <Loading show={props.isLoading}>
        <Lists.List
          {...props}
          renderItem={renderItem}
        />
      </Loading>
    </Lists.Container>
  );
};
