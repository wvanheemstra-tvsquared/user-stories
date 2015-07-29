'use strict';

angular.module('userstorymvcApp')
  .controller('MainCtrl', function ($scope, $timeout, UserStory, filterFilter, $location) {
    $scope.userstories = [];
    $scope.newUserStory = '';
    $scope.editedUserStory = null;
    $scope.status = $location.search().q || '';

    $scope.$watch('userstories', function () {
      $scope.remainingCount = filterFilter($scope.userstories, { completed: false }).length;
      $scope.completedCount = $scope.userstories.length - $scope.remainingCount;
      $scope.allChecked = !$scope.remainingCount;
    }, true);

    // Monitor the current location for changes and adjust the filter accordingly.
    $scope.$on('$locationChangeSuccess', function () {
      var status = $scope.status = $location.search().q || '';
      $scope.statusFilter = (status === 'active') ?
        { completed: false } : (status === 'completed') ?
        { completed: true } : null;
    });

    $scope.addUserStory = function () {
      var userstoryTitle = $scope.newUserStory.trim();
      if (!userstoryTitle.length) {
        return;
      }

      var newUserStory = new UserStory({
        title: userstoryTitle,
        completed: false
      });
      newUserStory.$save();
      $scope.userstories.unshift(newUserStory);
      $scope.newUserStory = '';
    };

    $scope.editUserStory = function (id) {
      $scope.editedUserStory = $scope.userstories[id];
      $scope.originalUserStory = angular.extend({}, $scope.editedUserStory);
    };

    $scope.doneEditing = function (id) {
      $scope.editedUserStory = null;
      var title = $scope.userstories[id].title.trim();
      if (title) {
        $scope.userstories[id].$update();
      } else {
        $scope.removeUserStory(id);
      }
    };

    $scope.revertEditing = function (id) {
      $scope.userstories[id] = $scope.originalUserStory;
      $scope.doneEditing(id);
    };

    $scope.removeUserStory = function (id) {
      $scope.userstories[id].$remove();
      $scope.userstories.splice(id, 1);
    };

    $scope.toggleCompleted = function (id) {
      var userstory = $scope.userstories[id];
      userstory.completed = !userstory.completed;
      userstory.$update();
    };

    $scope.clearCompletedUserStories = function () {
      var remainingUserStories = [];
      angular.forEach($scope.userstories, function (userstory) {
        if (userstory.completed) {
          userstory.$remove();
        } else {
          remainingUserStories.push(userstory);
        }
      });
      $scope.userstories = remainingUserStories;
    };

    $scope.markAll = function (allCompleted) {
      angular.forEach($scope.userstories, function (userstory) {
        userstory.completed = !allCompleted;
        userstory.$update();
      });
    };

    // Poll server to regularly update userstories
    (function refreshUserStories() {
      UserStory.query(function(response) {
        // Update userstories if a userstory is not being edited
        if($scope.editedUserStory === null) {
          $scope.userstories = response;
        }
        $scope.promise = $timeout(refreshUserStories, 5000);
      });
    })();

    $scope.$on('destroy', function(){
      $timeout.cancel($scope.promise);
    });
  });
