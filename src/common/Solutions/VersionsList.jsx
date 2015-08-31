import React from 'react';

// Components
import MUI from 'material-ui';
import ColumnList from '../ColumnList';
import Loading from '../Loading';
import Lists from '../Lists';

// Shortcut
let Column = ColumnList.Column;

export default React.createClass({

  displayName: 'SolutionVersionsList',

  getInitialState() {
    return {
      items: this.props.items,
      isLoading: this.props.items === null
    };
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      isLoading: nextProps.items === null
    })
  },

  // List
  handleDownloadVersion(url) {
    window.open(url, '_blank');
  },

  handleInstallClick(versionId) {
    if (this.props.onInstall) {
      this.props.onInstall(versionId);
    }
  },

  renderItem(item) {
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
    )
  },

  renderList() {
    if (this.state.items === null) {
      return true;
    }

    let items = this.state.items.map((item) => {
      return this.renderItem(item);
    });

    if (items.length > 0) {
      return items;
    }
    return (
    <ColumnList.EmptyItem handleClick={this.props.emptyItemHandleClick}>
      {this.props.emptyItemContent}
    </ColumnList.EmptyItem>
    )
  },

  render() {
    return (
      <Lists.Container>
        <ColumnList.Header>
          <Column.Desc.Header className="col-xs-5 col-md-5">
            <span style={{fontSize: '1.2rem'}}>{this.props.name}</span>
          </Column.Desc.Header>

          <Column.Date.Header>
            Created
          </Column.Date.Header>

          <Column.Desc.Header>
            Type
          </Column.Desc.Header>

          <Column.ID.Header className="col-xs-5 col-md-5">
            Installations
          </Column.ID.Header>

          <Column.ID.Header className="col-xs-4 col-md-4">
            Download
          </Column.ID.Header>

          <Column.ID.Header className="col-xs-4 col-md-4">
            Install
          </Column.ID.Header>


        </ColumnList.Header>
        <Lists.List>
          <Loading show={this.state.isLoading}>
            {this.renderList()}
          </Loading>
        </Lists.List>
      </Lists.Container>
    );
  }
});

