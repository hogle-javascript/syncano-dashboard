import React from 'react';
import Radium from 'radium';

import _ from 'lodash';

import {Paper} from 'syncano-material-ui';
import {ColumnList, Color} from '../../common/';

let Column = ColumnList.Column;

export default Radium(React.createClass({
  displayName: 'ChannelHistoryListItem',

  getInitialState() {
    return {
      visibleMessageId: null
    };
  },

  getStyles() {
    return {
      historyResult: {
        maxHeight: 0,
        overflow: 'hidden',
        transition: 'max-height 450ms ease-out'
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

  renderPayload() {
    const item = this.props.item;
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

  renderMeta() {
    const item = this.props.item;
    const type = `Type: ${item.metadata.type}`;
    const className = `Class: ${item.metadata.class}`;
    const meta = 'class' in item.metadata ? `${type}; ${className}` : type;

    return (<div>{meta}</div>);
  },

  render() {
    const item = this.props.item;
    const styles = this.getStyles();
    const room = _.isNull(item.room) ? 'None' : item.room;

    if (item.id === this.state.visibleMessageId) {
      styles.historyResult = {
        maxHeight: '500px',
        marginBottom: 15,
        transition: 'max-height 450ms ease-in',
        overflow: 'auto'
      };
      styles.history = {
        margin: '15px 0 0'
      };
    }

    return (
      <Paper
        key={item.id}
        zDepth={1}
        style={styles.history}>
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
          <Column.Date
            className="col-flex-1"
            date={item.created_at}/>
        </ColumnList.Item>
        <div style={styles.historyResult}>
          {this.renderPayload(item)}
        </div>
      </Paper>
    );
  }
}));
