export function isDescriptor(desc) {
  if (!desc || !desc.hasOwnProperty) {
    return false;
  }

  const keys = ['value', 'get', 'set'];

  for (const key of keys) {
    if (desc.hasOwnProperty(key)) {
      return true;
    }
  }

  return false;
}

export function decorate(handler, args) {
  if (isDescriptor(args[args.length - 1])) {
    return handler(...args, []);
  }

  return function () {
    return handler(...arguments, args);
  };
}
