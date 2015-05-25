var React = require('react');
var Icon = require('../Icon/Icon.react');

module.exports = React.createClass({

  displayName: "TraceResult",

  render: function () {
    return (
      <div className="card-body">
        <div className="card-section">
          <div className="card-section-inner">
            <div className="card-section-header">
              <div className="card-section-icon">
                <Icon icon="terminal"/>
              </div>
              <div className="card-section-header-content">
                <div className="card-section-title">Result</div>
              </div>
            </div>
            <div className="card-section-body">
              <div className="card-section-result">
                {this.props.result}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});