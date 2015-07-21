import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import ButtonActionMixin from '../../mixins/ButtonActionMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import UsersActions from './UsersActions';
import UsersStore from './UsersStore';
import CodeBoxesStore from '../CodeBoxes/CodeBoxesStore';

// Components
import MUI from 'material-ui';

// List
import Lists from '../../common/Lists';
import Item from '../../common/ColumnList/Item.react';
import EmptyListItem from '../../common/ColumnList/EmptyListItem.react';
import Header from '../../common/ColumnList/Header.react';
import Loading from '../../common/Loading/Loading.react';
import ColumnDate from '../../common/ColumnList/Column/Date.react';
import ColumnID from '../../common/ColumnList/Column/ID.react';
import ColumnDesc from '../../common/ColumnList/Column/Desc.react';
import ColumnKey from '../../common/ColumnList/Column/Key.react';
import ColumnCheckIcon from '../../common/ColumnList/Column/CheckIcon.react';

export default React.createClass({

  displayName: 'UsersList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  getInitialState() {
    return {
      items     : this.props.items,
      isLoading : this.props.isLoading
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      items     : nextProps.items,
      isLoading : nextProps.isLoading
    })
  },

  // List
  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
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

  renderItemGroups(groups) {
    var styles = this.getStyles();

    if (groups.length === 0) {
      return 'No group';
    }

    var itemGroups = groups.map(function(group) {
      return (
        <li style={styles.groupsListItem}>{group.label}</li>
      )
    });

    return (
      <ul style={styles.groupsList}>{itemGroups}</ul>
    )
  },

  renderItem(item) {
    return (
      <Item
        checked = {item.checked}
        key     = {item.id}
      >
        <ColumnCheckIcon
          id              = {item.id.toString()}
          icon            = 'account'
          background      = {MUI.Styles.Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
        >
          {item.username}
        </ColumnCheckIcon>
        <ColumnID>{item.id}</ColumnID>
        <ColumnDesc>{this.renderItemGroups(item.groups)}</ColumnDesc>
        <ColumnDate date={item.profile.updated_at} />
        <ColumnDate date={item.profile.created_at} />
      </Item>
    )
  },

  getList() {
    var items = this.state.items.map(item => {
      return this.renderItem(item)
    });

    if (items.length > 0) {
      return items;
    }

    return (
      <EmptyListItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </EmptyListItem>
    )
  },

  render() {
    return (
      <div>
        <Header>
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          <ColumnID.Header>ID</ColumnID.Header>
          <ColumnDesc.Header>Groups</ColumnDesc.Header>
          <ColumnDate.Header>Updated</ColumnDate.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <Lists.List>
          <Loading show={this.state.isLoading}>
            {this.getList()}
          </Loading>
        </Lists.List>
      </div>
    );
  }
});

