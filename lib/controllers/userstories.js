'use strict';

var mongoose = require('mongoose'),
  UserStory = mongoose.model('UserStory');

/**
 * Find userstory by id
 */
exports.userstory = function(req, res, next, id) {
  UserStory.findById(id, function(err, userstory) {
	if (err) return next(err);
	if (!userstory) return next(new Error('Failed to load userstory ' + id));
	req.userstory = userstory;
	next();
  });
};

/**
 * List of userstories
 */
exports.query = function(req, res) {
  UserStory.find().sort('-createdAt').exec(function(err, userstories) {
	if (err) return res.json(500, err);
	res.json(userstories);
  });
};

/**
 * Show a userstory
 */
exports.show = function(req, res) {
  res.json(req.userstory);
};

/**
 * Create a userstory
 */
exports.create = function(req, res) {
  var userstory = new UserStory(req.body);

  userstory.save(function(err) {
	if (err) return res.json(500, err);
	res.json(userstory);
  });
};

/**
 * Update a userstory
 */
exports.update = function(req, res) {
  UserStory.update({ _id: req.userstory._id }, req.body, { }, function(err, updatedUserStory) {
	if (err) return res.json(500, err);
	res.json(updatedUserStory);
  });
};

/**
 * Remove a userstory
 */
exports.remove = function(req, res) {
  var userstory = req.userstory;

  userstory.remove(function(err) {
	if (err) return res.json(500, err);
	res.json(userstory);
  });
};