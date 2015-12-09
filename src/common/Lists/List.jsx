import React from 'react';
import Loading from '../Loading';
import EmptyItem from '../ColumnList/EmptyListItem';

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
      items.reverse();
      return items;
    }

    return (
      <EmptyItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </EmptyItem>
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
