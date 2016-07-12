import React from 'react';
import { withRouter } from 'react-router';

import { DialogsMixin } from '../../mixins';

// Components
import { MenuItem, IconButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles/';
import { Color, ColumnList, Dialog, Tooltip } from '../../common/';

let Column = ColumnList.Column;

const DeviceListItem = React.createClass({
  displayName: 'DeviceListItem',

  propTypes: {
    showConfigDialog: React.PropTypes.func.isRequired
  },

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [DialogsMixin],

  initDialogs() {
    const { isLoading, clearConfig, item } = this.props;

    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'clearConfigDialog',
        ref: 'clearConfigDialog',
        title: `Delete ${item.name} config`,
        handleConfirm: clearConfig,
        isLoading,
        children: `Do you really want to clear ${item.name} config?`
      }
    }];
  },

  render() {
    const { params } = this.context;
    const { item, devicesRoute, router, deviceIcon, label, showConfigDialog, messagesRoute } = this.props;
    const iconColor = Colors.blue400;

    return (
      <ColumnList.Item key={label}>
        {this.getDialogs()}
        <Column.CheckIcon.Socket
          id={`push-notification${label}`}
          iconClassName="socket-push"
          checkable={false}
          iconColor={Color.getColorByName('indigo', 'light')}
          primaryText={label}
        />
        <Column.Desc />
        <Column.Desc className="col-sm-6">
          <div
            style={{ color: iconColor, cursor: 'pointer', width: '100%' }}
            className="row align-center align-middle"
            onTouchTap={showConfigDialog}
          >
            <Tooltip
              label="Config Push Socket"
              horizontalPosition="center"
            >
              {item && item.hasConfig.toString()}
            </Tooltip>
          </div>
        </Column.Desc>
        <Column.Desc className="col-sm-6">
          <div
            style={{ width: '100%' }}
            className="row align-center align-middle"
          >
            <IconButton
              style={{ marginLeft: -12 }}
              iconStyle={{ color: iconColor }}
              tooltip="Go to Push Messages list"
              iconClassName="synicon-message-alert"
              onTouchTap={() => router.push({ name: messagesRoute, params })}
            />
          </div>
        </Column.Desc>
        <Column.Desc className="col-sm-4">
          <div
            style={{ width: '100%' }}
            className="row align-center align-middle"
          >
            <IconButton
              tooltip="Go to Devices list"
              iconStyle={{ color: iconColor }}
              iconClassName={deviceIcon}
              onTouchTap={() => router.push({ name: devicesRoute, params })}
            />
            {item && item.devicesCount}
          </div>
        </Column.Desc>
        <Column.Desc />
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={showConfigDialog}
            primaryText="Edit"
          />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={() => this.showDialog('clearConfigDialog')}
            primaryText="Delete"
          />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

export default withRouter(DeviceListItem);
