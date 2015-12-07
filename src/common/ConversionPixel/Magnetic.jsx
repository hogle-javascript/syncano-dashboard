import React from 'react';
import ReactScriptLoader from 'react-script-loader';

export default React.createClass({

  displayName: 'MagneticPixel',

  mixins: [ReactScriptLoader.ReactScriptLoaderMixin],

  getScriptURL() {
    return '//magnetic.t.domdex.com/23447/pix.js?t=c&for=syncano';
  },

  onScriptLoaded() {},
  onScriptError() {},

  render() {
    return (
      <div dangerouslySetInnerHTML={{__html: `
        <noscript>
          <img src="//magnetic.t.domdex.com/23447/pix.gif?t=c&for=syncano" width="1" height="1" style="display:none;">
        </noscript>`}}>
      </div>
    );
  }
});
