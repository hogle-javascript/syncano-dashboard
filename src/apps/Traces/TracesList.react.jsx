import React from 'react';
import Radium from 'radium';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionStore from '../Session/SessionStore';
import SessionActions from '../Session/SessionActions';
import Actions from './TracesActions';
import Store from './TracesStore';

import MUI from 'material-ui';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default Radium(React.createClass({

  displayName: 'TracesList',

  mixins: [
    Reflux.connect(Store),
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  getStyles() {
    return {
      traceResult: {
        maxHeight      : 0,
        overflow       : 'hidden',
        transition     : 'max-height 450ms ease-out'
      },
      noTracesContainer: {
        margin       : '64px auto',
        textAlign    : 'center'
      },
      noTracesIcon: {
        fontSize     : 96,
        lineHeight   : 1,
        marginBottom : 16,
        color        : 'rgba(0, 0, 0, 0.24)'
      },
      noTracesText: {
        color        : 'rgba(0, 0, 0, 0.67)',
        fontSize     : 34,
        margin       : 0
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
    let styles = this.getStyles();
    let status = {
      blocked: {
        background: 'rgba(0,0,0,0.2)',
        icon: 'alert'
      },
      pending: {
        background: MUI.Styles.Colors.lightBlue500,
        icon: 'timelapse'
      },
      success: {
        background: MUI.Styles.Colors.green400,
        icon: 'check'
      },
      failure: {
        background: MUI.Styles.Colors.red400,
        icon: 'alert'
      },
      timeout: {
        background: MUI.Styles.Colors.red400,
        icon: 'alert'
      }
    }[item.status];

    if (item.id == this.state.visibleTraceId) {
      styles.traceResult = {
        maxHeight: '500px',
        marginBottom : 15,
        transition: 'max-height 450ms ease-in',
        overflow: 'auto'
      };
      styles.trace = {
        margin : '15px -30px 0 -30px'
      };
    }
    return (
      <MUI.Paper zDepth={2} style={styles.trace}>
        <Common.ColumnList.Item
          checked     = {item.checked}
          key         = {item.id}
          id          = {item.id}
          handleClick = {this.toggleTrace}>
          <Column.CheckIcon
            id              = {item.id}
            icon            = {status.icon}
            background      = {status.background}
            checkable       = {false}>
            {item.status}
          </Column.CheckIcon>
          <Column.ID>{item.id}</Column.ID>
          <Column.Desc>{item.duration}ms</Column.Desc>
          <Column.Date
            date      = {item.executed_at}
            ifInvalid = {item.status} />
        </Common.ColumnList.Item>
        <div style={styles.traceResult}>
          <Common.Trace.Result result={item.result}/>
        </div>
      </MUI.Paper>
    )
  },

  getList() {
    let items  = this.state.items || [],
        styles = this.getStyles();

    if (items.length > 0) {
      items = items.map(item => this.renderItem(item));
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }

    return [
      <div style={styles.noTracesContainer}>
        <MUI.FontIcon
          style     = {styles.noTracesIcon}
          className = "synicon-package-variant" />
        <p style={styles.noTracesText}>There is no traces for this CodeBox yet</p>
      </div>
    ];
  },

  getHeader() {
    if (this.state.items.length > 0) {
      return (
        <Common.ColumnList.Header>
          <Column.IconName.Header>{this.props.name}</Column.IconName.Header>
          <Column.ID.Header>ID</Column.ID.Header>
          <Column.Desc.Header>Duration</Column.Desc.Header>
          <Column.Date.Header>Executed</Column.Date.Header>
        </Common.ColumnList.Header>
      )
    }
    return;
  },

  render() {
    return (
      <Common.Lists.Container>
        <Common.Loading show={this.state.isLoading}>
          {this.getHeader()}
          <Common.Lists.List>
            {this.getList()}
          </Common.Lists.List>
        </Common.Loading>
      </Common.Lists.Container>
    );
  }
}));
