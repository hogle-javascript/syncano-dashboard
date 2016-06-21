import React, { Component } from 'react';
import _ from 'lodash';

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

  renderItems() {
    const { items } = this.props;

    return _.map(items, (item) => <ListItem item={item} />);
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
