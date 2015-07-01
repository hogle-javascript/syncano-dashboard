var React      = require('react'),
    Moment     = require('moment'),
    classNames = require('classnames'),
    mui        = require('material-ui'),

    FontIcon   = mui.FontIcon,
    Dropdown   = require('../../common/Dropdown/Dropdown.react');


require('../../common/Lists/Card.css');

module.exports = React.createClass({

  displayName: 'InstancesListItem',


  propTypes: {
    // Click on item's option from dropdown
    handleItemMenuClick: React.PropTypes.func.isRequired,
    item: React.PropTypes.object.isRequired,
    style: React.PropTypes.oneOf(['stream', 'cards']),
    dropdownVisible: React.PropTypes.bool,
    avatarStyle: React.PropTypes.oneOf(['user', 'icon']),
  },

  getInitialState: function () {
    return {
      animateInk: false,
      dropdownViable: this.props.dropdownViable || false,
    }
  },


  handleItemMenuClick: function (action) {
    // We need to add here information about *item*
    action['item'] = this.props.item;
    this.props.handleItemMenuClick(action);
  },

  //handleDropdownMenuItemClick: function (actionType) {
  //  //if (actionType === "delete") {
  //  //  ViewActions.showModalConfirmDeleteResource(this.props.item);
  //  //} else if (actionType === "edit") {
  //  //  ViewActions.showModalUpdateResource(this.props.item);
  //  //} else if (actionType === "customize") {
  //  //  ViewActions.showModalCustomizeResource(this.props.item);
  //  //} else if (actionType === "run") {
  //  //  ServerActions.runWebhook(this.props.item);
  //  //}
  //},

  render: function () {

    console.log('Rendering List element');

    var item = this.props.item;


    var color = item.metadata.color || '#e2e2e2';


    var icon = item.metadata.icon;
    var info = "Updated " + Moment(item.updated_at).fromNow();

    var inkStyle = {
      height: "200px",
      width: "200px",
      top: "0px",
      left: "0px",
    };

    var cssClasses = classNames('list-item', 'list-item-' + this.props.style, {
      'animate-ink': this.state.animateInk,
      'card': true,
      'card-view-cards': this.props.style === "cards",
      'list-item-card-view': this.props.style === "cards",
      'list-item-no-color': !this.props.color,
      'list-item-stream-view': this.props.style === "stream",
      //'card-codebox-nodejs'    : runtime === "nodejs",
      //'card-codebox-python'    : runtime === "python",
      //'card-codebox-ruby'      : runtime === "ruby",
      //'card-codebox-golang'    : runtime === "golang",
      //'card-loading': loading,
      //'card-expanded': this.props.expanded,
      //'list-item-expanded': this.props.expanded,
      //'card-trace-pending'     : status === "pending",
      //'card-trace-failure'     : status === "failure",
      //'card-trace-success'     : status === "success",
      //'card-trace-timeout'     : status === "timeout",
    });

    console.log("5");

    if (this.state.animateInk) {
      inkStyle['top'] = "50px";
      inkStyle['left'] = "50px";
    }

    //debugger;

    if (this.props.style === "cards") {

      var styles = {
        backgroundColor: color
      };

      return (
        <div
          className = {cssClasses}
          style     = {styles}
          onClick   = {this.handleCardClick}>

          <div className="list-item-header card-header">
            <div className="list-item-details card-details">
              <div className="list-item-icon card-icon">
                <FontIcon className={icon}/>
              </div>
              <div className="list-item-text card-text">
                <div className="list-item-title card-title"><span>{this.props.item.name}</span></div>
                <div className="list-item-description card-description">{this.props.item.description}</div>
              </div>
            </div>
            <div
              className = "ink"
              style     = {inkStyle}></div>
            <div className="list-item-extras card-extras">
              <Dropdown
                actions         = {this.props.actions}
                handleItemClick = {this.handleItemMenuClick}/>
            </div>
          </div>
        </div>
      );
    } else if (this.props.style === "stream") {

      var iconStyle = {
        width: '45px',
        height: '45px',
        'border-radius': '50%',
        fill: '#fff',
        padding: '9px',
        backgroundColor: color
      };

      //var trac  eResult = this.props.expanded ? <TraceResult result={this.props.item.data.result}/> : null;

      var dropdown = <Dropdown actions         = {this.props.actions}
                               visible         = {this.props.dropdownVisible}
                               handleItemClick = {this.handleItemMenuClick}/>;

      //toggleDropdownMenu={this.toggleDropdownMenu}


      var avatar;
      console.log('avatarStyle', this.props.avatarStyle);
      if (this.props.avatarStyle === "user") {
        console.log('avatarStyle', this.props.avatarStyle);
        avatar = <AvatarInitials text={this.props.item.name}/>;
      } else {
        avatar = <FontIcon
                   className = {icon}
                   style     = {iconStyle}/>;
      }

      console.log('avatarStyle', this.props.avatarStyle);
      //debugger;

      //var dropdown = this.props.actions.length > 0 ? dropdownComponent : null;
      //var dropdown = null;


      //var buttonExpandToggle = this.props.expandable ? <ButtonExpandToggle parentExpanded={this.props.expanded}/> : null;

      var traceResult = [];
      var buttonExpandToggle = [];

      return (
        <div className={cssClasses}>
          <div
            className = "list-item-header card-header"
            onClick   = {this.handleItemHeaderClick}>
            <div className="list-item-details card-details-other">
              <div className="list-item-icon card-icon">
                {avatar}
              </div>
              <div className="list-item-text card-text-other">
                <div className="list-item-title card-title"><span>{this.props.item.name}</span></div>
                <div className="list-item-description card-description-other">{this.props.item.description}</div>
              </div>
            </div>
            <div className="list-item-highlight card-highlight"></div>
            <div className="list-item-extras card-other-extras">
              <div className="card-info">{info}</div>
              {buttonExpandToggle}
              <div className="card-dropdown">{dropdown}</div>
            </div>
          </div>
          {traceResult}
        </div>
      );
    }


  }
});

//            <Dropdown actions={this.props.actions} visible={this.props.dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick}/>


//var React              = require('react');
//var classNames         = require('classnames');
//var Moment             = require('moment');
//
////var ViewActions        = require('../actions/ViewActions');
////var ServerActions      = require('../actions/ServerActions');
//
////var Constants          = require('../../constants/Constants');
////
////var Icon               = require('../../common/Icon/Icon.react');
////var ButtonExpandToggle = require('../../common/Button/ButtonExpandToggle.react');
////var Dropdown           = require('../../common/Dropdown/Dropdown.react');
////var ProgressBar        = require('../../common/ProgressBar/ProgressBar.react');
////var AvatarInitials     = require('../../common/AvatarInitials/AvatarInitials.react');
////var TraceResult        = require('../../common/Trace/TraceResult.react');
//
////require('../../common/Lists/Card.css');
//
//module.exports = React.createClass({
//
//  displayName: 'InstancesListItem',
//
//  //propTypes: {
//  //  handleClick: React.PropTypes.func.isRequired,
//  //  item: React.PropTypes.object.isRequired,
//  //},
//
//  getInitialState: function() {
//    //return {
//    //  animateInk: false,
//    //  title: this.props.item.id,
//    //}
//  },
//
//  getDefaultProps: function() {
//    //return {
//    //  color: "#0288D1"
//    //}
//  },
//
//  handleCardClick: function() {
//    //this.setState({animateInk: true});
//    //setTimeout(function(){
//    //  this.props.handleClick(this.props.item);
//    //}.bind(this), 250)
//  },
//
//  handleItemHeaderClick: function() {
//    //this.props.handleClick(this.props.item);
//  },
//
//  toggleDropdownMenu: function() {
//    //ViewActions.showDropdown(this.props.item.uuid);
//  },
//
//  handleDropdownMenuItemClick: function(actionType) {
//    //if (actionType === "delete") {
//    //  ViewActions.showModalConfirmDeleteResource(this.props.item);
//    //} else if (actionType === "edit") {
//    //  ViewActions.showModalUpdateResource(this.props.item);
//    //} else if (actionType === "customize") {
//    //  ViewActions.showModalCustomizeResource(this.props.item);
//    //} else if (actionType === "run") {
//    //  ServerActions.runWebhook(this.props.item);
//    //}
//  },
//
//  render: function() {
//
//    console.log('Rendering InstanceListItem');
//
//    return (
//      <div className="list-item list-item-empty">
//        <div className="card-header">
//          <div className="list-item-details card-details">
//            <div className="list-item-icon card-icon">
//            </div>
//            <div className="list-item-text card-text">
//              <div className="list-item-title card-title"><span>XXXXX</span></div>
//              <div className="list-item-description card-description"></div>
//            </div>
//          </div>
//        </div>
//      </div>
//    );
//
//    //var item = this.props.item;
//    //var data = item.data;
//    //var color = { backgroundColor: data.metadata.color || '#e2e2e2' };
//    //var icon = data.metadata.icon;
//    //var info = "Updated " + Moment(data.updated_at).fromNow();
//    //
//    //var inkStyle = {
//    //  height: "200px",
//    //  width: "200px",
//    //  top: "0px",
//    //  left: "0px",
//    //};
//    //var contentType = this.props.list.contentType.split('_').join('-');
//    //var runtime     = this.props.item.runtime_name;
//    //var status      = this.props.item.status;
//    //var loading     = this.props.item.loading;
//    //var cssClasses  = classNames('list-item', 'list-item-' + contentType, {
//    //  'animate-ink'            : this.state.animateInk,
//    //  'card'                   : true,
//    //  'card-view-cards'        : this.props.list.viewMode === "cards",
//    //  'list-item-card-view'    : this.props.list.viewMode === "cards",
//    //  'list-item-no-color'     : !this.props.color,
//    //  'list-item-stream-view'  : this.props.list.viewMode === "stream",
//    //  //'card-codebox-nodejs'    : runtime === "nodejs",
//    //  //'card-codebox-python'    : runtime === "python",
//    //  //'card-codebox-ruby'      : runtime === "ruby",
//    //  //'card-codebox-golang'    : runtime === "golang",
//    //  'card-loading'           : loading,
//    //  'card-expanded'          : this.props.expanded,
//    //  'list-item-expanded'     : this.props.expanded,
//    //  //'card-trace-pending'     : status === "pending",
//    //  //'card-trace-failure'     : status === "failure",
//    //  //'card-trace-success'     : status === "success",
//    //  //'card-trace-timeout'     : status === "timeout",
//    //});
//    //if (this.state.animateInk) {
//    //  inkStyle['top'] = "50px";
//    //  inkStyle['left'] = "50px";
//    //}
//    //
//    //
//    //if (this.props.list.viewMode === "cards") {
//    //  return (
//    //    <div className={cssClasses} style={color} onClick={this.handleCardClick}>
//    //      <div className="list-item-header card-header">
//    //        <div className="list-item-details card-details">
//    //          <div className="list-item-icon card-icon">
//    //            <Icon type={icon} />
//    //          </div>
//    //          <div className="list-item-text card-text">
//    //            <div className="list-item-title card-title"><span>{this.props.title}</span></div>
//    //            <div className="list-item-description card-description">{this.props.description}</div>
//    //          </div>
//    //        </div>
//    //        <div className="ink" style={inkStyle}></div>
//    //        <div className="list-item-extras card-extras">
//    //          <Dropdown actions={this.props.actions} visible={this.props.dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick} />
//    //        </div>
//    //      </div>
//    //    </div>
//    //  );
//    //} else if (this.props.list.viewMode === "stream") {
//    //  var traceResult = this.props.expanded ? <TraceResult result={this.props.item.data.result} /> : null;
//    //  var initialsComponent = <AvatarInitials text={this.props.title} />;
//    //  var dropdownComponent = <Dropdown actions={this.props.actions} visible={this.props.dropdownVisible} toggleDropdownMenu={this.toggleDropdownMenu} handleClick={this.handleDropdownMenuItemClick} />;
//    //  var iconComponent = <Icon type={this.props.icon} style={color} />;
//    //  var avatar = contentType === "users" ? initialsComponent : iconComponent;
//    //  var dropdown = this.props.actions.length > 0 ? dropdownComponent : null;
//    //  var buttonExpandToggle = this.props.expandable ? <ButtonExpandToggle parentExpanded={this.props.expanded} /> : null;
//    //  return (
//    //    <div className={cssClasses}>
//    //      <div className="list-item-header card-header" onClick={this.handleItemHeaderClick}>
//    //        <div className="list-item-details card-details-other">
//    //          <div className="list-item-icon card-icon">
//    //            {avatar}
//    //          </div>
//    //          <div className="list-item-text card-text-other">
//    //            <div className="list-item-title card-title"><span>{this.props.title}</span></div>
//    //            <div className="list-item-description card-description-other">{this.props.description}</div>
//    //          </div>
//    //        </div>
//    //        <div className="list-item-highlight card-highlight"></div>
//    //        <div className="list-item-extras card-other-extras">
//    //          <div className="card-info">{info}</div>
//    //          {buttonExpandToggle}
//    //          <div className="card-dropdown">{dropdown}</div>
//    //        </div>
//    //      </div>
//    //      {traceResult}
//    //    </div>
//    //  );
//    //}
//
//    // if (this.props.item.expanded && this.props.list.contentType === "traces") {
//    //   if (this.props.item.args && this.props.item.meta) {
//    //     return (
//    //       <div className={cssClasses} onClick={this.handleClick}>
//    //         <div className="list-item-header card-header">
//    //           <div className="list-item-details card-details">
//    //             <div className="card-icon">
//    //               <Icon type={this.props.item.icon} style={this.props.item.iconColor}/>
//    //             </div>
//    //             <div className="list-item-text card-text">
//    //               <div className="list-item-title card-title"><span onClick={this.handleTitleClick} >{this.props.item.title}</span></div>
//    //               <div className="list-item-description card-description">{this.props.item.description}</div>
//    //             </div>
//    //           </div>
//    //           <div className="card-highlight"></div>
//    //           <div className="list-item-extras card-extras">
//    //             <div className="card-info">{this.props.item.info}</div>
//    //             {dropdown}
//    //           </div>
//    //         </div>
//    //         <div className="card-body">
//    //           <TraceResultView args={this.props.item.args} meta={this.props.item.meta} result={this.props.item.result} />
//    //         </div>
//    //         <ProgressBar />
//    //       </div>
//    //     );
//    //   } else {
//    //     return (
//    //       <div className={cssClasses} onClick={this.handleClick}>
//    //         <div className="list-item-header card-header">
//    //           <div className="list-item-details card-details">
//    //             <div className="card-icon">
//    //               <Icon type={this.props.item.icon} style={this.props.item.iconColor} />
//    //             </div>
//    //             <div className="list-item-text card-text">
//    //               <div className="list-item-title card-title"><span onClick={this.handleTitleClick}>{this.props.item.title}</span></div>
//    //               <div className="list-item-description card-description">{this.props.item.description}</div>
//    //             </div>
//    //           </div>
//    //           <div className="card-highlight"></div>
//    //           <div className="list-item-extras card-extras">
//    //             <div className="card-info">{this.props.item.info}</div>
//    //             {dropdown}
//    //           </div>
//    //         </div>
//    //         <div className="card-body">
//    //           <TraceResultView result={this.props.item.result} />
//    //         </div>
//    //         <ProgressBar />
//    //       </div>
//    //     );
//    //   }
//    // }
//  }
//});