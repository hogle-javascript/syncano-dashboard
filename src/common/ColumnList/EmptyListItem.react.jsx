import React from 'react';
import Radium from 'radium';

import MUI from 'material-ui';

export default Radium(React.createClass({

  displayName: 'Item',

  mixins: [MUI.Mixins.StylePropable],

  getStyles() {
    let styles = {
      listItem: {
        display: '-webkit-flex; display: flex',
        marginBottom: 0,
        border: '1px dashed #ddd',
        backgroundColor: '#fff',
        paddingTop: 8,
        paddingBottom: 8,
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 14
      },
      icon: {
        margin: 0,
        height: 40,
        display: '-webkit-flex; display: flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      leftAvatar: {
        top: '50%',
        transform: 'translateY(-50%)'
      }
    };
    return this.mergeStyles(styles, this.props.style);
  },

  render() {
    let styles = this.getStyles();
    let icon = <MUI.FontIcon
        className="synicon-plus"
        style={styles.icon}/>;
    let leftAvatar = <MUI.Avatar
        icon={icon}
        style={styles.leftAvatar}/>;

    return (
      <MUI.ListItem
        className="empty-list-item"
        onTouchTap={this.props.handleClick}
        style={styles.listItem}
        leftAvatar={leftAvatar}>
        {this.props.children}
      </MUI.ListItem>
    )
  }
}));
