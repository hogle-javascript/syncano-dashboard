import React, { Component } from 'react';

export default class DemoApps extends Component {
  getStyles() {
    return {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      },
      title: {
        marginTop: 20,
        fontWeight: 500,
        fontSize: 32
      }
    };
  }

  render() {
    const { children } = this.props;
    const styles = this.getStyles();

    return (
      <div
        style={styles.container}
        className="vm-3-t align-center"
      >
        <div style={styles.title}>
          Syncano DEMO Apps
        </div>
        {children}
      </div>
    );
  }
}
