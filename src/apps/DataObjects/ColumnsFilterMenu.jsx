import React from 'react';
import {Checkbox, IconMenu, ListItem, IconButton} from 'syncano-material-ui';

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
    };
  },

  componentWillReceiveProps(newProps) {
    this.setState({columns: newProps.columns});
  },

  handleMenuClick() {
    console.info('ColumnAvatarCheck:handleClick');
    this.props.handleIconClick(this.props.id, !this.state.checked);
  },

  handleClick(columnId) {
    this.props.checkToggleColumn(columnId);
  },

  renderMenuItems() {
    return this.state.columns.map((column) => {
      let checkbox = (
        <Checkbox
          checked={column.checked}
          onCheck={this.handleClick.bind(null, column.id)}/>
      );

      return (
        <ListItem
          key={column.id}
          id={column.id}
          primaryText={column.name}
          secondaryText={column.tooltip}
          leftCheckbox={checkbox}/>
      );
    });
  },

  render() {
    let mainIcon = <IconButton iconClassName="synicon-view-column"/>;

    return (
      <IconMenu
        closeOnItemTouchTap={false}
        iconButtonElement={mainIcon}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'middle'
        }}
        targetOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        {this.renderMenuItems()}
      </IconMenu>
    );
  }
});
