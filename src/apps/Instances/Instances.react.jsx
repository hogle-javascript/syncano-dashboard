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
    mui                   = require('material-ui'),
    FloatingActionButton  = mui.FloatingActionButton,
    Dialog                = mui.Dialog,
    Container             = require('../../common/Container/Container.react'),
    FabList               = require('../../common/Fab/FabList.react'),
    ColorIconPickerDialog = require('../../common/ColorIconPicker/ColorIconPickerDialog.react'),

    // Local components
    InstancesList = require('./InstancesList.react'),
    AddDialog     = require('./InstancesAddDialog.react');


module.exports = React.createClass({

  displayName: 'Instances',

  mixins: [
    Reflux.connect(InstancesStore),
    HeaderMixin,
    Router.State,
    Router.Navigation,
    //React.addons.LinkedStateMixin,
    //ValidationMixin,
  ],

  componentWillMount: function() {
    console.info('Instances::componentWillMount');
    SessionStore.clearInstance();
    InstancesStore.refreshData();
  },

  componentDidMount: function() {
    console.info('Instances::componentDidMount');
    if (this.getParams().action == 'add'){
      // Show Add modal
      this.refs.addInstancesDialog.show();
    }
  },

  componentWillUpdate: function(nextProps, nextState) {
    console.info('Instances::componentWillUpdate');
    if (nextState.hideDialogs) {
      this.refs.addInstanceDialog.dismiss();
      this.refs.editInstanceDialog.dismiss();
    }
  },

  // Breadcrumbs and tabs (HeaderMixin)
  headerBreadcrumbs: function () {
    return [{
      route: 'instances',
      label: 'Instances',
    }];
  },

  headerMenuItems: function () {
    return [
      {
        label: 'Instances',
        route: 'instances',
      }, {
        label: 'Solutions',
        route: 'dashboard',
      }];
  },

  // Buttons
  handlePlusButton: function() {
    this.refs.addInstanceDialog.show();
    //this.setState({addDialog: true});
  },

  handleDeleteButton: function() {
    this.refs.addInstanceDialog.show();
  },

  handleChangePaletteButton: function() {
    this.refs.pickColorIconDialog.show();
  },

  handleEditButton: function() {
    var checkedItem = InstancesStore.getCheckedItem();
    this.setState({
      initialEditValues: {
        name: checkedItem.name,
        description: checkedItem.description}
    })
    this.refs.editInstanceDialog.show();
  },

  handleChangePalette: function (color, icon) {
    console.info('Instances::handleChangePalette', color, icon);

    InstancesActions.updateInstance(
      InstancesStore.getCheckedItem().name, {
        metadata: JSON.stringify({
          color: color,
          icon: icon
        })
      }
    );
    InstancesActions.uncheckAll()
  },

  handleItemClick: function(instanceName) {
    // Redirect to main instance screen
    SessionActions.setInstance(instanceName);
    this.transitionTo('instance', {instanceName: instanceName});
  },

  render: function () {
    var singleItem = InstancesStore.getCheckedItem(),
        singleItemColor = null,
        singleItemIcon = null;

    if (singleItem) {
      singleItemColor = singleItem.metadata.color;
      singleItemIcon = singleItem.metadata.icon;
    }

    return (
      <Container>
        <AddDialog mode="add" ref="addInstanceDialog"/>
        <AddDialog mode="edit" initialValues={this.state.initialEditValues} ref="editInstanceDialog"/>
        <ColorIconPickerDialog
          ref="pickColorIconDialog"
          initialColor={singleItemColor}
          initialIcon={singleItemIcon}
          handleClick={this.handleChangePalette}/>

        <FabList
          style={{top: 200, display: this.state.checkedInstances ? 'block': 'none'}}>

          <FloatingActionButton
            label         = "Click here to unselect Instances" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {InstancesActions.uncheckAll}
            iconClassName = "synicon-checkbox-multiple-marked-outline" />

          <FloatingActionButton
            label         = "Click here to delete Instances" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.handleDeleteButton}
            iconClassName = "synicon-delete" />
          <FloatingActionButton
            label         = "Click here to edit Instance" // TODO: extend component
            color         = "" // TODO: extend component
            mini          = {true}
            onClick       = {this.handleEditButton}
            iconClassName = "synicon-pencil" />

          <FloatingActionButton
            label         = "Click here to customize Instances" // TODO: extend component
            color         = "" // TODO: extend component
            secondary     = {true}
            mini          = {true}
            disabled      = {this.state.checkedInstances > 1}
            onClick       = {this.handleChangePaletteButton}
            iconClassName = "synicon-palette" />

        </FabList>

        <FabList
          style={{bottom: 100}}>
          <FloatingActionButton
            label         = "Click here to add Instances" // TODO: extend component
            color         = "" // TODO: extend component
            onClick       = {this.handlePlusButton}
            iconClassName = "synicon-plus" />
        </FabList>

        <InstancesList
          name                = "My instances"
          listType            = "myInstances"
          viewMode            = "stream" />

        <InstancesList
          name                = "Other instances"
          listType            = "otherInstances"
          viewMode            = "stream" />

      </Container>
    );
  }

});