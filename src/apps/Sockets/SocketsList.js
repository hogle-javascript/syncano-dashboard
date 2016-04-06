import React from 'react';
import _ from 'lodash';

import Actions from './SocketsActions';
import Store from './SocketsStore';
import SessionStore from '../Session/SessionStore';

import DataList from '../DataEndpoints/DataEndpointsList';
import ScriptEndpointsList from '../ScriptEndpoints/ScriptEndpointsList';
import TriggersList from '../Triggers/TriggersList';
import SchedulesList from '../Schedules/SchedulesList';
import ChannelsList from '../Channels/ChannelsList';
import {Show} from 'syncano-components';
import {ShowMore} from '../../common';

export default ({sockets, handleTitleClick}) => {
  const router = SessionStore.getRouter();
  const visibleItems = 3;
  const lists = {
    data: DataList,
    scriptEndpoints: ScriptEndpointsList,
    triggers: TriggersList,
    schedules: SchedulesList,
    channels: ChannelsList
  };

  const onClickTitle = (routeName) => {
    const instanceName = router.getCurrentParams().instanceName;

    if (_.isFunction(handleTitleClick)) {
      return handleTitleClick();
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
            getCheckedItems: () => Store.getCheckedItems(socketName),
            checkItem: (checkId, value, itemKeyName) => Actions.checkItem(checkId, value, itemKeyName, socketName),
            handleSelectAll: () => Actions.selectAll(socketName),
            handleUnselectAll: () => Actions.uncheckAll(socketName),
            items: sockets[socketName].slice(0, visibleItems),
            handleTitleClick: () => onClickTitle(_.kebabCase(socketName))
          })}
          <ShowMore
            style={{margin: '-30px 0 40px 0'}}
            visible={sockets[socketName].length > visibleItems}
            routeName={_.kebabCase(socketName)}
            params={router.getCurrentParams()}/>
        </Show>
      )}
    </div>
  );
};
