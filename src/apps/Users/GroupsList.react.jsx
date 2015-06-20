var React             = require('react'),
    Reflux            = require('reflux'),
    Router            = require('react-router'),

    // Utils
    HeaderMixin       = require('../Header/HeaderMixin'),
    ButtonActionMixin = require('../../mixins/ButtonActionMixin'),

    // Stores and Actions
    SessionActions    = require('../Session/SessionActions'),
    GroupsActions     = require('./GroupsActions'),
    GroupsStore       = require('./GroupsStore'),

    // Components
    mui               = require('material-ui'),
    Colors            = require('material-ui/lib/styles/colors'),
    FontIcon          = mui.FontIcon,
    DropDownIcon      = mui.DropDownIcon,

    // List
    ListContainer     = require('../../common/Lists/ListContainer.react'),
    List              = require('../../common/Lists/List.react'),
    Item              = require('../../common/ColumnList/Item.react'),
    EmptyListItem     = require('../../common/ColumnList/EmptyListItem.react'),
    Header            = require('../../common/ColumnList/Header.react'),
    LoadingItem       = require('../../common/ColumnList/LoadingItem.react'),
    ColumnDate        = require('../../common/ColumnList/Column/Date.react'),
    ColumnID          = require('../../common/ColumnList/Column/ID.react'),
    ColumnDesc        = require('../../common/ColumnList/Column/Desc.react'),
    ColumnKey         = require('../../common/ColumnList/Column/Key.react'),
    ColumnCheckIcon   = require('../../common/ColumnList/Column/CheckIcon.react');


module.exports = React.createClass({

  displayName: 'GroupsList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation,
  ],

  getInitialState() {
    return {
      items     : this.props.items,
      isLoading : this.props.isLoading,
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      items     : nextProps.items,
      isLoading : nextProps.isLoading
    })
  },

  // List
  handleItemIconClick: function (id, state) {
    this.props.checkItem(id, state);
  },

  renderItem: function (item) {

    return (
      <Item key={item.id}>
        <ColumnCheckIcon
          id              = {item.id.toString()}
          icon            = 'account-multiple'
          background      = {Colors.blue200}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick} >
          {item.label}
        </ColumnCheckIcon>
        <ColumnID>{item.id}</ColumnID>
        <ColumnDesc>
        </ColumnDesc>
      </Item>
    )
  },

  getList: function () {
    if (this.state.isLoading) {
      return <LoadingItem />;
    }

    var items = this.state.items.map(function (item) {
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

  render: function () {
    return (
      <ListContainer style={{width: '100%'}}>
        <Header>
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          <ColumnID.Header>ID</ColumnID.Header>
          <ColumnDesc.Header></ColumnDesc.Header>
        </Header>
        <List>
          {this.getList()}
        </List>
      </ListContainer>
    );
  }
});

