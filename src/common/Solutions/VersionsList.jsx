import React from 'react';

import Mixins from '../../mixins/';

// Components
import ListItem from './VersionsListItem';
import ColumnList from '../ColumnList';
import Loading from '../Loading';
import Lists from '../Lists';

// Shortcut
let Column = ColumnList.Column;

export default React.createClass({

  displayName: 'SolutionVersionsList',

  mixins: [
    Mixins.List
  ],

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
    });
  },

  handleInstallClick(versionId) {
    if (this.props.onInstall) {
      this.props.onInstall(versionId);
    }
  },

  renderItem(item) {
    return <ListItem onInstallClick={this.handleInstallClick} item={item}/>;
  },

  render() {
    return (
      <Lists.Container>
        <ColumnList.Header>
          <Column.ColumnHeader
            columnName="DESC"
            className="col-xs-5">
            <span style={{fontSize: '1.2rem'}}>{this.props.name}</span>
          </Column.ColumnHeader>

          <Column.ColumnHeader columnName="DATE">
            Created
          </Column.ColumnHeader>

          <Column.ColumnHeader columnName="DESC">
            Type
          </Column.ColumnHeader>

          <Column.ColumnHeader
            columnName="ID"
            className="col-xs-5">
            Installations
          </Column.ColumnHeader>

          <Column.ColumnHeader
            columnName="ID"
            className="col-xs-4">
            Download
          </Column.ColumnHeader>

          <Column.ColumnHeader
            columnName="ID"
            className="col-xs-4">
            Install
          </Column.ColumnHeader>

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

