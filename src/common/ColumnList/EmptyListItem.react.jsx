var React           = require('react'),

    mui             = require('material-ui'),
    StylePropable   = mui.Mixins.StylePropable,
    Paper           = mui.Paper,
    ListItem        = mui.ListItem,
    Avatar          = mui.Avatar,
    FontIcon        = mui.FontIcon;

require('./EmptyListItem.sass');

module.exports = React.createClass({

  displayName: 'Item',

  mixins: [StylePropable],

  getStyles: function() {
    var style = {
      listItem: {
        display: 'flex',
        marginBottom: '0px',
        border: '1px dashed #ddd',
        backgroundColor: '#fff',
        paddingTop: 8,
        paddingBottom: 8
      },
      leftAvatar: {
        margin: 0
      }
    };
    return this.mergeStyles(style, this.props.style);
  },

  render: function () {
    var style      = this.getStyles(),
        icon       = <FontIcon className="synicon-plus" style={style.leftAvatar} />,
        leftAvatar = <Avatar icon={icon} />;

    return (
      <ListItem
        className="empty-list-item"
        onClick={this.props.handleClick}
        style={style.listItem}
        leftAvatar={leftAvatar}>
        {this.props.children}
      </ListItem>
    )
  }
});
