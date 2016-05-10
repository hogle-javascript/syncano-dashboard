import React from 'react';
import Reflux from 'reflux';
import pluralize from 'pluralize';
import _ from 'lodash';

import {FontIcon, Styles} from 'syncano-material-ui';
import Dialog from './FullPageDialog';
import StandardButtons from './DialogStandardButtons';

export default React.createClass({
  displayName: 'DeleteDialog',

  mixins: [
    Reflux.ListenerMixin
  ],

  getDefaultProps() {
    return {
      actionName: 'delete',
      itemLabelName: 'name',
      isLoading: false,
      icon: 'synicon-delete'
    };
  },

  getInitialState() {
    return {
      open: false
    };
  },

  getItems() {
    let items = this.state.items ? this.state.items : this.props.items;

    if (!_.isArray(items)) {
      items = [items];
    }

    return items;
  },

  getDialogList(items, paramName, associationFor) {
    const listItems = items.map((item) => {
      const isAssociatedWithTriggers = _.isArray(item.triggers) && item.triggers.length;
      const isAssociatedWithSchedules = _.isArray(item.schedules) && item.schedules.length;
      const isAssociated = (isAssociatedWithTriggers) || (isAssociatedWithSchedules);
      const triggersAssociation = _.isArray(item.triggers) ? ` (${item.triggers.join(', ')})` : '';
      const schedulesAssociation = _.isArray(item.schedules) ? ` (${item.schedules.join(', ')})` : '';
      let association = '';

      if (isAssociated && associationFor === 'triggers') {
        association = triggersAssociation;
      }

      if (isAssociated && associationFor === 'schedules') {
        association = schedulesAssociation;
      }

      if (!_.isObject(item)) {
        return null;
      }

      return <li key={item[paramName || 'name']}>{item[paramName || 'name'] + association}</li>;
    });

    return <ul>{listItems}</ul>;
  },

  handleConfirm() {
    const {handleConfirm, handleConfirmParam} = this.props;

    handleConfirm(this.getItems(), handleConfirmParam);
    if (_.isFunction(handleConfirm.completed)) {
      this.listenTo(handleConfirm.completed, () => {
        this.dismiss();
        this.stopListeningTo(handleConfirm.completed);
      });
    }
  },

  dismiss() {
    this.setState({open: false});
  },

  show(items) {
    this.setState({open: true, items});
  },

  renderContent() {
    const {actionName, groupName, itemLabelName} = this.props;
    const listItems = this.getItems();
    const itemsCount = listItems.length;

    return (
      <div>
        {`Do you really want to ${actionName} ${itemsCount} ${pluralize(groupName, itemsCount)}?`}
        {this.getDialogList(listItems, itemLabelName)}
      </div>
    );
  },

  render() {
    const {children, icon, ...other} = this.props;
    const {open} = this.state;

    return (
      <Dialog
        onRequestClose={this.dismiss}
        contentSize="small"
        open={open}
        modal={true}
        actions={
          <StandardButtons
            handleCancel={this.dismiss}
            handleConfirm={this.handleConfirm}/>
        }
        {...other}>
        <div className="row">
          <FontIcon
            style={{fontSize: 60, color: Styles.Colors.grey500}}
            className={`${icon} col-sm-7`}/>
          <div className="vm-1-t col-sm-28">
            {children ? children : this.renderContent()}
          </div>
        </div>
      </Dialog>
    );
  }
});
