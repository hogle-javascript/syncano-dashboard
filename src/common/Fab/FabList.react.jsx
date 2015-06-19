var React         = require('react'),
    Radium        = require('radium'),

    mui           = require('material-ui'),
    StylePropable = mui.Mixins.StylePropable;


module.exports = Radium(React.createClass({

  displayName: 'FABList',

  mixins: [StylePropable],

  propTypes: {
    handleClick: React.PropTypes.func.isRequired
  },

  getStyles: function() {
    var styles = {
      position: 'fixed',
      right: '2vw',
      zIndex: 9,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end'
    };
    return this.mergeStyles(styles, this.props.style);
  },

  render: function() {
    return (
      <div style={this.getStyles()}>
        {this.props.children}
      </div>
    );
  }
}));
