var React         = require('react'),
    classNames    = require('classnames'),
    Router        = require('react-router'),
    Link          = Router.Link,
    mui           = require('material-ui'),
    Tabs          = mui.Tabs,
    Tab           = mui.Tab,
    MaterialIcon  = require('../../common/Icon/MaterialIcon.react'),
    HeaderActions = require('./HeaderActions'),
    HeaderStore   = require('./HeaderStore');


require('./Header.css');


module.exports = React.createClass({

  displayName: 'Header',

  contextTypes: {
      router: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return HeaderStore.getState();
  },

  componentDidMount: function () {
    HeaderStore.listen(this.onChange);
  },

  componentWillUnmount: function () {
    HeaderStore.unlisten(this.onChange);
  },

  onChange: function (state) {
    this.setState(state);
  },

  handleTabActive: function (tab) {
    this.context.router.transitionTo(tab.props.route);
  },

  renderBreadcrumbs: function () {
    if (this.state.breadcrumbs.length === 0) {
      return;
    }

    return (
      <ul>
        {this.state.breadcrumbs.map(this.renderBreadcrumbItem)}
      </ul>
    );
  },

  renderBreadcrumbItem: function (breadcrumb, index, breadcrumbs) {
    var chevron = null;

    if (breadcrumbs.length > 1 && breadcrumbs.length !== (index + 1)) {
      chevron = <MaterialIcon name="chevron_right" />
    }

    breadcrumb.params = breadcrumb.params || {};
    breadcrumb.query  = breadcrumb.query  || {};

    return (
      <li key={'breadcrumb-' + index}>
        <Link
          to={breadcrumb.route}
          params={breadcrumb.params}
          query={breadcrumb.query}>
          {breadcrumb.label}
        </Link>
        {chevron}
      </li>
    )
  },

  renderMenu: function (className) {
    if (this.state.menu.length === 0) {
      return
    }

    return (
      <div className={className}>
        <Tabs tabItemContainerStyle={{backgroundColor: 'transparent'}}>
          {this.state.menu.map(this.renderMenuItem)}
        </Tabs>
      </div>
    );
  },

  renderMenuItem: function(tab) {
    return (
      <Tab
        label={tab.label}
        route={tab.route}
        onActive={this.handleTabActive} />
    )
  },

  render: function () {
    var colClass    = 's' + this.state.menu.length,
        offsetClass = 'offset-s' + (10 - this.state.menu.length),
        menuClass   =  classNames('col', 'header-menu', colClass),
        iconsClass  =  classNames('col', 'header-icons', 's2', offsetClass);

    return (
      <div className="row header">
        <div className="row header-top">
          <div className="col s10 header-breadcrumbs">
            {this.renderBreadcrumbs()}
          </div>
          <div className="col s2 header-links right-align">
            <a herf="#">Docs</a>
            <a herf="#">API Keys</a>
            <a herf="#">Support</a>
          </div>
        </div>
        <div className="row header-bottom">
          {this.renderMenu(menuClass)}
          <div className={iconsClass}>
            <MaterialIcon name="more_vert" />
            <MaterialIcon name="notifications_none" />
            <MaterialIcon name="search" />
          </div>
        </div>
      </div>
    )
  }

});