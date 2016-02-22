import React from 'react';
import Radium from 'radium';

import {Paper} from 'syncano-material-ui';
import {ColumnList, Color} from 'syncano-components';
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

  renderMeta(item) {
    const type = `Type: ${item.metadata.type}`;
    const className = `Class: ${item.metadata.class}`;
    const meta = 'class' in item.metadata ? `${type}; ${className}` : type;

    return (
      <div>
          <div>{meta}</div>
      </div>
    );
  },

  renderItem(item) {
    const styles = this.getStyles();
    const room = typeof item.room === 'object' ? 'None' : item.room;

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
          <Column.CheckIcon
            className="col-sm-6"
            id={item.name}
            icon={'bullhorn'}
            keyName="name"
            checkable={false}
            background={Color.getColorByName('blue', 'xlight')}
            handleIconClick={this.toggleChannelMessage.bind(null, item.id)}/>
          <Column.ID className="col-sm-6">{item.id}</Column.ID>
          <Column.Desc className="col-sm-6">{room}</Column.Desc>
          <Column.Desc className="col-sm-6">{item.action}</Column.Desc>
          <Column.Desc className="col-sm-6">{this.renderMeta(item)}</Column.Desc>
          <Column.Date className="col-flex-1" date={item.created_at}/>
        </ColumnList.Item>
        <div style={styles.traceResult}>
          {this.renderPayload(item)}
        </div>
      </Paper>
    );
  },

  render() {
    return (
      <div>
        <ColumnList.Header>
          <Column.ColumnHeader
            className="col-sm-6"
            primary={true}
            columnName="ICON_NAME">{this.props.name}</Column.ColumnHeader>
          <Column.ColumnHeader className="col-sm-6" columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader className="col-sm-6" columnName="Desc">Room</Column.ColumnHeader>
          <Column.ColumnHeader className="col-sm-6" columnName="Desc">Action</Column.ColumnHeader>
          <Column.ColumnHeader className="col-sm-6" columnName="Desc">Metadata</Column.ColumnHeader>
          <Column.ColumnHeader className="col-flex-1" columnName="Date">Created</Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          items={this.props.items}
          renderItem={this.renderItem}
          key="channel-history-list"/>
      </div>
    );
  }
}));
