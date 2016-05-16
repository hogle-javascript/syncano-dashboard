import React from 'react';
import {withRouter} from 'react-router';
import _ from 'lodash';

import Actions from './SocketsActions';
import Store from './SocketsStore';

import DataList from '../DataEndpoints/DataEndpointsList';
import ScriptEndpointsList from '../ScriptEndpoints/ScriptEndpointsList';
import TriggersList from '../Triggers/TriggersList';
import SchedulesList from '../Schedules/SchedulesList';
import ChannelsList from '../Channels/ChannelsList';
import {Show, ShowMore} from '../../common/';

const SocketsList = ({router, sockets, handleTitleClick, visibleItems = 3}, {params}) => {
  const lists = {
    data: DataList,
    scriptEndpoints: ScriptEndpointsList,
    triggers: TriggersList,
    schedules: SchedulesList,
    channels: ChannelsList
  };

  const onClickTitle = (pathName) => {
    if (_.isFunction(handleTitleClick)) {
      return handleTitleClick();
    }

    router.push({pathName, params});
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
            params={params}/>
        </Show>
      )}
    </div>
  );
};

SocketsList.contextTypes = {
  params: React.PropTypes.object
};

export default withRouter(SocketsList);
