import React from 'react';
import {ColumnList, Loading} from 'syncano-components';

export default React.createClass({
  displayName: 'List',

  propTypes: {
    children: React.PropTypes.node
  },

  renderList() {
    if (this.props.children) {
      return this.props.children;
    }

    let items = this.props.items.map((item, index) => this.props.renderItem(item, index));

    if (items.length > 0) {
      return items;
    }

    return (
      <ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </ColumnList.EmptyItem>
    );
  },


  render() {
    return (
      <Loading show={this.props.isLoading}>
        {this.renderList()}
      </Loading>
    );
  }
});
