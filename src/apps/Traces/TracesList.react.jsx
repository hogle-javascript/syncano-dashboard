var React             = require('react'),
    Radium            = require('radium'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionStore      = require('../Session/SessionStore'),
    SessionActions    = require('../Session/SessionActions'),
    TracesActions     = require('./TracesActions'),
    TracesStore       = require('./TracesStore'),

    // Components
    mui               = require('material-ui'),
    Paper             = mui.Paper,

    Trace             = require('../../common/Trace/TraceResult.react'),

    // List
    ListContainer     = require('../../common/Lists/ListContainer.react'),
    List              = require('../../common/Lists/List.react'),
    Item              = require('../../common/ColumnList/Item.react'),
    Header            = require('../../common/ColumnList/Header.react'),
    LoadingItem       = require('../../common/ColumnList/LoadingItem.react'),
    ColumnIconName    = require('../../common/ColumnList/Column/IconName.react'),
    ColumnID          = require('../../common/ColumnList/Column/ID.react'),
    ColumnName        = require('../../common/ColumnList/Column/Name.react'),
    ColumnDesc        = require('../../common/ColumnList/Column/Desc.react'),
    ColumnDate        = require('../../common/ColumnList/Column/Date.react');


module.exports = Radium(React.createClass({

  displayName: 'TracesList',

  mixins: [
    Reflux.connect(TracesStore),
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  componentWillReceiveProps: function(nextProps, nextState) {
    this.setState({items : nextProps.items})
  },

  getStyles: function() {
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

  toggleTrace: function(traceId) {
    console.info('CodeBoxesTraces::toggleTrace', traceId);
    if (this.state.visibleTraceId == traceId) {
      this.setState({visibleTraceId: null});
    } else {
      this.setState({visibleTraceId: traceId});
    }
  },

  renderItem: function (item) {

    var styles = this.getStyles(),
        background = item.status.success ? 'red': 'green';

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
          style   = {styles.item}>
          <ColumnIconName
            id              = {item.id}
            background      = {background}
            handleNameClick = {this.toggleTrace}>
            {item.status}
          </ColumnIconName>
          <ColumnID>{item.id}</ColumnID>
          <ColumnDesc>{item.duration}ms</ColumnDesc>
          <ColumnDate>{item.executed_at}</ColumnDate>
        </Item>
        <Paper zDepth={1} style={styles.trace}>
          <Trace result={item.result}/>
        </Paper>
      </div>
    )
  },

  getList: function () {
    if (this.state.isLoading) {
      return <LoadingItem />;
    }

    var items = this.state.traces.map(function (item) {
      return this.renderItem(item)
    }.bind(this));

    if (items.length > 0) {
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }
    return [<Item key="empty">Empty Item</Item>];
  },

  render: function () {
    return (
      <ListContainer>
        <Header>
          <ColumnIconName.Header>{this.props.name}</ColumnIconName.Header>
          <ColumnID.Header>ID</ColumnID.Header>
          <ColumnDesc.Header>Duration</ColumnDesc.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <List>
          {this.getList()}
        </List>
      </ListContainer>
    );
  }
}));
