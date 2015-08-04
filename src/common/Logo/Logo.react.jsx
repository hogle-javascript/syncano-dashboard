let React = require('react'),
  Isvg = require('react-inlinesvg');

require('./Logo.sass');

module.exports = React.createClass({

  displayName: 'Logo',

  render: function() {
    return (
      <Isvg
        wrapper={React.DOM.div}
        wrapperStyle={this.props.style}
        src="/img/syncano-logo.svg"
        className={this.props.className}
        />
    )
  }
});
