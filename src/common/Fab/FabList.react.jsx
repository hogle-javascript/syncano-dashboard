var React         = require('react'),
    Radium        = require('radium'),

    mui           = require('material-ui'),
    StylePropable = mui.Mixins.StylePropable;


module.exports = Radium(React.createClass({

  displayName: 'FABList',

  mixins: [StylePropable],

  getDefaultProps: function () {
    return {
      position: 'bottom'
    }
  },

  propTypes: {
    position: React.PropTypes.string.isRequired
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

    if (this.props.position === 'bottom') {
      styles.bottom = '50px';
    } else {
      styles.top    = '200px';
    }

    return this.mergeStyles(styles, this.props.style);
  },

  render: function() {
    var styles = this.getStyles();

    return (
      <div style={styles}>
        {this.props.children}
      </div>
    );
  }
}));
