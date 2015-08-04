var React = require('react');
var classNames = require('classnames');

require('./Button.css');


var Button = React.createClass({

  displayName: 'Button',

  handleClick: function() {
    this.props.handleClick(this.props.data.name);
  },

  render: function() {
    var data = "data" in this.props ? this.props.data : this.props;
    var cssClasses = classNames({
      'button': true,
      'button-raised': data.type === 'raised',
      'button-flat': data.type === 'flat',
      'button-default-action': data.isDefault,
    });
    return (
      <div className={cssClasses} onClick={this.handleClick}>
        <span>{data.displayName}</span>
      </div>
    );
  }
});

module.exports = React.createClass({

  displayName: 'ButtonGroup',

  render: function() {
    var buttons = [];
    if (this.props.buttons) {
      var buttons = this.props.buttons.map(function(button, i) {
        return <Button {...this.props} key={i} data={button}/>
      }.bind(this));
    }
    return (
      <div className="button-group">
        {buttons}
      </div>
    );
  }
});