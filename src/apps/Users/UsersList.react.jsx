var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionActions    = require('../Session/SessionActions'),
    UsersActions  = require('./UsersActions'),
    UsersStore    = require('./UsersStore'),
    CodeBoxesStore    = require('../CodeBoxes/CodeBoxesStore'),

    // Components
    mui               = require('material-ui'),
    Colors            = require('material-ui/lib/styles/colors'),
    FontIcon          = mui.FontIcon,

    // List
    List              = require('../../common/Lists/List.react'),
    Item              = require('../../common/ColumnList/Item.react'),
    EmptyListItem     = require('../../common/ColumnList/EmptyListItem.react'),
    Header            = require('../../common/ColumnList/Header.react'),
    Loading           = require('../../common/Loading/Loading.react'),
    ColumnDate        = require('../../common/ColumnList/Column/Date.react'),
    ColumnID          = require('../../common/ColumnList/Column/ID.react'),
    ColumnDesc        = require('../../common/ColumnList/Column/Desc.react'),
    ColumnKey         = require('../../common/ColumnList/Column/Key.react'),
    ColumnCheckIcon   = require('../../common/ColumnList/Column/CheckIcon.react');

module.exports = React.createClass({

  displayName: 'UsersList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      items     : this.props.items,
      isLoading : this.props.isLoading
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      items     : nextProps.items,
      isLoading : nextProps.isLoading
    })
  },

  // List
  handleItemIconClick: function(id, state) {
    this.props.checkItem(id, state);
  },

  getStyles: function() {
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

  renderItemGroups: function(groups) {
    var styles = this.getStyles();

    var itemGroups = groups.map(function(group) {
      return (
        <li style={styles.groupsListItem}>{group.label}</li>
      )
    });

    return (
      <ul style={styles.groupsList}>{itemGroups}</ul>
    )
  },

  renderItem: function(item) {
    return (
      <Item
        checked = {item.checked}
        key     = {item.id}>
        <ColumnCheckIcon
          id              = {item.id.toString()}
          icon            = 'account'
          background      = {Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick} >
          {item.username}
        </ColumnCheckIcon>
        <ColumnID>{item.id}</ColumnID>
        <ColumnDesc>{this.renderItemGroups(item.groups)}</ColumnDesc>
        <ColumnDate>{item.updated_at}</ColumnDate>
        <ColumnDate>{item.created_at}</ColumnDate>
      </Item>
    )
  },

  getList: function() {
    var items = this.state.items.map(function(item) {
      return this.renderItem(item)
    }.bind(this));

    if (items.length > 0) {
      return items;
    }

    return (
      <EmptyListItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </EmptyListItem>
    )
  },

  render: function() {
    return (
      <div>
        <Header>
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          <ColumnID.Header>ID</ColumnID.Header>
          <ColumnDesc.Header>Groups</ColumnDesc.Header>
          <ColumnDate.Header>Updated</ColumnDate.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <List>
          <Loading show={this.state.isLoading}>
            {this.getList()}
          </Loading>
        </List>
      </div>
    );
  }
});

