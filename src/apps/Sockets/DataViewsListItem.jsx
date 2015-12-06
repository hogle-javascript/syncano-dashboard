import React from 'react';
import ReactZeroClipboard from 'react-zeroclipboard';

// Stores and Actions
import Actions from './DataViewsActions';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';
import MenuItem from 'syncano-material-ui/lib/menus/menu-item';

let Column = Common.ColumnList.Column;

export default React.createClass({

  displayName: 'DataViewsListItem',

  renderCopyLinkIcon(item) {
    let webhookLink = SYNCANO_BASE_URL.slice(0, -1) + item.links.self;

    return (
      <div>
        <ReactZeroClipboard text={webhookLink}>
          <MUI.IconButton
            style={{height: 20, width: 20, padding: '0 50', cursor: 'copy'}}
            iconStyle={{fontSize: 15, color: '#9B9B9B'}}
            iconClassName="synicon-link-variant"
            tooltip="Copy Webhook URL"
            onClick={this.handleURLClick}/>
        </ReactZeroClipboard>
      </div>
    );
  },

  render() {
    let item = this.props.item;
    let copyLinkIcon = this.renderCopyLinkIcon(item);

    return (
      <Common.ColumnList.Item
        checked={item.checked}
        key={item.name}>
        <Column.CheckIcon
          className="col-xs-12"
          id={item.name}
          icon='table'
          background={Common.Color.getColorByName('blue')}
          checked={item.checked}
          handleIconClick={this.props.onIconClick}>
          <div onClick={this.handleURLClick}>{item.name}</div>
          <div style={{display: 'flex', flexWrap: 'wrap', cursor: 'copy'}}>
            <div style={{fontSize: '0.8em', color: '#9B9B9B'}} onClick={this.handleURLClick}>
              {item.links.self}
            </div>
            <div>{copyLinkIcon}</div>
          </div>
        </Column.CheckIcon>
        <Column.Desc className="col-flex-1">{item.description}</Column.Desc>
        <Column.Desc className="col-xs-5">{item.class}</Column.Desc>
        <Column.Date date={item.created_at} />
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={Actions.showDialog.bind(null, item)}
            primaryText="Edit a Data Endpoint" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={this.showMenuDialog.bind(null, item.name, Actions.removeDataViews.bind(null, [item]))}
            primaryText="Delete a Data Endpoint" />
        </Column.Menu>
      </Common.ColumnList.Item>
    );
  }
});

