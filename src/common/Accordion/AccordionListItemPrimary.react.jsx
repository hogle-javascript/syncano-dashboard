let React = require('react'),
  classNames = require('classnames'),
  mui = require('material-ui'),

  FontIcon = mui.FontIcon,
  AccordionListItemSecondary = require('./AccordionListItemSecondary.react');


module.exports = React.createClass({

  displayName: 'AccordionListItemPrimary',

  onItemClick() {
    ViewActions.setAccordionSelectedItem(this.props.item);
  },

  onExpandableItemClick() {
    ViewActions.setAccordionExpandedItem(this.props.item)
  },

  render() {
    let cssClasses = classNames({
      'accordion-list-item': true,
      'accordion-list-item-primary': true,
      'accordion-list-item-active': this.props.selectedItemId === this.props.item.id,
      'accordion-list-item-expanded': this.props.expandedItemId === this.props.item.id,
    });
    if ("payload" in this.props.item && this.props.item.payload.length > 0) {
      let payloadItems = this.props.item.payload.map(function(item) {
        return <AccordionListItemSecondary
          {...this.props}
          key={item.id}
          item={item}/>
      }.bind(this));
      return (
        <div
          className={cssClasses}
          onClick={this.onExpandableItemClick}>
          <div className="accordion-list-item-content">
            <div className="accordion-list-item-text">{this.props.item.displayName}</div>
            <div className="accordion-list-item-icon accordion-list-item-icon-toggle">
              <FontIcon className="synicon-arrow-right"/>
            </div>
          </div>
          <div className="accordion-list-item-payload">
            {payloadItems}
          </div>
        </div>
      );
    } else if ("payload" in this.props.item && this.props.item.payload.length === 0) {
      return false;
    } else {
      return (
        <div
          className={cssClasses}
          onClick={this.onItemClick}>
          <div className="accordion-list-item-content">
            <div className="accordion-list-item-text">{this.props.item.displayName}</div>
          </div>
        </div>
      );
    }
  }
});