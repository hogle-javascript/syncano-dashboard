import React from 'react';
import Radium from 'radium';

import {Paper} from 'syncano-material-ui';
import {ColumnList} from 'syncano-components';
import {Lists} from '../../common';

let Column = ColumnList.Column;

export default Radium(React.createClass({
  displayName: 'ChannelsList',

  getDefaultProps() {
    return {
      items: []
    };
  },

  getInitialState() {
    return {
      visibleMessageId: null
    };
  },

  getStyles() {
    return {
      traceResult: {
        maxHeight: 0,
        overflow: 'hidden',
        transition: 'max-height 450ms ease-out'
      },
      noHistoryContainer: {
        padding: '96px 0',
        textAlign: 'center'
      },
      noHistoryIcon: {
        fontSize: 96,
        lineHeight: 1,
        marginBottom: 16,
        color: 'rgba(0, 0, 0, 0.24)'
      },
      noHistoryText: {
        color: 'rgba(0, 0, 0, 0.67)',
        fontSize: 34,
        margin: 0
      },
      payloadResult: {
        padding: '25px',
        color: 'white',
        whiteSpace: 'pre',
        font: `12px/normal 'Monaco', monospace`,
        backgroundColor: '#4C4A43'
      }
    };
  },

  toggleChannelMessage(messageId) {
    console.info('ChannelHistory::toggleMessage', messageId);
    const visibleMessageId = this.state.visibleMessageId !== messageId ? messageId : null;

    this.setState({visibleMessageId});
  },

  renderPayload(item) {
    let styles = this.getStyles();
    const noPayload = 'No payload was passed in this message.';
    const payloadPrettyPrint = JSON.stringify(item.payload, null, 2);
    const payload = Object.keys(item.payload).length === 0 ? noPayload : payloadPrettyPrint;

    return (
      <div>
        <div style={styles.payloadResult}>
          <div>{payload}</div>
        </div>
      </div>
    );
  },

  renderItem(item) {
    let styles = this.getStyles();

    if (item.id === this.state.visibleMessageId) {
      styles.traceResult = {
        maxHeight: '500px',
        marginBottom: 15,
        transition: 'max-height 450ms ease-in',
        overflow: 'auto'
      };
      styles.trace = {
        margin: '15px 0 0'
      };
    }
    return (
      <Paper
        key={item.id}
        zDepth={1}
        style={styles.trace}>
        <ColumnList.Item
          id={item.id}
          zDepth={0}
          handleClick={this.toggleChannelMessage.bind(null, item.id)}>
          <Column.ID>{item.id}</Column.ID>
          <Column.Date date={item.created_at}/>
        </ColumnList.Item>
        <div style={styles.traceResult}>
          {this.renderPayload(item)}
        </div>
      </Paper>
    );
  },

  render() {
    return (
      <Lists.List key="traces-list">
        <ColumnList.Header>
          <Column.ColumnHeader primary={true} columnName="ICON_NAME">{this.props.name}</Column.ColumnHeader>
          <Column.ColumnHeader columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader columnName="Date">Created</Column.ColumnHeader>
        </ColumnList.Header>
        {this.props.items.map((item) => this.renderItem(item))}
      </Lists.List>
    );
  }
}));
