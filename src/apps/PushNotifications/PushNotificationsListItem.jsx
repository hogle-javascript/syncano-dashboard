import React from 'react';
import {State, Navigation} from 'react-router';

// Components
import {MenuItem, Styles} from 'syncano-material-ui';
import {Color, ColumnList} from 'syncano-components';

let Column = ColumnList.Column;

export default (name, item) => {
  return React.createClass({
    displayName: `${name}DeviceListItem`,

    mixins: [
      State,
      Navigation
    ],

    getStyles() {
      return {
        linksSection: {
          color: '#9B9B9B',
          fontSize: 12
        },
        separator: {
          padding: '0 8px'
        },
        linkItem: {
          cursor: 'pointer',
          ':hover': {
            color: Styles.Colors.blue400
          }
        }
      };
    },

    handleDevicesClick() {
      let instanceName = this.getParams().instanceName;

      this.transitionTo(item.devicesRoute, {instanceName});
    },

    render() {
      let styles = this.getStyles();

      return (
        <ColumnList.Item key={item.name}>
          <Column.CheckIcon
            id={`push-notification${item.label}`}
            icon={item.icon}
            checkable={false}
            background={Color.getColorByName('blue')}
            className="col-xs-18">
            <div>
              <div>
                {item.name}
              </div>
              <div style={styles.linksSection}>
              <span
                key="configuration"
                style={styles.linkItem}
                onClick={item.showConfigDialog}>
                Configuration
              </span>
              <span
                key="separator"
                style={styles.separator}>
                |
              </span>
              <span
                key="devices"
                onClick={this.handleDevicesClick.bind(null, item.route)}
                style={styles.linkItem}>
                Devices
              </span>
              </div>
            </div>
          </Column.CheckIcon>
          <Column.Desc className="col-xs-16">
            {item.getDevices().length}
          </Column.Desc>
          <Column.Menu>
            <MenuItem
              className="dropdown-item-edit"
              onTouchTap={item.showConfigDialog}
              primaryText="Edit Socket"/>
            <MenuItem
              className="dropdown-item-delete"
              onTouchTap={this.props.onIconClick}
              primaryText="Delete a Device"/>
          </Column.Menu>
        </ColumnList.Item>
      );
    }
  });
};
