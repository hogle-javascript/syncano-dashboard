var React = require('react');

var AccordionListItemPrimary = require('./AccordionListItemPrimary.react');

require('./Accordion.css');

module.exports = React.createClass({

  displayName: 'Accordion',

  render: function () {
    var items = this.props.items.map(function (item) {
      return <AccordionListItemPrimary {...this.props} key={item.id} item={item}/>
    }.bind(this));
    return (
      <div className="accordion">
        <div className="accordion-header">
          <div className="accordion-heading">Groups</div>
        </div>
        <div className="accordion-body">
          {items}
        </div>
      </div>
    );
  }
});