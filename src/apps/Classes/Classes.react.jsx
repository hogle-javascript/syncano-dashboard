import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import Mixins from '../../mixins';
import HeaderMixin from '../Header/HeaderMixin';

// Stores and Actions
import SessionActions from '../Session/SessionActions';
import SessionStore from '../Session/SessionStore';
import ClassesActions from './ClassesActions';
import ClassesStore from './ClassesStore';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import ClassesList from './ClassesList.react';

export default React.createClass({

  displayName: 'Classes',

  mixins: [
    Router.State,
    Router.Navigation,

    Reflux.connect(ClassesStore),
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
    ClassesActions.fetch();
  },

  // Dialogs config
  initDialogs() {
    let checkedItemIconColor = ClassesStore.getCheckedItemIconColor();
    let checkedClasses = ClassesStore.getCheckedItems();

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

    ClassesActions.updateClass(
      ClassesStore.getCheckedItem().name, {
        metadata: JSON.stringify({
          color: color,
          icon: icon
        })
      }
    );
    ClassesActions.uncheckAll()
  },

  handleDelete() {
    console.info('Classes::handleDelete');
    ClassesActions.removeClasses(ClassesStore.getCheckedItems());
  },

  handleReset() {
    console.info('Classes::handleReset');
    ClassesActions.resetClass(ClassesStore.getCheckedItem().id);
  },

  checkClassItem(id, state) {
    ClassesActions.checkItem(id, state);
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
    let classNameParam = className || ClassesStore.getCheckedItem().name;

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
    let checkedClasses = ClassesStore.getCheckedItems();
    let checkedClassesCount = ClassesStore.getNumberOfChecked();
    let isAnyAndNotAllClassSelected = checkedClassesCount >= 1 && checkedClassesCount < (this.state.items.length);
    let someClassIsProtectedFromDelete = checkedClasses.some(this.isProtectedFromDelete);
    let markedIcon = 'synicon-checkbox-multiple-marked-outline';
    let blankIcon = 'synicon-checkbox-multiple-blank-outline';

    return (
      <Container>
        {this.getDialogs()}

        <Common.Show if={checkedClassesCount > 0}>
          <Common.Fab position="top">
            <Common.Fab.Item
              label={isAnyAndNotAllClassSelected ? 'Click here to select all' : 'Click here to unselect all'}
              mini={true}
              onClick={isAnyAndNotAllClassSelected ? ClassesActions.selectAll : ClassesActions.uncheckAll}
              iconClassName={isAnyAndNotAllClassSelected ? markedIcon : blankIcon}/>
            <Common.Fab.Item
              label="Click here to delete Classes"
              mini={true}
              disabled={someClassIsProtectedFromDelete}
              onClick={this.showDialog.bind(null, 'deleteClassDialog')}
              iconClassName="synicon-delete"/>
            <Common.Fab.Item
              label="Click here to edit Class"
              mini={true}
              disabled={checkedClassesCount > 1}
              onClick={this.redirectToEditClassView.bind(null, null)}
              iconClassName="synicon-pencil"/>
            <Common.Fab.Item
              style={styles.fabListTopButton}
              label="Click here to customize Class"
              secondary={true}
              mini={true}
              disabled={checkedClassesCount > 1}
              onClick={this.showDialog.bind(null, 'pickColorIconDialog')}
              iconClassName="synicon-palette"/>
          </Common.Fab>
        </Common.Show>

        <Common.Fab>
          <Common.Fab.Item
            label="Click here to add a Class"
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
