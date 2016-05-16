import React from 'react';

import {Avatar, IconButton} from 'syncano-material-ui';
import {ColumnList} from '../../common/';

let Column = ColumnList.Column;

export default React.createClass({
  displayName: 'SolutionVersionsListItem',

  handleDownloadVersion(url) {
    window.open(url, '_blank');
  },

  render() {
    let item = this.props.item;

    return (
      <ColumnList.Item
        key={item.id}
        id={item.id}
        handleClick={this.handleItemClick}>
        <Column.Desc className="col-xs-5 col-md-5">
          <div style={{marginLeft: 10}}>
            <Avatar style={{fontSize: '1rem'}}>
              {item.number}
            </Avatar>
          </div>
        </Column.Desc>

        <Column.Date date={item.created_at}/>

        <Column.Desc>
          {item.type}
        </Column.Desc>

        <Column.ID className="col-xs-5 col-md-5">
          {item.installations_count}
        </Column.ID>

        <Column.ID className="col-xs-4 col-md-4">
          <IconButton
            iconClassName="synicon-cloud-download"
            tooltip="Download this Solution version file"
            onClick={this.handleDownloadVersion.bind(this, item.data.url)}
            />
        </Column.ID>

        <Column.ID className="col-xs-4 col-md-4">
          <IconButton
            iconClassName="synicon-download"
            tooltip="Install this Solution version"
            onClick={this.props.onInstallClick.bind(null, item.id)}
            />
        </Column.ID>

      </ColumnList.Item>
    );
  }
});

