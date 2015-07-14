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
    return {
      button: {
        margin: '3px 0'
      },
      icon: {
        display        : '-webkit-flex; display: flex',
        AlignItems     : 'center',
        JustifyContent : 'center'
      }
    }
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <FloatingActionButton
        {...this.props}
        style     = {styles.button}
        iconStyle = {styles.icon}
      />
    );
  }
}));
