var React       = require('react'),
    classNames  = require('classnames'),

    mui         = require('material-ui'),
    Avatar      = mui.Avatar,
    Paper       = mui.Paper,
    FontIcon    = mui.FontIcon,
    IconButton  = mui.IconButton,
    IconMenu    = mui.IconMenu,
    Menu        = require('material-ui/lib/menus/menu'),
    MenuItem    = require('material-ui/lib/menus/menu-item'),

    Colors      = mui.Styles.Colors;

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

  handleClick: function(event) {
    this.props.checkToggleColumn(event.target.id);
  },

  renderMenuItems: function() {
    return this.state.columns.map(function(column) {
      var iconClass = 'synicon-checkbox-blank-outline';
      if (column.checked) {
        iconClass = 'synicon-checkbox-marked';
      }
      return (
        <MenuItem
          id      = {column.id}
          onClick = {this.handleClick}>
          <div>
          <FontIcon
            id        = {column.id}
            className = {iconClass} />
          </div>
          <div>
            <div>{column.name}</div>
            <div>{column.tooltip}</div>
          </div>

        </MenuItem>
      )
    }.bind(this))
  },

  render: function() {
    var mainIcon = <IconButton iconClassName="synicon-view-column" />;

    return (
      <IconMenu
        closeAfterTap     = {false}
        iconButtonElement = {mainIcon}
        openDirection     = "bottom-left"
        desktop           = {true}>
        {this.renderMenuItems()}
      </IconMenu>
    )
  }
});
