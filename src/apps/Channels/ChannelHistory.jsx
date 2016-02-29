import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import {InstanceTabsMixin} from '../../mixins';

// Stores and Actions
import Store from './ChannelHistoryStore';
import Actions from './ChannelHistoryActions';

// Components
import {Container} from 'syncano-components';
import {InnerToolbar} from '../../common';

// Local components
import ChannelHistoryList from './ChannelHistoryList';


export default Radium(React.createClass({

  displayName: 'ChannelHistory',

  propTypes: {
    channelName: React.PropTypes.string
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
      showHeader: false
    };
  },

  componentDidMount() {
    Actions.fetchChannelHistory(this.props.channelName);
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

  handleBackClick() {
    this.transitionTo('channels', this.getParams());
  },

  render() {
    const styles = this.getStyles();

    return (
      <div>
        <InnerToolbar
          title={'Channel History for ' + this.props.channelName}
          backFallback={this.handleBackClick}
          backButtonTooltip='Go back to Channels list'/>
        <div style={[styles.list, this.isActive('snippet-traces') && styles.snippetsList]}>
          <Container>
            <ChannelHistoryList
              name="Channel History"
              items={this.state.items}
              isLoading={this.state.isLoading}/>
          </Container>
        </div>
      </div>
    );
  }
}));
