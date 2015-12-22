import React from 'react';
import {Dialog, Utils} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'Dialog',

  mixins: [Utils.Styles],

  getStyles() {
    return {
      style: {
        overflow: 'auto',
        paddingBottom: 64
      }
    };
  },

  render() {
    let styles = this.getStyles();
    let {children, style, ...other} = this.props;
    let dialogStyle = this.mergeAndPrefix(style, styles.style);

    return (
      <Dialog
        {...other}
        style={dialogStyle}
        autoDetectWindowHeight={false}>
        {children}
      </Dialog>
    );
  }
});
