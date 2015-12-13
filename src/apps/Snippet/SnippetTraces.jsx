import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

// Stores & Actions
import Store from './SnippetStore';
import Actions from './SnippetActions';

// Components
import Traces from '../Traces';

export default React.createClass({

  displayName: 'SnippetTraces',

  mixins: [
    Router.State,

    Reflux.connect(Store),
    HeaderMixin,
    InstanceTabsMixin
  ],

  componentDidMount() {
    Actions.fetch();
  },

  render() {
    return (
      <div style={{marginTop: 100}}>
        <Traces
          objectId={this.getParams().snippetId}
          tracesFor='snippet'/>
      </div>
    );
  }
});
