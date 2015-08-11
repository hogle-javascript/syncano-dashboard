let React = require('react');
let Isvg = require('react-inlinesvg');

require('./Logo.sass');

export default React.createClass({

  displayName: 'Logo',

  render() {
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
