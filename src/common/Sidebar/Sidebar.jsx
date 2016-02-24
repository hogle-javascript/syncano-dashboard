import React from 'react';
import Radium from 'radium';

import {Utils} from 'syncano-material-ui';

export default Radium(React.createClass({
  displayName: 'Sidebar',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [Utils.Styles],

  getInitialState() {
    return {
      collapsed: false
    };
  },

  getStyles() {
    return {
      root: {
        width: 256,
        zIndex: 11,
        paddingRight: 0
      },
      collapsed: {
        width: 62
      },
      background: {
        background: '#fcfcfc',
        position: 'fixed',
        zIndex: '-1',
        width: 256,
        height: '100%',
        left: 0,
        top: 0,
        borderRight: '1px solid #eee'
      },
      content: {
        width: 256,
        paddingBottom: 56,
        maxHeight: '100%',
        overflow: 'auto'
      },
      topToolbar: {
        background: this.context.muiTheme.rawTheme.palette.primary1Color,
        height: 50,
        paddingLeft: 24,
        display: 'flex',
        alignItems: 'center'
      },
      contentStretched: {
        width: '100%'
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const {children, style, ...other} = this.props;
    const {collapsed} = this.state;

    return (
      <div
        className="col-flex-0 left-nav"
        style={this.mergeStyles(style, styles.root, collapsed && styles.collapsed)}
        {...other}>
        <div style={this.mergeStyles(styles.background, collapsed && styles.collapsed)}></div>
        <div style={this.mergeStyles(styles.content, collapsed && styles.collapsed)}>
          {children}
        </div>
      </div>
    );
  }
}));
