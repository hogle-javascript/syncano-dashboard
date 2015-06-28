var React       = require('react'),
    classNames  = require('classnames'),

    mui         = require('material-ui'),
    Avatar      = mui.Avatar,
    Paper       = mui.Paper,
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

  getDefaultProps: function () {
  },

  getInitialState: function () {
    return {
      disabled: this.props.disabled,
      columns: this.props.columns
    }
  },

  getStyles: function() {
    return {
      icon: {
        margin: 0,
        padding: 0
      }
    };
  },

  componentWillReceiveProps: function(newProps) {
    this.setState({checked: newProps.checked});
  },

  handleMenuClick: function (event) {
    console.info('ColumnAvatarCheck:handleClick');
    this.props.handleIconClick(this.props.id, !this.state.checked)
  },

  renderMenuItems: function() {
    var styles = this.getStyles();
    return this.state.columns.map(function(column) {
      return (
        <MenuItem checked={true}>{column.name}</MenuItem>
      )
    })
  },

  render: function () {
    var styles = this.getStyles();

    var mainIcon = <IconButton iconClassName="synicon-view-column" />;

    return (
      <IconMenu iconButtonElement={mainIcon} openDirection="bottom-left" desktop={true}>
        {this.renderMenuItems()}
      </IconMenu>
    )
  }
});


