var React  = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),

    // Utils
    HeaderMixin         = require('../Header/HeaderMixin'),
    ButtonActionMixin   = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionStore      = require('../Session/SessionStore'),
    SessionActions   = require('../Session/SessionActions'),
    CodeBoxesActions = require('./CodeBoxesActions'),
    CodeBoxesStore   = require('./CodeBoxesStore'),

    // Components
    mui              = require('material-ui'),

    // List
    ListContainer   = require('../../common/Lists/ListContainer.react'),
    Item            = require('../../common/ColumnList/Item.react'),
    Header          = require('../../common/ColumnList/Header.react'),
    LoadingItem     = require('../../common/ColumnList/LoadingItem.react'),
    ColumnName      = require('../../common/ColumnList/Column/Name.react'),
    ColumnDesc      = require('../../common/ColumnList/Column/Desc.react'),
    ColumnDate      = require('../../common/ColumnList/Column/Date.react'),
    ColumnCheckIcon = require('../../common/ColumnList/Column/CheckIcon.react');


module.exports = React.createClass({

  displayName: 'CodeBoxesList',

  mixins: [
    Reflux.connect(CodeBoxesStore),
    HeaderMixin,
    Router.State,
    Router.Navigation,
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
    this.transitionTo('codeboxes-edit', {instanceName: SessionStore.instance.name, codeboxId: itemId});
  },


  generateItem: function (item) {

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
          {item.name}
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
      return this.generateItem(item)
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
          <ColumnDesc.Header>Description</ColumnDesc.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <List viewMode={this.props.viewMode}>
          {this.getList()}
        </List>
      </ListContainer>
    );
  }
});