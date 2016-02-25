import React from 'react';
import pluralize from 'pluralize';
import _ from 'lodash';

import {Loading} from 'syncano-components';
import {FontIcon, Styles} from 'syncano-material-ui';
import Dialog from './FullPageDialog';
import StandardButtons from './DialogStandardButtons';

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

  getItems() {
    let items = this.state.items ? this.state.items : this.props.items;

    if (!_.isArray(items)) {
      items = [items];
    }

    return items;
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
    let {children, ...other} = this.props; // eslint-disable-line no-redeclare
    const dialogActions = (
      <StandardButtons
        handleCancel={this.dismiss}
        handleConfirm={() => this.props.handleConfirm(this.getItems())}/>
    );

    return (
      <Dialog
        onRequestClose={this.dismiss}
        contentStyle={{maxWidth: 500, paddingTop: 120}}
        actions={dialogActions}
        open={this.state.open}
        avoidResetState={true}
        modal={true}
        {...other}>
        <div className="row">
            <FontIcon
              style={{fontSize: 60, color: Styles.Colors.grey500}}
              className="synicon-delete col-sm-7"/>
          <div className="vm-1-t">
            {children ? children : this.renderContent()}
          </div>
        </div>
        <Loading
          type="linear"
          position="bottom"
          show={this.props.isLoading}/>
      </Dialog>
    );
  }
});
