import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';
import _ from 'lodash';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

// Stores and Actions
import Store from './TracesStore';
import Actions from './TracesActions';

// Components
import Common from '../../common';

// Local components
import TracesList from './TracesList';


export default Radium(React.createClass({

  displayName: 'Traces',

  propTypes: {
    tracesFor: React.PropTypes.oneOf(['webhook', 'snippet', 'trigger', 'schedule']),
    objectId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
  },

  mixins: [
    Router.Navigation,
    Router.State,

    Reflux.connect(Store),
    HeaderMixin,
    InstanceTabsMixin
  ],

  getDefaultProps() {
    return {
      tracesFor: 'snippet',
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
      snippetsList: {
        top: '-45px'
      }
    };
  },

  getConfig() {
    return {
      webhook: {
        route: 'webhooks',
        backLabel: 'Go back to Data Views'
      },
      snippet: {
        route: 'snippets',
        backLabel: 'Go back to Snippets list'
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
    if (this.props.tracesFor === 'snippet') {
      return 'Snippet';
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
        <Common.InnerToolbar
          title={toolbarTitleText}
          backFallback={this.handleBackClick}
          backButtonTooltip={config.backLabel}/>
        <div style={[styles.list, this.isActive('snippet-traces') && styles.snippetsList]}>
          <TracesList
            tracesFor={this.props.tracesFor}
            name="Traces"
            items={this.state.traces}/>
        </div>
      </div>
    );
  }
}));
