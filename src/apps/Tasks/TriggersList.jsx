import React from 'react';
import Router from 'react-router';

import Actions from './TriggersActions';
import Store from './TriggersStore';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Components
import ListItem from './TriggersListItem';
import Common from '../../common';
let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'TriggersList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    Mixins.Dialogs,
    Mixins.List
  ],

  getInitialState() {
    return {};
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('Tasks::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  handleItemIconClick(id, state) {
    this.props.checkItem(id, state);
  },

  handleItemClick(itemId) {
    // Redirect to traces screen
    this.transitionTo('trigger-traces', {
      instanceName: this.getParams().instanceName,
      triggerId: itemId
    });
  },

  handleRemoveTriggers() {
    console.info('Tasks::handleDelete');
    Actions.removeTriggers(Store.getCheckedItems());
  },

  // Dialogs config
  initDialogs() {
    let checkedTriggers = Store.getCheckedItems();

    return [
      {
        dialog: Common.Dialog,
        params: {
          key: 'removeTriggerDialog',
          ref: 'removeTriggerDialog',
          title: 'Delete a Trigger',
          actions: [
            {
              text: 'Cancel',
              onClick: this.handleCancel.bind(null, 'removeTriggerDialog')
            },
            {
              text: 'Confirm',
              onClick: this.handleRemoveTriggers
            }
          ],
          modal: true,
          children: [
            'Do you really want to delete ' + this.getDialogListLength(checkedTriggers) + ' Trigger(s)?',
            this.getDialogList(checkedTriggers, 'label'),
            <Common.Loading
              type='linear'
              position='bottom'
              show={this.state.triggers.isLoading}/>
          ]
        }
      }
    ];
  },

  renderItem(item) {
    return <ListItem onIconClick={this.handleItemIconClick} item={item}/>;
  },

  render() {
    return (
      <Common.Lists.Container className="triggers-list">
        <Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-sm-6">
            CodeBox
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-sm-6">
            Class
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Signal</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU"/>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.props.isLoading}>
            {this.renderList()}
          </Common.Loading>
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
});

