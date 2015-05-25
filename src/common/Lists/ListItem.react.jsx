var React              = require('react');
var classNames         = require('classnames');
var Moment             = require('moment');

//var ViewActions        = require('../actions/ViewActions');
//var ServerActions      = require('../actions/ServerActions');

var Constants          = require('../../constants/Constants');

var Icon               = require('../Icon/Icon.react');
var ButtonExpandToggle = require('../Button/ButtonExpandToggle.react');
var Dropdown           = require('../Dropdown/Dropdown.react');
var ProgressBar        = require('../ProgressBar/ProgressBar.react');
var AvatarInitials     = require('../AvatarInitials/AvatarInitials.react');
var TraceResult        = require('../Trace/TraceResult.react');

require('./Card.css');

module.exports = React.createClass({

  displayName: 'ListItem',

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
    setTimeout(function(){
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

    var color = {
      backgroundColor: this.props.color
    };
    var inkStyle = {
      height: "200px",
      width: "200px",
      top: "0px",
      left: "0px",
    };
    var contentType = this.props.list.contentType.split('_').join('-');
    var runtime     = this.props.item.runtime_name;
    var status      = this.props.item.status;
    var loading     = this.props.item.loading;
    var cssClasses  = classNames('list-item', 'list-item-' + contentType, {
      'animate-ink'            : this.state.animateInk,
      'card'                   : true,
      'card-view-cards'        : this.props.list.viewMode === "cards",
      'list-item-card-view'    : this.props.list.viewMode === "cards",
      'list-item-no-color'     : !this.props.color,
      'list-item-stream-view'  : this.props.list.viewMode === "stream",
      'card-codebox-nodejs'    : runtime === "nodejs",
      'card-codebox-python'    : runtime === "python",
      'card-codebox-ruby'      : runtime === "ruby",
      'card-codebox-golang'    : runtime === "golang",
      'card-loading'           : loading,
      'card-expanded'          : this.props.expanded,
      'list-item-expanded'     : this.props.expanded,
      'card-trace-pending'     : status === "pending",
      'card-trace-failure'     : status === "failure",
      'card-trace-success'     : status === "success",
      'card-trace-timeout'     : status === "timeout",
    });
    if (this.state.animateInk) {
      inkStyle['top'] = "50px";
      inkStyle['left'] = "50px";
    }


    if (this.props.list.viewMode === "cards") {
      return (
        <div className={cssClasses} style={color} onClick={this.handleCardClick}>
          <div className="list-item-header card-header">
            <div className="list-item-details card-details">
              <div className="list-item-icon card-icon">
                <Icon icon={this.props.icon} />
              </div>
              <div className="list-item-text card-text">
                <div className="list-item-title card-title"><span>{this.props.title}</span></div>
                <div className="list-item-description card-description">{this.props.description}</div>
              </div>
            </div>
            <div className="ink" style={inkStyle}></div>
            <div className="list-item-extras card-extras">
              <Dropdown actions={this.props.actions} visible={this.props.dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick} />
            </div>
          </div>
        </div>
      );
    } else if (this.props.list.viewMode === "stream") {
      var traceResult = this.props.expanded ? <TraceResult result={this.props.item.data.result} /> : null;
      var initialsComponent = <AvatarInitials text={this.props.title} />;
      var dropdownComponent = <Dropdown actions={this.props.actions} visible={this.props.dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick} />;
      var iconComponent = <Icon icon={this.props.icon} style={color} />;
      var avatar = contentType === "users" ? initialsComponent : iconComponent;
      var dropdown = this.props.actions.length > 0 ? dropdownComponent : null;
      var buttonExpandToggle = this.props.expandable ? <ButtonExpandToggle parentExpanded={this.props.expanded} /> : null;
      return (
        <div className={cssClasses}>
          <div className="list-item-header card-header" onClick={this.handleItemHeaderClick}>
            <div className="list-item-details card-details-other">
              <div className="list-item-icon card-icon">
                {avatar}
              </div>
              <div className="list-item-text card-text-other">
                <div className="list-item-title card-title"><span>{this.props.title}</span></div>
                <div className="list-item-description card-description-other">{this.props.description}</div>
              </div>
            </div>
            <div className="list-item-highlight card-highlight"></div>
            <div className="list-item-extras card-other-extras">
              <div className="card-info">{this.props.info}</div>
              {buttonExpandToggle}
              <div className="card-dropdown">{dropdown}</div>
            </div>
          </div>
          {traceResult}
        </div>
      );
    }

    // if (this.props.item.expanded && this.props.list.contentType === "traces") {
    //   if (this.props.item.args && this.props.item.meta) {
    //     return (
    //       <div className={cssClasses} onClick={this.handleClick}>
    //         <div className="list-item-header card-header">
    //           <div className="list-item-details card-details">
    //             <div className="card-icon">
    //               <Icon type={this.props.item.icon} style={this.props.item.iconColor}/>
    //             </div>
    //             <div className="list-item-text card-text">
    //               <div className="list-item-title card-title"><span onClick={this.handleTitleClick} >{this.props.item.title}</span></div>
    //               <div className="list-item-description card-description">{this.props.item.description}</div>
    //             </div>
    //           </div>
    //           <div className="card-highlight"></div>
    //           <div className="list-item-extras card-extras">
    //             <div className="card-info">{this.props.item.info}</div>
    //             {dropdown}
    //           </div>
    //         </div>
    //         <div className="card-body">
    //           <TraceResultView args={this.props.item.args} meta={this.props.item.meta} result={this.props.item.result} />
    //         </div>
    //         <ProgressBar />
    //       </div>
    //     );
    //   } else {
    //     return (
    //       <div className={cssClasses} onClick={this.handleClick}>
    //         <div className="list-item-header card-header">
    //           <div className="list-item-details card-details">
    //             <div className="card-icon">
    //               <Icon type={this.props.item.icon} style={this.props.item.iconColor} />
    //             </div>
    //             <div className="list-item-text card-text">
    //               <div className="list-item-title card-title"><span onClick={this.handleTitleClick}>{this.props.item.title}</span></div>
    //               <div className="list-item-description card-description">{this.props.item.description}</div>
    //             </div>
    //           </div>
    //           <div className="card-highlight"></div>
    //           <div className="list-item-extras card-extras">
    //             <div className="card-info">{this.props.item.info}</div>
    //             {dropdown}
    //           </div>
    //         </div>
    //         <div className="card-body">
    //           <TraceResultView result={this.props.item.result} />
    //         </div>
    //         <ProgressBar />
    //       </div>
    //     );
    //   }
    // }
  }
});