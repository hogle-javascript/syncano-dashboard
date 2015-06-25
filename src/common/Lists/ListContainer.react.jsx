var React      = require('react'),
    classNames = require('classnames'),

    mui           = require('material-ui'),
    StylePropable = mui.Mixins.StylePropable;


module.exports = React.createClass({

  displayName: 'ListContainer',

  mixins: [StylePropable],

  propTypes: {
    style: React.PropTypes.object
  },

  getStyles: function() {
    var styles = {
      margin: '65px auto',
      width: '80%',
      maxWidth: '1140px'
    };
    return this.mergeStyles(styles, this.props.style);
  },

  render: function() {
    var styles = this.getStyles();

    return <div style={styles}>{this.props.children}</div>;
  }
});
