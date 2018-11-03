'use strict';

angular.module('bancoDeFilmesApp')
  .controller('SearchCtrl', function($http, $rootScope, $scope, $routeParams) {
    $scope.movieSearch = [];
    
    $http.get($rootScope.baseUrl + '/search/movie?api_key=' + $rootScope.token + '&query=' + $routeParams.query + "&language=pt-BR&page=1")
      .then(function(response) {
        $scope.movieSearch = response.data.results;
      })
  })