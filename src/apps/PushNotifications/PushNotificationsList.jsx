import React from 'react';

import {ColumnList, Show} from 'syncano-components';
import {Container, Lists} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'DevicesList',

  renderItem(listItem) {
    if (listItem) {
      return React.createElement(listItem);
    }
  },

  render() {
    return (
      <Show if={this.props.items.length > 0}>
        <Lists.Container>
          <ColumnList.Header>
            <Column.ColumnHeader
              handleClick={this.props.handleTitleClick}
              primary={true}
              columnName="DESC"
              className="col-xs-16">
              {this.props.name}
            </Column.ColumnHeader>
            <Column.ColumnHeader
              className="col-flex-1"
              columnName="DESC">
              Devices
            </Column.ColumnHeader>
          </ColumnList.Header>
          <Lists.List
            {...this.props}
            renderItem={this.renderItem}/>
        </Lists.Container>
      </Show>
    );
  }
});
