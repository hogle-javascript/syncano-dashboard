import React from 'react';
import {State, Navigation} from 'react-router';
import {DropDownMenu, MenuItem} from 'syncano-material-ui';

export default React.createClass({
  displayName: 'SocketsDropdown',

  mixins: [
    State,
    Navigation
  ],

  getActiveItem() {
    const lastItem = this.getRoutes()[this.getRoutes().length - 1].name;
    const notLastItem = this.getRoutes()[this.getRoutes().length - 2].name;

    return lastItem ? lastItem : notLastItem;
  },

  render() {
    return (
      <DropDownMenu
        value={this.getActiveItem()}
        labelStyle={{fontSize: 20, color: 'rgba(0, 0, 0, 0.4)'}}
        iconStyle={{fill: 'rgba(0, 0, 0, 0.4)'}}
        onChange={(event, index, value) => this.transitionTo(value, this.getParams())}
        underlineStyle={{display: 'none'}}>
        <MenuItem value={'sockets'} primaryText="All" />
        <MenuItem value={'data'} primaryText="Data Endpoint" />
        <MenuItem value={'script-endpoints'} primaryText="Script Endpoint" />
        <MenuItem value={'triggers'} primaryText="Trigger" />
        <MenuItem value={'schedules'} primaryText="Schedule" />
        <MenuItem value={'channels'} primaryText="Channel" />
      </DropDownMenu>
    );
  }
});

