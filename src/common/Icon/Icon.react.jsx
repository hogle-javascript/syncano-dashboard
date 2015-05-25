var React = require('react');

var IconStore = require('./store');

module.exports = React.createClass({

  displayName: 'Icon',

  propTypes: {
    icon: React.PropTypes.oneOf(IconStore.getAllIcons()),
    glowing: React.PropTypes.bool,
    style: React.PropTypes.object,
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

  render: function () {

    if (this.props.glowing) {
      var klass = "glowing";
    }

    if (this.props.icon) {
      var svg = require('./svg/' + this.props.icon);
      return <i dangerouslySetInnerHTML={{__html: svg}} style={this.state.style} className={klass}></i>;

    } else {
      return <i style={this.state.style} className={klass}></i>;
    }
  }
});