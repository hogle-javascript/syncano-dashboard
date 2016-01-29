import React from 'react';
import _ from 'lodash';
import DialogMixin from '../../mixins/DialogMixin';
import {Dialog, Utils} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'Dialog',

  mixins: [
    Utils.Styles,
    DialogMixin
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
    let dialogStyle = this.mergeStyles(style, styles.style);

    return (
      <Dialog
        {...other}
        open={_.isBoolean(open) ? open : this.state.open}
        style={dialogStyle}
        autoDetectWindowHeight={false}>
        {children}
      </Dialog>
    );
  }
});
