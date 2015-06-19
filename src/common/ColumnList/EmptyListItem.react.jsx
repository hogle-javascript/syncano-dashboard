var React           = require('react'),
    Radium          = require('radium'),

    mui             = require('material-ui'),
    StylePropable   = mui.Mixins.StylePropable,
    Paper           = mui.Paper,
    ListItem        = mui.ListItem,
    Avatar          = mui.Avatar,
    FontIcon        = mui.FontIcon;


module.exports = Radium(React.createClass({

  displayName: 'Item',

  mixins: [StylePropable],

  getStyles: function() {
    var style = {
      listItem: {
        display         : 'flex',
        marginBottom    : 0,
        border          : '1px dashed #ddd',
        backgroundColor : '#fff',
        paddingTop      : 8,
        paddingBottom   : 8,
        color           : 'rgba(0, 0, 0, 0.54)',
        fontSize        : 14
      },
      icon: {
        margin: 0
      },
      leftAvatar: {
        top: '50%',
        transform: 'translateY(-50%)'
      }
    };
    return this.mergeStyles(style, this.props.style);
  },

  render: function () {
    var style      = this.getStyles(),
        icon       = <FontIcon
                       className = "synicon-plus"
                       style     = {style.icon} />,
        leftAvatar = <Avatar
                       icon={icon}
                       style={style.leftAvatar} />;

    return (
      <ListItem
        className  = "empty-list-item"
        onClick    = {this.props.handleClick}
        style      = {style.listItem}
        leftAvatar = {leftAvatar}>
        {this.props.children}
      </ListItem>
    )
  }
}));
