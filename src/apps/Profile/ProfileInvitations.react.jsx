var React                   = require('react'),
    Reflux                  = require('reflux'),

    HeaderMixin             = require('../Header/HeaderMixin'),

    ProfileActions          = require('./ProfileActions'),
    ProfileInvitationsStore = require('./ProfileInvitationsStore'),

    // List
    ListContainer            = require('../../common/Lists/ListContainer.react'),
    List                     = require('../../common/Lists/List.react'),
    Item                     = require('../../common/ColumnList/Item.react'),
    Header                   = require('../../common/ColumnList/Header.react'),
    LoadingItem              = require('../../common/ColumnList/LoadingItem.react'),
    ColumnDesc               = require('../../common/ColumnList/Column/Desc.react'),
    ColumnDate               = require('../../common/ColumnList/Column/Date.react'),
    ColumnCheckIcon          = require('../../common/ColumnList/Column/CheckIcon.react');



module.exports = React.createClass({

  displayName: 'ProfileInvitations',

  mixins: [
    Reflux.connect(ProfileInvitationsStore),
    HeaderMixin
  ],

  headerBreadcrumbs: [
    {
      route: 'dashboard',
      label: 'Home',
    },
    {
      route: 'profile-settings',
      label: 'Account',
    },
    {
      route: 'profile-invitations',
      label: 'Invitations',
    }
  ],

  headerMenuItems: [
    {
      route: 'profile-settings',
      label: 'Profile',
    },
    {
      route: 'profile-authentication',
      label: 'Authentication',
    },
    {
      route: 'profile-billing',
      label: 'Billing',
    },
    {
      route: 'profile-invitations',
      label: 'Invitations',
    }
  ],

  renderItem: function (item) {
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
        <ColumnDesc>{item.role}</ColumnDesc>
        <ColumnDate>{item.created_at}</ColumnDate>
      </Item>
    )
  },

  renderList: function () {
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
    return (
      <ListContainer>
        <Header>
          <ColumnCheckIcon.Header>Invitations</ColumnCheckIcon.Header>
          <ColumnDesc.Header>Role</ColumnDesc.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <List>
          {this.renderList()}
        </List>
      </ListContainer>
    );
  }

});