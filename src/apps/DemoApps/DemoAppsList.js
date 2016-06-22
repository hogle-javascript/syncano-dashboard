import React, { Component } from 'react';
import _ from 'lodash';

import Actions from './DemoAppsActions';

import ListItem from './DemoAppListItem';
import { Loading } from '../../common';

export default class DemoAppsList extends Component {
  getStyles() {
    return {
      container: {
        margin: 100
      },
      list: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap'
      }
    };
  }

  handleClickInstall(item) {
    if (this.props.handleClickInstall) {
      this.props.handleClickInstall();
    }

    Actions.setClickedApp(item.name);
  }

  renderItems() {
    const { items } = this.props;

    return _.map(items, (item) => {
      return (
        <ListItem
          handleClickInstall={() => this.handleClickInstall(item)}
          key={item.name}
          item={item}
        />
      );
    });
  }

  render() {
    const styles = this.getStyles();
    const { isLoading } = this.props;

    return (
      <div style={styles.container}>
        <Loading show={isLoading}>
          <div style={styles.list}>
            {this.renderItems()}
          </div>
        </Loading>
      </div>
    );
  }
}
