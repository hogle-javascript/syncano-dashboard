var React                 = require('react'),
    Radium                = require('radium'),

    mui                   = require('material-ui'),
    StylePropable         = mui.Mixins.StylePropable,

    FloatingActionButton  = mui.FloatingActionButton;


module.exports = Radium(React.createClass({

  displayName: 'FABListItem',

  mixins: [StylePropable],

  propTypes: {
    handleClick: React.PropTypes.func
  },

  getStyles: function() {
    var styles = {
      margin: '3px 0'
    };
    return this.mergeStyles(styles, this.props.style);
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <FloatingActionButton
        {...this.props}
        style={styles} />
    );
  }
}));
