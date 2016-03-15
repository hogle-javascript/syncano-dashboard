import React from 'react';
import _ from 'lodash';

import Actions from './SocketsActions';
import Store from './SocketsStore';

import DataList from '../Data/DataViewsList';
import ScriptEndpointsList from '../ScriptEndpoints/ScriptEndpointsList';
import TriggersList from '../Triggers/TriggersList';
import SchedulesList from '../Schedules/SchedulesList';
import ChannelsList from '../Channels/ChannelsList';
import {Show} from 'syncano-components';

export default ({sockets}) => {
  const lists = {
    data: DataList,
    scripts: ScriptEndpointsList,
    triggers: TriggersList,
    schedules: SchedulesList,
    channels: ChannelsList
  };

  const socketLists = _.map(lists, (list, key) => {
    return (
      <Show
        key={`${key}SocketsList`}
        if={sockets[key].length}>
        {React.createElement(list, {
          checkedItems: Store.getCheckedItems(key),
          checkItem: (checkId, value, itemKeyName) => Actions.checkItem(checkId, value, itemKeyName, key),
          handleSelectAll: () => Actions.selectAll(key),
          handleUnselectAll: () => Actions.uncheckAll(key),
          items: sockets[key]
        })}
      </Show>
    );
  });

  return (
    <div>
      {socketLists}
    </div>
  );
};
