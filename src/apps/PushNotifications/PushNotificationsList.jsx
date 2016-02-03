import React from 'react';

import {DialogsMixin} from '../../mixins';

import {ColumnList} from 'syncano-components';
import {Container, Lists} from '../../common';
import ListItem from './PushNotificationsListItem';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'DevicesList',

  mixins: [DialogsMixin],

  getInitialState() {
    return {};
  },

  componentWillUpdate(nextProps) {
    console.info('Channels::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  test() {
    console.error('click');
  },

  renderItem(item) {
    return (
      <ListItem
        key={`push-notification-list-item-${item.name}`}
        item={item}/>
    );
  },

  render() {
    return (
      <div>
        <Lists.Container>
          <ColumnList.Header>
            <Column.ColumnHeader
              handleClick={this.props.handleTitleClick}
              primary={true}
              columnName="DESC"
              className="col-xs-18">
              {this.props.name}
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
