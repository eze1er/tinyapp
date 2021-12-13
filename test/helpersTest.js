const { assert } = require('chai');

const { getUserByEmail } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('getUserByEmail', function() {
  it('should return a user with valid email', function() {
    const user = getUserByEmail("user@example.com", testUsers)
    const expectedUserID = "userRandomID";
    // Write your assert statement here
    // do i'm good writing or not
    if (!user) {
      return undefined;
    }
    if (user === expectedUserID) {
      return true;
    }
    // return false;

    assert.isOk('user@example.com', 'user@example.com is ok');
    assert.isOk(false, 'this will fail');


  });
});