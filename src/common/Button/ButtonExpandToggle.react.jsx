var React = require('react');

var Icon = require('../Icon/Icon.react');

module.exports = React.createClass({

  displayName: 'ButtonExpandToggle',

  render: function () {
    var icon = this.props.parentExpanded ? "unfold-less" : "unfold-more";
    return (
      <div className="button-expand-toggle" onClick={this.props.handleClick}>
        <Icon icon={icon}/>
      </div>
    );
  }
});