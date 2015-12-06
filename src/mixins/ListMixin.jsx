import React from 'react';
import {IconButton} from 'syncano-material-ui';
import EmptyItem from '../common/ColumnList/EmptyListItem';

export default {
  renderList() {
    let items = this.props.items.map((item, index) => this.renderItem(item, index));

    if (items.length > 0) {
      items.reverse();
      return items;
    }

    return (
      <EmptyItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </EmptyItem>
    );
  },

  renderListIconMenuButton() {
    return (
      <IconButton
        touch={true}
        tooltipPosition='bottom-left'
        iconClassName='synicon-dots-vertical'/>
    );
  }
};
