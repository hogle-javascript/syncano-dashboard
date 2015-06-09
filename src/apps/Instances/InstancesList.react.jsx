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
    mui              = require('material-ui'),
    Dialog           = mui.Dialog,
    ListContainer    = require('../../common/Lists/ListContainer.react'),
    Item             = require('../../common/ColumnList/Item.react'),
    Column           = require('../../common/ColumnList/ItemColumn.react'),
    Header           = require('../../common/ColumnList/Header.react'),
    ColNameDesc      = require('../../common/ColumnList/ColNameDesc.react'),
    ColName          = require('../../common/ColumnList/ColName.react'),
    FabList          = require('../../common/Fab/FabList.react');


module.exports = React.createClass({

  displayName: 'InstancesList',

  mixins: [
    Reflux.connect(InstancesStore),
    ButtonActionMixin,
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
    var checkedItemNumber;
    if (state) {
      checkedItemNumber = ++this.state.checkedItemNumber;
    } else {
      checkedItemNumber = --this.state.checkedItemNumber;
    }

    this.setState({
      checkingState: checkedItemNumber > 0,
      checkedItemNumber: checkedItemNumber,
    });
    console.log('checked', checkedItemNumber)
  },

  handleItemClick: function(instanceName) {
    // Redirect to main instance screen
    SessionActions.setInstance(instanceName);
    this.transitionTo('instance', {instanceName: instanceName});
  },

  getColumns: function() {
    return [
      {'name': this.props.name, space: 1, style: {fontSize: '20px'}},
      {'name': 'Name', space: 5},
      {'name': 'Description', space: 4},
      {'name': 'Created', space: 2},
    ];
  },

  generateItem: function (item) {

    return (
      <Item key={item.name}>
        <Column grid="1">
          <CheckIcon
            id          = {item.name}
            icon        = {item.metadata.icon || 'adjust'}
            background  = {item.metadata.color || 'green'}
            width       = '40px'
            handleClick = {this.handleItemIconClick}
            />
        </Column>
        <Column grid="5">
          <ColName id={item.name} handleClick={this.handleItemClick}>
            {item.name}
          </ColName>
        </Column>
        <Column grid="4">
          <span>{item.description}</span>
        </Column>
        <Column grid="2">
          <span>{item.created_at}</span>
        </Column>
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
          <Header
            checkedItemsNumber = {this.state.checkedItemNumber}
            columns            = {this.getColumns()}>
            <MaterialIcon name="group_add" handleClick={this.dummyClick} />
            <MaterialIcon name="home" handleClick={this.dummyClick} />
          </Header>
          <List viewMode={this.props.viewMode}>
            {this.getList()}
          </List>
        </ListContainer>
    );
  }

});