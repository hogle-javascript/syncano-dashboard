var React = require('react'),

    // Stores
    ColorStore = require('../Color/ColorStore');

require('./AvatarInitials.css');

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

  render: function() {
    var initials;
    var colors = ColorStore.getAllColors();
    var nameFragments = this.props.name.split(' ');
    if (this.props.singleInitial || nameFragments.length === 1) {
      initials = this.props.name.charAt(0).toUpperCase();
    } else {
      initials = nameFragments.filter(function(nameFragment, index, arr){
        return index === 0 || index === arr.length - 1
      }).map(function(nameFragment){
        return nameFragment.charAt(0).toUpperCase();
      }).join('');
    }
    var style = {
      backgroundColor: this.props.backgroundColor || colors[this.getHash(this.props.name) % colors.length]
    };
    return (
      <div className="avatar-initials" style={style}>
        <div className="avatar-initials-text">{initials}</div>
      </div>
    );
  }

});