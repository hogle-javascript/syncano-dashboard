var React = require('react'),

    mui           = require('material-ui'),
    StylePropable = mui.Mixins.StylePropable,

    FAB   = require('./Fab.react'),
    Label = require('../Label/Label.react');

module.exports = React.createClass({

  displayName: 'FABList',

  mixins: [StylePropable],

  propTypes: {
    buttons: React.PropTypes.array.isRequired,
    handleClick: React.PropTypes.func.isRequired,
  },

  getStyles: function() {
    var styles = {
      list: {
        position: 'fixed',
        right: 50,
        bottom: 50,
        zIndex: 9,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end'
      },
    };
    return styles;
  },

  render: function() {
    var styles = this.getStyles();

    var buttons = this.props.buttons.map(function(button) {
      return (
        <div className="fab-with-label" key={button.name}>
          <FAB button={button} handleClick={this.props.handleClick}/>
          <Label text={button.label} />
        </div>
      );
    }.bind(this));

    return (
      <div style={styles.list}>
        {buttons}
      </div>
    );
  }
});
