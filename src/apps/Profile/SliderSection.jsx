import React from 'react';

import MUI   from 'material-ui';
import Show  from '../../common/Show/Show.react';

export default React.createClass({

  displayName: 'SliderSection',

  mixins: [MUI.Mixins.StylePropable],

  getStyles() {
    return {
      root: {},
      sectionTopic: {
        fontSize: '1.3em'
      }
    }
  },

  render() {
    let styles    = this.getStyles(),
        rootStyle = this.mergeAndPrefix(styles.root, this.props.style);

    return (
      <div
        className = "row"
        style     = {rootStyle}>
        <div className="col-md-24">
          <div className="row">
            <div
              className = "col-flex-1"
              style     = {styles.sectionTopic}>
              {this.props.title}
            </div>
            <div
              className= "col-flex-1"
              style    = {{color: '#9B9B9B', textAlign: 'right'}}>
              suggestion based on usage: ${this.props.suggestion}
            </div>
          </div>
          <div style={{marginTop: 10, padding: 10}}>
            {this.props.slider}
          </div>
        </div>
        <div
          className = "col-md-11"
          style     = {{paddingLeft: 35}}>
          {this.props.sliderSummary}
        </div>
      </div>
    )
  }
});
