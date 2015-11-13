angular.module("memories-app", [])
  .controller("MemoriesController", function($scope, $http) {
    $http({
      method: 'GET',
      url: 'http://g12-chloe-alnaji-memories.cfapps.io/api/v1/memories'
    }).then(function successCallback(response) {
        $scope.allMemories = response.data.rows;
      }, function errorCallback(response) {
        console.log(response);
      });
  });