var React      = require('react'),

    ColorStore = require('../Color/ColorStore'),

    mui        = require('material-ui'),
    Avatar     = mui.Avatar;


module.exports = React.createClass({

  displayName: 'AvatarInitials',

  propTypes: {
    name: React.PropTypes.string.isRequired,
    backgroundColor: React.PropTypes.string,
    singleInitial: React.PropTypes.bool
  },

  getHash: function(str) {
    var hash;
    for (var i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash);
  },

  getStyles: function() {
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

  render: function() {
    var styles = this.getStyles(),
        initials,
        colors = ColorStore.getAllColors(),
        nameFragments = this.props.name.split(' ');

    if (this.props.singleInitial || nameFragments.length === 1) {
      initials = this.props.name.charAt(0).toUpperCase();
    } else {
      initials = nameFragments.filter(function(nameFragment, index, arr){
        return index === 0 || index === arr.length - 1
      }).map(function(nameFragment){
        return nameFragment.charAt(0).toUpperCase();
      }).join('');
    }

    styles.backgroundColor = this.props.backgroundColor || colors[this.getHash(this.props.name) % colors.length];

    return (
      <Avatar style={styles} backgroundColor={styles.backgroundColor} >
        {initials}
      </Avatar>
    );
  }

});