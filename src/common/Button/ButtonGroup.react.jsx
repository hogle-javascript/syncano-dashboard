let React = require('react');
let classNames = require('classnames');

require('./Button.css');


let Button = React.createClass({

  displayName: 'Button',

  handleClick() {
    this.props.handleClick(this.props.data.name);
  },

  render() {
    let data = "data" in this.props ? this.props.data : this.props;
    let cssClasses = classNames({
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

  render() {
    let buttons = [];
    if (this.props.buttons) {
      let buttons = this.props.buttons.map(function(button, i) {
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