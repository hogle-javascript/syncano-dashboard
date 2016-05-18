import React from 'react';
import {withRouter} from 'react-router';
import Reflux from 'reflux';
import Radium from 'radium';
import _ from 'lodash';
import Helmet from 'react-helmet';

// Stores and Actions
import Store from './TracesStore';
import Actions from './TracesActions';

// Components
import {Container, InnerToolbar} from '../../common/';

// Local components
import TracesList from './TracesList';


const Traces = Radium(React.createClass({
  displayName: 'Traces',

  propTypes: {
    tracesFor: React.PropTypes.oneOf(['scriptEndpoint', 'script', 'trigger', 'schedule']),
    objectId: React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
  },

  contextTypes: {
    params: React.PropTypes.object
  },

  mixins: [Reflux.connect(Store)],

  getDefaultProps() {
    return {
      tracesFor: 'script',
      showHeader: false,
      hasHeaderId: true
    };
  },

  componentDidMount() {
    const {objectId, tracesFor} = this.props;

    Actions.setCurrentObjectId(objectId, tracesFor);
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
      scriptEndpoint: {
        route: 'scriptEndpoints',
        backLabel: 'Go back to Script Endpoints list'
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
    if (this.props.tracesFor === 'scriptEndpoint') {
      return 'Script Endpoint';
    }

    return _.capitalize(this.props.tracesFor);
  },

  getToolbarTitleText() {
    const {currentObjectName} = this.state;
    const tracesFor = this.getTracesFor();
    const toolbarIdText = this.props.hasHeaderId ? `(id: ${this.props.objectId})` : '';

    if (currentObjectName) {
      return `${tracesFor}: ${currentObjectName} ${toolbarIdText}`;
    }

    return '';
  },

  handleBackClick() {
    const {params} = this.context;
    const {router} = this.props;
    const config = this.getConfig();

    router.push({name: config.route, params});
  },

  render() {
    const {params} = this.context;
    const {items, isLoading} = this.state;
    const {tracesFor, router} = this.props;
    const styles = this.getStyles();
    const config = this.getConfig();
    const toolbarTitleText = this.getToolbarTitleText();

    return (
      <div>
        <Helmet title={toolbarTitleText} />
        <InnerToolbar
          title={toolbarTitleText}
          backFallback={this.handleBackClick}
          backButtonTooltip={config.backLabel}/>
        <div style={[
          styles.list,
          router.isActive({name: 'scriptEndpoint-traces', params}, true) && styles.scriptsList
        ]}>
          <Container>
            <TracesList
              isLoading={isLoading}
              tracesFor={tracesFor}
              name="Traces"
              items={items}/>
          </Container>
        </div>
      </div>
    );
  }
}));

export default withRouter(Traces);
