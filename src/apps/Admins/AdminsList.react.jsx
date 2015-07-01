var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionActions    = require('../Session/SessionActions'),
    SessionStore      = require('../Session/SessionStore'),
    AdminsActions     = require('./AdminsActions'),
    AdminsStore       = require('./AdminsStore'),

    // Components
    mui               = require('material-ui'),
    Colors            = require('material-ui/lib/styles/colors'),

    // List
    EmptyListItem     = require('../../common/ColumnList/EmptyListItem.react'),
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
    Reflux.connect(SessionStore, 'session'),
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

  handleItemIconClick: function(id, state) {
    this.props.checkItem(id, state);
  },

  renderItem: function(item) {
    var isOwner = item.id === this.state.session.instance.owner.id;
    return (
      <Item
        checked = {item.checked}
        key     = {item.id}>
        <ColumnCheckIcon
          className       = "col-xs-25 col-md-20"
          id              = {item.id.toString()}
          icon            = 'account'
          background      = {Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
          checkable       = {!isOwner}>
          <div>
            {item.email}
            <div>
              {isOwner ? "Instance owner (cannot be edited)" : null}
            </div>
          </div>
        </ColumnCheckIcon>
        <ColumnDesc>{item.role}</ColumnDesc>
        <ColumnDate>{item.created_at}</ColumnDate>
      </Item>
    )
  },

  getList: function() {
    var items = this.state.items || [];

    if (this.state.isLoading) {
      return <LoadingItem />;
    }

    if (items.length > 0) {
      items = this.state.items.map(function(item) {
        return this.renderItem(item)
      }.bind(this));

      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }
    return (
      <EmptyListItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </EmptyListItem>
    );
  },

  render: function() {
    return (
      <ListContainer>
        <Header>
          <ColumnCheckIcon.Header className="col-xs-25 col-md-20">{this.props.name}</ColumnCheckIcon.Header>
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

