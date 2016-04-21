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

  render() {
    const {columns} = this.state;
    const {checkToggleColumn} = this.props;

    return (
      <IconMenu
        closeOnItemTouchTap={false}
        iconButtonElement={<IconButton iconClassName="synicon-view-column"/>}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'middle'
        }}
        targetOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}>
        {columns.map((column) => (
          <ListItem
            key={column.id}
            id={column.id}
            primaryText={column.name || column.id}
            secondaryText={column.tooltip}
            leftCheckbox={
              <Checkbox
                checked={column.checked}
                onCheck={() => checkToggleColumn(column.id)}/>
          }/>
        ))}
      </IconMenu>
    );
  }
});
