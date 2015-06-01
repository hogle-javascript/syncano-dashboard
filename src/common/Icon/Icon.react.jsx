var React = require('react');

var IconStore = require('./store');

module.exports = React.createClass({

  displayName: 'Icon',

  propTypes: {
    icon: React.PropTypes.oneOf(IconStore.getAllIcons()),
    glowing: React.PropTypes.bool,
    style: React.PropTypes.object,
    handleClick: React.PropTypes.func,
  },

  getInitialState: function () {
    var defaultStyle = {
      width: '20px',
      height: '20px',
    };
    var propsStyle = this.props.style || {};
    var mergedStyles = propsStyle;

    for (var attrname in defaultStyle) {
      if (!mergedStyles.hasOwnProperty(attrname)) {
        mergedStyles[attrname] = defaultStyle[attrname];
      }
    }

    return {
      style: mergedStyles
    }
  },

  handleClick: function() {
    this.props.handleClick();
  },

  render: function () {

    if (this.props.glowing) {
      var klass = "glowing";
    }

    if (this.props.icon) {
      var svg = require('./svg/' + this.props.icon);
      return <i onClick={this.handleClick} dangerouslySetInnerHTML={{__html: svg}} style={this.state.style} className={klass}></i>;

    } else {
      return <i onClick={this.handleClick} style={this.state.style} className={klass}></i>;
    }
  }
});