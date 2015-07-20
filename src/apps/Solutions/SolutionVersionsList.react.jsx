var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionActions    = require('../Session/SessionActions'),
    SessionStore      = require('../Session/SessionStore'),
    SolutionEditActions    = require('./SolutionEditActions'),
    SolutionEditStore      = require('./SolutionEditStore'),

    // Components
    mui               = require('material-ui'),
    Colors            = require('material-ui/lib/styles/colors'),
    FontIcon          = mui.FontIcon,
    IconButton        = mui.IconButton,
    Avatar            = mui.Avatar,

    // List
    ListContainer     = require('../../common/Lists/ListContainer.react'),
    EmptyListItem     = require('../../common/ColumnList/EmptyListItem.react'),
    List              = require('../../common/Lists/List.react'),
    Item              = require('../../common/ColumnList/Item.react'),
    Header            = require('../../common/ColumnList/Header.react'),
    Loading           = require('../../common/Loading/Loading.react'),
    ColumnDate        = require('../../common/ColumnList/Column/Date.react'),
    ColumnDesc        = require('../../common/ColumnList/Column/Desc.react'),
    ColumnID          = require('../../common/ColumnList/Column/ID.react'),
    ColumnText        = require('../../common/ColumnList/Column/Text.react'),
    ColumnKey         = require('../../common/ColumnList/Column/Key.react'),
    ColumnCheckIcon   = require('../../common/ColumnList/Column/CheckIcon.react');

module.exports = React.createClass({

  displayName: 'SolutionVersionsList',

  mixins: [

    HeaderMixin,
    Router.State,
    Router.Navigation,

    Reflux.connect(SolutionEditStore)
  ],

  // List
  handleItemIconClick: function(id, state) {
    SolutionEditActions.checkItem(id, state);
  },

  handleItemClick: function(className) {
    //SessionStore.getRouter().transitionTo(
    //  'classes-data-objects',
    //  {
    //    instanceName : SessionStore.getInstance().name,
    //    className    : className
    //  }
    //);
    //console.info('SolutionVersionsList::handleItemClick');
  },

  handleDownloadVersion: function(url) {
    window.open(url, '_blank');
  },

  renderItem: function(item) {

    return (
      <Item
        key          = {item.id}
        id           = {item.id}
        handleClick  = {this.handleItemClick}>
        <ColumnDesc><Avatar>{item.number}</Avatar></ColumnDesc>
        <ColumnDesc>{item.description}</ColumnDesc>
        <ColumnID className="col-xs-5 col-md-5">
          <IconButton
            iconClassName = "synicon-cloud-download"
            tooltip       = "Download solution file of this version"
            onClick       = {this.handleDownloadVersion.bind(this, item.data.url)} />
        </ColumnID>
        <ColumnID className="col-xs-5 col-md-5">
          {item.installations_count}
        </ColumnID>
        <ColumnDate date={item.created_at} />
      </Item>
    )
  },

  getList: function() {
    if (this.state.versions === null) {
      return;
    }

    var items = this.state.versions.map(function(item) {
      return this.renderItem(item)
    }.bind(this));

    if (items.length > 0) {
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }
    return (
      <EmptyListItem handleClick={this.props.emptyItemHandleClick}>
          {this.props.emptyItemContent}
      </EmptyListItem>
    )
  },

  render: function() {
    return (
      <ListContainer>
        <Header>
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          <ColumnDesc.Header>Description</ColumnDesc.Header>
          <ColumnID.Header className="col-xs-5 col-md-5">Download</ColumnID.Header>
          <ColumnID.Header className="col-xs-5 col-md-5">Installations</ColumnID.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <List>
          <Loading show={this.state.isLoading}>
            {this.getList()}
          </Loading>
        </List>
      </ListContainer>
    );
  }
});

