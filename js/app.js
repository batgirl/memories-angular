angular.module("memories-app", [ngRoute])
  .controller("MemoriesController", function($rootScope, $scope, $http, $route, $routeParams, $location) {
    $rootScope.memory = {};
    $http({
      method: 'GET',
      url: 'http://g12-chloe-alnaji-memories.cfapps.io/api/v1/memories'
    }).then(function successCallback(response) {
        $rootScope.allMemories = response.data.rows;
      }, function errorCallback(response) {
        console.log('Get Error: ', response);
      });
    $rootScope.submit = function() {
      console.log($rootScope.memory);
      $http({
        method: 'POST',
        url: "http://g12-chloe-alnaji-memories.cfapps.io/api/v1/memories",
        data: 
          {
            "data": {
              "type": "memory",
              "attributes": {
                "old_days": $rootScope.memory.old_days,
                "these_days": $rootScope.memory.these_days,
                "year": parseInt($rootScope.memory.year)
              }
            }
          },
        headers: {'Content-Type': 'application/json'} 
      }).then(function successCallback(response) {
        console.log('Success!');
        $scope.allMemories.push($rootScope.memory);
        $rootScope.memory = {};
      }, function errorCallback(response) {
        console.log('Post Error: ', response);
      })  
    }
  })
  .controller("YearController", function() {
    // stuff here
  })
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'memories.html',
      controller: 'MemoriesController'
    })
    .when('/:year' {
      templateUrl: 'year.html',
      controller: 'YearController'
    })
    $locationProvider.html5Mode(true);
  })