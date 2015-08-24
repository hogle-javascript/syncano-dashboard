import React from 'react';

import MUI from 'material-ui';

export default React.createClass({

  displayName: 'ColumnsFilterMenu',

  propTypes: {
    disabled: React.PropTypes.bool,
    columns: React.PropTypes.array
  },

  getInitialState() {
    return {
      disabled: this.props.disabled,
      columns: this.props.columns
    }
  },

  componentWillReceiveProps(newProps) {
    this.setState({columns: newProps.columns});
  },

  handleMenuClick() {
    console.info('ColumnAvatarCheck:handleClick');
    this.props.handleIconClick(this.props.id, !this.state.checked)
  },

  handleClick(columnId) {
    this.props.checkToggleColumn(columnId);
  },

  renderMenuItems() {
    return this.state.columns.map((column) => {
      let checkbox = (
        <MUI.Checkbox
          checked={column.checked}
          onCheck={this.handleClick.bind(null, column.id)}/>
      );

      return (
        <MUI.ListItem
          key={column.id}
          id={column.id}
          primaryText={column.name}
          secondaryText={column.tooltip}
          leftCheckbox={checkbox}/>
      )
    });
  },

  render() {
    let mainIcon = <MUI.IconButton iconClassName="synicon-view-column"/>;

    return (
      <MUI.IconMenu
        closeOnItemTouchTap={false}
        iconButtonElement={mainIcon}
        maxHeight="calc(100vh - 90px)"
        openDirection="bottom-left">
        {this.renderMenuItems()}
      </MUI.IconMenu>
    )
  }
});
