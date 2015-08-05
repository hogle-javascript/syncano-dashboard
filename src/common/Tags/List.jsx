import React from 'react';
import MUI from 'material-ui';

export default React.createClass({

  displayName: 'TagsList',

  getStyles() {
    return {
      listItemChecked: {
        background: MUI.Styles.Colors.lightBlue50
      }
    }
  },

  getInitialState() {
    return {
      items: this.props.items,
      selectedItems: this.props.selectedItems,
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      selectedItems: nextProps.selectedItems,
    })
  },

  handleOnTouchTap(name) {
    if (this.props.toggleTagSelection) {
      this.props.toggleTagSelection(name);
    }
  },

  render() {
    let styles = this.getStyles();

    let tags = this.state.items.map(item => {
      return (
        <MUI.ListItem
          key={item.name}
          primaryText={item.name}
          rightAvatar={<div style={{marginTop: 12, color: 'grey'}}>{item.count}</div>}
          innerDivStyle={this.state.selectedItems.indexOf(item.name) > -1 ? styles.listItemChecked : {}}
          onTouchTap={this.handleOnTouchTap.bind(this, item.name)}/>
      )
    });
    return (
      <MUI.List zDepth={1} subheader="Tags">
        {tags}
      </MUI.List>
    );
  }
});
