(function(){
 'use strict';
  angular.module('testApp',[
    'ui.router',
    'ngSanitize'
  ]);

  angular.module('testApp').config(Configuration);

  Configuration.$inject = ["$stateProvider", "$urlRouterProvider"];

  function Configuration($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: "./views/home.html",
        controller:"homeCtrl",
        controllerAs: "home"
      });
  }
})();
