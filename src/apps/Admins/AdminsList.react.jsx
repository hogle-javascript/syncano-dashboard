import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';

// Components
import MUI from 'material-ui';

// List
import Loading from '../../common/Loading';
import Lists from '../../common/Lists';
import ColumnList from '../../common/ColumnList';
import ColumnDate from '../../common/ColumnList/Column/Date.react';
import ColumnID from '../../common/ColumnList/Column/ID.react';
import ColumnDesc from '../../common/ColumnList/Column/Desc.react';
import ColumnKey from '../../common/ColumnList/Column/Key.react';
import ColumnCheckIcon from '../../common/ColumnList/Column/CheckIcon.react';

export default React.createClass({

  displayName: 'AdminsList',

  mixins: [
    HeaderMixin,
    Router.State,
    Router.Navigation
  ],

  getInitialState() {
    return {
      items     : this.props.items,
      isLoading : this.props.isLoading
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      items     : nextProps.items,
      isLoading : nextProps.isLoading
    })
  },

  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
  },

  getStyles() {
    return {
      ownerLabel: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: 14,
        marginTop: 4
      }
    }
  },

  renderItem(item) {
    var styles  = this.getStyles(),
        isOwner = item.id === SessionStore.getInstance().owner.id;

    return (
      <ColumnList.Item
        checked   = {item.checked}
        key       = {item.id}
      >
        <ColumnCheckIcon
          className       = "col-xs-25 col-md-20"
          id              = {item.id.toString()}
          icon            = 'account'
          background      = {MUI.Styles.Colors.blue500}
          checked         = {item.checked}
          handleIconClick = {this.handleItemIconClick}
          checkable       = {!isOwner}
        >
          <div>
            <div>{item.email}</div>
            <div style={styles.ownerLabel}>
              {isOwner ? "Owner (cannot be edited)" : null}
            </div>
          </div>
        </ColumnCheckIcon>
        <ColumnDesc>{item.role}</ColumnDesc>
        <ColumnDate date={item.created_at} />
      </ColumnList.Item>
    )
  },

  getList() {
    var items = this.state.items || [];

    if (items.length > 0) {
      items = this.state.items.map(item => {
        return this.renderItem(item)
      });

      return items;
    }
    return (
      <ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
        {this.props.emptyItemContent}
      </ColumnList.EmptyItem>
    );
  },

  render() {
    return (
      <Lists.Container>
        <ColumnList.Header>
          <ColumnCheckIcon.Header className="col-xs-25 col-md-20">{this.props.name}</ColumnCheckIcon.Header>
          <ColumnDesc.Header>Role</ColumnDesc.Header>
          <ColumnDate.Header>Created</ColumnDate.Header>
        </ColumnList.Header>
        <Lists.List>
          <Loading show={this.state.isLoading}>
            {this.getList()}
          </Loading>
        </Lists.List>
      </Lists.Container>
    );
  }
});

