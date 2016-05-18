import React from 'react';
import {ColumnList, Loading} from '../';

export default React.createClass({
  displayName: 'List',

  propTypes: {
    children: React.PropTypes.node
  },

  renderList() {
    if (this.props.children) {
      return this.props.children;
    }

    if (this.props.items.length > 0) {
      return this.props.items.map((item, index) => this.props.renderItem(item, index));
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
