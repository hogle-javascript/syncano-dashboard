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

let Column = Common.ColumnList.Column;

export default Radium(React.createClass({

  displayName: 'TracesList',

  mixins: [
    Reflux.connect(TracesStore),
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

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
    let styles     = this.getStyles(),
        background = item.status === 'success' ? MUI.Styles.Colors.green400 : MUI.Styles.Colors.red400,
        icon       = item.status === 'success' ? 'check' : 'alert';

    if (item.id == this.state.visibleTraceId) {
      styles.trace = {
        marginLeft   : '-50px',
        marginRight  : '-50px',
        visibility   : 'visible',
        marginBottom : 15,
        height       : null
      }
    }

    return (
      <div>
        <Common.ColumnList.Item
          checked     = {item.checked}
          key         = {item.id}
          id          = {item.id}
          handleClick = {this.toggleTrace}
        >
          <Common.ColumnList.Column.CheckIcon
            id              = {item.id}
            icon            = {icon}
            background      = {background}
            checkable       = {false}
          >
            {item.status}
          </Common.ColumnList.Column.CheckIcon>
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
    let items = this.state.items || [];

    if (items.length > 0) {
      items = items.map(item => this.renderItem(item));
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
          <Column.IconName.Header>{this.props.name}</Column.IconName.Header>
          <Column.ID.Header>ID</Column.ID.Header>
          <Column.Desc.Header>Duration</Column.Desc.Header>
          <Column.Date.Header>Executed</Column.Date.Header>
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
