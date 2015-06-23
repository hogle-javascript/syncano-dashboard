var React           = require('react'),
    Radium          = require('radium'),

    mui             = require('material-ui'),
    StylePropable   = mui.Mixins.StylePropable,
    Paper           = mui.Paper;


module.exports = Radium(React.createClass({

  displayName: 'Item',

  mixins: [StylePropable],

  getStyles: function() {
    var styles = {
      display        : 'flex',
      marginBottom   : 0,
      justifyContent : 'center'
    };

    return this.mergeStyles(styles, this.props.style);
  },

  render: function () {
    var styles = this.getStyles();

    return (
      <Paper
        zDepth    = {1}
        className = {'row'}
        style     = {styles}
        rounded   = {false}>
        {this.props.children}
      </Paper>
    )
  }
}));
