import React from 'react';

import MUI from 'material-ui';
import Common from '../../common';

export default React.createClass({

  displayName: 'ProfileContainer',

  getStyles() {
    return {
      container: {
        marginTop: 20,
        marginBottom: 96
      },
      header: {
        paddingBottom: 20,
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 20,
        lineHeight: '24px'
      }
    }
  },

  render() {
    let styles = this.getStyles();

    return (
      <div
        className="container"
        style={styles.container}>
        <div className="row align-center">
          <div className="col-flex-1">
            <div>
              <div style={styles.header}>
                {this.props.headerText}
              </div>
              <Common.Loading show={this.props.show}>
                {this.props.children}
              </Common.Loading>
            </div>
          </div>
        </div>
      </div>
    );
  }
});
