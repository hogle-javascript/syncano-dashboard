var React      = require('react'),
    classNames = require('classnames'),

    IconStore  = require('./store');

require('./Icon.css');

module.exports = React.createClass({

  displayName: 'Icon',

  propTypes: {
    icon: React.PropTypes.oneOf(IconStore.getAllIcons()).isRequired,
    glowing: React.PropTypes.bool,
    style: React.PropTypes.object,
    handleClick: React.PropTypes.func,
  },

  getInitialState: function () {
    var defaultStyle = {
      width: '20px',
      height: '20px',
    };
    var mergedStyles = this.props.style || {};

    for (var attrName in defaultStyle) {
      if (!mergedStyles.hasOwnProperty(attrName)) {
        mergedStyles[attrName] = defaultStyle[attrName];
      }
    }

    return {
      style: mergedStyles
    }
  },

  getDefaultProps: function () {
    return {
      glowing: false,
    };
  },

  handleClick: function() {
    if(this.props.handleClick) {
      this.props.handleClick();
    }
  },

  render: function () {
    var glowingClass = classNames({
      "glowing": this.props.glowing
    })

    if (this.props.icon) {
      var svg = require('./svg/' + this.props.icon);
      return <i 
               onClick={this.handleClick} 
               dangerouslySetInnerHTML={{__html: svg}} 
               style={this.state.style} 
               className={glowingClass}></i>;

    } else {
      return <i 
               onClick={this.handleClick} 
               style={this.state.style} 
               className={glowingClass}></i>;
    }
  }

});