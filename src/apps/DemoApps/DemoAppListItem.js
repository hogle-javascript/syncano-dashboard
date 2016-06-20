import React, { Component } from 'react';

import { Paper, RaisedButton } from 'material-ui';
import { colors as Colors } from 'material-ui/styles';

export default class DemoAppListItem extends Component {
  getStyles() {
    return {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '32px 16px',
        width: 320,
        height: 320,
        margin: '32px 16px'
      },
      title: {
        fontSize: 22,
        fontWeight: 500
      },
      description: {
        textAlign: 'center',
        color: Colors.grey500
      }
    };
  }

  render() {
    const { item } = this.props;
    const styles = this.getStyles();

    return (
      <Paper
        zDepth={2}
        style={styles.container}
      >
        <div style={styles.title}>
          {item.title}
        </div>
        <div style={styles.description}>
          {item.description}
        </div>
        <RaisedButton
          onTouchTap={() => console.error('install DEMO app')}
          primary={true}
          label="Install App"
        />
      </Paper>
    );
  }
}
