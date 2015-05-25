var React = require('react');
var classNames = require('classnames');

require('./Tabs.css');


var Tab = React.createClass({

  displayName: 'Tab',

  handleClick: function() {
    this.props.handleTabClick(this.props.tab.path || this.props.tab.name)
  },

  render: function() {
    var cssClasses = classNames('tab', {
      'tab-active': this.props.active,
    });
    return (
      <div className={cssClasses} onClick={this.handleClick}>
        <span>{this.props.tab.displayName}</span>
      </div>
    );
  }

});

module.exports = React.createClass({

  displayName: 'Tabs',

  render: function() {
    var tabs = this.props.tabs.map(function(tab){
      var active = tab.name === this.props.activeTab;
      return <Tab {...this.props} ref="tab" key={tab.name} tab={tab} active={active} />
    }.bind(this));
    return (
      <div className="tabs-group" ref="tabs">
        {tabs}
      </div>
    );
  }

});