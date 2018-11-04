'use strict';

angular.module('bancoDeFilmesApp')
  .controller('MainCtrl', function ($http, $rootScope, $scope) {
    $scope.movieList = [];

    $http.get($rootScope.baseUrl + "/discover/movie?api_key=" + $rootScope.token + "&sort_by=popularity.desc&language=pt-BR")
      .then(function(response) {
        $scope.movieList = response.data.results;
      })
  });
