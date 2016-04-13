import React from 'react';
import Router from 'react-router';

// Utils
import {DialogsMixin} from '../../mixins';

import Actions from './TemplatesActions';
import Store from './TemplatesStore';

// Components
import ListItem from './TemplatesListItem';
import {ColumnList} from 'syncano-components';
import {Dialog, Lists} from '../../common';

const Column = ColumnList.Column;

export default React.createClass({

  displayName: 'TemplatesList',

  mixins: [
    Router.State,
    Router.Navigation,
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
        title: 'Delete a Template',
        handleConfirm: Actions.removeTemplates,
        isLoading: this.props.isLoading,
        items: Store.getCheckedItems(),
        groupName: 'Template'
      }
    }];
  },

  renderItem(item) {
    return (
      <ListItem
        key={`template-list-item-${item.name}`}
        onIconClick={Actions.checkItem}
        item={item}
        showDeleteDialog={() => this.showDialog('removeTemplateDialog', item)}/>
    );
  },

  render() {
    const {name, handleTitleClick, ...other} = this.props;
    const checkedItems = Store.getNumberOfChecked();

    return (
      <Lists.Container>
        {this.getDialogs()}
        <ColumnList.Header>
          <Column.ColumnHeader
            className="col-xs-12"
            primary={true}
            columnName="CHECK_ICON"
            handleClick={handleTitleClick}>
            {name}
          </Column.ColumnHeader>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-flex-1">
            Content type
          </Column.ColumnHeader>
          <Column.ColumnHeader columnName="MENU">
            <Lists.Menu
              checkedItemsCount={checkedItems}
              handleSelectAll={Actions.selectAll}
              handleUnselectAll={Actions.uncheckAll}>
              <Lists.MenuItem onTouchTap={() => this.showDialog('removeTemplateDialog')}/>
            </Lists.Menu>
          </Column.ColumnHeader>
        </ColumnList.Header>
        <Lists.List
          {...other}
          key="templates-list"
          renderItem={this.renderItem}/>
      </Lists.Container>
    );
  }
});
