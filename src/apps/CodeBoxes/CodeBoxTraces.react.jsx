import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

// Stores and Actions
import CodeBoxActions from './CodeBoxActions';
import CodeBoxStore from './CodeBoxStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container';

let Column = Common.ColumnList.Column;

export default Radium(React.createClass({

  displayName: 'CodeBoxTraces',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(CodeBoxStore),
    HeaderMixin,
    InstanceTabsMixin
  ],

  componentDidMount() {
    CodeBoxActions.fetch();
  },

  getStyles() {
    return {
      container: {
        margin   : '25px auto',
        width    : '100%',
        maxWidth : '1140px'
      },
      listContainer: {
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
          <Column.IconName
            id              = {item.id}
            background      = {background}
            handleNameClick = {this.toggleTrace}
          >
            {item.status}
          </Column.IconName>
          <Column.ID>{item.id}</Column.ID>
          <Column.Desc>{item.duration}ms</Column.Desc>
          <Column.Date date={item.executed_at} />
        </Common.ColumnList.Item>
        <MUI.Paper zDepth={1} style={styles.trace}>
          <Common.Trace.Result result={item.result}/>
        </MUI.Paper>
      </div>
    )
  },

  getList() {
    var items = this.state.traces || [];

    if (items.length > 0) {
      items = items.map(item => this.renderItem(item));
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }
    return [<Common.ColumnList.Item key="empty">Empty Item</Common.ColumnList.Item>];
  },

  render() {
    var styles     = this.getStyles();

    return (
      <Container style={styles.container}>
        <Common.Loading show={this.state.isLoading}>
          <Common.Lists.Container>
            <Common.ColumnList.Header>
              <Column.IconName.Header>Trace status</Column.IconName.Header>
              <Column.ID.Header>ID</Column.ID.Header>
              <Column.Desc.Header>Duration</Column.Desc.Header>
              <Column.Date.Header>Executed</Column.Date.Header>
            </Common.ColumnList.Header>
            <Common.Lists.List>
              {this.getList()}
            </Common.Lists.List>
          </Common.Lists.Container>
        </Common.Loading>
      </Container>
    );
  }

}));