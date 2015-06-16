var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionActions    = require('../Session/SessionActions'),
    CodeBoxesActions  = require('./CodeBoxesActions'),
    CodeBoxesStore    = require('./CodeBoxesStore'),

    // Components
    mui               = require('material-ui'),

    // List
    List              = require('../../common/Lists/List.react'),
    ListContainer     = require('../../common/Lists/ListContainer.react'),
    Item              = require('../../common/ColumnList/Item.react'),
    EmptyListItem     = require('../../common/ColumnList/EmptyListItem.react'),
    Header            = require('../../common/ColumnList/Header.react'),
    LoadingItem       = require('../../common/ColumnList/LoadingItem.react'),
    ColumnName        = require('../../common/ColumnList/Column/Name.react'),
    ColumnDesc        = require('../../common/ColumnList/Column/Desc.react'),
    ColumnDate        = require('../../common/ColumnList/Column/Date.react'),
    ColumnCheckIcon   = require('../../common/ColumnList/Column/CheckIcon.react');


module.exports = React.createClass({

  displayName: 'CodeBoxesList',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(CodeBoxesStore),
    HeaderMixin
  ],

  componentWillReceiveProps: function(nextProps, nextState) {
    this.setState({items : nextProps.items})
  },

  // List
  handleItemIconClick: function (id, state) {
    CodeBoxesActions.checkItem(id, state);
  },

  handleItemClick: function(itemId) {
    // Redirect to edit screen
    this.transitionTo('codeboxes-edit', {instanceName: this.getParams().instanceName, codeboxId: itemId});
  },

  renderItem: function (item) {

    var runtime = CodeBoxesStore.getRuntimeColorIcon(item.runtime_name);
    return (
      <Item key={item.id}>
        <ColumnCheckIcon
          id              = {item.id}
          icon            = {runtime.icon}
          background      = {runtime.color}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
          handleNameClick = {this.handleItemClick}>
          {item.label}
        </ColumnCheckIcon>
        <ColumnDesc>{item.description}</ColumnDesc>
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
    return (
      <EmptyListItem
        handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </EmptyListItem>
    );
  },

  render: function () {
    return (
      <ListContainer>
        <Header>
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          <ColumnDesc.Header>Description</ColumnDesc.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <List>
          {this.getList()}
        </List>
      </ListContainer>
    );
  }
});