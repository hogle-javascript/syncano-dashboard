var React  = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionActions   = require('../Session/SessionActions'),
    ApiKeysActions = require('./ApiKeysActions'),
    ApiKeysStore   = require('./ApiKeysStore'),

    // Components
    mui              = require('material-ui'),
    Colors           = require('material-ui/lib/styles/colors'),
    FontIcon         = mui.FontIcon,

    // List
    ListContainer   = require('../../common/Lists/ListContainer.react'),
    List            = require('../../common/Lists/List.react'),
    Item            = require('../../common/ColumnList/Item.react'),
    Header          = require('../../common/ColumnList/Header.react'),
    LoadingItem     = require('../../common/ColumnList/LoadingItem.react'),
    ColumnDate      = require('../../common/ColumnList/Column/Date.react'),
    ColumnID        = require('../../common/ColumnList/Column/ID.react'),
    ColumnText      = require('../../common/ColumnList/Column/Text.react'),
    ColumnKey       = require('../../common/ColumnList/Column/Key.react'),
    ColumnCheckIcon = require('../../common/ColumnList/Column/CheckIcon.react');


module.exports = React.createClass({

  displayName: 'ApiKeysList',

  mixins: [
    Reflux.connect(ApiKeysStore),
    HeaderMixin,
    Router.State,
    Router.Navigation,
  ],

  // List
  handleItemIconClick: function (id, state) {
    ApiKeysActions.checkItem(id, state);
  },

  renderItem: function (item) {

    var ignore_acl = null,
        allow_user_create = null;
    if (item.ignore_acl) {
      ignore_acl = <div>Ignore ACL</div>;
    }
    if (item.allow_user_create) {
      allow_user_create = <div>Allow user creation</div>;
    }

    return (
      <Item key={item.id}>
        <ColumnCheckIcon
          id              = {item.id.toString()}
          icon            = 'key'
          background      = {Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick} >
          {item.description}
        </ColumnCheckIcon>
        <ColumnID>{item.id}</ColumnID>
        <ColumnKey color="black">{item.api_key}</ColumnKey>
        <ColumnText>
          {ignore_acl}
          {allow_user_create}
        </ColumnText>
        <ColumnDate>{item.created_at}</ColumnDate>
      </Item>
    )
  },

  getList: function () {
    if (this.state.isLoading) {
      return <LoadingItem />;
    }

    var instances = this.state.items;

    var items = instances.map(function (item) {
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
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          <ColumnID.Header>ID</ColumnID.Header>
          <ColumnKey.Header>Key</ColumnKey.Header>
          <ColumnText.Header>Permissions</ColumnText.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <List>
          {this.getList()}
        </List>
      </ListContainer>
    );
  }
});

