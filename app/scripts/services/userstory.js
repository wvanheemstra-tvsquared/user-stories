'use strict';

angular.module('userstorymvcApp')
  .factory('UserStory', function ($resource) {
	return $resource('api/userstories/:userstoryId', {
	  userstoryId: '@_id'
	}, {
	  update: {
	    method: 'PUT'
	  }
	});
});