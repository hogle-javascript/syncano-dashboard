import React from 'react';
import mui from 'material-ui';

const FontIcon = mui.FontIcon;

module.exports = React.createClass({

  displayName: 'ButtonExpandToggle',

  render: function() {
    let icon = this.props.parentExpanded ? "synicon-unfold-less" : "synicon-unfold-more";
    return (
      <div
        className="button-expand-toggle"
        onClick={this.props.handleClick}>
        <FontIcon className={icon}/>
      </div>
    );
  }
});