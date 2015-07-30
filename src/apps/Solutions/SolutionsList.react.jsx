import React from 'react';
import Reflux from 'reflux';

import SolutionsListItem from './SolutionsListItem.react';

export default React.createClass({

  displayName: 'SolutionsList',

  getStyles() {
    return {
      list : {
        listStyle    : 'none',
        margin       : '0 40px',
        padding      : 0
      },
      listItem : {
        padding      : '0 15px',
        marginBottom : 40,
        width        : 346
      }
    }
  },

  getListItems() {
    return this.props.items.map(item => {
      return (
        <div
          key   = {item.id}
          style = {this.getStyles().listItem}>
          <SolutionsListItem data={item} />
        </div>
      )
    });
  },

  render() {
    return (
      <div
        className = "row"
        style     = {this.getStyles().list}>
        {this.getListItems()}
      </div>
    );
  }
});
