import React, { Component } from 'react';
import _ from 'lodash';

import ListItem from './DemoAppListItem';

export default class DemoAppsList extends Component {
  static defaultProps = {
    items: [
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demo app description 1st demo app descript'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demo app description 1st demo app descript'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demo app description 1st demo app descript'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demo app description 1st demo app descript'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demo app description 1st demo app descript'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demo app description 1st demo app descript'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demo app description 1st demo app descript'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demo app description 1st demo app descript'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demo app description 1st demo app descript'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demo app description 1st demo app descript'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demo app description 1st demo app descript'
      },
      {
        title: '1st demo app',
        description: 'aosdjias'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demost demo app descript ahisdu haisud hais'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demo app description 1'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app de'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demo app description 1st demo app descript'
      },
      {
        title: '1st demo app',
        description: '1st demo app description 1st demo app description 1st demo app description 1st demo app descript'
      }
    ]
  }

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

    return _.map(items, (item) => (<ListItem item={item} />));
  }

  render() {
    const styles = this.getStyles();

    return (
      <div style={styles.container}>
        <div style={styles.list}>
          {this.renderItems()}
        </div>
      </div>
    );
  }
}
