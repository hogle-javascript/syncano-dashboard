import React from 'react';

import {ColumnList} from 'syncano-components';
import {Container, Lists} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'DevicesList',

  renderItem(listItem) {
    return React.createElement(listItem);
  },

  render() {
    return (
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
    );
  }
});
