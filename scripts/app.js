(function(){
 'use strict';
  angular.module('weatherApp',[
    'ui.router',
    'ngSanitize',
    'weatherApp.service'
  ]);

  angular.module('weatherApp').config(Configuration);

  Configuration.$inject = ["$stateProvider", "$urlRouterProvider"];

  function Configuration($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/currentTemp');
    $stateProvider
      .state('currentTemp', {
        url: '/currentTemp',
        templateUrl: "./views/currentTemp.html",
        controller:"currentTempCtrl",
        controllerAs: "currentTemp"
      })
      .state('fiveDay', {
        url: '/fiveDay',
        templateUrl: "./views/fiveDay.html",
        controller:"fiveDayCtrl",
        controllerAs: "fiveDay"
      });


  }
})();
