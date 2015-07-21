import React from 'react';
import Radium from 'radium';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import ButtonActionMixin from '../../mixins/ButtonActionMixin';

// Stores and Actions
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import TracesActions from './TracesActions';
import TracesStore from './TracesStore';

import MUI from 'material-ui';
import Common from '../../common';

export default Radium(React.createClass({

  displayName: 'TracesList',

  mixins: [
    Reflux.connect(TracesStore),
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  componentWillReceiveProps(nextProps, nextState) {
    this.setState({items : nextProps.items})
  },

  getStyles() {
    return {
      container: {
        display        : 'flex',
        flexWrap       : 'wrap',
        justifyContent : 'center',
        height         : '100%',
        cursor         : 'pointer'
      },
      icon : {
        margin         : 12,
        height         : 50,
        width          : 50,
        display        : 'flex',
        justifyContent : 'center',
        alignItems     : 'center'
      },
      trace: {
        visibility     : 'collapse',
        height         : 0
      }
    }
  },

  toggleTrace(traceId) {
    console.info('CodeBoxesTraces::toggleTrace', traceId);
    if (this.state.visibleTraceId == traceId) {
      this.setState({visibleTraceId: null});
    } else {
      this.setState({visibleTraceId: traceId});
    }
  },

  renderItem(item) {
    var styles = this.getStyles(),
        background = item.status === 'success' ? 'green' : 'red';

    if (item.id == this.state.visibleTraceId) {
      styles.item = {
        marginTop   : 10,
        marginLeft  : '-30px',
        marginRight : '-30px'
      };
      styles.trace = {
        marginLeft   : '-30px',
        marginRight  : '-30px',
        visibility   : 'visible',
        marginBottom : 15,
        height       : null
      }
    }

    return (
      <div key={item.id}>
        <Common.ColumnList.Item
          checked = {item.checked}
          style   = {styles.item}
        >
          <Common.ColumnList.Column.IconName
            id              = {item.id}
            background      = {background}
            handleNameClick = {this.toggleTrace}
          >
            {item.status}
          </Common.ColumnList.Column.IconName>
          <Common.ColumnList.Column.ID>{item.id}</Common.ColumnList.Column.ID>
          <Common.ColumnList.Column.Desc>{item.duration}ms</Common.ColumnList.Column.Desc>
          <Common.ColumnList.Column.Date date={item.executed_at} />
        </Common.ColumnList.Item>
        <MUI.Paper zDepth={1} style={styles.trace}>
          <Common.Trace.Result result={item.result}/>
        </MUI.Paper>
      </div>
    )
  },

  getList() {
    var items = this.state.items.map(item => {
      this.renderItem(item)
    });

    if (items.length > 0) {
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }
    return [<Common.ColumnList.Item key="empty">Empty Item</Common.ColumnList.Item>];
  },

  render() {
    return (
      <Common.Lists.Container>
        <Common.ColumnList.Header>
          <Common.ColumnList.Column.IconName.Header>{this.props.name}</Common.ColumnList.Column.IconName.Header>
          <Common.ColumnList.Column.ID.Header>ID</Common.ColumnList.Column.ID.Header>
          <Common.ColumnList.Column.Desc.Header>Duration</Common.ColumnList.Column.Desc.Header>
          <Common.ColumnList.Column.Date.Header>Created</Common.ColumnList.Column.Date.Header>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.state.isLoading}>
            {this.getList()}
          </Common.Loading>
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
}));
