'use strict';

angular.module('bancoDeFilmesApp')
  .controller('MainCtrl', function ($http, $rootScope, $scope) {
    $scope.movieList = [];
    $scope.limit = 6;

    $http.get($rootScope.baseUrl + "/discover/movie?api_key=" + $rootScope.token + "&sort_by=popularity.desc&language=pt-BR")
      .then(function(response) {
        $scope.movieList = response.data.results;
      })

    $scope.loadMore = function(last, inview) {
      if(last && inview) {
        $scope.limit += 6;
      }
    }
  });
