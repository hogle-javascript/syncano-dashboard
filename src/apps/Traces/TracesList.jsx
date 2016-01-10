import React from 'react';
import Radium from 'radium';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Store from './TracesStore';

import {Styles, Paper, FontIcon} from 'syncano-material-ui';
import {ColumnList, Trace, Lists, Loading} from '../../common';
import {Truncate} from 'syncano-components';

let Column = ColumnList.Column;

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
        maxHeight: 0,
        overflow: 'hidden',
        transition: 'max-height 450ms ease-out'
      },
      noTracesContainer: {
        padding: '96px 0',
        textAlign: 'center'
      },
      noTracesIcon: {
        fontSize: 96,
        lineHeight: 1,
        marginBottom: 16,
        color: 'rgba(0, 0, 0, 0.24)'
      },
      noTracesText: {
        color: 'rgba(0, 0, 0, 0.67)',
        fontSize: 34,
        margin: 0
      }
    };
  },

  toggleTrace(traceId) {
    console.info('SnippetsTraces::toggleTrace', traceId);
    if (this.state.visibleTraceId === traceId) {
      this.setState({visibleTraceId: null});
    } else {
      this.setState({visibleTraceId: traceId});
    }
  },

  renderItem(item) {
    let duration = item.duration !== null ? item.duration + 'ms' : 'not executed';
    let styles = this.getStyles();
    let status = {
      blocked: {
        background: 'rgba(0,0,0,0.2)',
        icon: 'alert'
      },
      pending: {
        background: Styles.Colors.lightBlue500,
        icon: 'timelapse'
      },
      success: {
        background: Styles.Colors.green400,
        icon: 'check'
      },
      failure: {
        background: Styles.Colors.red400,
        icon: 'alert'
      },
      timeout: {
        background: Styles.Colors.red400,
        icon: 'alert'
      }
    }[item.status];

    if (item.id === this.state.visibleTraceId) {
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
        zDepth={1}
        style={styles.trace}>
        <ColumnList.Item
          checked={item.checked}
          key={item.id}
          id={item.id}
          zDepth={0}
          handleClick={this.toggleTrace.bind(null, item.id)}>
          <Column.CheckIcon
            id={item.id.toString()}
            icon={status.icon}
            background={status.background}
            checkable={false}>
            <Truncate text={item.status}/>
          </Column.CheckIcon>
          <Column.ID>{item.id}</Column.ID>
          <Column.Desc>{duration}</Column.Desc>
          <Column.Date
            date={item.executed_at}
            ifInvalid={item.status}/>
        </ColumnList.Item>

        <div style={styles.traceResult}>
          <Trace.Result result={item.result}/>
        </div>
      </Paper>
    );
  },

  renderList() {
    let items = this.state.items || [];
    let styles = this.getStyles();
    let tracesFor = {
      snippet: {
        name: 'Snippet',
        icon: 'synicon-package-variant'
      },
      codeBox: {
        name: 'CodeBox',
        icon: 'synicon-arrow-up-bold'
      },
      trigger: {
        name: 'Trigger',
        icon: 'synicon-arrow-up-bold'
      },
      schedule: {
        name: 'Schedule',
        icon: 'synicon-camera-timer'
      }
    };

    if (items.length > 0) {
      items = items.map((item) => this.renderItem(item));
      return items;
    }

    return [
      <div style={styles.noTracesContainer}>
        <FontIcon
          style={styles.noTracesIcon}
          className={tracesFor[this.props.tracesFor].icon}/>

        <p style={styles.noTracesText}>There are no traces for this {tracesFor[this.props.tracesFor].name} yet</p>
      </div>
    ];
  },

  renderHeader() {
    if (this.state.items.length > 0) {
      return (
        <ColumnList.Header>
          <Column.ColumnHeader primary={true} columnName="ICON_NAME">{this.props.name}</Column.ColumnHeader>
          <Column.ColumnHeader columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Duration</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Executed</Column.ColumnHeader>
        </ColumnList.Header>
      );
    }
    return true;
  },

  render() {
    return (
      <Lists.Container>
        <Loading show={this.state.isLoading}>
          {this.renderHeader()}
          <Lists.List key="traces-list">
            {this.renderList()}
          </Lists.List>
        </Loading>
      </Lists.Container>
    );
  }
}));
