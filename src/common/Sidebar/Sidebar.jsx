import React from 'react';
import {Link} from 'react-router';
import Radium from 'radium';

import Sticky from 'react-stickydiv';
import {Utils} from 'syncano-material-ui';
import Logo from '../Logo';

export default Radium(React.createClass({
  displayName: 'Sidebar',

  contextTypes: {
    muiTheme: React.PropTypes.object
  },

  mixins: [Utils.Styles],

  getDefaultProps() {
    return {
      logoCentered: false
    };
  },

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
      },
      content: {
        position: 'fixed',
        width: 256,
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
      logo: {
        width: 120
      },
      logoCentered: {
        justifyContent: 'center'
      },
      contentStretched: {
        width: '100%'
      }
    };
  },

  render() {
    let styles = this.getStyles();
    let {children, style, logoCentered, ...other} = this.props;

    return (
      <div
        className="col-flex-0 left-nav"
        style={this.mergeStyles(style, styles.root)}
        {...other}>
        <div style={styles.background}></div>
        <div style={[styles.content, logoCentered && styles.contentStretched]}>
          <Sticky>
            <div className="col-flex-1" style={[styles.topToolbar, logoCentered && styles.logoCentered]}>
              <Link to="app">
                <Logo
                  style={styles.logo}
                  className="logo-white"/>
              </Link>
            </div>
          </Sticky>
          {children}
        </div>
      </div>
    );
  }
}));
