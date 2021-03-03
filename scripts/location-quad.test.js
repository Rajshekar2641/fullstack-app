// need to add the valid tests for location

import isValidCoordinates from './main.js';
const loc_quad = require('./main');


//negative test case that checks when the given co-ordinates are null 
// and should return false.

describe('isValidCoordinates function', () => {
    it('checks whether the coordinates are valid', () => {
      expect(isValidCoordinates({})).toEqual(false);
    });
  });

  //test case to check whether the get location function returns undefined if not inside the Quad.

  describe('getLocation function', () => {
    it('checks whether the getLocation function returns the position', () => {
      expect(loc_quad.getLocation).toEqual(undefined);
    });
  });


