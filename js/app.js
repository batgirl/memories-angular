angular.module("memories-app", ["ngRoute"])
  .controller("SidebarController", function($rootScope, $scope, $http) {
    $rootScope.selectedYear = "";
    $http({
      method: 'GET',
      url: 'http://g12-chloe-alnaji-memories.cfapps.io/api/v1/memories/years'
    }).then(function successCallback(response) {
      console.log(response);
      $rootScope.allYears = response.data.rows;
    }, function errorCallback(response) {
      console.log('Get Error: ', response);
    })
    $scope.clearSelectedYear = function() {
      $rootScope.selectedYear = "";
    }
  })
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
        console.log('Success! ');
        $rootScope.allYears.push($rootScope.memory);
        $scope.allMemories.push($rootScope.memory);
        $rootScope.memory = {};
      }, function errorCallback(response) {
        console.log('Post Error: ', response);
      })  
    }
  })
  .controller("YearController", function($rootScope, $http, $scope, $routeParams) {
    $http({
      method: 'GET',
      url: 'http://g12-chloe-alnaji-memories.cfapps.io/api/v1/memories/' + $routeParams.year
    }).then(function successCallback(response) {
      console.log("this year: ", response);
      $scope.thisYearsMemories = response.data.rows
      $rootScope.selectedYear = response.data.rows[0].year;
      
    }, function errorCallback(response) {
      console.log('Get Error: ', response);
    });
    // make selected year bold
    // add "home" button
  })
  .config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'partials/memories.html',
      controller: 'MemoriesController'
    })
    .when('/:year', {
      templateUrl: 'partials/year.html',
      controller: 'YearController'
    })
    $locationProvider.html5Mode(true);
  })