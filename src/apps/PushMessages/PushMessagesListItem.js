import React from 'react';
import _ from 'lodash';

import { FontIcon } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';
import { ColumnList, Truncate } from '../../common';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'DeviceListItem',

  formatMessageBody(bodyObj) {
    return _.map(bodyObj, (value, key) => <Truncate text={`"${key}": "${value}"`} />);
  },

  render() {
    const { item, devicesIcon, type } = this.props;
    const messageBody = type === 'GCM' ? item.content.notification : item.content.aps.alert;
    const iconMap = {
      scheduled: {
        backgroundColor: Colors.blue400,
        iconClassName: 'timelapse'
      },
      error: {
        backgroundColor: Colors.red400,
        iconClassName: 'close'
      },
      delivered: {
        backgroundColor: Colors.green400,
        iconClassName: 'check'
      }
    };

    return (
      <ColumnList.Item
        key={item.id}
        checked={item.checked}
      >
        <Column.CheckIcon
          id={item.id}
          iconClassName={iconMap[item.status].iconClassName}
          className="col-sm-8"
          checkable={false}
          keyName="id"
          background={iconMap[item.status].backgroundColor}
          primaryText={item.status}
          secondaryText={`ID: ${item.id.toString()}`}
        />
        <Column.Text className="col-sm-13">
          {this.formatMessageBody(messageBody)}
        </Column.Text>
        <Column.Desc>
          {item.content.environment}
        </Column.Desc>
        <Column.Desc>
          {item.content.registration_ids.length}
          <FontIcon className={devicesIcon} />
        </Column.Desc>
        <Column.Date
          date={item.created_at}
        />
      </ColumnList.Item>
    );
  }
});
