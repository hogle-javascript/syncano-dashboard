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
    this.refs.dialog.setState({open: true});
  },

  dismiss() {
    this.refs.dialog.setState({open: false});
  },

  render() {
    let styles = this.getStyles();
    let {children, style, bodyStyle, ...other} = this.props; // eslint-disable-line no-redeclare
    let dialogStyle = this.mergeAndPrefix(style, styles.style);
    let dialogBodyStyle = this.mergeAndPrefix(bodyStyle, styles.bodyStyle);

    return (
      <MUI.Dialog
        {...other}
        style={dialogStyle}
        bodyStyle={dialogBodyStyle}
        ref='dialog'>
        {children}
      </MUI.Dialog>
    );
  }
});
