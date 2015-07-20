var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionActions    = require('../Session/SessionActions'),
    SessionStore      = require('../Session/SessionStore'),
    AdminsActions     = require('./AdminsActions'),
    AdminsStore       = require('./AdminsStore'),

    // Components
    mui               = require('material-ui'),
    Colors            = require('material-ui/lib/styles/colors'),

    // List
    Loading           = require('../../common/Loading'),
    Lists             = require('../../common/Lists'),
    ColumnList        = require('../../common/ColumnList'),
    ColumnDate        = require('../../common/ColumnList/Column/Date.react'),
    ColumnID          = require('../../common/ColumnList/Column/ID.react'),
    ColumnDesc        = require('../../common/ColumnList/Column/Desc.react'),
    ColumnKey         = require('../../common/ColumnList/Column/Key.react'),
    ColumnCheckIcon   = require('../../common/ColumnList/Column/CheckIcon.react');

module.exports = React.createClass({

  displayName: 'AdminsList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  getInitialState: function() {
    return {
      items     : this.props.items,
      isLoading : this.props.isLoading
    }
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({
      items     : nextProps.items,
      isLoading : nextProps.isLoading
    })
  },

  handleItemIconClick: function(id, state) {
    this.props.checkItem(id, state);
  },

  getStyles: function() {
    return {
      ownerLabel: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 14,
        marginTop: 4
      }
    }
  },

  renderItem: function(item) {
    var styles  = this.getStyles(),
        isOwner = item.id === SessionStore.getInstance().owner.id;

    return (
      <ColumnList.Item
        checked   = {item.checked}
        key       = {item.id}>
        <ColumnCheckIcon
          className       = "col-xs-25 col-md-20"
          id              = {item.id.toString()}
          icon            = 'account'
          background      = {Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
          checkable       = {!isOwner}>
          <div>
            <div>
              {item.email}
            </div>
            <div style={styles.ownerLabel}>
              {isOwner ? "Owner (cannot be edited)" : null}
            </div>
          </div>
        </ColumnCheckIcon>
        <ColumnDesc>{item.role}</ColumnDesc>
        <ColumnDate date={item.created_at} />
      </ColumnList.Item>
    )
  },

  getList: function() {
    var items = this.state.items || [];

    if (items.length > 0) {
      items = this.state.items.map(function(item) {
        return this.renderItem(item)
      }.bind(this));

      return items;
    }
    return (
        <ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
          {this.props.emptyItemContent}
        </ColumnList.EmptyItem>
    );
  },

  render: function() {
    return (
      <Lists.Container>
        <ColumnList.Header>
          <ColumnCheckIcon.Header className="col-xs-25 col-md-20">{this.props.name}</ColumnCheckIcon.Header>
          <ColumnDesc.Header>Role</ColumnDesc.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </ColumnList.Header>
        <Lists.List>
          <Loading show={this.state.isLoading}>
            {this.getList()}
          </Loading>
        </Lists.List>
      </Lists.Container>
    );
  }
});

