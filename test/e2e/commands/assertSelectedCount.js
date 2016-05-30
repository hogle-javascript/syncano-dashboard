exports.command = function assertSelectedCount(location_strategy, selector, count) {
  this.elements(location_strategy, selector, (result) => {
    this.assert.equal(result.value.length, count);
  });

  return this;
};
