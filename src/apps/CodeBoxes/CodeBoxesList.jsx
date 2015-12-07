import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import _ from 'lodash';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import Mixins from '../../mixins';

// Stores and Actions
import Actions from './CodeBoxesActions';
import Store from './CodeBoxesStore';

// Components
import ListItem from './CodeBoxesListItem';
import {IconMenu} from 'syncano-material-ui';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';
import Common from '../../common';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'CodeBoxesList',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    HeaderMixin,
    Mixins.Dialog,
    Mixins.Dialogs,
    Mixins.List
  ],

  componentWillUpdate(nextProps, nextState) {
    console.info('CodeBoxes::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  getAssociatedCodeBoxes(associatedWith) {
    let checkedCodeBoxes = Store.getCheckedItems();

    let associatedCodeBoxes = _.filter(checkedCodeBoxes, (codeBox) => {
      codeBox[associatedWith] = _.pluck(_.filter(this.state[associatedWith], 'codebox', codeBox.id), 'label');
      return codeBox[associatedWith].length > 0;
    });

    return associatedCodeBoxes;
  },

  getAssociationsList(associationsFor, associatedItems) {
    let hasItems = associatedItems.length > 0;
    let list = {
      schedules: null,
      triggers: null,
      notAssociated: null
    };

    if (hasItems) {
      list.schedules = (
        <div>
          Associated with Schedules: {this.getDialogList(associatedItems, 'label', associationsFor)}
        </div>
      );
      list.triggers = (
        <div>
          Associated with Triggers: {this.getDialogList(associatedItems, 'label', associationsFor)}
        </div>
      );
      list.notAssociated = (
        <div>
          Not associated: {this.getDialogList(associatedItems, 'label')}
        </div>
      );
    }

    return list[associationsFor];
  },

  handleItemIconClick(id, state) {
    Actions.checkItem(id, state);
  },

  handleDelete() {
    console.info('CodeBoxes::handleDelete');
    Actions.removeCodeBoxes(Store.getCheckedItems());
  },

  initDialogs() {
    let checkedCodeBoxes = Store.getCheckedItems();
    let codeboxesAssociatedWithTriggers = this.getAssociatedCodeBoxes('triggers');
    let codeboxesAssociatedWithSchedules = this.getAssociatedCodeBoxes('schedules');
    let codeboxesNotAssociated = _.difference(_.difference(checkedCodeBoxes, codeboxesAssociatedWithSchedules),
      codeboxesAssociatedWithTriggers);

    if (codeboxesAssociatedWithSchedules.length > 0 || codeboxesAssociatedWithTriggers.length > 0) {
      let associatedWithSchedulesList = this.getAssociationsList('schedules', codeboxesAssociatedWithSchedules);
      let associatedWithTriggersList = this.getAssociationsList('triggers', codeboxesAssociatedWithTriggers);
      let notAssociatedList = this.getAssociationsList('notAssociated', codeboxesNotAssociated);

      return [{
        dialog: Common.Dialog,
        params: {
          key: 'deleteCodeBoxDialog',
          ref: 'deleteCodeBoxDialog',
          title: 'Delete a CodeBox',
          actions: [
            {
              text: 'Cancel',
              onClick: this.handleCancel.bind(null, 'deleteCodeBoxDialog')
            },
            {
              text: 'Confirm',
              onClick: this.handleDelete
            }
          ],
          modal: true,
          avoidResetState: true,
          children: [
            'Some of checked CodeBoxes are associated with Schedules or Triggers. Do you really want to delete ' +
            checkedCodeBoxes.length + ' CodeBox(es)?',
            notAssociatedList,
            associatedWithSchedulesList,
            associatedWithTriggersList,
            <Common.Loading
              type="linear"
              position="bottom"
              show={this.state.isLoading}/>
          ]
        }
      }];
    }

    return [{
      dialog: Common.Dialog,
      params: {
        key: 'deleteCodeBoxDialog',
        ref: 'deleteCodeBoxDialog',
        title: 'Delete a CodeBox',
        actions: [
          {
            text: 'Cancel',
            onClick: this.handleCancel.bind(null, 'deleteCodeBoxDialog')
          },
          {
            text: 'Confirm',
            onClick: this.handleDelete
          }
        ],
        modal: true,
        avoidResetState: true,
        children: [
          'Do you really want to delete ' + this.getDialogListLength(checkedCodeBoxes) + ' CodeBox(es)?',
          this.getDialogList(checkedCodeBoxes, 'label'),
          <Common.Loading
            type="linear"
            position="bottom"
            show={this.state.isLoading}/>
        ]
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        onIconClick={this.handleItemIconClick}
        item={item}
        showDeleteDialog={this.showMenuDialog.bind(null, item.label, Actions.removeCodeBoxes.bind(null, [item]))}
      />);
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Common.Lists.Container>
        {this.getDialogs()}
        <Column.MenuDialog ref="menuDialog"/>
        <Common.ColumnList.Header>
          <Column.ColumnHeader
            primary={true}
            columnName="CHECK_ICON">
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="ID">ID</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DESC">Description</Column.ColumnHeader>
          <Column.ColumnHeader columnName="DATE">Created</Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <IconMenu iconButtonElement={this.renderListIconMenuButton()}>
              <MenuItem
                primaryText="Delete Snippet(s)"
                disabled={!checkedItems}
                onTouchTap={this.showDialog.bind(null, 'deleteCodeBoxDialog')}/>
              <MenuItem
                primaryText="Unselect All"
                onTouchTap={Actions.uncheckAll}/>
              <MenuItem
                primaryText="Select All"
                onTouchTap={Actions.selectAll}/>
            </IconMenu>
          </Column.ColumnHeader>
        </Common.ColumnList.Header>
        <Common.Lists.List>
          <Common.Loading show={this.state.isLoading}>
            {this.renderList()}
          </Common.Loading>
        </Common.Lists.List>
      </Common.Lists.Container>
    );
  }
});
