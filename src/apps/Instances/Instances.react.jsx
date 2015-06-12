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

  // Buttons
  handlePlusButton: function() {
    this.refs.addInstanceDialog.show();
  },

  handleDeleteButton: function() {
    this.refs.addInstanceDialog.show();
  },

  handleChangePaletteButton: function() {
    this.refs.pickColorIconDialog.show();
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

        <AddDialog ref="addInstanceDialog"/>

        <ColorIconPickerDialog
          ref="pickColorIconDialog"
          initialColor={singleItemColor}
          initialIcon={singleItemIcon}
          handleClick={this.handleChangePalette}/>

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