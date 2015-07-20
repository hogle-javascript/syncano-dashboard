var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),
    _                 = require('lodash'),
    Radium            = require('radium'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionActions    = require('../Session/SessionActions'),
    GroupsActions     = require('./GroupsActions'),
    GroupsStore       = require('./GroupsStore'),

    // Components
    MUI               = require('material-ui'),
    MenuItem          = require('material-ui/lib/menus/menu-item'),

    // List
    EmptyListItem     = require('../../common/ColumnList/EmptyListItem.react'),
    Header            = require('../../common/ColumnList/Header.react'),
    Loading           = require('../../common/Loading/Loading.react'),
    ColumnCheckIcon   = require('../../common/ColumnList/Column/CheckIcon.react');

module.exports = Radium(React.createClass({

  displayName: 'GroupsList',

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

  handleIconMenuButtonClick: function(event) {
    event.stopPropagation();
  },

  getStyles: function() {
    return {
      list: {
        paddingTop    : 0,
        paddingBottom : 0
      },
      listItemChecked: {
        background: MUI.Styles.Colors.lightBlue50
      }
    }
  },

  renderItem: function(item) {
    var itemActive        = this.props.activeGroup && this.props.activeGroup.id === item.id;
    var styles            = this.getStyles();
    var itemStyles        = itemActive ? styles.listItemChecked : {};
    var iconButtonElement = <MUI.IconButton
                                touch           = {true}
                                tooltipPosition = 'bottom-left'
                                iconClassName   = 'synicon-dots-vertical'
                            />;

    var rightIconMenu = (
      <MUI.IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem onTouchTap={this.props.handleGroupAddUser.bind(null, item)}>Add User</MenuItem>
        <MenuItem onTouchTap={this.props.handleGroupEdit.bind(null, item)}>Edit Group</MenuItem>
        <MenuItem onTouchTap={this.props.handleGroupDelete.bind(null, item)}>Delete</MenuItem>
      </MUI.IconMenu>
    );

    return (
      <MUI.ListItem
        key             = {item.id}
        innerDivStyle   = {itemStyles}
        onMouseDown     = {this.props.handleItemClick.bind(null, item)}
        rightIconButton = {rightIconMenu}
      >
        {item.label}
      </MUI.ListItem>
    )
  },

  getList: function() {
    var styles          = this.getStyles(),
        items           = this.state.items,
        itemsCount      = items.length,
        indexOfListItem = itemsCount - 1,
        listItems       = this.state.items.map(function(item, index) {
          if (index < indexOfListItem) {
            return [
              this.renderItem(item),
              <MUI.ListDivider />
            ];
          }
          return this.renderItem(item);
        }.bind(this));

    if (items.length > 0) {
      return (
        <MUI.List
          style  = {styles.list}
          zDepth = {1}
        >
          {listItems}
        </MUI.List>
      );
    }

    return (
      <EmptyListItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </EmptyListItem>
    )
  },

  render: function() {
    return (
      <div>
        <Header>
          <ColumnCheckIcon.Header className="col-flex-1">{this.props.name}</ColumnCheckIcon.Header>
        </Header>
        <Loading show={this.state.isLoading}>
          {this.getList()}
        </Loading>
      </div>
    );
  }
}));

