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
        color: Colors.grey500,
        maxHeight: 180,
        overflowY: 'hidden'
      }
    };
  }

  truncate(text, maxCount) {
    if (text.length > maxCount) {
      return `${text.slice(0, maxCount)}...`;
    }

    return text;
  }

  render() {
    const { item, handleClickInstall } = this.props;
    const styles = this.getStyles();

    return (
      <Paper
        zDepth={2}
        style={styles.container}
      >
        <div style={styles.title}>
          {item.name}
        </div>
        <div style={styles.description}>
          {this.truncate(item.description, 300)}
        </div>
        <RaisedButton
          onTouchTap={handleClickInstall}
          primary={true}
          label="Install App"
        />
      </Paper>
    );
  }
}
