'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * UserStory Schema
 */
var UserStorySchema = new Schema({
  title: String,
  completed: Boolean,
  createdAt: Date,  
  updatedAt: Date,
});

UserStorySchema.pre('save', function(next, done){
  if (this.isNew) {
	this.createdAt = Date.now();
  }
  this.updatedAt = Date.now();
  next();
});

mongoose.model('UserStory', UserStorySchema);
