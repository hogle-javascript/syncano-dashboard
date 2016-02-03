import React from 'react';
import Radium from 'radium';
import {State, Navigation} from 'react-router';

// Components
import {MenuItem, Styles} from 'syncano-material-ui';
import {Color, ColumnList} from 'syncano-components';

let Column = ColumnList.Column;

export default Radium(React.createClass({
  displayName: 'DeviceListItem',

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

  handleDevicesClick(routeName) {
    let instanceName = this.getParams().instanceName;

    this.transitionTo(routeName, {instanceName});
  },

  render() {
    let styles = this.getStyles();
    let {item} = this.props;

    return (
      <div>
        <ColumnList.Item key={item.label}>
          {this.props.dialog}
          <Column.CheckIcon
            id={`push-notification${item.label}`}
            icon={item.icon}
            checkable={false}
            background={Color.getColorByName('blue')}
            className="col-xs-18">
            <div>
              <div>
                {item.label}
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
            {item.devicesCount}
          </Column.Desc>
          <Column.Menu>
            <MenuItem
              className="dropdown-item-edit"
              onTouchTap={this.props.onIconClick}
              primaryText="Edit a Device"/>
            <MenuItem
              className="dropdown-item-delete"
              onTouchTap={this.props.onIconClick}
              primaryText="Delete a Device"/>
          </Column.Menu>
        </ColumnList.Item>
      </div>
    );
  }
}));

