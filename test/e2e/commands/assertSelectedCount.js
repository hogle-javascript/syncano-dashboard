exports.command = function assertSelectedCount(locationStrategy, selector, count) {
  return this.elements(locationStrategy, selector, (result) => {
    this.assert.equal(result.value.length, count);
  });
};
