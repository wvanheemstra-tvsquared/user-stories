'use strict';

var index = require('./controllers'),
    userstories = require('./controllers/userstories');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.param('userStoryId', userstories.userstory);
  app.post('/api/userstories', userstories.create);
  app.get('/api/userstories', userstories.query);
  app.get('/api/userstories/:userStoryId', userstories.show);
  app.put('/api/userstories/:userStoryId', userstories.update);
  app.del('/api/userstories/:userStoryId', userstories.remove);

  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', index.index);
};