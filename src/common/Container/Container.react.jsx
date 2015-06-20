var React      = require('react'),
    classNames = require('classnames'),

    mui           = require('material-ui'),
    StylePropable = mui.Mixins.StylePropable;


module.exports = React.createClass({

  displayName: 'Container',

  mixins: [StylePropable],

  propTypes: {
    style: React.PropTypes.object
  },

  getStyles: function() {
    var styles = {
      marginBottom: 50
    };
    return this.mergeStyles(styles, this.props.style);
  },

  render: function() {
    return <div style={this.getStyles()}>{this.props.children}</div>;
  }
});