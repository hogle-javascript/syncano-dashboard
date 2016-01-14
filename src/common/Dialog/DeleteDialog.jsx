import React from 'react';
import pluralize from 'pluralize';
import _ from 'lodash';

import {FlatButton, Dialog} from 'syncano-material-ui';
import {Loading} from 'syncano-components';

export default React.createClass({
  displayName: 'DeleteDialog',

  getDefaultProps() {
    return {
      actionName: 'delete',
      itemLabelName: 'name',
      isLoading: false
    };
  },

  getInitialState() {
    return {
      open: false
    };
  },

  getConfirmArguments() {
    return this.state.items ? this.state.items : this.props.items;
  },

  getDialogList(items, paramName, associationFor) {
    let listItems = items.map((item) => {
      let isAssociated = (item.triggers && item.triggers.length > 0) || (item.schedules && item.schedules.length > 0);
      let triggersAssociation = item.triggers ? ` (${item.triggers.join(', ')})` : '';
      let schedulesAssociation = item.schedules ? ` (${item.schedules.join(', ')})` : '';
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

  dismiss() {
    this.setState({open: false});
  },

  show(items) {
    this.setState({open: true, items});
  },

  renderContent() {
    let {actionName, groupName, itemLabelName} = this.props;
    let listItems = _.filter(this.getConfirmArguments(), (item) => _.isObject(item));
    let itemsCount = listItems.length;

    return (
      <div>
        {`Do you really want to ${actionName} ${itemsCount} ${pluralize(groupName, itemsCount)}?`}
        {this.getDialogList(listItems, itemLabelName)}
      </div>
    );
  },

  render() {
    let {children, items, groupName, ...other} = this.props; // eslint-disable-line no-redeclare

    return (
      <Dialog
        actions={[
          <FlatButton
            label="Cancel"
            secondary={true}
            onTouchTap={this.dismiss}/>,
          <FlatButton
            label="Confirm"
            primary={true}
            keyboardFocused={true}
            onTouchTap={this.props.handleConfirm.bind(null, this.getConfirmArguments())}/>
        ]}
        open={this.state.open}
        modal={true}
        avoidResetState={true}
        {...other}>
        {children ? children : this.renderContent()}
        <Loading
          type="linear"
          position="bottom"
          show={this.props.isLoading}/>
      </Dialog>
    );
  }
});
