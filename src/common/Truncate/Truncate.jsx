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
    let styles = this.getStyles();
    let {text, style, ...other} = this.props;

    return (
      <div
        style={this.mergeAndPrefix(style, styles)}
        {...other}>
        {text}
      </div>
    );
  }
});
