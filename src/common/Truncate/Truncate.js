import React from 'react';
import {Utils} from 'syncano-material-ui';

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

  render() {
    const styles = this.getStyles();
    const {text, style, ...other} = this.props;

    return (
      <div
        style={this.mergeStyles(style, styles)}
        {...other}>
        {text}
      </div>
    );
  }
});
