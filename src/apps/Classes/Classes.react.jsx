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

  componentWillUpdate(nextProps, nextState) {
    console.info('Classes::componentWillUpdate');
    this.hideDialogs(nextState.hideDialogs);
  },

  componentDidMount() {
    console.info('Classes::componentDidMount');
    Actions.fetch();
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
      triggers: hasItems ?
      <div>
        Associated with Triggers: {this.getDialogList(associatedItems, 'name', associationsFor)}
      </div> :
      null,
      notAssociated: hasItems ?
      <div>
        Not associated: {this.getDialogList(associatedItems, 'name')}
      </div> :
      null
    };

    return list[associationsFor];
  },

  // Dialogs config
  initDialogs() {
    let checkedItemIconColor = Store.getCheckedItemIconColor();
    let checkedClasses = Store.getCheckedItems();
    let classesAssociatedWithTriggers = this.getAssociatedClasses();
    let classesNotAssociated = _.difference(checkedClasses, classesAssociatedWithTriggers);

    if (classesAssociatedWithTriggers) {
      let associatedWithTriggersList = this.getAssociationsList('triggers', classesAssociatedWithTriggers);
      let notAssociatedList = this.getAssociationsList('notAssociated', classesNotAssociated);

      return [{
        dialog: Common.Dialog,
        params: {
          ref: 'deleteClassDialog',
          title: 'Delete a Class',
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
          modal: true,
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
      }]
    }

    return [{
      dialog: Common.ColorIconPicker.Dialog,
      params: {
        key: 'pickColorIconDialog',
        ref: 'pickColorIconDialog',
        mode: 'add',
        initialColor: checkedItemIconColor.color,
        initialIcon: checkedItemIconColor.icon,
        handleClick: this.handleChangePalette
      }
    },
      {
        dialog: Common.Dialog,
        params: {
          key: 'deleteClassDialog',
          ref: 'deleteClassDialog',
          title: 'Delete a Class',
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
          modal: true,
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
      }]
  },

  handleChangePalette(color, icon) {
    console.info('Classes::handleChangePalette', color, icon);

    Actions.updateClass(
      Store.getCheckedItem().name, {
        metadata: JSON.stringify({color, icon})
      });
    Actions.uncheckAll()
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
    }
  },

  redirectToAddClassView() {
    this.context.router.transitionTo('classes-add', this.getParams());
  },

  redirectToEditClassView(className) {
    let classNameParam = className || Store.getCheckedItem().name;

    this.context.router.transitionTo('classes-edit', {
      instanceName: this.getParams().instanceName,
      className: classNameParam
    });
  },

  isProtectedFromDelete(item) {
    return item.protectedFromDelete;
  },

  render() {
    let styles = this.getStyles();
    let checkedClasses = Store.getCheckedItems();
    let checkedClassesCount = Store.getNumberOfChecked();
    let isAnyAndNotAllClassSelected = checkedClassesCount >= 1 && checkedClassesCount < (this.state.items.length);
    let someClassIsProtectedFromDelete = checkedClasses.some(this.isProtectedFromDelete);
    let markedIcon = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container>
        {this.getDialogs()}

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
            <Common.Fab.TooltipItem
              tooltip="Click here to edit Class"
              mini={true}
              disabled={checkedClassesCount > 1}
              onClick={this.redirectToEditClassView.bind(null, null)}
              iconClassName="synicon-pencil"/>
            <Common.Fab.TooltipItem
              style={styles.fabListTopButton}
              tooltip="Click here to customize Class"
              secondary={true}
              mini={true}
              disabled={checkedClassesCount > 1}
              onClick={this.showDialog.bind(null, 'pickColorIconDialog')}
              iconClassName="synicon-palette"/>
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
