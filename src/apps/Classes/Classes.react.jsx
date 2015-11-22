import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import _ from 'lodash';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import Actions from './ClassesActions';
import Store from './ClassesStore';

// Components
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import ClassesList from './ClassesList.react';

export default React.createClass({

  displayName: 'Classes',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(Store),
    Mixins.Dialogs,
    Mixins.InstanceTabs,
    HeaderMixin
  ],

  componentDidMount() {
    console.info('Classes::componentDidMount');
    Actions.fetch();
  },

  componentWillUpdate(nextProps, nextState) {
    console.info('Classes::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  getStyles() {
    return {
      fabListTop: {
        top: 200
      },
      fabListTopButton: {
        margin: '5px 0'
      },
      fabListBottom: {
        bottom: 100
      }
    };
  },

  getAssociatedClasses() {
    let checkedClasses = Store.getCheckedItems();

    let associatedClasses = _.filter(checkedClasses, (checkedClass) => {
      checkedClass.triggers = _.pluck(_.filter(this.state.triggers, 'class', checkedClass.name), 'label');
      return checkedClass.triggers.length > 0;
    });

    return associatedClasses;
  },

  getAssociationsList(associationsFor, associatedItems) {
    let hasItems = associatedItems.length > 0;
    let list = {
      triggers: null,
      notAssociated: null
    };

    if (hasItems) {
      list.triggers = (
        <div>
          Associated with Triggers: {this.getDialogList(associatedItems, 'name', associationsFor)}
        </div>
      );
      list.notAssociated = (
        <div>
          Not associated: {this.getDialogList(associatedItems, 'name')}
        </div>
      );
    }

    return list[associationsFor];
  },

  isProtectedFromDelete(item) {
    return item.protectedFromDelete;
  },

  handleChangePalette(color, icon) {
    console.info('Classes::handleChangePalette', color, icon);

    Actions.updateClass(
      Store.getCheckedItem().name, {
        metadata: JSON.stringify({color, icon})
      }
    );
    Actions.uncheckAll();
  },

  handleDelete() {
    console.info('Classes::handleDelete');
    Actions.removeClasses(Store.getCheckedItems());
  },

  handleReset() {
    console.info('Classes::handleReset');
    Actions.resetClass(Store.getCheckedItem().id);
  },

  checkClassItem(id, state) {
    Actions.checkItem(id, state);
  },

  redirectToAddClassView() {
    this.context.router.transitionTo('classes-add', this.getParams());
  },

  // Dialogs config
  initDialogs() {
    let checkedClasses = Store.getCheckedItems();
    let classesAssociatedWithTriggers = this.getAssociatedClasses();
    let classesNotAssociated = _.difference(checkedClasses, classesAssociatedWithTriggers);
    let deleteDialog = {
      dialog: Common.Dialog,
      params: {
        key: 'deleteClassDialog',
        ref: 'deleteClassDialog',
        title: 'Delete a Class',
        onRequestClose: this.handleCancel,
        actions: [
          {
            text: 'Cancel',
            onClick: this.handleCancel
          },
          {
            text: 'Confirm',
            onClick: this.handleDelete
          }
        ],
        children: [
          'Do you really want to delete ' + this.getDialogListLength(checkedClasses) + ' Class(es)?',
          this.getDialogList(checkedClasses),
          <Common.Loading
            type="linear"
            position="bottom"
            show={this.state.isLoading}
          />
        ]
      }
    };

    if (classesAssociatedWithTriggers) {
      let associatedWithTriggersList = this.getAssociationsList('triggers', classesAssociatedWithTriggers);
      let notAssociatedList = this.getAssociationsList('notAssociated', classesNotAssociated);

      deleteDialog = {
        dialog: Common.Dialog,
        params: {
          ref: 'deleteClassDialog',
          title: 'Delete a Class',
          onRequestClose: this.handleCancel,
          actions: [
            {
              text: 'Cancel',
              onClick: this.handleCancel
            },
            {
              text: 'Confirm',
              onClick: this.handleDelete
            }
          ],
          children: [
            'Some of checked Classes are associated with Triggers. Do you really want to delete ' +
            checkedClasses.length + ' Class(es)?',
            notAssociatedList,
            associatedWithTriggersList,
            <Common.Loading
                type="linear"
                position="bottom"
                show={this.state.isLoading}/>
          ]
        }
      };
    }

    return [
      deleteDialog
    ];
  },

  render() {
    let checkedClasses = Store.getCheckedItems();
    let checkedClassesCount = Store.getNumberOfChecked();
    let isAnyAndNotAllClassSelected = checkedClassesCount >= 1 && checkedClassesCount < (this.state.items.length);
    let someClassIsProtectedFromDelete = checkedClasses.some(this.isProtectedFromDelete);
    let markedIcon = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container>
        {this.getDialogs()}

        <Common.InnerToolbar title="Classes"/>

        <Common.Show if={checkedClassesCount > 0}>
          <Common.Fab position="top">
            <Common.Fab.TooltipItem
              tooltip={isAnyAndNotAllClassSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyAndNotAllClassSelected ? Actions.selectAll : Actions.uncheckAll}
              iconClassName={isAnyAndNotAllClassSelected ? markedIcon : blankIcon}/>
            <Common.Fab.TooltipItem
              tooltip="Click here to delete Classes"
              mini={true}
              disabled={someClassIsProtectedFromDelete}
              onClick={this.showDialog.bind(null, 'deleteClassDialog')}
              iconClassName="synicon-delete"/>
          </Common.Fab>
        </Common.Show>

        <Common.Fab>
          <Common.Fab.TooltipItem
            tooltip="Click here to add a Class"
            onClick={this.redirectToAddClassView}
            iconClassName="synicon-plus"/>
        </Common.Fab>

        <ClassesList
          name="Classes"
          items={this.state.items}
          checkItem={this.checkClassItem}
          emptyItemHandleClick={this.redirectToAddClassView}
          emptyItemContent="Create a Class"/>
      </Container>
    );
  }
});
