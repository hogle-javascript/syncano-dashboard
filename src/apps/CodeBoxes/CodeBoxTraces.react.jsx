import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

// Stores & Actions
import Store from './CodeBoxStore';
import Actions from './CodeBoxActions';

// Components
import Traces from '../Traces';
import Container from '../../common/Container';

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
    let codeBoxId = this.getParams().codeboxId;
    return (
      <Traces
        objectId={codeBoxId}
        tracesFor='codebox'/>
    );
  }
});
