var React = require('react');
var classNames = require('classnames');

var HeaderStore = require('./store');
var AuthStore = require('../Auth/store');

//var ViewActions   = require('../actions/ViewActions');

var Icon = require('../../common/Icon/Icon.react');
var Tabs = require('../../common/Tabs/Tabs.react');
var ProgressBar = require('../../common/ProgressBar/ProgressBar.react');

var HeaderOptions = require('./HeaderOptions.react');

require('./Header.css');

module.exports = React.createClass({

  displayName: 'Header',

  propTypes: {
    actions: React.PropTypes.array.isRequired,
    title: React.PropTypes.string.isRequired,
    icon: React.PropTypes.string,
    //handleTabClick: React.PropTypes.func.isRequired,
    //handleAccountMenuItemClick: React.PropTypes.func.isRequired,
  },

  getInitialState: function () {
    return {
      menu: HeaderStore.getMenu(),
      //account: AuthStore.getAccount(),
    }
  },

  getDefaultProps: function () {
    return {
      appLoading: false,
      actions: [{
        displayName: 'Account settings',
        name: 'account'
      }, {
        displayName: 'Log out',
        name: 'logout'
      }],
    }
  },

  componentDidMount: function () {
    HeaderStore.addChangeListener(this.onChange);
    AuthStore.addChangeListener(this.onChange);
  },

  componentWillUnmount: function () {
    HeaderStore.removeChangeListener(this.onChange);
    AuthStore.removeChangeListener(this.onChange);
  },

  onChange: function () {
    this.setState({
      menu: HeaderStore.getMenu(),
      //account: AuthStore.getAccount(),
    });
  },

  render: function () {

    var cssClasses = classNames({
      'header-group': true,
      'header-group-loading': this.props.appLoading,
    });


    //return (<div>aaa</div> )
    if (typeof this.props.tabs !== "undefined") {
      var viewTab = HeaderStore.getAppView().tab;
      return (
        <div className={cssClasses}>
          <div className="header-details">
            <div className="header-nav-icon" onClick={this.props.handleIconClick}>
              <Icon icon={this.props.icon}/>
            </div>
            <div className="header-text">
              <div className="header-title">{this.props.title}</div>
            </div>
            <HeaderOptions {...this.props} menu={this.state.menu} account={this.state.account} />
          </div>
          <Tabs {...this.props} activeTab={viewTab} />
          <ProgressBar />
        </div>
      );
    } else {
      return (
        <div className={cssClasses}>
          <div className="header-details">
            <div className="header-nav-icon">
              <Icon icon={this.props.icon}/>
            </div>
            <div className="header-text">
              <div className="header-title">{this.props.title}</div>
            </div>
            <HeaderOptions menu={this.state.menu} actions={this.props.actions} />
          </div>
          <ProgressBar />
        </div>
      );
    }
  }

});



//<HeaderOptions {...this.props} menu={this.state.menu} account={this.state.account} handleAccountMenuItemClick={this.handleAccountMenuItemClick}/>