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
        labelStyle={{fontSize: 16}}
        iconStyle={{fill: '#000'}}
        onChange={(event, index, value) => this.transitionTo(value, this.getParams())}
        underlineStyle={{display: 'none'}}>
        <MenuItem value={'sockets'} primaryText="All Sockets" />
        <MenuItem value={'data'} primaryText="Data Endpoint" />
        <MenuItem value={'script-endpoints'} primaryText="Script Endpoint" />
        <MenuItem value={'triggers'} primaryText="Trigger Socket" />
        <MenuItem value={'schedules'} primaryText="Schedule Socket" />
        <MenuItem value={'channels'} primaryText="Channel Socket" />
      </DropDownMenu>
    );
  }
});

