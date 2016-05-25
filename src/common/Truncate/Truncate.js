import React from 'react';
import {Utils} from 'syncano-material-ui';
import Tooltip from '../Tooltip';

export default React.createClass({
  displayName: 'Truncate',

  mixins: [Utils.Styles],

  getStyles() {
    return {
      display: 'block',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    };
  },

  renderContent() {
    const styles = this.getStyles();
    const {text, style, ...other} = this.props;

    return (
      <div
        style={this.mergeStyles(style, styles)}
        {...other}>
        {text}
      </div>
    );
  },

  render() {
    const {text, withTooltip} = this.props;

    if (withTooltip) {
      return (
        <Tooltip
          label={withTooltip ? text : null}
          verticalPosition="bottom"
          horizontalPosition="center">
          {this.renderContent()}
        </Tooltip>
      );
    }
    return this.renderContent();
  }
});
