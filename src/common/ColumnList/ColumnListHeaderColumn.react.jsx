//var React = require('react'),
//  classNames = require('classnames');
//
//
//module.exports = React.createClass({
//
//  displayName: 'ColumnListHeaderColumn',
//
//  propTypes: {
//    grid: React.PropTypes.string,
//    hidden: React.PropTypes.bool,
//    align: React.PropTypes.string,
//    checkedItemsNumber: React.PropTypes.integer,
//  },
//
//  getInitialState: function() {
//    console.log('this.props.checkedItemsNumber', this.props.checkedItemsNumber)
//    return {
//      checkedItemsNumber: this.props.checkedItemsNumber,
//    }
//  },
//
//  componentWillReceiveProps: function(nextProps) {
//    this.setState({
//      checkedItemsNumber: nextProps.checkedItemsNumber,
//    })
//  },
//
//  render: function () {
//
//    var cssClasses = classNames('col', 's' + this.props.grid, {
//      'right-align': this.props.align == 'right',
//    });
//    return <div style={this.props.style} className={cssClasses}>{this.props.children}</div>
//
//  }
//
//});