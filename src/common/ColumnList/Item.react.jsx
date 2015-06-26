var React           = require('react'),
    Radium          = require('radium'),

    mui             = require('material-ui'),
    StylePropable   = mui.Mixins.StylePropable,
    Colors          = mui.Styles.Colors,
    Paper           = mui.Paper;


module.exports = Radium(React.createClass({

  displayName: 'Item',

  mixins: [StylePropable],

  getStyles: function() {
    return {
      base: {
        display         : 'flex',
        marginBottom    : 0,
        justifyContent  : 'center'
      },
      checked: {
        backgroundColor : Colors.lightBlue50
      }
    };
  },

  handleClick: function() {
    this.props.handleClick(this.props.id);
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <Paper
        onClick   = {this.handleClick}
        zDepth    = {1}
        className = {'row'}
        style     = {[styles.base,
                    this.props.checked && styles.checked]}
        rounded   = {false}>
        {this.props.children}
      </Paper>
    )
  }
}));
