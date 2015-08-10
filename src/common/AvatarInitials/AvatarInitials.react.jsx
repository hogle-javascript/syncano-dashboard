import React from 'react';

import ColorStore from '../Color/ColorStore';

import MUI from 'material-ui';

export default React.createClass({

  displayName: 'AvatarInitials',

  propTypes: {
    name: React.PropTypes.string.isRequired,
    backgroundColor: React.PropTypes.string,
    singleInitial: React.PropTypes.bool
  },

  getHash(str) {
    let hash;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  },

  getStyles() {
    return {
      fontWeight: 300,
      fontSize: 16,
      lineHeight: '1em',
      borderRadius: '100%',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      userSelect: 'none',
      cursor: 'default'
    }
  },

  render() {
    let styles = this.getStyles();
    let initials = null;
    let colors = ColorStore.getAllColors();
    let nameFragments = this.props.name.split(' ');

    if (this.props.singleInitial || nameFragments.length === 1) {
      initials = this.props.name.charAt(0).toUpperCase();
    } else {
      initials = nameFragments.filter(function(nameFragment, index, arr) {
        return index === 0 || index === arr.length - 1
      }).map(function(nameFragment) {
        return nameFragment.charAt(0).toUpperCase();
      }).join('');
    }

    styles.backgroundColor = this.props.backgroundColor || colors[this.getHash(this.props.name) % colors.length];

    return (
      <MUI.Avatar
        style={styles}
        backgroundColor={styles.backgroundColor}>
        {initials}
      </MUI.Avatar>
    );
  }
});
