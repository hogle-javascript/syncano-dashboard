import React from 'react';
import _ from 'lodash';
import Radium from 'radium';

import {RaisedButton} from 'syncano-material-ui';

// import './Tour.css';

export default Radium(React.createClass({

  propTypes: {
    config: React.PropTypes.arrayOf(React.PropTypes.shape({
      node: React.PropTypes.object,
      text: React.PropTypes.node
    })),
    currentStep: React.PropTypes.number.isRequired,
    visible: React.PropTypes.bool,
    showDots: React.PropTypes.bool
  },

  getDefaultProps() {
    return {
      visible: true,
      showDots: true
    };
  },

  componentDidMount() {
    this.throttledOnWindowResize = _.throttle(this.onWindowResize, 64);
    window.addEventListener('resize', this.throttledOnWindowResize);
  },

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.throttledOnWindowResize);
  },

  getStyles() {
    return {
      focusText: {
        position: 'fixed',
        top: '30%',
        left: '40%',
        transform: 'translateX(-40%)',
        textAlign: 'center',
        padding: '1em',
        fontSize: '2em',
        lineHeight: '1.5em',
        color: '#fff',
        textShadow: 'rgba(0, 0, 0, 0.17) 0 1px 0, rgba(0, 0, 0, 0.17) 0 1px 8px'
      },
      overlayHidden: {
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        opacity: 0,
        zIndex: -5,
        display: 'none'
      },
      overlayVisible: {
        position: 'fixed',
        height: '100%',
        width: '100%',
        top: 0,
        left: 0,
        opacity: 1,
        zIndex: 5000,
        transition: 'opacity .2s',
        display: 'block'
      },
      dots: {
        textAlign: 'center'
      },
      dotSingle: {
        height: '.25em',
        width: '.25em',
        display: 'inline-block',
        borderRadius: '.25em',
        border: '1px solid #fff',
        margin: '0 .25em'
      },
      dotSingleActive: {
        background: '#fff'
      },
      tourFocus: {
        position: 'fixed',
        borderRadius: '50%',
        boxShadow: '0 0 0 200vmax rgba(128, 128, 128, 0.5)',
        transition: 'height .2s, width .2s, top .2s, left .2s',
        zIndex: 1000
      }
    };
  },

  getDotStyle(currentStep, index) {
    const styles = this.getStyles();

    return [styles.dotSingle, (currentStep >= index ? styles.dotSingleActive : null)];
  },

  onWindowResize() {
    this.forceUpdate();
  },

  handleRun() {
    let {currentStep, config} = this.props;

    if (config[currentStep] && config[currentStep].run) {
      config[currentStep].run();
    }
  },

  handleOnClick() {
    this.handleRun();
    this.props.onClick();
  },

  render() {
    const styles = this.getStyles();
    let {currentStep, config, visible, showDots} = this.props;
    let additionalLeft = 0;
    let additionalTop = 0;
    let classes = 'react-tour';

    if (!config) return null;

    if (!visible) classes += ' react-tour-hide';

    if (!config[currentStep]) {
      return <div />;
    }

    if (config[currentStep].left) {
      additionalLeft = config[currentStep].left;
    }

    if (config[currentStep].top) {
      additionalTop = config[currentStep].top;
    }

    this.handleRun();

    let ElementRect = config[currentStep].node.getBoundingClientRect();
    let top = parseInt(ElementRect.top - 20 + additionalTop, 10);
    let left = parseInt(ElementRect.left - 20 + additionalLeft, 10);
    let height = parseInt(config[currentStep].radius, 10);
    let width = height;

    return (
      <div onClick={this.handleOnClick} style={visible ? styles.overlayVisible : styles.overlayHidden}>
        <div
          className="tour-focus"
          style={[{
            top,
            left,
            height,
            width
          }, styles.tourFocus]}>
          <div style={styles.focusText}>
            {config[currentStep] ? config[currentStep].text : config[0].text}

            {showDots && (
              <div style={styles.dots}>
                {config.map((el, index) => {
                  return <div style={this.getDotStyle(currentStep, index)} key={index} />;
                })}
              </div>
            )}
            <RaisedButton
              label={currentStep === config.length - 1 ? 'End tour' : 'Next'}
              labelStyle={{fontSize: '16px'}}
              fullWidth={false}
              style={{boxShadow: 'none', height: '48px'}}
              primary={true}/>
          </div>
        </div>
      </div>
    );
  }
}));
