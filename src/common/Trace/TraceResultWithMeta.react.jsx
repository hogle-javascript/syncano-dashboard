var React = require('react'),
    mui   = require('material-ui'),

    FontIcon = mui.FontIcon;

module.exports = React.createClass({

  displayName: "TraceResultWithMeta",

  render: function() {
    var metaListed = '';
    var argsListed = '';
    var key        = null;
    if (this.props.args && this.props.meta) {
      for (key in this.props.meta) {
        if (this.props.meta.hasOwnProperty(key)) {
          metaListed += key + ': ' + this.props.meta[key] + '\n';
        }
      }

      for (key in this.props.args) {
        if (this.props.args.hasOwnProperty(key)) {
          argsListed += key + ': ' + this.props.args[key] + '\n';
        }
      }
    }

    return (
      <div className="card-body">
        <div className="card-section">
          <div className="card-section-inner">
            <div className="card-section-header">
              <div className="card-section-icon">
                <FontIcon className="synicon-console"/>
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
          <div className="card-section-inner">
            <div className="card-section-header">
              <div className="card-section-icon">
                <FontIcon className="synicon-console"/>
              </div>
              <div className="card-section-header-content">
                <div className="card-section-title">Meta</div>
              </div>
            </div>
            <div className="card-section-body">
              <div className="card-section-result">
                {metaListed}
              </div>
            </div>
          </div>
          <div className="card-section-inner">
            <div className="card-section-header">
              <div className="card-section-icon">
                <FontIcon className="synicon-console"/>
              </div>
              <div className="card-section-header-content">
                <div className="card-section-title">Payload</div>
              </div>
            </div>
            <div className="card-section-body">
              <div className="card-section-result">
                {argsListed}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});