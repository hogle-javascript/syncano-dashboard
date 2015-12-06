import React from 'react';

// Components
import MUI from 'syncano-material-ui';
import ColumnList from '../ColumnList';

// Shortcut
let Column = ColumnList.Column;

export default React.createClass({

  displayName: 'SolutionVersionsListItem',

  // List
  handleDownloadVersion(url) {
    window.open(url, '_blank');
  },

  handleInstallClick(versionId) {
    if (this.props.onInstall) {
      this.props.onInstall(versionId);
    }
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
            <MUI.Avatar style={{fontSize: '1rem'}}>
              {item.number}
            </MUI.Avatar>
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
          <MUI.IconButton
            iconClassName="synicon-cloud-download"
            tooltip="Download this Solution version file"
            onClick={this.handleDownloadVersion.bind(this, item.data.url)}
            />
        </Column.ID>

        <Column.ID className="col-xs-4 col-md-4">
          <MUI.IconButton
            iconClassName="synicon-download"
            tooltip="Install this Solution version"
            onClick={this.handleInstallClick.bind(null, item.id)}
            />
        </Column.ID>

      </ColumnList.Item>
    );
  }
});

