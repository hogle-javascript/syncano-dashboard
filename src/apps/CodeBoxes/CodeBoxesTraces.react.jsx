var React  = require('react'),
    Reflux = require('reflux'),
    Router = require('react-router'),

    // Utils
    HeaderMixin = require('../Header/HeaderMixin'),

    // Stores and Actions
    CodeBoxesActions = require('./CodeBoxesActions'),
    CodeBoxesStore   = require('./CodeBoxesStore'),

    // Components
    mui         = require('material-ui'),
    Paper       = mui.Paper,
    RoundIcon   = require('../../common/Icon/RoundIcon.react'),
    Item        = require('../../common/ColumnList/Item.react'),
    Column      = require('../../common/ColumnList/ItemColumn.react'),
    Header      = require('../../common/ColumnList/Header.react'),
    ColNameDesc = require('../../common/ColumnList/ColNameDesc.react');


module.exports = React.createClass({

  displayName: 'CodeBoxesTraces',

  mixins: [
    Reflux.connect(CodeBoxesStore),
    HeaderMixin,
    Router.State,
    Router.Navigation,
    //React.addons.LinkedStateMixin,
    //ValidationMixin,
  ],

  componentWillMount: function() {
    var codeboxId = this.getParams().codeboxId;
    var instanceName = this.getParams().instanceName;

    CodeBoxesActions.setCurrentCodeBoxId(codeboxId);
    this.setState({
      currentCodeBoxId: codeboxId,
      instanceName: instanceName,
    });
    CodeBoxesStore.refreshData();
  },

  headerBreadcrumbs: function () {
    var routeParams = {
     codeboxId: this.state.currentCodeBoxId,
     instanceName: this.state.instanceName
   };

   return [
     {
       route: 'instance',
       label: this.state.instanceName,
       params: routeParams
     }, {
       route: 'codeboxes',
       label: 'Codeboxes',
       params: routeParams
     }, {
      route: 'codeboxes-edit',
      label: this.state.currentCodeBoxId,
      params: routeParams
    },{
       route: 'codeboxes-traces',
       label: 'Traces',
       params: routeParams,
     }]
  },

  headerMenuItems: function () {

   var routeParams = {
     codeboxId: this.state.currentCodeBoxId,
     instanceName: this.state.instanceName
   };

   return [
     {
      label: 'Editor',
      route: 'codeboxes-edit',
      params: routeParams
    },{
      label: 'Config',
      route: 'codeboxes-config',
      params: routeParams
    },{
      label: 'Traces',
      route: 'codeboxes-traces',
      params: routeParams,
      active: true,
    }]
  },

  toggleTrace: function(traceId) {
    console.info('CodeBoxesTraces::toggleTrace', traceId);
    if (this.state.visibleTraceId == traceId) {
      this.setState({visibleTraceId: null});
    } else {
      this.setState({visibleTraceId: traceId});
    }
  },

  generateItem: function (item) {
    var icon = item.status.success ? 'clear': 'done';
    var style = {
      item: {},
      trace: {
        visibility: 'collapse',
        height: 0
      },
      icon: {
        background: item.status.success ? 'red': 'green',
      }
    };

    if (item.id == this.state.visibleTraceId) {
      style = {
        item: {
          marginTop: 10,
          marginLeft: '-30px',
          marginRight: '-30px',
        },
        trace: {
          marginLeft: '-30px',
          marginRight: '-30px',
          visibility: 'visible',
          marginBottom: 15,
          height: null,
        },
        icon: {
          background: item.status.success ? 'red': 'green',
        }
      }
    }

    return (
      <div key={item.id}>
        <Item style={style.item}>
          <Column grid="1">
            <RoundIcon
              id          = {item.id.toString()}
              background  = {style.icon.background}
              icon        = {icon}
              handleClick = {this.toggleTrace}
            />
          </Column>
          <Column grid="5">
            <ColNameDesc
              id          = {item.id.toString()}
              name        = {item.status}
              handleClick = {this.toggleTrace}/>
          </Column>
          <Column grid="2">
            <span><strong>{item.id}</strong></span>
          </Column>
          <Column grid="2">
            <span><strong>{item.duration} ms</strong></span>
          </Column>
          <Column grid="2">
            <span><strong>{item.executed_at}</strong></span>
          </Column>
        </Item>
        <Paper zDepth={1} style={style.trace}>
            <Trace result={item.result}/>
        </Paper>
      </div>
    )
  },

  getItems: function () {
    var traces = this.state.traces;
    if (traces){
      var items = Object.keys(traces).map(function(key){
        return this.generateItem(traces[key])
      }.bind(this));
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }
    return <Item key="empty">Empty Item</Item>;
  },

  render: function () {

    var listGroupCss = {
      marginBottom: 50,
    };

    var columns = [
      {'name': 'Traces', space: 1, style: {fontSize: '20px'}},
      {'name': '', space: 5},
      {'name': 'ID', space: 2},
      {'name': 'Time', space: 2},
      {'name': 'Created', space: 2},
    ];

    var items = this.getItems();

    var containerStyle = {
      margin: '65px auto',
      width: '80%',
      maxWidth: '1140px'
    };

    return (
      <div className="container" style={containerStyle}>
        <div style={listGroupCss}>
          <Header checkedItemsNumber={this.state.checkedItemNumber} columns={columns} />
          <List viewMode="stream">
            {items}
          </List>
        </div>
      </div>
    );
  }

});