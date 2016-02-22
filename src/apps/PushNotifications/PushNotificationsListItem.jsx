import React from 'react';
import {State, Navigation} from 'react-router';

// Components
import {MenuItem, Styles} from 'syncano-material-ui';
import {Color, ColumnList} from 'syncano-components';

let Column = ColumnList.Column;

export default React.createClass({
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

  render() {
    const {item} = this.props;
    const styles = this.getStyles();

    return (
      <ColumnList.Item key={this.props.label}>
        <Column.CheckIcon.Socket
          id={`push-notification${this.props.label}`}
          iconClassName="socket-push"
          checkable={false}
          iconColor={Color.getColorByName('indigo', 'light')}
          className="col-sm-20"
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
                onClick={() => this.transitionTo(this.props.devicesRoute, this.getParams())}
                style={styles.linkItem}>
                Devices
              </span>
            </div>
          }/>
        <Column.Desc className="col-sm-8">
          {item ? item.hasConfig.toString() : null}
        </Column.Desc>
        <Column.Desc className="col-flex-1">
          {item ? item.devicesCount : null}
        </Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={this.props.showConfigDialog}
            primaryText="Edit Socket"/>
          <MenuItem
            className="dropdown-item-devices"
            onTouchTap={() => this.transitionTo(this.props.devicesRoute, this.getParams())}
            primaryText="Devices list"/>
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});
