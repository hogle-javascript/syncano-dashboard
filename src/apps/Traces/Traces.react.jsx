import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router-old';
import Radium from 'radium';
import _ from 'lodash';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

// Stores and Actions
import Store from './TracesStore';
import Actions from './TracesActions';

// Components
import MUI from 'syncano-material-ui';
import Common from '../../common';

// Local components
import TracesList from './TracesList.react';


export default Radium(React.createClass({

  displayName: 'Traces',

  propTypes: {
    tracesFor: React.PropTypes.oneOf(['webhook', 'codebox', 'trigger', 'schedule']),
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
      tracesFor: 'codebox',
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
      cBList: {
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
      codebox: {
        route: 'codeboxes',
        backLabel: 'Go back to CodeBoxes list'
      },
      trigger: {
        route: 'tasks',
        backLabel: 'Go back to Tasks list'
      },
      schedule: {
        route: 'tasks',
        backLabel: 'Go back to Tasks list'
      }
    }[this.props.tracesFor];
  },

  getTracesFor() {
    if (this.props.tracesFor === 'codebox') {
      return 'CodeBox';
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

  renderToolbarTitle() {
    let toolbarTitleText = this.getToolbarTitleText();

    return (
      <MUI.ToolbarGroup>
        <MUI.ToolbarTitle text={toolbarTitleText}/>
      </MUI.ToolbarGroup>
    );
  },

  render() {
    const styles = this.getStyles();
    const config = this.getConfig();

    return (
      <div>
        <Common.InnerToolbar>
          <MUI.ToolbarGroup>
            <MUI.IconButton
              iconClassName="synicon-arrow-left"
              tooltip={config.backLabel}
              tooltipPosition="bottom-right"
              onClick={this.handleBackClick}
              touch={true}
              style={{marginTop: 4}}
              iconStyle={{color: 'rgba(0,0,0,.4)'}}/>
          </MUI.ToolbarGroup>
          {this.renderToolbarTitle()}
        </Common.InnerToolbar>
        <div style={[styles.list, this.isActive('codebox-traces') && styles.cBList]}>
          <TracesList
            tracesFor={this.props.tracesFor}
            name="Traces"
            items={this.state.traces}/>
        </div>
      </div>
    );
  }
}));
