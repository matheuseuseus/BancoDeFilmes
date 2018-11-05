"use strict";angular.module("bancoDeFilmesApp",["ngRoute","firebase"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/movie/:id",{templateUrl:"views/movie.html",controller:"MovieCtrl",controllerAs:"movie"}).when("/search/:query",{templateUrl:"views/search.html",controller:"SearchCtrl",controllerAs:"search"}).when("/favorites",{templateUrl:"views/favorites.html",controller:"FavoritesCtrl",controllerAs:"favorites"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location",function(a,b){a.goToPage=function(a){b.path(a)},a.goBack=function(){window.history.back()},a.baseUrl="https://api.themoviedb.org/3",a.imagePath="https://image.tmdb.org/t/p/w500",a.token="9534fb017bb11f233da44baa9c43efe8"}]),angular.module("bancoDeFilmesApp").controller("MainCtrl",["$http","$rootScope","$scope",function(a,b,c){c.movieList=[],a.get(b.baseUrl+"/discover/movie?api_key="+b.token+"&sort_by=popularity.desc&language=pt-BR").then(function(a){c.movieList=a.data.results})}]),angular.module("bancoDeFilmesApp").controller("MovieCtrl",["$http","$rootScope","$scope","$routeParams","$firebaseArray",function(a,b,c,d,e){c.movie,c.exists,a.get(b.baseUrl+"/movie/"+d.id+"?api_key="+b.token+"&language=pt-BR").then(function(a){c.movie=a.data;var b=firebase.database().ref("favoritos/"+c.movie.id),d=e(b);d.$loaded().then(function(){c.exists=d})}),c.voteClassification=function(a){var b;return b=a>=7?"text-success":7>a&&a>=6?"text-warning":"text-danger"},c.favorito=function(){firebase.database().ref("favoritos/"+c.movie.id).set({title:c.movie.title,vote:c.movie.vote_average,status:c.movie.status,overview:c.movie.overview,release:c.movie.release_date,homepage:c.movie.homepage,poster:c.movie.poster_path})}}]),angular.module("bancoDeFilmesApp").controller("SearchCtrl",["$http","$rootScope","$scope","$routeParams",function(a,b,c,d){c.movieSearch=[],a.get(b.baseUrl+"/search/movie?api_key="+b.token+"&query="+d.query+"&language=pt-BR&page=1").then(function(a){c.movieSearch=a.data.results})}]),angular.module("bancoDeFilmesApp").controller("FavoritesCtrl",["$scope","$firebaseArray",function(a,b){var c;a.movies=[],c=firebase.database().ref("favoritos/"),a.movies=b(c),a.movies.$loaded().then(function(){console.log("Movies loaded")})}]),angular.module("bancoDeFilmesApp").run(["$templateCache",function(a){a.put("views/favorites.html",'<div class="row"> <div class="col-md-4 col-sm-6 py-2" ng-repeat="movie in movies"> <div class="card h-100"> <img class="card-img-top lazy" ng-src="{{imagePath}}{{movie.poster}}" alt="{{movie.title}}"> <div class="card-body d-flex flex-column"> <div class="h-100"> <!--<h5 class="card-title">{{movie.title}}</h5>--> </div> <a href="#!/movie/{{movie.$id}}" class="btn btn-primary btn-sm mt-auto">Ver Informações</a> </div> </div> </div> </div>'),a.put("views/main.html",'<div class="row grid"> <div class="col-md-4 col-sm-6 py-2 grid-item" ng-repeat="movie in movieList"> <div class="card h-100"> <img class="card-img-top lazy" ng-src="{{imagePath}}{{movie.poster_path}}" alt="{{movie.title}}"> <div class="card-body d-flex flex-column"> <div class="h-100"> <!--<h5 class="card-title">{{movie.title}}</h5>--> </div> <a href="#!/movie/{{movie.id}}" class="btn btn-primary btn-sm mt-auto">Ver Informações</a> </div> </div> </div> </div>'),a.put("views/movie.html",'<div class="row py-2"> <div class="col-md-12 py-2 card bg-light"> <div class="row"> <div class="col-md-4"> <img class="card-img-top" ng-src="{{imagePath}}{{movie.poster_path}}" alt="{{movie.title}}" ng-if="movie.poster_path"> <img class="card-img-top" src="https://www.templaza.com/blog/components/com_easyblog/themes/wireframe/images/placeholder-image.png" alt="{{movie.title}}" ng-if="!movie.poster_path"> <div class="row"> <div class="col-md-12 py-2"> <h5 class="card-title text-center">{{movie.title}} | <span ng-class="voteClassification(movie.vote_average)">{{movie.vote_average}}</span> <span ng-if="movie.status !== \'Released\'">{{movie.status}}</span></h5> </div> </div> </div> <div class="col-md-8 py-2"> <p class="card-body" ng-if="movie.overview">{{movie.overview}}</p> <p class="card-body" ng-if="!movie.overview">Não há descrição para este filme.</p> <ul class="list-group list-group-flush"> <li class="list-group-item"> Gêneros: <span ng-repeat="genre in movie.genres">{{$last === true ? genre.name : genre.name + ", "}}</span> </li> <li class="list-group-item" ng-if="movie.release_date">Data de Lançamento: {{movie.release_date | date: \'dd/MM/yyyy\'}}</li> <li class="list-group-item" ng-if="movie.homepage"><a href="{{movie.homepage}}">{{movie.homepage}}</a></li> </ul> </div> </div> </div> </div> <div class="row"> <div class="col align-self-start"> <button class="btn btn-primary" ng-click="goBack()">Voltar</button> </div> <div class="col align-self-end"> <button class="btn btn-primary disabled float-right" ng-click="favorito()" ng-if="exists.length > 0" disabled>Favoritado</button> <button class="btn btn-primary float-right" ng-click="favorito()" ng-if="exists.length === 0">Favorito</button> </div> </div>'),a.put("views/search.html",'<div class="row grid"> <div class="col-md-4 col-sm-6 col-xs-12 py-2 grid-item" ng-repeat="movie in movieSearch"> <div class="card h-100"> <img class="card-img-top" ng-src="{{imagePath}}{{movie.poster_path}}" alt="{{movie.title}}" ng-if="movie.poster_path"> <div ng-if="!movie.poster_path"> <span class="text-center">{{movie.title}} (Não há imagem para este filme)</span> <img class="card-img-top" src="https://www.templaza.com/blog/components/com_easyblog/themes/wireframe/images/placeholder-image.png" alt="{{movie.title}}"> </div> <div class="card-body d-flex flex-column"> <div class="h-100"> <!--<h5 class="card-title">{{movie.title}}</h5>--> </div> <a href="#!/movie/{{movie.id}}" class="btn btn-primary btn-sm mt-auto">Ver Informações</a> </div> </div> </div> </div>')}]);