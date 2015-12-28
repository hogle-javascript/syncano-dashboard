import React from 'react';
import {Link} from 'react-router';

import Sticky from 'react-stickydiv';
import {Utils} from 'syncano-material-ui';
import Logo from '../Logo';

export default React.createClass({
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
      logotypeContainer: {
        height: '100%',
        display: 'flex'
      },
      logo: {
        width: 120
      }
    };
  },

  render() {
    let styles = this.getStyles();
    let {children, style, ...other} = this.props;

    return (
      <div
        className="col-flex-0 left-nav"
        style={this.mergeAndPrefix(style, styles.root)}
        {...other}>
        <div style={styles.content}>
          <Sticky>
            <div className="col-flex-1" style={styles.topToolbar}>
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
});
