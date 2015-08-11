let React = require('react'),
  classNames = require('classnames'),
  Moment = require('moment'),
  mui = require('material-ui'),

  FontIcon = mui.FontIcon,
  Dropdown = require('../Dropdown/Dropdown.react'),

  ButtonExpandToggle = require('../Button/ButtonExpandToggle.react'),

  ProgressBar = require('../ProgressBar/ProgressBar.react'),
  AvatarInitials = require('../AvatarInitials/AvatarInitials.react'),
  TraceResult = require('../Trace/TraceResult.react');

module.exports = React.createClass({

  displayName: 'ListColumnsItem',

  getInitialState: function() {
    return {
      animateInk: false,
    }
  },

  getDefaultProps: function() {
    return {
      color: "#0288D1"
    }
  },

  handleCardClick: function() {
    this.setState({animateInk: true});
    setTimeout(function() {
      this.props.handleClick(this.props.item);
    }.bind(this), 250)
  },

  handleItemHeaderClick: function() {
    this.props.handleClick(this.props.item);
  },

  toggleDropdownMenu: function() {
    ViewActions.showDropdown(this.props.item.uuid);
  },

  handleDropdownMenuItemClick: function(actionType) {
    if (actionType === "delete") {
      ViewActions.showModalConfirmDeleteResource(this.props.item);
    } else if (actionType === "edit") {
      ViewActions.showModalUpdateResource(this.props.item);
    } else if (actionType === "customize") {
      ViewActions.showModalCustomizeResource(this.props.item);
    } else if (actionType === "run") {
      ServerActions.runWebhook(this.props.item);
    }
  },

  render: function() {
    let color = {
      backgroundColor: this.props.color
    };
    let inkStyle = {
      height: "200px",
      width: "200px",
      top: "0px",
      left: "0px",
    };
    let contentType = this.props.list.contentType.split('_').join('-');
    let runtime = this.props.item.runtime_name;
    let status = this.props.item.status;
    let loading = this.props.item.loading;
    let cssClasses = classNames('list-item', 'list-item-' + contentType, {
      'animate-ink': this.state.animateInk,
      'card': true,
      'card-view-cards': this.props.list.viewMode === "cards",
      'list-item-card-view': this.props.list.viewMode === "cards",
      'list-item-no-color': !this.props.color,
      'list-item-stream-view': this.props.list.viewMode === "stream",
      'card-codebox-nodejs': runtime === "nodejs",
      'card-codebox-python': runtime === "python",
      'card-codebox-ruby': runtime === "ruby",
      'card-codebox-golang': runtime === "golang",
      'card-loading': loading,
      'card-expanded': this.props.expanded,
      'list-item-expanded': this.props.expanded,
      'card-trace-pending': status === "pending",
      'card-trace-failure': status === "failure",
      'card-trace-success': status === "success",
      'card-trace-timeout': status === "timeout",
    });
    if (this.state.animateInk) {
      inkStyle.top = "50px";
      inkStyle.left = "50px";
    }
    if (this.props.list.viewMode === "cards") {
      return (
        <div
          className={cssClasses}
          style={color}
          onClick={this.handleCardClick}>
          <div className="list-item-header card-header">
            <div className="list-item-details card-details">
              <div className="list-item-icon card-icon">
                <FonIcon className={this.props.icon}/>
              </div>
              <div className="list-item-text card-text">
                <div className="list-item-title card-title"><span>{this.props.title}</span></div>
                <div className="list-item-description card-description">{this.props.description}</div>
              </div>
            </div>
            <div
              className="ink"
              style={inkStyle}></div>
            <div className="list-item-extras card-extras">
              <Dropdown
                actions={this.props.actions}
                visible={this.props.dropdownVisible}
                toggleDropdownMenu={this.toggleDropdownMenu}
                handleClick={this.handleDropdownMenuItemClick}/>
            </div>
          </div>
        </div>
      );
    } else if (this.props.list.viewMode === "stream") {
      let traceResult = this.props.expanded ? <TraceResult result={this.props.item.data.result}/> : null;
      let initialsComponent = <AvatarInitials text={this.props.title}/>;
      let dropdownComponent = <Dropdown
        actions={this.props.actions}
        visible={this.props.dropdownVisible}
        toggleDropdownMenu={this.toggleDropdownMenu}
        handleClick={this.handleDropdownMenuItemClick}/>;
      let iconComponent = <FontIcon
        className={this.props.icon}
        style={color}/>;
      let avatar = contentType === "users" ? initialsComponent : iconComponent;
      let dropdown = this.props.actions.length > 0 ? dropdownComponent : null;
      let buttonExpandToggle = this.props.expandable ?
        <ButtonExpandToggle parentExpanded={this.props.expanded}/> : null;

      return (
        <div className={cssClasses}>
          <div
            className="list-item-header card-header"
            onClick={this.handleItemHeaderClick}>
            <div className="list-item-details card-details">
              <div className="list-item-icon card-icon">
                {avatar}
              </div>
              <div className="list-item-title card-title">{this.props.title}</div>
            </div>
            <div className="list-item-title card-id">{this.props.item.id}</div>
            <div
              ref="description"
              className="list-item-description card-description">{this.props.description}</div>
            <div className="list-item-highlight card-highlight"></div>
            <div className="list-item-extras card-extras">
              <div className="card-info-date">{this.props.info.created_at}</div>
              <div className="card-info-date">{this.props.info.updated_at}</div>
              {buttonExpandToggle}
            </div>
            <div className="card-dropdown">{dropdown}</div>
          </div>
          {traceResult}
        </div>
      );
    }
  }
});