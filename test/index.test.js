const lazyLoading = require('../index');
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();

describe('Lazy Loading', function() {
    
    it('should load module', function() {
        should.exist(lazyLoading);
    });

  });