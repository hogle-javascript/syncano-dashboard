import { decorate } from './utils';

function applyIsLoading(context, fn, args, options) {
  console.log('applyIsLoading', options);
  return fn.apply(context, args);
}


function handleDescriptor(target, key, descriptor, [options = {}]) {
  return {
    ...descriptor,
    value: function isLoadingWrapper() {
      return applyIsLoading(this, descriptor.value, arguments, options);
    }
  };
}

export default function isLoading(...args) {
  return decorate(handleDescriptor, args);
}
