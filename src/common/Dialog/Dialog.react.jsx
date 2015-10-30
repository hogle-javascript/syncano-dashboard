import React from 'react';
import MUI from 'syncano-material-ui';

export default React.createClass({

  displayName: 'Dialog',

  propTypes: {
    handleClick: React.PropTypes.func
  },

  mixins: [MUI.Utils.Styles],

  getDefaultProps() {
    return {
      style: {},
      bodyStyle: {}
    };
  },

  getStyles() {
    return {
      style: {
        overflow: 'auto',
        zIndex: 11
      },
      bodyStyle: {
        overflowX: 'initial',
        overflowY: 'initial'
      }
    };
  },

  show() {
    this.refs.dialog.show();
  },

  dismiss() {
    this.refs.dialog.dismiss();
  },

  render() {
    let styles = this.getStyles();
    let style = this.mergeAndPrefix(this.props.style, styles.style);
    let bodyStyle = this.mergeAndPrefix(this.props.bodyStyle, styles.bodyStyle);

    return (
      <MUI.Dialog
        {...this.props}
        style={style}
        bodyStyle={bodyStyle}
        ref='dialog'>
        {this.props.children}
      </MUI.Dialog>
    );
  }
});
