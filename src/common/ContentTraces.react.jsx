let React = require('react');
let ListWithOptions = require('./Lists/ListWithOptions.react');

module.exports = React.createClass({

  displayName: 'ContentTraces',

  render() {
    return (
      <div className="content-group">
        <ListWithOptions {...this.props} list={this.props.list}/>
      </div>
    );
  }

});