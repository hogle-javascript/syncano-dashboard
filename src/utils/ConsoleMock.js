//Faking console

var mock = jest.genMockFunction().mockImplementation(function() {return this;});
console.debug = mock;
console.info = mock;
