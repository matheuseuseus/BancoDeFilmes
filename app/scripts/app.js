'use strict';

/**
 * @ngdoc overview
 * @name bancoDeFilmesApp
 * @description
 * # bancoDeFilmesApp
 *
 * Main module of the application.
 */
angular
  .module('bancoDeFilmesApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/movie/:id', {
        templateUrl: 'views/movie.html',
        controller: 'MovieCtrl',
        controllerAs: 'movie'
      })
      .when('/search/:query', {
        templateUrl: 'views/search.html',
        controller: 'SearchCtrl',
        controllerAs: 'search'
      })
      .otherwise({
        redirectTo: '/'
      });
  
  })
  .run(function($rootScope, $location) {
    $rootScope.goToPage = function(path) {
      $location.path(path);
    }

    $rootScope.goBack = function() {
      window.history.back();
    }

    $rootScope.baseUrl = "https://api.themoviedb.org/3";
    $rootScope.imagePath = "https://image.tmdb.org/t/p/w500";
    $rootScope.token = "9534fb017bb11f233da44baa9c43efe8";
  });
