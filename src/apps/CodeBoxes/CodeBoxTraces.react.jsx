import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router-old';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

// Stores & Actions
import Store from './CodeBoxStore';
import Actions from './CodeBoxActions';

// Components
import Traces from '../Traces';

export default React.createClass({

  displayName: 'CodeBoxTraces',

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
      <Traces
        objectId={this.getParams().codeboxId}
        tracesFor='codebox'/>
    );
  }
});
