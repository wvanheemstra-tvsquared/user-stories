'use strict';

var should = require('should'),
	app = require('../../../server'),
	mongoose = require('mongoose'),
	UserStory = mongoose.model('UserStory'),
	request = require('supertest');

describe('GET /api/userstories', function() {

  it('should respond with JSON array', function(done) {
	request(app)
	  .get('/api/userstories')
	  .expect(200)
	  .expect('Content-Type', /json/)
	  .end(function(err, res) {
		if (err) return done(err);
		res.body.should.be.instanceof(Array);
		done();
	  });
  });
});

describe('POST /api/userstories', function() {

  it('should respond with added userstory', function(done) {
	request(app)
	  .post('/api/userstories')
	  .send({
		title: 'userStoryTitle',
		completed: false
	  })
	  .expect(200)
	  .expect('Content-Type', /json/)
	  .end(done);
  });

  afterEach(function(done) {
	UserStory.remove().exec();
	done();
  });
});

describe('PUT /api/userstories/:userStoryId', function() {
  var userstory,
	  updatedName = 'newTitle';

  beforeEach(function(done) {
	userstory = new UserStory({
	  title: 'userStoryTitle',
	  completed: false
	});

	userstory.save(function(err) {
	  done();
	});
  });

  afterEach(function(done) {
	UserStory.remove().exec();
	done();
  });

  function sendRequest() {
	return request(app)
	  .put('/api/userstories/' + userstory._id)
	  .send({
		title: updatedName,
		completed: false
	  });
  }

  it('should respond with userstory', function(done) {
	sendRequest()
	  .expect(200)
	  .expect('Content-Type', /json/)
	  .end(done);
  });

  it('should update userstory in database', function(done) {
	sendRequest()
	  .end(function() {
		UserStory.findById(userstory._id, function(err, updatedUserStory) {
		  updatedUserStory.title.should.equal(updatedName);
		  done();
		});
	  });
  });
});

describe('DEL /api/userstories/:userStoryId', function() {
  var userstory;

  beforeEach(function(done) {
	userstory = new UserStory({
	  title: 'userStoryTitle',
	  completed: false
	});

	userstory.save(function(err) {
	  done();
	});
  });

  afterEach(function(done) {
	UserStory.remove().exec();
	done();
  });

  function sendRequest() {
	return request(app)
	  .del('/api/userstories/' + userstory._id);
  }

  it('should respond with 200', function(done) {
	sendRequest()
	  .expect(200).end(done);
  });

  it('should delete the userstory from the database', function(done) {
	sendRequest()
	  .expect(200).end(function() {
		UserStory.find({}, function(err, userstories) {
		  userstories.should.have.length(0);
		  done();
		});
	  });
  });
});
