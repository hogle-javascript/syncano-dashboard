import React from 'react';
import Show from '../../common/Show/Show.react';

export default React.createClass({

  displayName: 'Limits',

  getStyles() {
    return {}
  },

  render() {
    let styles = this.getStyles();
    
    return (
      <div className="row">
        <div className="col-md-9" style={{textAlign: 'right'}}>
          <div><strong>{this.props.data.api.included}</strong></div>
          <div><strong>{this.props.data.cbx.included}</strong></div>
        </div>
        <div className="col-md-9" style={{paddingLeft: 3, whiteSpace: 'nowrap'}}>
          <div>API calls</div>
          <div>CodeBox runs</div>
        </div>
        <Show if={this.props.data.api.overage && this.props.data.cbx.overage}>
          <div className="col-md-8" style={{textAlign: 'right', whiteSpace: 'nowrap'}}>
            <div><strong>+{this.props.data.api.overage}</strong></div>
            <div><strong>+{this.props.data.cbx.overage}</strong></div>
          </div>
        </Show>
        <Show if={this.props.data.api.overage && this.props.data.cbx.overage}>
          <div className="col-md-9" style={{paddingLeft: 3}}>
            <div style={{whiteSpace: 'nowrap'}}>per extra call</div>
            <div style={{whiteSpace: 'nowrap'}}>per extra run</div>
          </div>
        </Show>
      </div>
    )
  }
});
