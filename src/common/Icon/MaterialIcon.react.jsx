var React = require('react'),
    Store = require('./MaterialIconStore');


module.exports = React.createClass({

  displayName: 'MaterialIcon',

  propTypes: {
    name: React.PropTypes.oneOf(Store.getIconNames()),
    style: React.PropTypes.object,
  },

  getInitialState: function () {
    return {
      reference: Store.getIconReference(this.props.name)
    }
  },

  getClassNames: function () {
    return 'material-icons'
  },

  renderReference: function () {
    return {
      __html: '&#x' + this.state.reference + ';'
    };
  },

  render: function () {
    return (
      <i
        className={this.getClassNames()}
        style={this.props.style}
        dangerouslySetInnerHTML={this.renderReference()} />
    )
  }
});