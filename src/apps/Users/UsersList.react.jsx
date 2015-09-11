import React from 'react';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Components
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'UsersList',

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

  getStyles() {
    return {
      groupsList: {
        margin: '0 -4px',
        padding: 0,
        listStyle: 'none'
      },
      groupsListItem: {
        display: 'inline-block',
        lineHeight: '24px',
        border: '1px solid #ddd',
        borderRadius: 2,
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 12,
        padding: '0 4px',
        margin: 4,
        background: '#fff'
      }
    }
  },

  // List
  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
  },

  renderItemGroups(groups) {
    let styles = this.getStyles();

    if (typeof groups === 'undefined') {
      return true;
    }

    if (groups.length === 0) {
      return 'No group';
    }

    let itemGroups = groups.map((group) => <li style={styles.groupsListItem}>{group.label}</li>);

    return (
      <ul style={styles.groupsList}>{itemGroups}</ul>
    )
  },

  renderItem(item) {
    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.id}>
        <Column.CheckIcon
          id={item.id.toString()}
          icon='account'
          background={Common.Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={this.handleItemIconClick}>
          {item.username}
        </Column.CheckIcon>
        <Column.ID>{item.id}</Column.ID>
        <Column.Desc>{this.renderItemGroups(item.groups)}</Column.Desc>
        <Column.Date date={item.profile.updated_at}/>
        <Column.Date date={item.profile.created_at}/>
      </Common.ColumnList.Item>
    )
  },

  renderList() {
    let items = this.state.items.map((item) => this.renderItem(item));

    if (items.length > 0) {
      return items;
    }

    return (
      <Common.ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick.bind(null, null)}>
        {this.props.emptyItemContent}
      </Common.ColumnList.EmptyItem>
    )
  },

  render() {
    return (
      <div>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ID.Header>ID</Column.ID.Header>
          <Column.Desc.Header>Groups</Column.Desc.Header>
          <Column.ColumnHeader columnName="DATE">Updated</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.state.isLoading}>
            {this.renderList()}
          </Common.Loading>
        </Common.Lists.List>
      </div>
    );
  }
});

