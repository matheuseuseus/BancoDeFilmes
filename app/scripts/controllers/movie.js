'use strict';

angular.module('bancoDeFilmesApp')
  .controller('MovieCtrl', function ($http, $rootScope, $scope, $routeParams, $firebaseArray) {
    $scope.movie;
    $scope.exists;

    $http.get($rootScope.baseUrl + "/movie/" + $routeParams.id + "?api_key=" + $rootScope.token + "&language=pt-BR")
      .then(function(response) {
        $scope.movie = response.data;

        var data = firebase.database().ref('favoritos/' + $scope.movie.id);
        var ref = $firebaseArray(data);
        ref.$loaded()
          .then(function() {
            $scope.exists = ref;
          })
      })

    $scope.voteClassification = function(vote) {
      var classification;

      if(vote >= 7) {
        classification = "text-success";
      }
      else if(vote < 7 && vote >= 6) {
        classification = "text-warning";
      }
      else {
        classification = "text-danger";
      }

      return classification;
    }

    $scope.favorito = function() {
      firebase.database().ref('favoritos/' + $scope.movie.id).set({
        title: $scope.movie.title,
        vote: $scope.movie.vote_average,
        status: $scope.movie.status,
        overview: $scope.movie.overview,
        release: $scope.movie.release_date,
        homepage: $scope.movie.homepage,
        poster: $scope.movie.poster_path
      })
    }
  });
