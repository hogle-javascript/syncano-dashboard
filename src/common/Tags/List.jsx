import React from 'react';
import _ from 'lodash';

import MUI from 'material-ui';
import Show from '../../common/Show';

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
        background: MUI.Styles.Colors.lightBlue50
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
      <MUI.ListItem
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
        <MUI.ListItem
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
        <MUI.List
          zDepth={1}
          subheader="Tags"
          className="tags-list">
          {this.renderAllTagsListItem()}
          {this.renderTagsListItems()}
        </MUI.List>
      </Show>
    );
  }
});
