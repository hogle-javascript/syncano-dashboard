var React = require('react'),
    Show  = require('../../common/Show/Show.react'),
    MUI   = require('material-ui');

module.exports = React.createClass({

  displayName: 'SliderSection',

  mixins: [MUI.Mixins.StylePropable],

  getStyles() {
    return {
      root: {
      },
      sectionTopic: {
        fontSize: '1.3em'
      }
    }
  },

  render: function() {
    var styles = this.getStyles();
    var rootStyle = this.mergeAndPrefix(styles.root, this.props.style);
    return (
      <div className="row" style={rootStyle}>
        <div className="col-md-24">
          <div className="row">
            <div className="col-flex-1" style={styles.sectionTopic}>
              {this.props.title}
            </div>
            <div
              className= "col-flex-1"
              style    = {{color: '#9B9B9B', textAlign: 'right'}}>
              suggestion based on usage: ${this.props.suggestion}
            </div>
          </div>
          <div>
            {this.props.slider}
          </div>
          <div className="row" style={{ textAlign: 'center', verticalAlign: 'middle'}}>
            {this.props.sliderOptions}
          </div>
        </div>
        <div className="col-md-11" style={{paddingLeft: 35}}>
          {this.props.sliderSummary}
        </div>
      </div>
    )
  }
});

