import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

// Stores and Actions
import Store from './TracesStore';
import Actions from './TracesActions';

// Components
import MUI from 'material-ui';
import Common from '../../common';
import Container from '../../common/Container/Container.react';

// Local components
import TracesList from './TracesList.react';


export default React.createClass({

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
    }
  },

  getConfig() {
    return {
      webhook: {
        route: 'data',
        backLabel: 'Go back to Data Views'
      },
      codebox: {
        route: 'codeboxes',
        backLabel: 'Go back to CodeBoxes list'
      },
      trigger: {
        route: 'data',
        backLabel: 'Go back to Data Views'
      },
      schedule: {
        route: 'tasks',
        backLabel: 'Go back to Tasks list'
      }
    }[this.props.tracesFor];
  },

  componentDidMount() {
    Actions.setCurrentObjectId(this.props.objectId, this.props.tracesFor);
  },

  handleBackClick() {
    const config = this.getConfig();
    this.transitionTo(config.route, this.getParams());
  },

  renderToolbarTitle() {
    let tracesFor = this.props.tracesFor === 'codebox' ? 'CodeBox' : this.props.tracesFor.charAt(0).toUpperCase() + this.props.tracesFor.slice(1);
    let toolbarTitleText = this.state.currentObjectName ? `${tracesFor}: ${this.state.currentObjectName} (id: ${this.props.objectId})` : '';

    return (
      <MUI.ToolbarGroup>
        <MUI.ToolbarTitle text={toolbarTitleText}/>
      </MUI.ToolbarGroup>
    )
  },

  render() {
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
        <TracesList
          tracesFor={this.props.tracesFor}
          name="Traces"
          items={this.state.traces}/>
      </div>
    );
  }
});
