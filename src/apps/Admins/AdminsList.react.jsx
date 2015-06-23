var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionActions    = require('../Session/SessionActions'),
    AdminsActions     = require('./AdminsActions'),
    AdminsStore       = require('./AdminsStore'),

    // Components
    mui               = require('material-ui'),
    Colors            = require('material-ui/lib/styles/colors'),
    FontIcon          = mui.FontIcon,

    // List
    ListContainer     = require('../../common/Lists/ListContainer.react'),
    List              = require('../../common/Lists/List.react'),
    Item              = require('../../common/ColumnList/Item.react'),
    Header            = require('../../common/ColumnList/Header.react'),
    LoadingItem       = require('../../common/ColumnList/LoadingItem.react'),
    ColumnDate        = require('../../common/ColumnList/Column/Date.react'),
    ColumnID          = require('../../common/ColumnList/Column/ID.react'),
    ColumnDesc        = require('../../common/ColumnList/Column/Desc.react'),
    ColumnKey         = require('../../common/ColumnList/Column/Key.react'),
    ColumnCheckIcon   = require('../../common/ColumnList/Column/CheckIcon.react');


module.exports = React.createClass({

  displayName: 'AdminsList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation,
  ],

  getInitialState: function () {
    return {
      items     : this.props.items,
      isLoading : this.props.isLoading,
    }
  },

  componentWillReceiveProps: function (nextProps) {
    this.setState({
      items     : nextProps.items,
      isLoading : nextProps.isLoading
    })
  },

  // List
  handleItemIconClick: function (id, state) {
    this.props.checkItem(id, state);
  },

  renderItem: function (item) {

    // TODO: is there any better way to hide/disable components?
    var nameColumn =  <ColumnDesc>{item.first_name + ' ' + item.last_name}</ColumnDesc>;
    if (this.props.mode == "invitations") {
      nameColumn = null;
    }

    return (
      <Item key={item.id}>
        <ColumnCheckIcon
          id              = {item.id.toString()}
          icon            = 'account'
          background      = {Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick} >
          {item.email}
        </ColumnCheckIcon>
        {nameColumn}
        <ColumnDesc>{item.role}</ColumnDesc>
        <ColumnDate>{item.created_at}</ColumnDate>
      </Item>
    )
  },

  getList: function () {
    if (this.state.isLoading) {
      return <LoadingItem />;
    }

    var items = this.state.items.map(function (item) {
      return this.renderItem(item)
    }.bind(this));

    if (items.length > 0) {
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }
    return [<Item key="empty">Empty Item</Item>];
  },

  render: function () {

    // TODO: is there any better way to hide/disable components?
    var nameColumnHeader = <ColumnDesc.Header>Name</ColumnDesc.Header>;
    if (this.props.mode == "invitations") {
      nameColumnHeader = null;
    }

    return (
      <ListContainer>
        <Header>
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          {nameColumnHeader}
          <ColumnDesc.Header>Role</ColumnDesc.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <List>
          {this.getList()}
        </List>
      </ListContainer>
    );
  }
});

