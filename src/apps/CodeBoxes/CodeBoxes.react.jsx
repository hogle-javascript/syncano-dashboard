var React  = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),

    // Stores and Actions
    SessionStore     = require('../Session/SessionStore'),
    CodeBoxesActions = require('./CodeBoxesActions'),
    CodeBoxesStore   = require('./CodeBoxesStore'),

    // Components
    mui                  = require('material-ui'),
    FloatingActionButton = mui.FloatingActionButton,
    Dialog               = mui.Dialog,
    Container            = require('../../common/Container/Container.react'),
    List                 = require('../../common/Lists/List.react'),
    ListContainer        = require('../../common/Lists/ListContainer.react'),
    Item                 = require('../../common/ColumnList/Item.react'),
    Column               = require('../../common/ColumnList/ItemColumn.react'),
    Header               = require('../../common/ColumnList/Header.react'),
    ColNameDesc          = require('../../common/ColumnList/ColNameDesc.react'),
    FabList              = require('../../common/Fab/FabList.react'),

    AddDialog            = require('./CodeBoxesAddDialog.react');


module.exports = React.createClass({

  displayName: 'CodeBoxes',

  mixins: [
    Reflux.connect(CodeBoxesStore),
    HeaderMixin,
    Router.State,
    Router.Navigation,
    //React.addons.LinkedStateMixin,
    //ValidationMixin,
  ],

  componentWillMount: function() {
    CodeBoxesStore.refreshData();
  },

  componentDidMount: function() {
    if (this.getParams().action == 'add'){
      // Show Add modal
      this.refs.addCodeBoxDialog.show();
    }
  },

  headerBreadcrumbs: function () {
    var instanceName = this.getParams().instanceName;
    return [{
      route: 'instances',
      label: 'Instances',
      params: {instanceName: instanceName}
    },{
      route: 'instance',
      label: instanceName,
      params: {instanceName: instanceName}
    },{
      route: 'codeboxes',
      label: 'CodeBoxes',
      params: {instanceName: instanceName}
    }]
  },

  headerMenuItems: function() {
    var params = {instanceName: this.getParams().instanceName};
    return [
      {
        label: 'Data Browser', 
        route: 'data-objects', 
        params: params, 
      }, {
        label: 'Classes', 
        route: 'classes', 
        params: params},
      {
        label: 'API Keys', 
        route: 'api-keys', 
        params: params
      }, {
        label: 'Admins', 
        route: 'admins', 
        params: params
      }, {
        label: 'Users', 
        route: 'users', 
        params: params
      }, {
        label: 'CodeBoxes', 
        route: 'codeboxes', 
        params: params,
      }, {
        label: 'Webhooks', 
        route: 'webhooks', 
        params: params
      }, {
        label: 'Tasks', 
        route: 'tasks', 
        params: params
      }];
  },

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

  getColor: function(runtime) {
    var colors = {
      nodejs: '#80BD01',
      python: '#4984B1',
      golang: '#E0EBF5',
      ruby:   '#B21000'
    }
    return colors[runtime];
  },

  handleItemClick: function(itemId) {
    // Redirect to edit screen
    this.transitionTo('codeboxes-edit', {instanceName: SessionStore.instance.name, codeboxId: itemId});
  },

  generateItem: function (item) {
    return (<Item key={item.id}>
      <Column grid="1">
        <CheckIcon
          id          = {item.name}
          icon        = "notifications"
          background  = {this.getColor(item.runtime_name)}
          width       = '40px'
          handleClick = {this.handleItemIconClick}
         />
      </Column>
      <Column grid="5">
        <ColNameDesc
          id          = {item.id.toString()}
          name        = {item.name}
          description = {item.description}
          handleClick = {this.handleItemClick}
         />
      </Column>
      <Column grid="2">
        <span><strong>{item.runtime_name}</strong></span>
      </Column>
      <Column grid="2">
        <span><strong>{item.id}</strong></span>
      </Column>
      <Column grid="2">
        <span><strong>{item.created_at}</strong></span>
      </Column>
    </Item>)

  },

  // Buttons
  handlePlusButton: function (action) {
      console.info('CodeBoxes::handlePlusButton');
      this.refs.addCodeBoxDialog.show();
  },

  getItems: function () {
    var items = [];
    if (this.state.CodeBoxList){
      items = Object.keys(this.state.CodeBoxList).map(function(key){
        return this.generateItem(this.state.CodeBoxList[key])
      }.bind(this));
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
    }
    if (items.length > 0) {
      return items;
    }
    return [<Item key="empty">Empty Item</Item>];
  },

  render: function () {

    var columns = [
      {'name': 'CodeBoxes', space: 1, style: {fontSize: '20px'}},
      {'name': '', space: 5},
      {'name': 'Runtime', space: 2},
      {'name': 'ID', space: 2},
      {'name': 'Created', space: 2},
    ];

    var items = this.getItems();

    return (
      <Container>
        <FabList
          style={{top: 200, display: this.state.checkedItemNumber ? 'block': 'none'}}>
          <FloatingActionButton
            label         = "Click here to delete CodeBox" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.handleDeleteButton}
            iconClassName = "md md-delete" />
          <FloatingActionButton
            label         = "Click here to edit Codebox" // TODO: extend component
            color         = "" // TODO: extend component
            secondary     = {true}
            mini          = {true}
            onClick       = {this.handleChangePaletteButton}
            iconClassName = "md md-edit" />
        </FabList>

        <FabList
          style={{bottom: 100}}>
          <FloatingActionButton
            label         = "Click here to add CodeBox" // TODO: extend component
            color         = "" // TODO: extend component
            onClick       = {this.handlePlusButton}
            iconClassName = "md md-add" />
        </FabList>

        <AddDialog ref="addCodeBoxDialog" />

        <ListContainer>
          <Header checkedItemsNumber={this.state.checkedItemNumber} columns={columns}>
          </Header>
          <List viewMode="stream">
            {items}
          </List>
        </ListContainer>
      </Container>
    );
  }

});