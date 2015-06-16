var React  = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionActions   = require('../Session/SessionActions'),
    InstancesActions = require('./InstancesActions'),
    InstancesStore   = require('./InstancesStore'),

    // Components
    mui              = require('material-ui'),

    // List
    ListContainer   = require('../../common/Lists/ListContainer.react'),
    Item            = require('../../common/ColumnList/Item.react'),
    EmptyListItem   = require('../../common/ColumnList/EmptyListItem.react'),
    Header          = require('../../common/ColumnList/Header.react'),
    LoadingItem     = require('../../common/ColumnList/LoadingItem.react'),
    ColumnName      = require('../../common/ColumnList/Column/Name.react'),
    ColumnDesc      = require('../../common/ColumnList/Column/Desc.react'),
    ColumnDate      = require('../../common/ColumnList/Column/Date.react'),
    ColumnCheckIcon = require('../../common/ColumnList/Column/CheckIcon.react');


module.exports = React.createClass({

  displayName: 'InstancesList',

  mixins: [
    Reflux.connect(InstancesStore),
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      listType: this.props.listType,
      items: this.props.items
    }
  },

  componentWillMount: function() {
  },

  componentWillReceiveProps: function(nextProps, nextState) {
    this.setState({items : nextProps.items})
  },

  // List
  handleItemIconClick: function (id, state) {
    InstancesActions.checkItem(id, state);
  },

  handleItemClick: function(instanceName) {
    // Redirect to main instance screen
    SessionActions.setInstance(instanceName);
    this.transitionTo('instance', {instanceName: instanceName});
  },

  generateItem: function (item) {
    return (
      <Item key={item.name}>
        <ColumnCheckIcon
          id              = {item.name}
          icon            = {item.metadata.icon}
          background      = {item.metadata.color}
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

    var instances = this.state.items.filter(this.props.filter);

    var items = instances.map(function (item) {
      return this.generateItem(item)
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
        <List viewMode={this.props.viewMode}>
          {this.getList()}
        </List>
      </ListContainer>
    );
  }
});