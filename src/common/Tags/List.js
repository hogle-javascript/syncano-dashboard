import React from 'react';
import _ from 'lodash';

import {Styles, List, ListItem} from 'syncano-material-ui';
import Show from '../Show';

export default React.createClass({
  displayName: 'TagsList',

  getInitialState() {
    return {
      items: this.props.items,
      selectedItems: this.props.selectedItems
    };
  },

  getStyles() {
    return {
      listItemChecked: {
        background: Styles.Colors.lightBlue50
      },
      tagsCounter: {
        marginTop: 12,
        color: 'grey'
      }
    };
  },

  handleOnTouchTap(name) {
    if (this.props.toggleTagSelection) {
      this.props.toggleTagSelection(name);
    }
  },

  handleResetActiveTagsList() {
    if (this.props.resetTagsSelection) {
      this.props.resetTagsSelection();
    }
  },

  renderAllTagsListItem() {
    let styles = this.getStyles();

    return (
      <ListItem
        key="all-tags"
        primaryText="All tags"
        innerDivStyle={_.isEmpty(this.props.selectedItems) ? styles.listItemChecked : {}}
        onTouchTap={this.handleResetActiveTagsList}/>
    );
  },

  renderTagsListItems() {
    let styles = this.getStyles();

    return _.map(this.props.items, (item) => {
      return (
        <ListItem
          key={item.name}
          primaryText={item.name}
          rightAvatar={<div style={styles.tagsCounter}>{item.count}</div>}
          innerDivStyle={this.props.selectedItems.indexOf(item.name) > -1 ? styles.listItemChecked : {}}
          onTouchTap={this.handleOnTouchTap.bind(this, item.name)}/>
      );
    });
  },

  render() {
    return (
      <Show if={!_.isEmpty(this.props.items)}>
        <List
          subheader="Tags"
          className="tags-list">
          {this.renderAllTagsListItem()}
          {this.renderTagsListItems()}
        </List>
      </Show>
    );
  }
});
