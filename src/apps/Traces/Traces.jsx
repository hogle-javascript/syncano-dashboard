import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';
import _ from 'lodash';

// Stores and Actions
import Store from './TracesStore';
import Actions from './TracesActions';

// Components
import {Container} from 'syncano-components';
import {InnerToolbar} from '../../common';

// Local components
import TracesList from './TracesList';


export default Radium(React.createClass({
  displayName: 'Traces',

  propTypes: {
    tracesFor: React.PropTypes.oneOf(['codeBox', 'script', 'trigger', 'schedule']),
    objectId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
  },

  mixins: [
    Router.Navigation,
    Router.State,

    Reflux.connect(Store)
  ],

  getDefaultProps() {
    return {
      tracesFor: 'script',
      showHeader: false
    };
  },

  componentDidMount() {
    Actions.setCurrentObjectId(this.props.objectId, this.props.tracesFor);
  },

  getStyles() {
    return {
      list: {
        position: 'relative',
        top: '35px'
      },
      scriptsList: {
        top: '-45px'
      }
    };
  },

  getConfig() {
    return {
      codeBox: {
        route: 'codeBoxes',
        backLabel: 'Go back to Data Views'
      },
      script: {
        route: 'scripts',
        backLabel: 'Go back to Scripts list'
      },
      trigger: {
        route: 'triggers',
        backLabel: 'Go back to Triggers list'
      },
      schedule: {
        route: 'schedules',
        backLabel: 'Go back to Schedules list'
      }
    }[this.props.tracesFor];
  },

  getTracesFor() {
    if (this.props.tracesFor === 'script') {
      return 'Script';
    }

    return _.capitalize(this.props.tracesFor);
  },

  getToolbarTitleText() {
    let tracesFor = this.getTracesFor();

    if (this.state.currentObjectName) {
      return `${tracesFor}: ${this.state.currentObjectName} (id: ${this.props.objectId})`;
    }

    return '';
  },

  handleBackClick() {
    const config = this.getConfig();

    this.transitionTo(config.route, this.getParams());
  },

  render() {
    const styles = this.getStyles();
    const config = this.getConfig();
    let toolbarTitleText = this.getToolbarTitleText();

    return (
      <div>
        <InnerToolbar
          title={toolbarTitleText}
          backFallback={this.handleBackClick}
          backButtonTooltip={config.backLabel}/>
        <div style={[styles.list, this.isActive('script-traces') && styles.scriptsList]}>
          <Container>
            <TracesList
              tracesFor={this.props.tracesFor}
              name="Traces"
              items={this.state.items}/>
          </Container>
        </div>
      </div>
    );
  }
}));
