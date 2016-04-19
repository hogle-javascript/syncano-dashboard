import React from 'react';
import Radium from 'radium';

import {Utils} from 'syncano-material-ui';
import SidebarContent from './SidebarContent';

export default Radium(React.createClass({
  displayName: 'Sidebar',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [Utils.Styles],

  getStyles() {
    return {
      root: {
        width: 256,
        zIndex: 11,
        paddingRight: 0
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
      }
    };
  },

  render() {
    const styles = this.getStyles();
    const {children, style, ...other} = this.props;

    return (
      <div
        className="col-flex-0 left-nav"
        style={this.mergeStyles(style, styles.root)}
        {...other}>
        <div style={styles.background}></div>
        <SidebarContent>
          {children}
        </SidebarContent>
      </div>
    );
  }
}));
