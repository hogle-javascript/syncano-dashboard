var React       = require('react'),

    mui         = require('material-ui'),
    IconButton  = mui.IconButton,
    IconMenu    = mui.IconMenu,
    Checkbox    = mui.Checkbox,
    ListItem    = mui.ListItem;

module.exports = React.createClass({

  displayName: 'ColumnsFilterMenu',

  propTypes: {
    disabled : React.PropTypes.bool,
    columns  : React.PropTypes.object
  },

  getInitialState: function() {
    return {
      disabled: this.props.disabled,
      columns: this.props.columns
    }
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({columns: newProps.columns});
  },

  handleMenuClick: function() {
    console.info('ColumnAvatarCheck:handleClick');
    this.props.handleIconClick(this.props.id, !this.state.checked)
  },

  handleClick: function(columnId) {
    this.props.checkToggleColumn(columnId);
  },

  renderMenuItems: function() {
    return this.state.columns.map(function(column) {
      return (
        <ListItem
          id            = {column.id}
          primaryText   = {column.name}
          secondaryText = {column.tooltip}
          leftCheckbox  = {<Checkbox
                             checked = {column.checked}
                             onCheck = {this.handleClick.bind(null, column.id)}
                           />}
        />
      )
    }.bind(this))
  },

  render: function() {
    var mainIcon = <IconButton iconClassName="synicon-view-column" />;

    return (
      <IconMenu
        closeOnItemTouchTap = {false}
        iconButtonElement   = {mainIcon}
        openDirection       = "bottom-left">
        {this.renderMenuItems()}
      </IconMenu>
    )
  }
});
