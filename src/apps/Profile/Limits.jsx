import React from 'react';
import Show from '../../common/Show/Show.react';

module.exports = React.createClass({

  displayName: 'Limits',

  getStyles: function() {
    return {
    }
  },

  render: function() {
    var styles = this.getStyles();
    return (
      <div className="row">
        <div className="col-md-8">
          <div>{this.props.data.api.included}</div>
          <div>{this.props.data.cbx.included}</div>
        </div>
        <div className="col-flex-1">
          <div><strong>API calls</strong></div>
          <div><strong>CodeBox runs</strong></div>
        </div>
        <Show if={this.props.data.api.overage && this.props.data.cbx.overage}>
          <div className="col-md-8" style={{textAlign: 'right'}}>
            <div><strong>+{this.props.data.api.overage}</strong></div>
            <div><strong>+{this.props.data.cbx.overage}</strong></div>
          </div>
        </Show>
        <Show if={this.props.data.api.overage && this.props.data.cbx.overage}>
          <div className="col-md-9">
            <div>per extra call</div>
            <div>per extra run</div>
          </div>
        </Show>
      </div>
    )
  }

});
