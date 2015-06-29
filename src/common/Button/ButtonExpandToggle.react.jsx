var React    = require('react'),
    mui      = require('material-ui'),

    FontIcon = mui.FontIcon;

module.exports = React.createClass({

  displayName: 'ButtonExpandToggle',

  render: function () {
    var icon = this.props.parentExpanded ? "synicon-unfold-less" : "synicon-unfold-more";
    return (
      <div className="button-expand-toggle" onClick={this.props.handleClick}>
        <FontIcon className={icon}/>
      </div>
    );
  }
});