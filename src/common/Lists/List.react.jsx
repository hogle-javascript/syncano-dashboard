var React           = require('react');
var Moment          = require('moment');
var classNames      = require('classnames');

var ListItem        = require('./ListItem.react');
var ListItemColumns = require('./ListItemColumns.react');
var ListItemEmpty   = require('./ListItemEmpty.react');

//var InstanceStore   = require('../stores/InstanceStore');
//var ConfigStore     = require('../stores/ConfigStore');
//var ViewsStore      = require('../stores/ViewsStore');
//var ViewActions     = require('../actions/ViewActions');

module.exports = React.createClass({

  displayName: 'List',

  getDefaultProps: function() {
    return {
      data: []
    }
  },

  handleClick: function(item) {
    var instanceName = InstanceStore.getRouteParams().instanceName;
    if (this.props.list.contentType === "instances") {
      window.location.href = '#instances/' + item.id;
    } else if (this.props.list.contentType === "codeboxes") {
      window.location.href = '#instances/' + instanceName + '/codeboxes/' + item.id;
    } else if (this.props.list.contentType === "triggers") {
      window.location.href = '#instances/' + instanceName + '/triggers/' + item.id;
    } else if (this.props.list.contentType === "schedules") {
      window.location.href = '#instances/' + instanceName + '/schedules/' + item.id;
    } else if (this.props.list.contentType === "webhooks") {
      window.location.href = '#instances/' + instanceName + '/webhooks/' + item.id;
    } else if (this.props.list.contentType === "traces") {
      ViewActions.expandListItem(item);
    }
  },

  getCodeBoxName: function(item) {
    var codeBoxes = InstanceStore._getCodeBoxes();
    var codeBoxName;
    codeBoxes.forEach(function(codeBox){
      if (codeBox.id === item.data.codebox) {
        codeBoxName = codeBox.data.name
      }
    });
    return codeBoxName;
  },

  render: function() {
    var expandable;
    var expanded;
    var color;
    var info;
    var items;
    //var config = ConfigStore.getConfig();
    var contentType = this.props.list.contentType;
    //var view = ViewsStore.getView(contentType);
    //var icon = view.icon;
    if (this.props.data.length > 0 && !this.props.appLoading) {
      items = this.props.data.map(function(item, i) {
        var dropdownVisible = this.props.dropdown === item.uuid;
        //var actions = config[item.type].actions;
        var action = [];
        var data = item.data;
        if (contentType === "instances") {
          info = "Updated " + Moment(data.updated_at).fromNow();
          return <ListItem {...this.props} key={i} item={item} color={data.metadata.color || '#e2e2e2'} icon={data.metadata.icon} title={item.id} description={data.description} info={info} actions={actions} dropdownVisible={dropdownVisible} handleClick={this.handleClick}/>;

        } else if (contentType === "classes") {
          info = {
            created_at: Moment(data.created_at).format('DD.MM.YYYY, h:mm:ss A'),
            updated_at: "Updated " + Moment(data.updated_at).format('DD.MM.YYYY, h:mm:ss A'),
          };
          return <ListItemColumns {...this.props} key={i} item={item} color={data.metadata.color || '#e2e2e2'} icon={data.metadata.icon} title={item.id} description={data.description} info={info} actions={actions} dropdownVisible={dropdownVisible} handleClick={this.handleClick}/>;

        } else if (contentType === "api_keys") {
          info = "Updated " + Moment(data.updated_at).fromNow();
          return <ListItem {...this.props} key={i} item={item} icon={icon} title={data.api_key} description={data.description} info={info} actions={actions} dropdownVisible={dropdownVisible} handleClick={this.handleClick}/>;

        } else if (contentType === "admins") {
          info = "Role " + data.role.toUpperCase();
          return <ListItem {...this.props} key={i} item={item} icon={icon} title={data.email} info={info} actions={actions} dropdownVisible={dropdownVisible} handleClick={this.handleClick}/>;

        } else if (contentType === "invitations") {
          info = "Created " + Moment(data.created_at).fromNow();
          return <ListItem {...this.props} key={i} item={item} icon={icon} title={data.email} info={info} actions={actions} dropdownVisible={dropdownVisible} handleClick={this.handleClick}/>;

        } else if (contentType === "users") {
          return <ListItem {...this.props} key={i} item={item} title={data.username} actions={actions} dropdownVisible={dropdownVisible} handleClick={this.handleClick}/>;

        } else if (contentType === "codeboxes") {
          info = {
            created_at: Moment(data.created_at).format('DD.MM.YYYY, h:mm:ss A'),
            updated_at: "Updated " + Moment(data.updated_at).format('DD.MM.YYYY, h:mm:ss A'),
          };
          return <ListItemColumns {...this.props} key={i} item={item} icon={data.runtime_name} title={data.name} info={info} description={data.description} actions={actions} dropdownVisible={dropdownVisible} handleClick={this.handleClick}/>;
        } else if (contentType === "webhooks") {
          var codeBoxName = this.getCodeBoxName(item);
          return <ListItem {...this.props} key={i} item={item} icon={icon} title={data.slug} description={codeBoxName} actions={actions} dropdownVisible={dropdownVisible} handleClick={this.handleClick}/>;

        } else if (contentType === "triggers") {
          info = "Updated " + Moment(data.updated_at).fromNow();
          return <ListItem {...this.props} key={i} item={item} icon={icon} title={data.name} info={info} description={data.signal} actions={actions} dropdownVisible={dropdownVisible} handleClick={this.handleClick}/>;

        } else if (contentType === "schedules") {
          info = "Created " + Moment(data.created_at).fromNow();
          return <ListItem {...this.props} key={i} item={item} icon={icon} title={data.name} info={info} description={data.crontab} actions={actions} dropdownVisible={dropdownVisible} handleClick={this.handleClick}/>;

        } else if (contentType === "traces") {
          info = "Executed at " + Moment(data.created_at).format('MMMM Do YYYY, h:mm:ss a');
          if (data.status === "success") {
            icon = "done";
            color = "#4CAF50";
            expandable = true;
          } else if (data.status === "failure") {
            icon = "close";
            color = "#EF5350";
            expandable = true;
          } else if (data.status === "pending") {
            icon = "sync";
            color = "#03A9F4";
          } else if (data.status === "timeout") {
            icon = "sync-problem";
            color = "#FFA726";
          }
          expanded = this.props.list.expandedItemId === item.uuid && expandable;
          return <ListItem {...this.props} key={i} item={item} icon={icon} color={color} title={data.status} info={info} description={data.duration + "ms"} actions={actions} expandable={expandable} expanded={expanded} dropdownVisible={dropdownVisible} handleClick={this.handleClick}/>;
        }
      }.bind(this));
    } else if (this.props.data.length === 0 && !this.props.appLoading) {
      items = <ListItemEmpty {...this.props} icon={this.props.list.emptyIcon} text={this.props.list.emptyText} />
    }
    var cssClasses = classNames('list', 'items-list', 'view-' + this.props.list.viewMode);
    return (
      <div className={cssClasses}>
        {items}
      </div>
    );
  }

});