var React = require('react');
var classNames = require('classnames');

//var ViewActions = require('../actions/ViewActions');

var Icon = require('../Icon/Icon.react');
var AccordionListItemSecondary = require('./AccordionListItemSecondary.react');


module.exports = React.createClass({

  displayName: 'AccordionListItemPrimary',

  onItemClick: function () {
    ViewActions.setAccordionSelectedItem(this.props.item);
  },

  onExpandableItemClick: function () {
    ViewActions.setAccordionExpandedItem(this.props.item)
  },

  render: function () {
    var cssClasses = classNames({
      'accordion-list-item': true,
      'accordion-list-item-primary': true,
      'accordion-list-item-active': this.props.selectedItemId === this.props.item.id,
      'accordion-list-item-expanded': this.props.expandedItemId === this.props.item.id,
    });
    if ("payload" in this.props.item && this.props.item.payload.length > 0) {
      var payloadItems = this.props.item.payload.map(function (item) {
        return <AccordionListItemSecondary {...this.props} key={item.id} item={item}/>
      }.bind(this));
      return (
        <div className={cssClasses} onClick={this.onExpandableItemClick}>
          <div className="accordion-list-item-content">
            <div className="accordion-list-item-text">{this.props.item.displayName}</div>
            <div className="accordion-list-item-icon accordion-list-item-icon-toggle">
              <Icon icon="keyboard-arrow-right"/>
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
        <div className={cssClasses} onClick={this.onItemClick}>
          <div className="accordion-list-item-content">
            <div className="accordion-list-item-text">{this.props.item.displayName}</div>
          </div>
        </div>
      );
    }
  }
});