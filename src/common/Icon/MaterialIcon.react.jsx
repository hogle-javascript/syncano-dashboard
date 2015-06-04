var React = require('react'),
    Store = require('./MaterialIconStore');


module.exports = React.createClass({

  displayName: 'MaterialIcon',

  propTypes: {
    name: React.PropTypes.oneOf(Store.getIconNames()),
    style: React.PropTypes.object,
    handleClick: React.PropTypes.func,
  },

  getInitialState: function () {
    return {
      name: this.props.name
    }
  },

  componentWillReceiveProps: function(nextProps){
    this.setState(nextProps);
  },

  getClassNames: function () {
    return 'material-icons'
  },


  renderReference: function () {
    var reference = Store.getIconReference(this.state.name);
    return {
      __html: '&#x' + reference + ';'
    };
  },

  handleClick: function() {
    if (this.props.handleClick) {
      this.props.handleClick(this.props.name);
    }
  },

  render: function () {
    return (
      <i
        className={this.getClassNames()}
        style={this.props.style}
        dangerouslySetInnerHTML={this.renderReference()}
        onClick={this.handleClick} />
    )
  }
});