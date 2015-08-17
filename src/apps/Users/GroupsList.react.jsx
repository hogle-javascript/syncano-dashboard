import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

// Utils
import HeaderMixin from'../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import Actions from './GroupsActions';
import Store from './GroupsStore';

// Components
import MUI from 'material-ui';
import MenuItem from 'material-ui/lib/menus/menu-item';
import Common from '../../common';

export default Radium(React.createClass({

  displayName: 'GroupsList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  getInitialState() {
    return {
      items: this.props.items,
      isLoading: this.props.isLoading
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      isLoading: nextProps.isLoading
    })
  },

  handleIconMenuButtonClick(event) {
    event.stopPropagation();
  },

  getStyles() {
    return {
      list: {
        paddingTop: 0,
        paddingBottom: 0
      },
      listItemChecked: {
        background: MUI.Styles.Colors.lightBlue50
      }
    }
  },

  renderItem(item) {
    let itemActive = this.props.activeGroup && this.props.activeGroup.id === item.id;
    let styles = this.getStyles();
    let itemStyles = itemActive ? styles.listItemChecked : {};
    let iconButtonElement = (
      <MUI.IconButton
        touch={true}
        tooltipPosition='bottom-left'
        iconClassName='synicon-dots-vertical'/>
    );
    let rightIconMenu = (
      <MUI.IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={this.props.handleGroupAddUser.bind(null, item)}>Add User</MenuItem>
        <MenuItem onTouchTap={this.props.handleGroupEdit.bind(null, item)}>Edit Group</MenuItem>
        <MenuItem onTouchTap={this.props.handleGroupDelete.bind(null, item)}>Delete</MenuItem>
      </MUI.IconMenu>
    );

    return (
      <MUI.ListItem
        key={item.id}
        innerDivStyle={itemStyles}
        onMouseDown={this.props.handleItemClick.bind(null, item)}
        rightIconButton={rightIconMenu}>
        {item.label}
      </MUI.ListItem>
    )
  },

  getList() {
    let styles = this.getStyles();
    let items = this.state.items;
    let itemsCount = items.length;
    let indexOfListItem = itemsCount - 1;
    let listItems = this.state.items.map((item, index) => {
      if (index < indexOfListItem) {
        return [
          this.renderItem(item),
          <MUI.ListDivider />
        ];
      }
      return this.renderItem(item);
    });

    if (items.length > 0) {
      return (
        <MUI.List
          style={styles.list}
          zDepth={1}>
          {listItems}
        </MUI.List>
      );
    }

    return (
      <Common.ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </Common.ColumnList.EmptyItem>
    )
  },

  render() {
    return (
      <div>
        <Common.ColumnList.Header>
          <Common.ColumnList.Column.CheckIcon.Header
            className="col-flex-1">{this.props.name}</Common.ColumnList.Column.CheckIcon.Header>
        </Common.ColumnList.Header>
        <Common.Loading show={this.state.isLoading}>
          {this.getList()}
        </Common.Loading>
      </div>
    );
  }
}));

