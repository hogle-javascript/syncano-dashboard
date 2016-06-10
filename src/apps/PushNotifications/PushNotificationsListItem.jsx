import React from 'react';
import {withRouter} from 'react-router';

// Components
import {MenuItem} from 'material-ui';
import {colors as Colors} from 'material-ui/styles/';
import {Color, ColumnList} from '../../common/';

let Column = ColumnList.Column;

const DeviceListItem = React.createClass({
  displayName: 'DeviceListItem',

  propTypes: {
    showConfigDialog: React.PropTypes.func.isRequired
  },

  contextTypes: {
    params: React.PropTypes.object
  },

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
          color: Colors.blue400
        }
      }
    };
  },

  render() {
    const {params} = this.context;
    const {item, devicesRoute, router} = this.props;
    const styles = this.getStyles();

    return (
      <ColumnList.Item key={this.props.label}>
        <Column.CheckIcon.Socket
          id={`push-notification${this.props.label}`}
          iconClassName="socket-push"
          checkable={false}
          iconColor={Color.getColorByName('indigo', 'light')}
          primaryText={this.props.label}
          secondaryText={
            <div>
              <span
                key="configuration"
                style={styles.linkItem}
                onClick={this.props.showConfigDialog}>
                Configuration
              </span>
              <span
                key="separator"
                style={styles.separator}>
                |
              </span>
              <span
                key="devices"
                onClick={() => router.push({name: devicesRoute, params})}
                style={styles.linkItem}>
                Devices
              </span>
            </div>
          }/>
        <Column.Desc/>
        <Column.Desc>
          {item ? item.hasConfig.toString() : null}
        </Column.Desc>
        <Column.Desc>
          {item ? item.devicesCount : null}
        </Column.Desc>
        <Column.Desc/>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={this.props.showConfigDialog}
            primaryText="Edit"/>
          <MenuItem
            className="dropdown-item-devices"
            onTouchTap={() => router.push({name: devicesRoute, params})}
            primaryText="Devices list"/>
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

export default withRouter(DeviceListItem);
