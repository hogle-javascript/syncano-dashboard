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
      content: {
        position: 'fixed',
        width: '100%',
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
        <div style={styles.content}>
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
