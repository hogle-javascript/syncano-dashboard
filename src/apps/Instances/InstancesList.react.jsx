var React  = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionStore     = require('../Session/SessionStore'),
    SessionActions   = require('../Session/SessionActions'),
    InstancesActions = require('./InstancesActions'),
    InstancesStore   = require('./InstancesStore'),

    // Components
    mui           = require('material-ui'),

    // List
    ListContainer   = require('../../common/Lists/ListContainer.react'),
    Item            = require('../../common/ColumnList/Item.react'),
    Header          = require('../../common/ColumnList/Header.react'),
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
    Router.Navigation,
    //React.addons.LinkedStateMixin,
    //ValidationMixin,
  ],

  getInitialState: function() {
    return {
      listType: this.props.listType
    }
  },

  componentWillMount: function() {
  },

  // List
  handleItemIconClick: function (id, state) {
    this.props.handleItemIconClick(id, state);
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
            id          = {item.name}
            icon        = {item.metadata.icon}
            background  = {item.metadata.color}
            width       = '40px'
            handleClick = {this.handleItemIconClick} />
        <ColumnName
          id={item.name}
          handleClick={this.handleItemClick}>
          {item.name}
        </ColumnName>
        <ColumnDesc>{item.description}</ColumnDesc>
        <ColumnDate>{item.created_at}</ColumnDate>
      </Item>
    )
  },

  getList: function () {
    var instances = this.state.instances[this.state.listType] || [];

    var items = instances.map(function (item) {
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
          <ColumnCheckIcon.Header>Instances</ColumnCheckIcon.Header>
          <ColumnName.Header></ColumnName.Header>
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