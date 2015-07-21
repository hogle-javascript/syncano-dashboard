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

// Components
import Trace from '../../common/Trace/TraceResult.react';

// List
import Lists from '../../common/Lists';
import Item from '../../common/ColumnList/Item.react';
import Header from '../../common/ColumnList/Header.react';
import Loading from '../../common/Loading/Loading.react';
import ColumnIconName from '../../common/ColumnList/Column/IconName.react';
import ColumnID from '../../common/ColumnList/Column/ID.react';
import ColumnDesc from '../../common/ColumnList/Column/Desc.react';
import ColumnDate from '../../common/ColumnList/Column/Date.react';

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
        <Item
          checked = {item.checked}
          style   = {styles.item}
        >
          <ColumnIconName
            id              = {item.id}
            background      = {background}
            handleNameClick = {this.toggleTrace}
          >
            {item.status}
          </ColumnIconName>
          <ColumnID>{item.id}</ColumnID>
          <ColumnDesc>{item.duration}ms</ColumnDesc>
          <ColumnDate date={item.executed_at} />
        </Item>
        <Paper zDepth={1} style={styles.trace}>
          <Trace result={item.result}/>
        </Paper>
      </div>
    )
  },

  getList() {
    var items = this.state.items.map(item => {
      return this.renderItem(item)
    });

    if (items.length > 0) {
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }
    return [<Item key="empty">Empty Item</Item>];
  },

  render() {
    return (
      <Lists.Container>
        <Header>
          <ColumnIconName.Header>{this.props.name}</ColumnIconName.Header>
          <ColumnID.Header>ID</ColumnID.Header>
          <ColumnDesc.Header>Duration</ColumnDesc.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <Lists.List>
          <Loading show={this.state.isLoading}>
            {this.getList()}
          </Loading>
        </Lists.List>
      </Lists.Container>
    );
  }
}));
