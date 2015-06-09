var React = require('react'),

    mui           = require('material-ui'),
    StylePropable = mui.Mixins.StylePropable,
    Paper = mui.Paper;


module.exports = React.createClass({

  displayName: 'Item',

  mixins: [StylePropable],

  getStyles: function() {
    var style = {
      height: '100px',
      display: 'flex',
      marginBottom: '0px',
      justifyContent: 'center',
    };
    return this.mergeStyles(style, this.props.style);
  },

  render: function () {

    var style = this.getStyles();
    return (
      <Paper zDepth={1} className={'row'} style={style} rounded={false}>
        {this.props.children}
      </Paper>
    )
  }
});