import React from 'react';
import _ from 'lodash';

import Actions from './SocketsActions';
import Store from './SocketsStore';
import SessionStore from '../Session/SessionStore';

import DataList from '../Data/DataEndpointsList';
import ScriptEndpointsList from '../ScriptEndpoints/ScriptEndpointsList';
import TriggersList from '../Triggers/TriggersList';
import SchedulesList from '../Schedules/SchedulesList';
import ChannelsList from '../Channels/ChannelsList';
import {Show} from 'syncano-components';

export default ({sockets, handleTitleClick}) => {
  const lists = {
    data: DataList,
    scriptEndpoints: ScriptEndpointsList,
    triggers: TriggersList,
    schedules: SchedulesList,
    channels: ChannelsList
  };

  const onClickTitle = (routeName) => {
    const router = SessionStore.getRouter();
    const instanceName = router.getCurrentParams().instanceName;

    if (_.isFunction(handleTitleClick)) {
      handleTitleClick();
      return;
    }

    router.transitionTo(routeName, {instanceName});
  };

  return (
    <div>
      {_.map(lists, (list, socketName) =>
        <Show
          key={`${socketName}SocketsList`}
          if={sockets[socketName].length}>
          {React.createElement(list, {
            checkedItems: Store.getCheckedItems(socketName),
            checkItem: (checkId, value, itemKeyName) => Actions.checkItem(checkId, value, itemKeyName, socketName),
            handleSelectAll: () => Actions.selectAll(socketName),
            handleUnselectAll: () => Actions.uncheckAll(socketName),
            items: sockets[socketName],
            handleTitleClick: () => onClickTitle(socketName)
          })}
        </Show>
      )}
    </div>
  );
};
