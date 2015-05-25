var React      = require('react');

var ColorStore = require('../Color/store');

require('./AvatarInitials.css');

module.exports = React.createClass({

  displayName: 'AvatarInitials',

  propTypes: {
    text: React.PropTypes.string.isRequired,
  },

  render: function() {
    var colors = ColorStore.getAllColors();
    var colorIndex = Math.floor((this.props.text.charCodeAt(0) - 65) % colors.length);
    var style = {
      backgroundColor: colors[colorIndex]
    };
    return (
      <div className="avatar-initials" style={style}>
        <div className="avatar-initials-text">{this.props.text.charAt(0).toUpperCase()}</div>
      </div>
    );
  }

});