let React = require('react');
let mui = require('material-ui');
let FontIcon = mui.FontIcon;

export default React.createClass({

  displayName: 'DropdownMenuItemToggle',

  handleClick(e) {
    e.stopPropagation();
    this.props.handleClick(this.props.action.name);
  },

  render() {
    let type = this.props.action.selected ? "synicon-checkbox-marked" : "synicon-checkbox-blank";
    return (
      <div
        className="dropdown-menu-item dropdown-menu-item-toggle"
        onClick={this.handleClick}>
        <FontIcon className={type}/>
        <span>{this.props.action.displayName}</span>
      </div>
    );
  }

});