import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import ButtonActionMixin from '../../mixins/ButtonActionMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import SolutionEditActions from './SolutionEditActions';
import SolutionEditStore from './SolutionEditStore';

// Components
import MUI from 'material-ui';

// List
import Lists from '../../common/Lists';
import EmptyListItem from '../../common/ColumnList/EmptyListItem.react';
import Item from '../../common/ColumnList/Item.react';
import Header from '../../common/ColumnList/Header.react';
import Loading from '../../common/Loading/Loading.react';
import ColumnDate from '../../common/ColumnList/Column/Date.react';
import ColumnDesc from '../../common/ColumnList/Column/Desc.react';
import ColumnID from '../../common/ColumnList/Column/ID.react';
import ColumnText from '../../common/ColumnList/Column/Text.react';
import ColumnKey from '../../common/ColumnList/Column/Key.react';
import ColumnCheckIcon from '../../common/ColumnList/Column/CheckIcon.react';

export default React.createClass({

  displayName: 'SolutionVersionsList',

  mixins: [

    HeaderMixin,
    Router.State,
    Router.Navigation,

    Reflux.connect(SolutionEditStore)
  ],

  // List
  handleItemIconClick(id, state) {
    SolutionEditActions.checkItem(id, state);
  },

  handleItemClick(className) {
    //SessionStore.getRouter().transitionTo(
    //  'classes-data-objects',
    //  {
    //    instanceName : SessionStore.getInstance().name,
    //    className    : className
    //  }
    //);
    //console.info('SolutionVersionsList::handleItemClick');
  },

  handleDownloadVersion(url) {
    window.open(url, '_blank');
  },

  renderItem(item) {

    return (
      <Item
        key          = {item.id}
        id           = {item.id}
        handleClick  = {this.handleItemClick}
      >
        <ColumnDesc><Avatar>{item.number}</Avatar></ColumnDesc>
        <ColumnDesc>{item.description}</ColumnDesc>
        <ColumnID className="col-xs-5 col-md-5">
          <IconButton
            iconClassName = "synicon-cloud-download"
            tooltip       = "Download solution file of this version"
            onClick       = {this.handleDownloadVersion.bind(this, item.data.url)}
          />
        </ColumnID>
        <ColumnID className="col-xs-5 col-md-5">
          {item.installations_count}
        </ColumnID>
        <ColumnDate date={item.created_at} />
      </Item>
    )
  },

  getList() {
    if (this.state.versions === null) {
      return;
    }

    var items = this.state.versions.map(item => {
      return this.renderItem(item);
    });

    if (items.length > 0) {
      // TODO: Fix this dirty hack, that should be done in store by sorting!
      items.reverse();
      return items;
    }
    return (
      <EmptyListItem handleClick={this.props.emptyItemHandleClick}>
          {this.props.emptyItemContent}
      </EmptyListItem>
    )
  },

  render() {
    return (
      <Lists.Container>
        <Header>
          <ColumnCheckIcon.Header>{this.props.name}</ColumnCheckIcon.Header>
          <ColumnDesc.Header>Description</ColumnDesc.Header>
          <ColumnID.Header className="col-xs-5 col-md-5">Download</ColumnID.Header>
          <ColumnID.Header className="col-xs-5 col-md-5">Installations</ColumnID.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </Header>
        <Lists.List>
          <Loading show={this.state.isLoading}>
            {this.getList()}
          </Loading>
        </Lists.List>
      </Lists.Container>
    );
  }
});

