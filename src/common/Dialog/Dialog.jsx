import React from 'react';
import Mixins from '../../mixins';
import {Dialog, Utils} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'Dialog',

  mixins: [
    Utils.Styles,
    Mixins.Dialog
  ],

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
    let {children, style, open, ...other} = this.props;
    let dialogStyle = this.mergeAndPrefix(style, styles.style);

    return (
      <Dialog
        {...other}
        open={open ? open : this.state.open}
        style={dialogStyle}
        autoDetectWindowHeight={false}>
        {children}
      </Dialog>
    );
  }
});
