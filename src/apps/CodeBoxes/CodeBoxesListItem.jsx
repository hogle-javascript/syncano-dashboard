import React from 'react';
import {Link, State} from 'react-router';

import {DialogsMixin} from '../../mixins';

import Actions from './CodeBoxesActions';
import SnippetsStore from '../Snippets/SnippetsStore';

import {MenuItem} from 'syncano-material-ui';
import {Color, ColumnList, Truncate} from 'syncano-components';
import Tooltip from './Tooltip';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'CodeBoxesListItem',

  mixins: [
    State,
    DialogsMixin
  ],

  render() {
    let {item, onIconClick, showDeleteDialog} = this.props;
    let publicString = item.public.toString();
    let link = item.public ? item.links['public-link'] : item.links.self;
    let snippet = SnippetsStore.getSnippetById(item.codebox);
    let snippetLabel = snippet ? snippet.label : '';

    return (
      <ColumnList.Item
        checked={item.checked}
        id={item.name}
        key={item.name}>
        <Column.CheckIcon
          className="col-xs-12"
          id={item.name.toString()}
          icon='arrow-up-bold'
          keyName="name"
          background={Color.getColorByName('blue', 'xlight')}
          checked={item.checked}
          handleIconClick={onIconClick}
          primaryText={
            <div style={{display: 'flex'}}>
              <Truncate text={item.name}/>
              <Tooltip tooltip={`rzez nieznanego drukarza do wypełnienia tekstem próbnej książki.
              Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym.
              Spopularyzował się w latach 60. XX w. wraz z publikacją `}/>
            </div>
          }
          secondaryText={item.description}/>
        <Column.Desc className="col-flex-1">
          <ColumnList.Link
            name={item.name}
            link={link}
            tooltip="Copy CobeBox Socket url"/>
        </Column.Desc>
        <Column.Desc className="col-xs-4">
          <Link
            to="snippet"
            params={{
              instanceName: this.getParams().instanceName,
              snippetId: item.codebox
            }}>
            {snippetLabel}
          </Link>
        </Column.Desc>
        <Column.Desc className="col-xs-4">
          <Link
            to="codeBox-traces"
            params={{
              instanceName: this.getParams().instanceName,
              codeBoxName: item.name
            }}>
            Traces
          </Link>
        </Column.Desc>
        <Column.Desc className="col-xs-3">{publicString}</Column.Desc>
        <Column.Menu>
          <MenuItem
            className="dropdown-item-edit"
            onTouchTap={() => Actions.showDialog(item)}
            primaryText="Edit a Script Socket" />
          <MenuItem
            className="dropdown-item-delete"
            onTouchTap={showDeleteDialog}
            primaryText="Delete a Script Socket" />
        </Column.Menu>
      </ColumnList.Item>
    );
  }
});

