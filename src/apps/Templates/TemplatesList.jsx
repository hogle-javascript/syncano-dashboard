import React from 'react';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import {DialogsMixin} from '../../mixins';

import Actions from './TemplatesActions';
import Store from './TemplatesStore';

// Components
import ListItem from './TemplatesListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

let Column = ColumnList.Column;

export default React.createClass({

  displayName: 'TemplatesList',

  mixins: [
    Router.State,
    Router.Navigation,
    HeaderMixin,
    DialogsMixin
  ],

  componentWillUpdate(nextProps) {
    console.info('TemplatesList::componentWillUpdate');
    this.hideDialogs(nextProps.hideDialogs);
  },

  initDialogs() {
    return [{
      dialog: Dialog.Delete,
      params: {
        key: 'removeTemplateDialog',
        ref: 'removeTemplateDialog',
        title: 'Delete a Template Socket',
        handleConfirm: Actions.removeTemplates,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        groupName: 'Template Socket'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`template-list-item-${item.name}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={this.showDialog.bind(null, 'removeTemplateDialog', item)}/>
    );
  },

  render() {
    let checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container>
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-16"
            primary={true}
            columnName="CHECK_ICON"
            handleClick={this.props.handleTitleClick}>
            {this.props.name}
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Content type
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              actions={Actions}>
              <Lists.MenuItem
                singleItemText="Delete a Template Socket"
                multipleItemsText="Delete Template Sockets"
                onTouchTap={this.showDialog.bind(null, 'removeTemplateDialog')}/>
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...this.props}
          key="templates-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});

