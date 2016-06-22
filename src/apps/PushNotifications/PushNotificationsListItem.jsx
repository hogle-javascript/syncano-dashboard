import React from 'react';
import { withRouter } from 'react-router';

// Components
import { MenuItem, IconButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { Color, ColumnList } from '../../common/';

let Column = ColumnList.Column;

const DeviceListItem = React.createClass({
  displayName: 'DeviceListItem',

  propTypes: {
    showConfigDialog: React.PropTypes.func.isRequired
  },

  contextTypes: {
    params: React.PropTypes.object
  },

  render() {
    const { params } = this.context;
    const { item, devicesRoute, router, deviceIcon, label, showConfigDialog } = this.props;
    const iconColor = Colors.grey800;

    return (
      <ColumnList.Item key={label}>
        <Column.CheckIcon.Socket
          id={`push-notification${label}`}
          iconClassName="socket-push"
          checkable={false}
          iconColor={Color.getColorByName('indigo', 'light')}
          primaryText={label}
        />
        <Column.Desc />
        <Column.Desc className="col-sm-6">
          <span style={{ color: iconColor }}>
            {item ? item.hasConfig.toString() : null}
          </span>
        </Column.Desc>
        <Column.Desc className="col-sm-6">
          <IconButton
            style={{ marginLeft: -12 }}
            iconStyle={{ color: iconColor }}
            iconClassName="synicon-message-alert"
          />
        </Column.Desc>
        <Column.Desc className="col-sm-4">
          {item ? item.devicesCount : null}
          <IconButton
            iconStyle={{ color: iconColor }}
            iconClassName={deviceIcon}
            onTouchTap={() => router.push({ name: devicesRoute, params })}
          />
        </Column.Desc>
        <Column.Desc />
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={showConfigDialog}
            primaryText="Edit"
          />
          <MenuItem
            className="dropdown-item-devices"
            onTouchTap={() => router.push({ name: devicesRoute, params })}
            primaryText="Devices list"
          />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

export default withRouter(DeviceListItem);
