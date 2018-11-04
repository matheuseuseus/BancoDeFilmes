'use strict';

angular.module('bancoDeFilmesApp')
  .controller('FavoritesCtrl', function($scope, $firebaseArray) {
    var data;
    $scope.movies = [];

    data = firebase.database().ref('favoritos/');

    $scope.movies = $firebaseArray(data);
    $scope.movies.$loaded()
      .then(function() {
        console.log("Movies loaded");
      })
  })