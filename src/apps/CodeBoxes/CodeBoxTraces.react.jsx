import React from 'react';
import Reflux from 'reflux';
import Router from 'react-router';

// Utils
import HeaderMixin from '../Header/HeaderMixin';
import InstanceTabsMixin from '../../mixins/InstanceTabsMixin';

// Stores & Actions
import CodeBoxStore from './CodeBoxStore';
import CodeBoxActions from './CodeBoxActions';

// Components
import Apps from '../';
import Container from '../../common/Container';


export default React.createClass({

  displayName: 'CodeBoxTraces',

  mixins: [
    Router.State,

    Reflux.connect(CodeBoxStore),
    HeaderMixin,
    InstanceTabsMixin
  ],

  componentDidMount: function() {
    CodeBoxActions.fetch();
  },

  render() {
    let codeBoxId = this.getParams().codeboxId;
    return (
      <Apps.Traces
        objectId  = {codeBoxId}
        tracesFor = 'codebox'
      />
    );
  }

});
