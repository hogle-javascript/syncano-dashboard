var React = require('react');

var InstancesAppStore = require('./store');
var InstancesAppActions = require('./actions');

var Header = require('../Header/Header.react');

var Lists = require('../../common/Lists/Lists.react');
var FABList = require('../../common/Fab/FabList.react');

//var ListWithOptions = require('../../common/Lists/ListWithOptions.react');
var InstancesListWithHeader = require('./InstancesListWithHeader.react');


module.exports = React.createClass({

  displayName: 'InstancesView',

  getInitialState: function () {
    return {
      myInstances: [],
      otherInstances: [],
      //myInstances: InstanceStore._getMyInstances(),
      //myInstancesViewMode: InstanceStore._getMyInstancesViewMode(),
      //myInstancesSortMode: InstanceStore._getMyInstancesSortMode(),
      //
      //otherInstances: InstanceStore._getOtherInstances(),
      //otherInstancesViewMode: InstanceStore._getOtherInstancesViewMode(),
      //otherInstancesSortMode: InstanceStore._getOtherInstancesSortMode(),
    }
  },

  componentWillMount: function () {
    //InstancesAppStore.addChangeListener(this.onChange);
    InstancesAppActions.getInstances();
  },

  componentDidMount: function () {
    InstancesAppStore.addChangeListener(this.onChange);
    //InstancesAppActions.getInstances();
  },

  componentWillUnmount: function () {
    //InstancesAppStore.removeChangeListener(this.onChange)
  },


  handleFABClick: function (buttonName) {
    if (buttonName === "create") {
      ViewActions.showModalCreateResource('instance');
    }
  },

  onChange: function () {
    console.log('onChange InstancesApp');
    this.setState({
      myInstances: InstancesAppStore.getInstances(),
      otherInstances: InstancesAppStore.getInstances('other'),
    });
  },

  filterEmptyLists: function (listOfLists) {
    return listOfLists.filter(function (list, i) {
      if (!list.hideEmpty) {
        return true;
      } else {
        return list.data.length > 0;
      }
    })
  },

  handleHeaderMenuClick: function (action) {
    console.log("InstanceView handleHeaderMenuClick", action)
  },

  handleItemMenuClick: function (action) {
    console.log("InstanceView handleItemMenuClick", action)
  },


  render: function () {

    // Instances View Buttons
    var buttons = [{
      name: "create",
      primary: true,
      displayName: "Create an instance",
      icon: "plus",
    }];

    // Lists on the View
    var myInstancesLists = {
      heading: "My instances",
      uuid: "myInstances",
      contentType: "instances",
      //viewMode: this.state.myInstancesViewMode,
      viewMode: 'stream',
      avatarStyle: 'icon',
      //sortMode: this.state.myInstancesSortMode,
      //data: this.state.myInstances,
      data: this.state.myInstances,

      emptyText: "There are no Instances here. Click here to generate one.",
      emptyIcon: "vpn-key",

      //itemConfig: {
      //  ''
      //},

      actions: [{
        displayName: 'Sort by name',
        name: 'sortByName',
      }, {
        displayName: 'Sort by date',
        name: 'sortByDate',
      }, {
        displayName: 'Switch to list view',
        name: 'switchToListView',
        iconType: 'view-stream',
      }, {
        displayName: 'Switch to card view',
        name: 'switchToCardView',
        iconType: 'view-module',
      }]
    };

    var otherInstancesList = {
      heading: "Instances I belong to",
      uuid: "otherInstances",
      contentType: "instances",
      viewMode: 'stream',
      //sortMode: this.state.otherInstancesSortMode,
      data: this.state.otherInstances,
      avatarStyle: 'icon',
      //hideEmpty: true,
      actions: [{
        displayName: 'Sort by name',
        name: 'sortByName',
      }, {
        displayName: 'Sort by date',
        name: 'sortByDate',
      }, {
        displayName: 'Switch to list view',
        name: 'switchToListView',
        iconType: 'view-stream',
      }, {
        displayName: 'Switch to card view',
        name: 'switchToCardView',
        iconType: 'view-module',
      }]
    };


    var Lists = this.filterEmptyLists([myInstancesLists, otherInstancesList]);

    var ListsToShow = Lists.map(function (list, i) {
      return <InstancesListWithHeader
        key={i}
        list={list}
        handleHeaderMenuClick={this.handleHeaderMenuClick}
        handleItemMenuClick={this.handleItemMenuClick}
        />
    }.bind(this));


    console.log('ListsToShow', ListsToShow);

    return (
      <div className="content-group">
        <div className="lists-group">
          {ListsToShow}
        </div>
        <FABList {...this.props} buttons={buttons} handleFABClick={this.handleFABClick}/>
      </div>
    );
  }

});