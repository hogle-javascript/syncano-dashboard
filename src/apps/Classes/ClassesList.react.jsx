var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionActions    = require('../Session/SessionActions'),
    SessionStore      = require('../Session/SessionStore'),
    ClassesActions    = require('./ClassesActions'),
    ClassesStore      = require('./ClassesStore'),

    // Components
    mui               = require('material-ui'),
    Colors            = require('material-ui/lib/styles/colors'),
    FontIcon          = mui.FontIcon,

    // List
    ListContainer     = require('../../common/Lists/ListContainer.react'),
    EmptyListItem     = require('../../common/ColumnList/EmptyListItem.react'),
    List              = require('../../common/Lists/List.react'),
    Item              = require('../../common/ColumnList/Item.react'),
    Header            = require('../../common/ColumnList/Header.react'),
    Loading           = require('../../common/Loading/Loading.react'),
    ColumnDate        = require('../../common/ColumnList/Column/Date.react'),
    ColumnDesc        = require('../../common/ColumnList/Column/Desc.react'),
    ColumnID          = require('../../common/ColumnList/Column/ID.react'),
    ColumnText        = require('../../common/ColumnList/Column/Text.react'),
    ColumnKey         = require('../../common/ColumnList/Column/Key.react'),
    ColumnCheckIcon   = require('../../common/ColumnList/Column/CheckIcon.react');

module.exports = React.createClass({

  displayName: 'ClassesList',

  mixins: [
    Reflux.connect(ClassesStore),
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  // List
  handleItemIconClick: function(id, state) {
    ClassesActions.checkItem(id, state);
  },

  handleItemClick: function(className) {
    SessionStore.getRouter().transitionTo(
      'classes-data-objects',
      {
        instanceName : SessionStore.getInstance().name,
        className    : className
      }
    );
    console.info('ClassesList::handleItemClick');
  },

  renderItem: function(item) {

    return (
      <Item
        key         = {item.name}
        id          = {item.name}
        enableHover = {true}
        handleClick = {this.handleItemClick}>
        <ColumnCheckIcon
          id              = {item.name.toString()}
          icon            = {item.metadata.icon}
          background      = {item.metadata.color}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}>
          {item.name}
        </ColumnCheckIcon>
        <ColumnDesc>{item.description}</ColumnDesc>
        <ColumnID className="col-xs-5 col-md-5">
          {item.objects_count}
        </ColumnID>
        <ColumnDate>{item.created_at}</ColumnDate>
      </Item>
    )
  },

  getList: function() {
    var items = this.state.items.map(function(item) {
      return this.renderItem(item)
    }.bind(this));

    if (items.length > 0) {
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
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
      <ListContainer>
        <Header>
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          <ColumnDesc.Header>Description</ColumnDesc.Header>
          <ColumnID.Header className="col-xs-5 col-md-5">Objects</ColumnID.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <List>
          <Loading show={this.state.isLoading}>
            {this.getList()}
          </Loading>
        </List>
      </ListContainer>
    );
  }
});

