import React from 'react';
import { withRouter } from 'react-router';

import { colors as Colors } from 'material-ui/styles';
import { ColumnList, Loading, Container, Lists, ShowMore, EmptyView } from '../../common/';
import APNSMessageListItem from './APNS/APNSMessageListItem';
import GCMMessageListItem from './GCM/GCMMessageListItem';

const Column = ColumnList.Column;

const PushMessagesList = React.createClass({
  displayName: 'PushMessagesList',

  contextTypes: {
    params: React.PropTypes.object
  },

  getStyles() {
    return {
      title: {
        color: Colors.grey400,
        fontSize: 18,
        fontWeight: 500,
        marginBottom: 20
      },
      status: {
        marginLeft: 64
      }
    };
  },

  redirectToPushDevices() {
    const { router, type } = this.props;
    const { params } = this.context;
    const redirectRouteMap = {
      GCM: 'gcm-devices',
      APNS: 'apns-devices'
    };

    router.push({ name: redirectRouteMap[type], params });
  },

  renderItem(item) {
    const { type } = this.props;
    const listItem = {
      APNS: (
        <APNSMessageListItem
          devicesIcon="synicon-cellphone-iphone"
          item={item}
        />
      ),
      GCM: (
        <GCMMessageListItem
          devicesIcon="synicon-cellphone-android"
          item={item}
        />
      )
    };

    return listItem[type];
  },

  render() {
    const { params } = this.context;
    const { title, router, type, items, isLoading } = this.props;
    const styles = this.getStyles();
    const isAllMessagesRouteActive = router.isActive({ name: 'all-push-notification-messages', params });
    const visibleItems = 3;
    const slicedItems = isAllMessagesRouteActive ? items.slice(0, visibleItems) : items;
    const routesMap = {
      APNS: 'apns-messages',
      GCM: 'gcm-messages'
    };

    return (
      <Container>
        <div style={styles.title}>
          {title}
        </div>
        <Loading show={isLoading}>
          {!items || !items.length
            ? <EmptyView.PushMessages handleClickSend={this.redirectToPushDevices} />
            : <Lists.Container>
              <ColumnList.Header>
                <Column.ColumnHeader
                  columnName="CHECK_ICON"
                  className="col-sm-8"
                >
                  <div style={styles.status}>
                    Status
                  </div>
                </Column.ColumnHeader>
                <Column.ColumnHeader
                  columnName="DESC"
                  className="col-sm-13"
                >
                  Message
                </Column.ColumnHeader>
                <Column.ColumnHeader columnName="DESC">
                  Environment
                </Column.ColumnHeader>
                <Column.ColumnHeader columnName="DESC">
                  Devices
                </Column.ColumnHeader>
                <Column.ColumnHeader columnName="DATE">
                  Sent
                </Column.ColumnHeader>
              </ColumnList.Header>
              <Lists.List
                items={slicedItems}
                renderItem={this.renderItem}
              />
            </Lists.Container>}
          <ShowMore
            style={{ margin: '-30px 0 40px 0' }}
            visible={items.length > visibleItems && isAllMessagesRouteActive}
            routeName={routesMap[type]}
            params={params}
          />
        </Loading>
      </Container>
    );
  }
});

export default withRouter(PushMessagesList);
