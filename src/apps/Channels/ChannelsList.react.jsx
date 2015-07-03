var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionActions    = require('../Session/SessionActions'),
    ChannelsActions  = require('./ChannelsActions'),
    ChannelsStore    = require('./ChannelsStore'),

    // Components
    mui               = require('material-ui'),
    Colors            = mui.Styles.Colors,

    // List
    List              = require('../../common/Lists/List.react'),
    ListContainer     = require('../../common/Lists/ListContainer.react'),
    Item              = require('../../common/ColumnList/Item.react'),
    EmptyListItem     = require('../../common/ColumnList/EmptyListItem.react'),
    Header            = require('../../common/ColumnList/Header.react'),
    Loading           = require('../../common/Loading/Loading.react'),
    ColumnDesc        = require('../../common/ColumnList/Column/Desc.react'),
    ColumnDate        = require('../../common/ColumnList/Column/Date.react'),
    ColumnCheckIcon   = require('../../common/ColumnList/Column/CheckIcon.react');


module.exports = React.createClass({

  displayName: 'ChannelsList',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(ChannelsStore),
    HeaderMixin
  ],

  componentWillReceiveProps: function(nextProps) {
    this.setState({items : nextProps.items})
  },

  // List
  handleItemIconClick: function(id, state) {
    ChannelsActions.checkItem(id, state);
  },

  handleItemClick: function(itemId) {
  },

  renderItem: function(item) {
    return (
      <Item
        checked = {item.checked}
        key     = {item.id}>
        <ColumnCheckIcon
          id              = {item.name}
          icon            = {'bullhorn'}
          background      = {Colors.lightBlueA100}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
          handleNameClick = {this.handleItemClick}>
          {item.name}
        </ColumnCheckIcon>
        <ColumnDesc>{item.description}</ColumnDesc>
        <ColumnDesc className="col-xs-5 col-md-5">
          <div>
            <div>group: {item.group_permissions}</div>
            <div>other: {item.other_permissions}</div>
          </div>
        </ColumnDesc>
        <ColumnDesc className="col-xs-5 col-md-5">{item.type}</ColumnDesc>
        <ColumnDesc className="col-xs-5 col-md-5">{item.custom_publish ? 'Yes' : 'No'}</ColumnDesc>
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
    );
  },

  render: function() {
    return (
      <ListContainer>
        <Header>
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          <ColumnDesc.Header>Description</ColumnDesc.Header>
          <ColumnDesc.Header className="col-xs-5 col-md-5">Permissions</ColumnDesc.Header>
          <ColumnDesc.Header className="col-xs-5 col-md-5">Type</ColumnDesc.Header>
          <ColumnDesc.Header className="col-xs-5 col-md-5">Custom publish</ColumnDesc.Header>
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