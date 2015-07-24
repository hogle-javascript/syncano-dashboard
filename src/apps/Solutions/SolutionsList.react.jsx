import React from 'react';
import Reflux from 'reflux';

import SolutionsListItem from './SolutionsListItem.react';

module.exports = React.createClass({

  displayName: 'SolutionsList',

  getStyles() {
    return {
      list: {
        listStyle    : 'none',
        margin       : '0 40px',
        padding      : 0
      },
      listItem: {
        padding      : '0 15px',
        marginBottom : 40,
        width        : 346
      }
    }
  },

  getListItems() {
    let styles    = this.getStyles();
    let listItems = this.props.items.map(item => {
      return (
        <div
          key       = {item.id}
          style     = {styles.listItem}
        >
          <SolutionsListItem data={item} />
        </div>
      )
    });
    return listItems;
  },

  render() {
    let styles = this.getStyles();

    return (
      <div
        className = "row"
        style     = {styles.list}
      >
        {this.getListItems()}
      </div>
    );
  }
});
