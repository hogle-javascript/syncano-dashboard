import React from 'react';
import Radium from 'radium';
import {Paper, FontIcon} from 'material-ui';
import {colors as Colors} from 'material-ui/styles/';
import {ColumnList, Loading, Trace, Lists} from '../../common/';

const Column = ColumnList.Column;

export default Radium(React.createClass({
  displayName: 'TracesList',

  getDefaultProps() {
    return {
      items: []
    };
  },

  getInitialState() {
    return {
      visibleTraceId: null
    };
  },

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
    console.info('ScriptsTraces::toggleTrace', traceId);
    const visibleTraceId = this.state.visibleTraceId !== traceId ? traceId : null;

    this.setState({visibleTraceId});
  },

  renderItem(item) {
    const styles = this.getStyles();
    const status = {
      blocked: {
        background: 'rgba(0,0,0,0.2)',
        icon: 'alert',
        duration: 'not executed'
      },
      processing: {
        background: Colors.lightBlue500,
        icon: 'play',
        duration: 'processing'
      },
      pending: {
        background: Colors.lightBlue500,
        icon: 'timelapse',
        duration: 'pending'
      },
      success: {
        background: Colors.green400,
        icon: 'check',
        duration: `${item.duration}ms`
      },
      failure: {
        background: Colors.red400,
        icon: 'alert',
        duration: `${item.duration}ms`
      },
      timeout: {
        background: Colors.red400,
        icon: 'alert',
        duration: `${item.duration}ms`
      }
    }[item.status];

    if (item.executed_at && item.duration === null) {
      status.duration = 'execution problem';
    }

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
        key={item.id}
        zDepth={1}
        style={styles.trace}>
        <ColumnList.Item
          checked={item.checked}
          id={item.id}
          zDepth={0}
          handleClick={() => this.toggleTrace(item.id)}>
          <Column.CheckIcon
            id={item.id.toString()}
            className="col-flex-1"
            iconClassName={status.icon}
            background={status.background}
            checkable={false}
            primaryText={item.status}
            secondaryText={`ID: ${item.id}`}/>
          <Column.Desc className="col-flex-1">{status.duration}</Column.Desc>
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
    return (
      <Lists.List key="traces-list">
        <ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="ICON_NAME"
            className="col-flex-1">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Duration
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Executed</Column.ColumnHeader>
        </ColumnList.Header>
        {this.props.items.map((item) => this.renderItem(item))}
      </Lists.List>
    );
  },

  renderEmptyContent() {
    const {tracesFor} = this.props;
    const styles = this.getStyles();
    const tracesForConfig = {
      script: {
        name: 'Script',
        icon: 'synicon-package-variant'
      },
      scriptEndpoint: {
        name: 'Script Endpoint',
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

    return (
      <div style={styles.noTracesContainer}>
        <FontIcon
          style={styles.noTracesIcon}
          className={tracesForConfig[tracesFor].icon}/>
        <p style={styles.noTracesText}>There are no traces for this {tracesForConfig[tracesFor].name} yet</p>
      </div>
    );
  },

  render() {
    const {items, isLoading} = this.props;

    return (
      <Lists.Container>
        <Loading show={isLoading}>
          {items.length ? this.renderList() : this.renderEmptyContent()}
        </Loading>
      </Lists.Container>
    );
  }
}));
