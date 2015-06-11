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
    mui       = require('material-ui'),
    Dialog    = mui.Dialog,
    Container = require('../../common/Container/Container.react'),
    FabList   = require('../../common/Fab/FabList.react'),

    // Local components
    InstancesList = require('./InstancesList.react'),
    AddDialog     = require('./InstancesAddDialog.react');


module.exports = React.createClass({

  displayName: 'Instances',

  mixins: [
    Reflux.connect(InstancesStore),
    ButtonActionMixin,
    HeaderMixin,
    Router.State,
    Router.Navigation,
    //React.addons.LinkedStateMixin,
    //ValidationMixin,
  ],

  componentWillMount: function() {
    console.info('Instances::componentWillMount');
    InstancesStore.refreshData();
  },

  componentDidMount: function() {
    if (this.getParams().action == 'add'){
      // Show Add modal
      this.refs.addInstancesDialog.show();
    }
  },

  // Breadcrumbs and tabs (HeaderMixin)
  headerBreadcrumbs: function () {
    return [{
      route: 'instances',
      label: 'Instances',
    }];
  },

  // Buttons ButtonActionMixin
  buttons: function () {
    return {
      plusButton: {
        name: "plusButton",
        label: "Click here to create CodeBox",
        icon: 'plus',
        color: 'red',
        action: this.handlePlusButton
      }
    }
  },

  handlePlusButton: function() {
    this.refs.addInstanceDialog.show();
  },

  // Lists
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

  render: function () {

    return (
      <Container>
        <FabList
          style={{list: {top: 200}}}
          buttons={[this.buttons().plusButton]}
          handleClick={this.handleButtonClick}
        />
        <AddDialog ref="addInstanceDialog"/>
        <InstancesList name="My instances" listType="myInstances" viewMode="stream"/>
        <InstancesList name="Other instances" listType="otherInstances" viewMode="stream"/>
      </Container>
    );
  }

});