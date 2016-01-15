import React from 'react';

import {Loading} from 'syncano-components';
import {InnerToolbar} from '../../common';

export default React.createClass({
  displayName: 'ProfileContainer',

  getStyles() {
    return {
      container: {
        marginTop: 96,
        marginBottom: 96,
        marginLeft: 300
      },
      header: {
        paddingBottom: 48,
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: 20,
        lineHeight: '24px'
      }
    };
  },

  render() {
    let styles = this.getStyles();

    return (
      <div
        className="container"
        style={styles.container}>
        <InnerToolbar title={this.props.headerText}/>
        <div className="row align-center">
          <div className="col-flex-1">
            <Loading show={this.props.show}>
              {this.props.children}
            </Loading>
          </div>
        </div>
      </div>
    );
  }
});
