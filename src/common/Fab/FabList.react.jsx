var React = require('react');

var FAB   = require('./Fab.react');
var Label = require('../Label/Label.react');

module.exports = React.createClass({

  displayName: 'FABList',

  propTypes: {
    buttons: React.PropTypes.array.isRequired,
    handleFABClick: React.PropTypes.func.isRequired,
  },

  render: function() {
    var buttons = this.props.buttons.map(function(button) {
      return (
        <div className="fab-with-label" key={button.name}>
          <FAB button={button} handleFABClick={this.props.handleFABClick}/>
          <Label text={button.label} />
        </div>
      );
    }.bind(this));
    return (
      <div className="fab-list">
        {buttons}
      </div>
    );
  }
});
