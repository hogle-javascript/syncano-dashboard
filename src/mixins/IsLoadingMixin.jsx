import React from 'react';
import _ from 'lodash';
import Common from '../common';

export default (options, props) => {
  props                   = props        || {};
  options                 = options      || {};
  options.attr            = options.attr || 'state.isLoading';
  options.show            = options.show || [true, null, undefined];
  options.overwriteRender = options.overwriteRender || true;

  let mixin = {
    componentDidMount() {
      if (options.overwriteRender === true && !_.isFunction(this.renderLoaded)) {
        throw Error('invalid `renderLoaded` type');
      }
    },

    isLoading() {
      let value = _.get(this, options.attr, false);
      return _.indexOf(options.show, value) > -1;
    },

    renderLoadingComponent() {
      return (
        <Common.Container.Loading>
          <Common.Loading {...props} show = {true} />
        </Common.Container.Loading>
      )
    },

    renderIsLoading() {
      if (this.isLoading()) {
        if (_.isFunction(this.renderLoading)) {
          return this.renderLoading();
        }

        return this.renderLoadingComponent();
      }

      return this.renderLoaded();
    }
  };

  if (options.overwriteRender === true) {
    mixin.render = function() {
      return this.renderIsLoading();
    }
  }

  return mixin;
};