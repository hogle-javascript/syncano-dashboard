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
    mui              = require('material-ui'),
    Dialog           = mui.Dialog,
    Container        = require('../../common/Container/Container.react'),
    ListContainer    = require('../../common/Lists/ListContainer.react'),
    Item             = require('../../common/ColumnList/Item.react'),
    Column           = require('../../common/ColumnList/ItemColumn.react'),
    Header           = require('../../common/ColumnList/Header.react'),
    ColNameDesc      = require('../../common/ColumnList/ColNameDesc.react'),
    FabList          = require('../../common/Fab/FabList.react'),


    AddDialog        = require('./CodeBoxesAddDialog.react');


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
   return [{
      route: 'instances',
      label: 'Instances',
      params: {instanceName: this.getParams().instanceName}
    },{
      route: 'instance',
      label: this.getParams().instanceName,
      params: {instanceName: this.getParams().instanceName}
    },{
      route: 'codeboxes',
      label: 'Codeboxes',
      params: {instanceName: this.getParams().instanceName}
    }]
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
          id          = "some_id1"
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

  buttonClick: function (action) {
      console.info('CodeBoxes::buttonClick');
      this.refs.addCodeBoxDialog.show();
  },

  genFabButtons: function() {

    var buttons = [
      {
        name: "plusButton",
        label: "Click here to create CodeBox",
        icon: 'plus',
        color: 'red',
      }
    ];
    return <FabList buttons={buttons} handleClick={this.buttonClick}/>;
  },

  getItems: function () {
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
        {this.genFabButtons()}
        <AddDialog ref="addCodeBoxDialog"/>
        <ListContainer>
          <Header checkedItemsNumber={this.state.checkedItemNumber} columns={columns}>
            <MaterialIcon name="group_add" handleClick={this.dummyClick}/>
            <MaterialIcon name="home" handleClick={this.dummyClick}/>
          </Header>
          <List viewMode="stream">
            {items}
          </List>
        </ListContainer>
      </Container>
    );
  }

});