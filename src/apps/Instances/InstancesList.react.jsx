var React = require('react');
var Moment = require('moment');
var classNames = require('classnames');

var ListItem = require('./InstancesListItem.react');
//var ListItemColumns = require('./ListItemColumns.react');
var ListItemEmpty = require('../../common/Lists/ListItemEmpty.react');


module.exports = React.createClass({

  displayName: 'List',

  propTypes: {
    list: React.PropTypes.object.isRequired,
    handleItemMenuClick: React.PropTypes.func.isRequired,
  },

  getDefaultProps: function () {
    return {
      data: []
    }
  },

  handleClick: function (item) {
    //var instanceName = InstanceStore.getRouteParams().instanceName;
    //if (this.props.list.contentType === "instances") {
    //  window.location.href = '#instances/' + item.id;
    //} else if (this.props.list.contentType === "codeboxes") {
    //  window.location.href = '#instances/' + instanceName + '/codeboxes/' + item.id;
    //} else if (this.props.list.contentType === "triggers") {
    //  window.location.href = '#instances/' + instanceName + '/triggers/' + item.id;
    //} else if (this.props.list.contentType === "schedules") {
    //  window.location.href = '#instances/' + instanceName + '/schedules/' + item.id;
    //} else if (this.props.list.contentType === "webhooks") {
    //  window.location.href = '#instances/' + instanceName + '/webhooks/' + item.id;
    //} else if (this.props.list.contentType === "traces") {
    //  ViewActions.expandListItem(item);
    //}
  },

  //getCodeBoxName: function (item) {
  //  var codeBoxes = InstanceStore._getCodeBoxes();
  //  var codeBoxName;
  //  codeBoxes.forEach(function (codeBox) {
  //    if (codeBox.id === item.data.codebox) {
  //      codeBoxName = codeBox.data.name
  //    }
  //  });
  //  return codeBoxName;
  //},

  handleItemMenuClick: function (action) {
    // We need to add here information about list we are sorting/changing/view etc.
    action['list'] = this.props.list.uuid;
    this.props.handleItemMenuClick(action);
  },

  render: function () {

    console.log('Rendering InstanceList');


    var list = this.props.list;
    var data = list.data;

    var expandable;
    var expanded;
    var color;
    var info;


    //var config = ConfigStore.getConfig();
    var contentType = this.props.list.contentType;

    //var view = ViewsStore.getView(contentType);
    //var icon = view.icon;


    console.log('Number of items', data.length);

    var items = [];
    if (data.length > 0) {
      console.log('Iterate over items', data);
      items = Object.keys(data).map(function (item, i) {
        return (<ListItem
          key={i}
          item={data[item]}
          actions={list.actions}
          handleItemMenuClick={this.handleItemMenuClick}
          style={list.viewMode}
          avatarStyle={this.props.list.avatarStyle}/>)
      }.bind(this));
    } else if (data.length === 0) {
      items = (<ListItemEmpty icon={this.props.list.emptyIcon}
                              text={this.props.list.emptyText}/>)
    }


    var cssClasses = classNames('list', 'items-list', 'view-' + list.viewMode);

    console.log("List items", items);
    return (
      <div className={cssClasses}>
        {items}
      </div>
    );
  }

});