import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';
import Radium from 'radium';
import Helmet from 'react-helmet';

// Stores and Actions
import Store from './ChannelHistoryStore';
import Actions from './ChannelHistoryActions';

// Components
import {Container, InnerToolbar} from '../../common/';

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

    Reflux.connect(Store)
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
    const {channelName} = this.props;
    const {items, isLoading} = this.state;
    const styles = this.getStyles();
    const title = `Channel History for ${channelName}`;

    return (
      <div>
        <Helmet title={title} />
        <InnerToolbar
          title={title}
          backFallback={this.handleBackClick}
          backButtonTooltip='Go back to Channels list'/>
        <div style={[styles.list, this.isActive('snippet-traces') && styles.snippetsList]}>
          <Container>
            <ChannelHistoryList
              name="Channel History"
              items={items}
              isLoading={isLoading}/>
          </Container>
        </div>
      </div>
    );
  }
}));
