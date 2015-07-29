export default {
  getDropdown(list, payloadArg, textArg) {
    if (!list) {
      return [{payload: '', text: 'Loading...'}];
    }
    return list.map(function(item) {
      return {
        payload : item[payloadArg],
        text    : item[textArg]
      }
    });
  },

};
