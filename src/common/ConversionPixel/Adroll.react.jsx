import React from 'react';
import ReactScriptLoader from 'react-script-loader';

export default React.createClass({

  displayName: 'AdrollPixel',

  mixins: [ReactScriptLoader.ReactScriptLoaderMixin],

  getScriptURL() {
    return '/js/adroll.js';
  },

  onScriptLoaded() {},
  onScriptError() {},

  render() {
    return <div></div>
  }
});
