'use strict';

angular.module('bancoDeFilmesApp')
  .controller('MovieCtrl', function ($http, $rootScope, $scope, $routeParams) {
    $scope.movie;

    $http.get($rootScope.baseUrl + "/movie/" + $routeParams.id + "?api_key=" + $rootScope.token + "&language=pt-BR")
      .then(function(response) {
        $scope.movie = response.data;
      })
  });
